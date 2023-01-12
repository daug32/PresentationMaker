import { Component, ViewChild, ElementRef } from '@angular/core';
import { Vector2 } from 'src/models/other/Vector2';
import { AttachmentType } from 'src/models/presentation/AttachmentType';
import { Presentation } from 'src/models/presentation/Presentation';
import { Slide } from 'src/models/presentation/Slide';
import { createAttachment } from 'src/functions/AttachmentFunctions';
import { createSlide } from 'src/functions/SlideFunctions';
import { movePresentationSlideDown, movePresentationSlideUp, movePresentationSlidesDown, movePresentationSlidesUp } from 'src/functions/PresentationFunctions';
import { SlideSettingsComponent } from './settings/slide-settings/slide-settings.component';
import { SelectionHandler } from 'src/services/SelectionHandler';
import { StateManagerService } from 'src/services/StateManagerService';
import { Utils } from 'src/services/Utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public presentation!: Presentation;

    // Selections
    private stateManager = new StateManagerService();
    private _selectionService = new SelectionHandler();

    // Current slide
    public _currentSlideId: number = 0;

    public get currentSlide(): Slide {
        let slide = this.presentation.slides.find(slide => slide.id == this._currentSlideId);
        if (slide) {
            return slide;
        }

        if (this.presentation.slides.length > 0) {
            this._currentSlideId = this.presentation.slides[0].id;
            return this.presentation.slides[0];
        }

        return createSlide(0, 0);
    }

    public set currentSlide(value: Slide) {
        let index = this.presentation.slides.findIndex(slide => slide.id == value.id);
        if (index < 0) {
            return;
        }

        this._currentSlideId = value.id;
        this.presentation.slides[index] = value;
    }

    // Settings 
    private _hasOpenedSettings: boolean = false;
    @ViewChild('slideSettings', { read: ElementRef }) slideSettings!: ElementRef;

    // Items repository info
    // TODO: Вынести в репозитории сущностей
    private _slideLastId: number = 0;
    private _attachmentLastId: number = 0;

    constructor() {
        this.onPresentationCreate();
        document.addEventListener("keyup", event => this.processKeyupEvent(event));
        setInterval(() => console.log(this._slideLastId, this._currentSlideId), 100);
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

    public commitState(): void {
        this.stateManager.save(this.presentation);
    }

    // Presentation
    public onPresentationChange(presentation: Presentation): void {
        this.presentation = presentation;
        this._slideLastId = this.presentation.slides.reduce((result, slide) => result > slide.id ? result : slide.id, -1) + 1;
        this.commitState();
    }

    public onPresentationCreate(): void {
        this.presentation = new Presentation('Presentation title', [
            new Slide(this._slideLastId++, [], 0)
        ]);
        this._slideLastId = this.presentation.slides.reduce((result, slide) => result > slide.id ? result : slide.id, -1) + 1;
        this.commitState();
    }

    // Atttachments
    public onCreateAttachment(attachmentType: AttachmentType): void {
        let attachment = createAttachment(this._attachmentLastId++, attachmentType);
        this.currentSlide.attachments.push(attachment);
        this.commitState();
    }

    public selectAttachment(attachmentId: number, event: MouseEvent): void {
        if (!event.shiftKey) {
            return;
        }

        event.preventDefault();

        this._selectionService.selectAttachment(attachmentId);
    }

    // Slides
    public onAddSlide(): void {
        let slide = createSlide(this._slideLastId++, this.presentation.slides.length);
        console.log(slide.id);
        this.presentation.slides.push(slide);
        this.commitState();
    }

    public onSlideClick(slide: Slide, event: MouseEvent): void {
        if (event.shiftKey) {
            event.preventDefault();
            this._selectionService.selectSlide(slide.id);
            return;
        }

        this.changeCurrentSlide(slide);
        this._selectionService.clear();
    }

    public onRaiseSlideButton(slideId: number): void {
        if (this._selectionService.slides.length > 1) {
            this.presentation = movePresentationSlidesUp(this.presentation, this._selectionService.slides);
            this.commitState();
            return;
        }

        let presentation = movePresentationSlideUp(this.presentation, slideId);
        if (presentation) {
            this.presentation = presentation;
            this.commitState();
        }
    }

    public onDropSlideButton(slideId: number): void {
        if (this._selectionService.slides.length > 1) {
            this.presentation = movePresentationSlidesDown(this.presentation, this._selectionService.slides);
            this.commitState();
            return;
        }

        let presentation = movePresentationSlideDown(this.presentation, slideId);
        if (presentation) {
            this.presentation = presentation;
            this.commitState();
        }
    }

    public deleteSlide(id: number): void {
        let index = this.presentation.slides.findIndex(slide => slide.id == id);
        this.presentation.slides.splice(index, 1);
        this.commitState();
    }

    // Selections 
    public isSlideSelected = (slideId: number): boolean => this._selectionService.isSlideSelected(slideId);
    public isAttachmentSelected = (attachmentId: number): boolean => this._selectionService.isAttachmentSelected(attachmentId);

    public cleanSelections(event: MouseEvent): void {
        if (!Utils.isClassClicked(event, 'attachment')) {
            this._selectionService.clear();
        }
    }

    public deleteSelected(): void {
        if (!this._selectionService.hasSelections()) {
            return;
        }

        this.removeSelectedAttachments();
        this.removeSelectedSlides();
        this.commitState();
    }

    private removeSelectedAttachments(): void {
        this.currentSlide.attachments = this.currentSlide.attachments
            .filter(attachment => !this._selectionService.isAttachmentSelected(attachment.id));
    }

    private removeSelectedSlides(): void {
        this.presentation.slides = this.presentation.slides
            .filter(slide => !this._selectionService.isSlideSelected(slide.id));
    }

    // General
    public onWorkspaceRightClick(event: MouseEvent): void {
        if (Utils.isClassClicked(event, 'attachment')) {
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
    private processKeyupEvent(event: KeyboardEvent): void {
        if (Utils.isDeleteButton(event)) {
            this.deleteSelected();
        }

        if (Utils.hasRedoCombination(event)) {
            this.onRedo();
        }

        if (Utils.hasUndoCombination(event)) {
            this.onUndo();
        }
    }

    private changeCurrentSlide(slide: Slide): void {
        this._currentSlideId = slide.id;
        console.log(this._currentSlideId);
        SlideSettingsComponent.close();
        this._hasOpenedSettings = false;
    }
}
