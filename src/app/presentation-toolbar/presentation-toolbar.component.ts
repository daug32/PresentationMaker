import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createPresentation, setPresentationName } from 'src/functions/PresentationFunctions';
import { DataService } from 'src/models/other/DataService';
import { AttachmentType } from 'src/models/presentation/AttachmentType';
import { Presentation } from 'src/models/presentation/Presentation';
import { PdfBuilderService } from 'src/services/PdfBuilderService';

@Component({
    selector: 'presentation-toolbar',
    templateUrl: './presentation-toolbar.component.html',
    styleUrls: ['./presentation-toolbar.component.scss']
})
export class PresentationToolbarComponent implements OnInit {
    @Input('presentation') public _presentation!: Presentation;

    @Output() onUndoEvent = new EventEmitter<void>(); 
    @Output() onRedoEvent = new EventEmitter<void>(); 
    @Output() onChangeEvent = new EventEmitter<Presentation>(); 
    @Output() onCreateAttachmentEvent = new EventEmitter<AttachmentType>();

    private _dataService!: DataService<Presentation>;
    public get presentation(): Presentation { return this._dataService.value; }
    public set presentation(value: Presentation) { 
        this._dataService.value = value;
        this.onChangeEvent.emit(this.presentation);
    }

    public titleControl = new FormControl<string>('');

    constructor() {
        this.titleControl.valueChanges.subscribe(title => {
            this.presentation = setPresentationName(this.presentation, title!);
        });
    }

    ngOnInit(): void {
        this._dataService = new DataService<Presentation>(this._presentation);
        this.titleControl.setValue(this._presentation.name);
    }

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
        this.presentation = createPresentation();
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

    public onExport(): void {
        let slides: HTMLCollection = document.getElementsByTagName('slide-preview');
        let builder = new PdfBuilderService();
        builder.pdfConvertor(slides, this.presentation.name);    
    }

    public onOpen(): void {
        let input: HTMLInputElement = document.createElement('input');
        input.type = 'file';
        input.accept = '.asticots';
        input.onchange = _ => this.loadFile(input);
        input.click();
    }

    private loadFile(input: HTMLInputElement): void {
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
            this.presentation = newPresentation;
        };
    }
}