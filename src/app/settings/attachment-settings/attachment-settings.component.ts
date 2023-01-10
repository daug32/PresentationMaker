import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Attachment, ImageAttachment, PrimitiveAttachment, TextAttachment } from 'src/models/presentation/Attachment';
import { AttachmentType } from 'src/models/presentation/AttachmentType';

abstract class SettingsComponentController {
    public static isShown: boolean = false;
    static settings?: ElementRef;

    public static open(instance: ElementRef): void {
        if (this.isShown) {
            this.close();
        }

        this.isShown = true;
        this.settings = instance;
        this.showChild(this.settings.nativeElement);
    }

    public static close(): void {
        this.isShown = false;
        if (this.settings) {
            this.hideChild(this.settings.nativeElement);
        }
    }

    private static hideChild(element: HTMLElement): void {
        (element.childNodes[0] as HTMLElement).style.visibility = 'hidden';
    }

    private static showChild(element: HTMLElement): void {
        (element.childNodes[0] as HTMLElement).style.visibility = 'visible';
    }
}

@Component({
    selector: 'attachment-settings',
    templateUrl: './attachment-settings.component.html',
    styleUrls: ['./attachment-settings.component.scss']
})
export class SettingsComponent extends SettingsComponentController implements OnInit {
    @Input('attachment') public attachment!: Attachment;

    public isText: boolean = false;
    public get textAttachment(): TextAttachment { return this.attachment as TextAttachment; }

    public isImage: boolean = false;
    public get imageAttachment(): ImageAttachment { return this.attachment as ImageAttachment; }

    public isPrimitive: boolean = false;
    public get primitiveAttachment(): PrimitiveAttachment { return this.attachment as PrimitiveAttachment; }

    public get color(): string {
        switch (this.attachment.attachmentType) {
            case AttachmentType.Text:
                return (this.attachment as TextAttachment).color;
            default:
                return (this.attachment as PrimitiveAttachment).color;
        }
    }

    public set color(value: string) {
        switch (this.attachment.attachmentType) {
            case AttachmentType.Text:
                (this.attachment as TextAttachment).color = value;
                break;
            default:
                (this.attachment as PrimitiveAttachment).color = value;
        }
    }

    public get fillColor(): string {
        switch (this.attachment.attachmentType) {
            case AttachmentType.Text:
                return (this.attachment as TextAttachment).fillColor;
            default:
                return (this.attachment as PrimitiveAttachment).fillColor;
        }
    }

    public set fillColor(value: string) {
        switch (this.attachment.attachmentType) {
            case AttachmentType.Text:
                (this.attachment as TextAttachment).fillColor = value;
                break;
            default:
                (this.attachment as PrimitiveAttachment).fillColor = value;
        }
    }

    public canShowHeight(): boolean {
        var prohibited: AttachmentType[] = [AttachmentType.Text, AttachmentType.Circle];
        return !prohibited.some(type => type == this.attachment.attachmentType);
    }

    public canShowWidth(): boolean {
        var prohibited: AttachmentType[] = [AttachmentType.Circle];
        return !prohibited.some(type => type == this.attachment.attachmentType);
    }

    public get radius(): number { return this.attachment.size.x; }
    public set radius(value: number) { this.attachment.size.x = this.attachment.size.y = value; }

    public canShowRadius(): boolean {
        return this.attachment.attachmentType == AttachmentType.Circle;
    }

    constructor() {
        super();
    }

    ngOnInit(): void {
        let type: AttachmentType = this.attachment.attachmentType;

        this.isText = type == AttachmentType.Text;
        this.isImage = type == AttachmentType.Image;
        this.isPrimitive = type == AttachmentType.Shape ||
            type == AttachmentType.Circle ||
            type == AttachmentType.Triangle ||
            type == AttachmentType.Rectangle;
    }

    public onFileLoad(): void {
        if (!this.isImage) {
            return;
        }

        let input: HTMLInputElement = document.createElement('input');
        input.type = 'file';
        input.accept = '.png, .jpeg, .jpg, .gif';

        input.onchange = _ => {
            let file = input.files?.item(0) as File;
            if (file == null) {
                return;
            }

            let reader = new FileReader();
            reader.onloadend = () => (this.attachment as ImageAttachment).image = reader.result as string;
            reader.readAsDataURL(file);
        };

        input.click();
    }
}
