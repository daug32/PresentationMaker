import { Component, ViewChild, ElementRef } from '@angular/core';
import { Vector2 } from 'src/models/other/Vector2';
import { Attachment, ImageAttachment, TextAttachment } from 'src/models/presentation/Attachment';
import { AttachmentType } from 'src/models/presentation/AttachmentType';
import { Presentation } from 'src/models/presentation/Presentation';
import { Slide } from 'src/models/presentation/Slide';
import { createAttachment, setAttachmentImage, setAttachmentPosition, setAttachmentSize, setAttachmentText } from 'src/functions/AttachmentFunctions';
import { deleteAttachments } from 'src/functions/SlideFunctions';
import { createSlide } from 'src/functions/SlideFunctions';
import { removeSlide } from 'src/functions/PresentationFunctions';
import { SlideSettingsComponent } from './slide-settings/slide-settings.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public presentation: Presentation;

    // Selections
    public selectedSlides: number[] = [];
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

        this.presentation.slides[index] = slide;
        this._currentSlideId = slide.id;
    }

    // Settings 
	private _hasOpenedSettings: boolean = false;
	@ViewChild('slideSettings', { read: ElementRef }) slideSettings!: ElementRef;

    // Items repository info
    // TODO: Вынести в репозитории сущностей
    private _attachmentLastId: number = 0;
    private _slideLastId: number = 0;

    constructor() {
        this.presentation = this.testPresentation();
        this._currentSlideId = this.presentation.slides[0]?.id ?? 0;
        document.addEventListener("keydown", (event: KeyboardEvent) => this.deleteSelected(event));
    }
    
    public deleteSelected(event: KeyboardEvent): void {
        if (event.keyCode !== 46) {
            return;
        }

        this.currentSlide = deleteAttachments(this.currentSlide, this.selectedAttachments);
        
        let selectedId = this.selectedSlides;
        for (let i = 0; i < this.presentation.slides.length; i++) {
            let slide = this.presentation.slides[i];
            let isSlideSelected: boolean = selectedId.some( selectedSlideId => selectedSlideId == slide.id);

            if(!isSlideSelected) {
                continue;
            }

            this.onDeleteSlide(slide.id);
            i--;
        }
    }

    // System operations
    public onUndo(): void { }

    public onRedo(): void { }

    // Presentation
    public onPresentationLoad(presentation: Presentation): void {
        this.presentation = presentation;
    }

    // Atttachments
    public onCreateAttachment(attachmentType: AttachmentType): void {
        this.currentSlide.attachments.push(createAttachment(this._attachmentLastId++, attachmentType));
    }

    public selectAttachment(attachmentId: number, event: MouseEvent): void {
        event.preventDefault();
        
        if (!event.shiftKey) {
            return;
        }

        for (let i = 0; i < this.selectedAttachments.length; i++) {
            if (this.selectedAttachments[i] == attachmentId) {
                this.selectedAttachments.splice(i, 1);
                return;
            }
        }

        this.selectedAttachments.push(attachmentId);
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
 
    public cleanSelectedAttachments(event: MouseEvent): void {
        if (!this.isClickOnWorkspace(event)) {
            return;
        }

        this.selectedAttachments = [];
    }

    private isClickOnWorkspace(event: Event): boolean {
        let path: EventTarget[] = event.composedPath();
        return !path.some(step => {
            let element: HTMLElement = step as HTMLElement;
            return element.classList?.contains('attachment');
        });
    }

    public isAttachmentSelected(attachmentId: number): boolean {
        return this.selectedAttachments.some(selectedAttachmentId => selectedAttachmentId == attachmentId);
    }

    // Slides
    public onAddSlide(): void {
        this.presentation.slides.push(createSlide(this._slideLastId++, this.presentation.slides.length));
    }

    public onSlideClick(slideId: number, event: MouseEvent): void {
        if (event.shiftKey) {
            this.selectSlide(slideId, event);
        }
        else {
            this.changeSlide(slideId);
            this.selectedSlides = [];
        }
    }

    private selectSlide(id: number, event: MouseEvent): void {
        event.preventDefault();

        for (let i = 0; i < this.selectedSlides.length; i++) {
            if (this.selectedSlides[i] == id) {
                this.selectedSlides.splice(i, 1);
                return;
            }
        }

        this.selectedSlides.push(id);
    }

    private changeSlide(slideId: number): void {
        this._currentSlideId = slideId;
        SlideSettingsComponent.close();
        this._hasOpenedSettings = false;
    }

    public isSlideSelected(id: number): boolean {
        return this.selectedSlides.some(selectedSlide => selectedSlide == id);
    }

    public onRaiseSlide(id: number): void {
        if (this.selectedSlides.length == 0) {
            this.moveSlideUp(id);
            return;
        }

        this.moveSlidesUp();
    }

    public moveSlideUp(id: number): void {
        let index = this.presentation.slides.findIndex(slide => slide.id == id);
        if (index == -1) {
            return;
        }

        if (index - 1 < 0) {
            return;
        }

        let changed = this.presentation.slides[index - 1];
        this.presentation.slides[index - 1] = this.presentation.slides[index];
        this.presentation.slides[index] = changed;
    }

    private moveSlidesUp(): void {
        let selectedId = this.selectedSlides;
        
        for (let i = 0; i < this.presentation.slides.length; i++) {
            let slide = this.presentation.slides[i];
            let isSlideSelected: boolean = selectedId.some( selectedSlideId => selectedSlideId == slide.id);

            if(!isSlideSelected) {
                continue;
            }

            this.moveSlideUp(slide.id);
        }
    }

    public onDropSlide(id: number): void {
        if (this.selectedSlides.length == 0) {
            this.moveSlideDown(id);
            return;
        }

        this.moveSlidesDown()
    }

    private moveSlideDown(id: number): void {
        let index = this.presentation.slides.findIndex(slide => slide.id == id);
        if (index == -1) {
            return;
        }

        if (index + 1 >= this.presentation.slides.length) {
            return;
        }

        let changed = this.presentation.slides[index + 1];
        this.presentation.slides[index + 1] = this.presentation.slides[index];
        this.presentation.slides[index] = changed;
    }
    
    private moveSlidesDown(): void {
        let selectedId = this.selectedSlides;
        
        for (let i = this.presentation.slides.length - 1; i > -1; i--) {
            let slide = this.presentation.slides[i];

            let isSlideSelected: boolean = selectedId.some(selectedSlideId => selectedSlideId == slide.id);
            if(!isSlideSelected) {
                continue;
            }

            this.moveSlideDown(slide.id);
        }
    }

    public onDeleteSlide(id: number): void {
        this.presentation = removeSlide(this.presentation, id);
    }

    // Other
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
