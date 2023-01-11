import { Component, ViewChild, ElementRef } from '@angular/core';
import { Vector2 } from 'src/models/other/Vector2';
import { Attachment, ImageAttachment, TextAttachment } from 'src/models/presentation/Attachment';
import { AttachmentType } from 'src/models/presentation/AttachmentType';
import { Presentation } from 'src/models/presentation/Presentation';
import { Slide } from 'src/models/presentation/Slide';
import { createAttachment, setAttachmentImage, setAttachmentPosition, setAttachmentSize, setAttachmentText } from 'src/functions/AttachmentFunctions';
import { addSlideAttachment, copySlide, deleteAttachments } from 'src/functions/SlideFunctions';
import { createSlide } from 'src/functions/SlideFunctions';
import { addPresentationSlide, copyPresentation, createPresentation, movePresentationSlideDown, movePresentationSlideUp, movePresentationSlidesDown, movePresentationSlidesUp, removeSlide } from 'src/functions/PresentationFunctions';
import { SlideSettingsComponent } from './settings/slide-settings/slide-settings.component';
import { DataService } from 'src/models/other/DataService';
import { SelectionHandler } from 'src/services/SelectionHandler';
import { StateManagerService } from 'src/services/StateManagerService';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private _presentation!: Presentation;
    public get presentation(): Presentation { return this._presentation; }
    public set presentation(value: Presentation) { 
        this._presentation = value;
    }

    // Selections
    private stateManager = new StateManagerService();
    private _selectionService = new SelectionHandler();

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
    }

    // Settings 
    private _hasOpenedSettings: boolean = false;
    @ViewChild('slideSettings', { read: ElementRef }) slideSettings!: ElementRef;

    // Items repository info
    // TODO: Вынести в репозитории сущностей
    private _slideLastId: number = 0;
    private _attachmentLastId: number = 0;

    constructor() {
        this.presentation = this.testPresentation();
        this._currentSlideId = this.presentation.slides[0]?.id ?? 0;
        document.addEventListener("keydown", (event: KeyboardEvent) => this.deleteSelected(event));
        document.addEventListener("keydown", (event: KeyboardEvent) => this.onRedoKeys(event));
        document.addEventListener("keydown", (event: KeyboardEvent) => this.onUndoKeys(event));

        this.stateManager.save(this.presentation);
    }

    // System operations
    public onUndo(): void {
        this.stateManager.back();
        let presentation = this.stateManager.get();
        if (presentation) {
            this.presentation = presentation;
        }
    }

    public onRedo(): void {
        this.stateManager.further();
        let presentation = this.stateManager.get();
        if (presentation) {
            this.presentation = presentation;
        }
    }

    public onSlideChangeEvent(slide: Slide) {
        this.stateManager.save(this.presentation);
    }

    public onAttachmentChangeEvent(attachment: Attachment): void {
        this.stateManager.save(this.presentation);
    }
    
    // Presentation
    public onPresentationChange(presentation: Presentation): void {
        this.presentation = presentation;
        this.stateManager.save(this.presentation);
    }

    // Atttachments
    public onCreateAttachment(attachmentType: AttachmentType): void {
        let attachment = createAttachment(this._attachmentLastId++, attachmentType);
        this.currentSlide.attachments.push(attachment);
        this.stateManager.save(this.presentation);
    }

    public selectAttachment(attachmentId: number, event: MouseEvent): void {
        if (!event.shiftKey) {
            return;
        }
        
        event.preventDefault();

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
        this.stateManager.save(this.presentation);
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
            this.stateManager.save(this.presentation);
            return;
        }
        
        let presentation = movePresentationSlideUp(this.presentation, slideId);
        if (presentation) {
            this.presentation = presentation;
            this.stateManager.save(this.presentation);
        }
    }

    public onDropSlideButton(slideId: number): void {
        if (this._selectionService.slides.length > 1) {
            this.presentation = movePresentationSlidesDown(this.presentation, this._selectionService.slides);
            this.stateManager.save(this.presentation);
            return;
        }

        let presentation = movePresentationSlideDown(this.presentation, slideId);
        if (presentation) {
            this.presentation = presentation;
            this.stateManager.save(this.presentation);
        }
    }

    public deleteSlide(id: number): void {
        this.presentation = removeSlide(this.presentation, id);
        this.stateManager.save(this.presentation);
    }

    // General
    public deleteSelected(event: KeyboardEvent): void {
        if (event.keyCode !== 46) {
            return;
        }

        console.log('delete');

        this.currentSlide = deleteAttachments(this.currentSlide, this._selectionService.attachments);

        for (let i = 0; i < this.presentation.slides.length; i++) {
            let slide = this.presentation.slides[i];
            if (!this._selectionService.isSlideSelected(slide.id)) {
                continue;
            }

            i--;
            this.presentation = removeSlide(this.presentation, slide.id);
        }

        this.stateManager.save(this.presentation);
        console.log(this.currentSlide.attachments);
        //Прикол таков: он не удаляет аттачменты.
    }

    public onUndoKeys(event: KeyboardEvent): void {
        if (event.keyCode !== 90 || !(event.ctrlKey)) {
            return;
        }

        this.onUndo();
    }

    public onRedoKeys(event: KeyboardEvent): void {
        if (event.keyCode !== 89 || !(event.ctrlKey)) {
            return;
        }

        this.onRedo();
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
