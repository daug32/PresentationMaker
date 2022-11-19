import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Presentation } from 'src/models/presentation/Presentation';

@Component({
    selector: 'presentation-toolbar',
    templateUrl: './presentation-toolbar.component.html',
    styleUrls: ['./presentation-toolbar.component.scss']
})
export class PresentationToolbarComponent {
    @Input() presentation!: Presentation;

    @Output() onPresentationLoad = new EventEmitter<Presentation>();

    @Output() undoEvent = new EventEmitter<undefined>();
    @Output() redoEvent = new EventEmitter<undefined>();

    @Output() textEvent = new EventEmitter<undefined>();
    @Output() ImageEvent = new EventEmitter<undefined>();
    @Output() squareEvent = new EventEmitter<undefined>();
    @Output() circleEvent = new EventEmitter<undefined>();
    @Output() triangleEvent = new EventEmitter<undefined>();

    constructor() { }

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