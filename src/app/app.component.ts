import { Component } from '@angular/core';
import { Vector2 } from 'src/models/other/Vector2';
import { Attachment, ImageAttachment, TextAttachment } from 'src/models/presentation/Attachment';
import { AttachmentType } from 'src/models/presentation/AttachmentType';
import { Presentation } from 'src/models/presentation/Presentation';
import { Slide } from 'src/models/presentation/Slide';
import { createAttachment, setAttachmentImage, setAttachmentPosition, setAttachmentSize, setAttachmentText } from 'src/functions/AttachmentFunctions';
import { SelectedItem } from 'src/models/other/SelectedItem';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public presentation: Presentation;
    public currentSlide: Slide;
    public attachmentToAdd?: Attachment;
    public selectedItems: SelectedItem[] = [];

    private _attachmentLastId: number = 0;

    constructor() {        
        this.presentation = this.testPresentation();
        this.currentSlide = this.presentation.slides[0] ?? new Slide(0, [], 0);
    }

    // System operations
    public onUndo(): void { }

    public onRedo(): void { }

    // Atttachments
    public onAddText(): void {
        this.attachmentToAdd = createAttachment(this._attachmentLastId++, AttachmentType.Text);
    }

    public onAddImage(): void {
        this.attachmentToAdd = createAttachment(this._attachmentLastId++, AttachmentType.Image);
    }
    
    public onAddSquare(): void {
        this.attachmentToAdd = createAttachment(this._attachmentLastId++, AttachmentType.Rectangle);
    }
    
    public onAddCircle(): void {
        this.attachmentToAdd = createAttachment(this._attachmentLastId++, AttachmentType.Circle);
    }
    
    public onAddTriangle(): void {
        this.attachmentToAdd = createAttachment(this._attachmentLastId++, AttachmentType.Triangle);
    }

    public onPresentationLoad(presentation: Presentation): void {
        this.presentation = presentation;
    }

    public onSlideChange(slide: Slide): void {
        this.currentSlide = slide;
        console.log(slide);
    }

    public onContextMenu(slideId: number): void {
        // let index: number = this.selectedItems.findIndex(x => x == slideId);

        // if (index != -1) {
        //     // снять пометку с миниатюры слайда
        //     this.selectedItems.splice(index, 1);
        // } else {
        //     // добавить пометку миниатюры слайда
        //     this.selectedItems.push(
        //         new SelectedItem(slideId, [])
        //     );
        // }
    }

    private testPresentation(): Presentation {
        let slides: Slide[] = [];
        for (let i = 0; i < 2; i++) {
            let slide = new Slide(i, this.testAttachments(), 1);
            slides.push(slide);
        }

        return new Presentation("Presentation", slides);
    }

    private testAttachments(): Attachment[] {
        let image = createAttachment(this._attachmentLastId++, AttachmentType.Image);
        image = setAttachmentImage(image as ImageAttachment, 'assets/images/test.jpg');

        let text = createAttachment(this._attachmentLastId++, AttachmentType.Text);
        text = setAttachmentText(text as TextAttachment, "Test attachmentText");
        
        let shape = createAttachment(this._attachmentLastId++, AttachmentType.Rectangle);

        let height: number = 100;

        return [image, text, shape].map((el, index) => {
            setAttachmentSize(el, new Vector2(100, height));
            setAttachmentPosition(el, new Vector2(0, height * index));
            return el;
        });
    }
}
