import { Component, Input, OnInit, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Vector2 } from 'src/models/other/Vector2';
import { Attachment, ImageAttachment, TextAttachment } from 'src/models/presentation/Attachment';
import { AttachmentType } from 'src/models/presentation/AttachmentType';
import { Presentation } from 'src/models/presentation/Presentation';
import { Slide } from 'src/models/presentation/Slide';
import { createAttachment, setAttachmentImage, setAttachmentPosition, setAttachmentSize, setAttachmentText } from 'src/functions/AttachmentFunctions';
import { deleteAttachment } from 'src/functions/SlideFunctions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public presentation: Presentation;
    public currentSlide: Slide;
    public attachmentToAdd?: Attachment;
    public selectedAttachments: number[] = [];

    private _attachmentLastId: number = 0;

    constructor() {        
        this.presentation = this.testPresentation();
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

    public onSelect(id: number): void { 
        for (let i = 0; i < this.selectedAttachments.length; i++){
            if (this.selectedAttachments[i] == id){
                this.selectedAttachments.splice(i, 1);
                return;
            }
        } 
        this.selectedAttachments.push(id);
    }

    public isSelected(id: number): boolean {
        return this.selectedAttachments.some(selectedAttachment => selectedAttachment == id);
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
        this.selectedAttachments = [];
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
            el = setAttachmentSize(el, new Vector2(100, height));
            el = setAttachmentPosition(el, new Vector2(0, height * index));
            return el;
        });
    }
}
