import { Component, Input, OnInit, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Vector2 } from 'src/models/other/Vector2';
import { Attachment, ImageAttachment, TextAttachment } from 'src/models/presentation/Attachment';
import { AttachmentType } from 'src/models/presentation/AttachmentType';
import { Presentation } from 'src/models/presentation/Presentation';
import { Slide } from 'src/models/presentation/Slide';
import { createAttachment, setAttachmentImage, setAttachmentPosition, setAttachmentSize, setAttachmentText } from 'src/functions/AttachmentFunctions';
<<<<<<< HEAD
import { deleteAttachment } from 'src/functions/SlideFunctions';
=======
import { createSlide } from 'src/functions/SlideFunctions';
import { removeSlide } from 'src/functions/PresentationFunctions';
>>>>>>> ed7894efb64cd386a2542da9f278fdf8cf3a5b95

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public presentation: Presentation;
    public attachmentToAdd?: Attachment;
<<<<<<< HEAD
    public selectedAttachments: number[] = [];
=======
    public selectedAttachments: Attachment[] = [];

    private _currentSlideId: number = 0;
    public get currentSlide(): Slide {
        return this.presentation.slides.find(slide => slide.id == this._currentSlideId) ?? new Slide(0, [], 0);
    }
>>>>>>> ed7894efb64cd386a2542da9f278fdf8cf3a5b95

    private _attachmentLastId: number = 0;
    private _slideLastId: number = 0;

    constructor() {        
        this.presentation = this.testPresentation();
<<<<<<< HEAD
        this.currentSlide = this.presentation.slides[0] ?? new Slide(0, [], 0);

        document.addEventListener("keydown", (event: KeyboardEvent) => this.deleteSelected(event));
    }

    public deleteSelected(event: KeyboardEvent): void {
        if (event.keyCode !== 46) {
            return;
        }
        console.log(this.selectedAttachments);
        for (let i = 0; i < this.selectedAttachments.length; i++){
            this.currentSlide = deleteAttachment(this.currentSlide, this.selectedAttachments[i]);
        }
=======
        this._currentSlideId = this.presentation.slides[0]?.id ?? 0;
>>>>>>> ed7894efb64cd386a2542da9f278fdf8cf3a5b95
    }

    // System operations
    public onUndo(): void { }

    public onRedo(): void { }

    // Atttachments

    public onCreateAttachment(attachmentType: AttachmentType): void {
        this.currentSlide.attachments.push(createAttachment(this._attachmentLastId++, attachmentType));
    }

    public onPresentationLoad(presentation: Presentation): void {
        this.presentation = presentation;
    }

    public onSlideChange(slide: Slide): void {
        this._currentSlideId = slide.id;
    }

<<<<<<< HEAD
    public onSelect(id: number): void { 
        for (let i = 0; i < this.selectedAttachments.length; i++){
            if (this.selectedAttachments[i] == id){
=======
    public onAddSlide(): void {
        this.presentation.slides.push(createSlide(this._slideLastId++, this.presentation.slides.length));
    }

    public onRaiseSlide(id: number): void {
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

    public onDeleteSlide(id: number): void {
        this.presentation = removeSlide(this.presentation, id);
    }

    public onDropSlide(id: number): void {
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
    
    public onSelect(attachment: Attachment): void { 
        for (let i = 0; i < this.selectedAttachments.length; i++){
            if (this.selectedAttachments[i] == attachment){
>>>>>>> ed7894efb64cd386a2542da9f278fdf8cf3a5b95
                this.selectedAttachments.splice(i, 1);
                return;
            }
        } 
<<<<<<< HEAD
        this.selectedAttachments.push(id);
    }

    public isSelected(id: number): boolean {
        return this.selectedAttachments.some(selectedAttachment => selectedAttachment == id);
=======
        this.selectedAttachments.push(attachment);
    }

    public isSelected(attachment: Attachment): boolean {
        return this.selectedAttachments.some(selectedAttachment => selectedAttachment == attachment);
>>>>>>> ed7894efb64cd386a2542da9f278fdf8cf3a5b95
    }

    public cleanSelected(event: MouseEvent): void {
        let path: EventTarget[] = event.composedPath();
        let isAttachment: boolean = path.some(step => {
            let element: HTMLElement = step as HTMLElement;
            return element.classList?.contains('attachment');
        });

        if(isAttachment){
            return;
        }
<<<<<<< HEAD
        this.selectedAttachments = [];
    }

=======
        else {
            this.selectedAttachments = [];
        }
    }


>>>>>>> ed7894efb64cd386a2542da9f278fdf8cf3a5b95
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
