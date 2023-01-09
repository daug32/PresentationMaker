import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AttachmentType } from 'src/models/presentation/AttachmentType';
import { Presentation } from 'src/models/presentation/Presentation';

@Component({
    selector: 'presentation-toolbar',
    templateUrl: './presentation-toolbar.component.html',
    styleUrls: ['./presentation-toolbar.component.scss']
})
export class PresentationToolbarComponent {
    @Input() presentation!: Presentation;

    @Output() onPresentationLoad = new EventEmitter<Presentation>();

    @Output() onCreateAttachmentEvent = new EventEmitter<AttachmentType>()

    constructor() { }

    public textEvent(): void {
        this.onCreateAttachmentEvent.emit(AttachmentType.Text);
    }

    public triangleEvent(): void {
        this.onCreateAttachmentEvent.emit(AttachmentType.Triangle);
    }

    public squareEvent(): void {
        this.onCreateAttachmentEvent.emit(AttachmentType.Rectangle);
    }

    public circleEvent(): void {
        this.onCreateAttachmentEvent.emit(AttachmentType.Circle);
    }

    public imageEvent(): void {
        this.onCreateAttachmentEvent.emit(AttachmentType.Image);
    }

    public newPresentationEvent(): void {
        this.onSave();
        this.presentation.slides = [];
        this.presentation.name = "Presentation title";
    }

    public onUndoEvent(): void {
    }

    public onRedoEvent(): void {
    }

    public onSave(): void {
        let file = JSON.stringify(this.presentation);

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(file));
        element.setAttribute('download', `${this.presentation.name}.asticots`);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    public onOpen(): void {
        let input: HTMLInputElement = document.createElement('input');
        input.type = 'file';
        input.accept = '.asticots';
        input.onchange = _ => this.loadFile(input);
        input.click();
    }

    private loadFile(input: HTMLInputElement): void {
        // you can use this method to get file and perform respective operations
        let files: FileList | null = input.files;
        if (files = null) {
            return;
        }

        let file = input.files?.item(0) as File;

        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = () => {
            let replaser: string = reader.result as string;
            let newPresentation: Presentation = JSON.parse(replaser);
            this.onPresentationLoad.emit(newPresentation);
        };
    }
}