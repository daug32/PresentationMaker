import { Component, ViewChild, ElementRef } from '@angular/core';
import { Vector2 } from 'src/models/other/Vector2';
import { Attachment, ImageAttachment, TextAttachment } from 'src/models/presentation/Attachment';
import { AttachmentType } from 'src/models/presentation/AttachmentType';
import { Presentation } from 'src/models/presentation/Presentation';
import { Slide } from 'src/models/presentation/Slide';
import { createAttachment, setAttachmentImage, setAttachmentPosition, setAttachmentSize, setAttachmentText } from 'src/functions/AttachmentFunctions';
import { addSlideAttachment, deleteAttachments } from 'src/functions/SlideFunctions';
import { createSlide } from 'src/functions/SlideFunctions';
import { addPresentationSlide, copyPresentation, createPresentation, movePresentationSlideDown, movePresentationSlideUp, movePresentationSlidesDown, movePresentationSlidesUp, removeSlide } from 'src/functions/PresentationFunctions';
import { SlideSettingsComponent } from './slide-settings/slide-settings.component';
import { DataService } from 'src/models/other/DataService';
import { SelectionHandler } from 'src/services/SelectionHandler';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private _dataService: DataService<Presentation>;
    public get presentation(): Presentation { return this._dataService.value; }
    public set presentation(value: Presentation) { this._dataService.value = value; }

    // Selections
    private _selectionService = new SelectionHandler();
    public selectedAttachments: number[] = [];

    // Current slide
    private _currentSlideId: number = 0;

    public get currentSlide(): Slide {
        return this.presentation.slides.find(slide => slide.id == this._currentSlideId) ?? new Slide(0, [], 0);
    }

    public set currentSlide(slide: Slide) {
        let index = this.presentation.slides.findIndex(slide => slide.id == this._currentSlideId);
        if (index == -1) {
            return;
        }
        
        this._currentSlideId = slide.id;

        let newPresentation = copyPresentation(this.presentation);
        newPresentation.slides[index] = slide;
        this.presentation = newPresentation;
    }

    // Settings 
    private _hasOpenedSettings: boolean = false;
    @ViewChild('slideSettings', { read: ElementRef }) slideSettings!: ElementRef;

    // Items repository info
    // TODO: Вынести в репозитории сущностей
    private _attachmentLastId: number = 0;
    private _slideLastId: number = 0;

    constructor() {
        this._dataService = new DataService<Presentation>(createPresentation());

        this.presentation = this.testPresentation();
        this._currentSlideId = this.presentation.slides[0]?.id ?? 0;
        document.addEventListener("keydown", (event: KeyboardEvent) => this.deleteSelected(event));

        this._dataService.observable.subscribe(newPresentation => {
            console.log(newPresentation);
        });
    }

    // System operations
    public onUndo(): void {
        console.log('Trying to do undo');
    }

    public onRedo(): void {
        console.log('Trying to do redo');
    }

    // Presentation
    public onPresentationChange(presentation: Presentation): void {
        this.presentation = presentation;
    }

    // Atttachments
    public onCreateAttachment(attachmentType: AttachmentType): void {
        let attachment = createAttachment(this._attachmentLastId++, attachmentType);
        this.currentSlide = addSlideAttachment(this.currentSlide, attachment);
    }

    public selectAttachment(attachmentId: number, event: MouseEvent): void {
        event.preventDefault();
        if (!event.shiftKey) {
            return;
        }

        this._selectionService.selectAttachment(attachmentId);
    }

    public cleanSelectedAttachments(event: MouseEvent): void {
        if (!this.isClickOnWorkspace(event)) {
            return;
        }
        
        this._selectionService.clear();
    }

    private isClickOnWorkspace(event: Event): boolean {
        let path: EventTarget[] = event.composedPath();
        return !path.some(step => {
            let element: HTMLElement = step as HTMLElement;
            return element.classList?.contains('attachment');
        });
    }

    public isAttachmentSelected(attachmentId: number): boolean {
        return this._selectionService.isAttachmentSelected(attachmentId);
    }

    // Slides
    public onAddSlide(): void {
        let slide = createSlide(this._slideLastId++, this.presentation.slides.length);
        this.presentation = addPresentationSlide(this.presentation, slide);
    }

    public onSlideClick(slideId: number, event: MouseEvent): void {
        if (event.shiftKey) {
            event.preventDefault();
            this._selectionService.selectSlide(slideId);
            return;
        }

        this.changeCurrentSlide(slideId);
        this._selectionService.clear();
    }

    public isSlideSelected(slideId: number): boolean { 
        return this._selectionService.isSlideSelected(slideId);
    }

    public onRaiseSlideButton(slideId: number): void {
        if (this._selectionService.slides.length > 1) {
            this.presentation = movePresentationSlidesUp(this.presentation, this._selectionService.slides);
            return;
        }
        
        let presentation = movePresentationSlideUp(this.presentation, slideId);
        if (presentation) {
            this.presentation = presentation;
        }
    }

    public onDropSlideButton(slideId: number): void {
        if (this._selectionService.slides.length > 1) {
            this.presentation = movePresentationSlidesDown(this.presentation, this._selectionService.slides);
            return;
        }

        let presentation = movePresentationSlideDown(this.presentation, slideId);
        if (presentation) {
            this.presentation = presentation;
        }
    }

    public deleteSlide(id: number): void {
        this.presentation = removeSlide(this.presentation, id);
    }

    // General
    public deleteSelected(event: KeyboardEvent): void {
        if (event.keyCode !== 46) {
            return;
        }

        this.currentSlide = deleteAttachments(this.currentSlide, this._selectionService.attachments);

        for (let i = 0; i < this.presentation.slides.length; i++) {
            let slide = this.presentation.slides[i];
            if (!this._selectionService.isSlideSelected(slide.id)) {
                continue;
            }

            i--;
            this.presentation = removeSlide(this.presentation, slide.id);
        }
    }

    public onWorkspaceRightClick(event: MouseEvent): void {
        if (!this.isClickOnWorkspace(event)) {
            return;
        }

        event.preventDefault();

        if (SlideSettingsComponent.isShown) {
            SlideSettingsComponent.close();
        }

        if (!this._hasOpenedSettings) {
            SlideSettingsComponent.open(this.slideSettings, new Vector2(event.clientX, event.clientY));
        }

        this._hasOpenedSettings = !this._hasOpenedSettings;
    }

    // Other
    private changeCurrentSlide(slideId: number): void {
        this._currentSlideId = slideId;
        SlideSettingsComponent.close();
        this._hasOpenedSettings = false;
    }

    private testPresentation(): Presentation {
        let slides: Slide[] = [];
        for (let i = 0; i < 2; i++) {
            let slide = createSlide(this._slideLastId++, this._slideLastId);
            slide.attachments = this.testAttachments();
            slides.push(slide);
        }

        return new Presentation("Presentation", slides);
    }

    private testAttachments(): Attachment[] {
        let image = createAttachment(this._attachmentLastId++, AttachmentType.Image);
        image = setAttachmentImage(image as ImageAttachment, 'assets/images/test.jpg');

        let text = createAttachment(this._attachmentLastId++, AttachmentType.Text);
        text = setAttachmentText(text as TextAttachment, "Test attachmentText");

        let shapes = [
            createAttachment(this._attachmentLastId++, AttachmentType.Rectangle),
            createAttachment(this._attachmentLastId++, AttachmentType.Circle),
            createAttachment(this._attachmentLastId++, AttachmentType.Triangle),
        ];

        let height: number = 100;

        return [image, text, ...shapes].map((el, index) => {
            el = setAttachmentSize(el, new Vector2(100, height));
            el = setAttachmentPosition(el, new Vector2(0, height * index));
            return el;
        });
    }
}
