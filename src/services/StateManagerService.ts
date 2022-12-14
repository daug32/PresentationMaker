import { copyAttachment } from "src/functions/AttachmentFunctions";
import { Attachment } from "src/models/presentation/Attachment";
import { Presentation } from "src/models/presentation/Presentation";
import { Slide } from "src/models/presentation/Slide";

export class StateManagerService {
    public states: Presentation[] = [];
    public position: number = 0;
    private _maxLength = 20;

    public save(presentation: Presentation): void {
        if (this.states.length > this._maxLength) {
            this.deleteFirst();
        }

        if (this.position != 0) {
            this.clear();
        }

        let copy = this.getFullCopy(presentation);
        this.states.push(copy);
    }

    public further(): void {
        if (this.position - 1 < 0) {
            return;
        }

        this.position--;
    }

    public back(): void {
        if (this.position + 1 >= this.states.length) {
            return;
        }

        this.position++;
    }

    public get(): Presentation | null {
        let index = this.states.length - 1 - this.position;
        if (index < 0 || index >= this.states.length) {
            return null;
        }

        return this.getFullCopy(this.states[index]);
    }

    private clear(): void {
        let index = this.states.length - 1 - this.position;
        this.states.splice(index + 1);
        this.position = 0;
    }

    private deleteFirst(): void {
        this.states.splice(0, 1);
    }

    private getFullCopy(presentation: Presentation): Presentation {
        let slides = presentation.slides.map(x => this.getSlideCopy(x));
        let newPresentation = { ...presentation, slides: slides };
        return newPresentation;
    }

    private getSlideCopy(slide: Slide): Slide {
        let attachments = slide.attachments.map(x => this.getAttachmentsCopy(x));
        let newSlide = { ...slide, attachments: attachments };
        return newSlide;
    }

    private getAttachmentsCopy(attachment: Attachment): Attachment {
        return copyAttachment(attachment.id, attachment);
    }
}