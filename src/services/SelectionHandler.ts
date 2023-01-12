export class SelectionHandler {
    public slides: number[] = [];
    public attachments: number[] = [];

    public hasSelections(): boolean {
        return this.slides.length > 0 || this.attachments.length > 0;
    }

    // Slides
    public isSlideSelected(slideId: number): boolean {
        return this.slides.some(selectedSlideId => selectedSlideId == slideId);
    }

    public selectSlide(slideId: number): void {
        if (this.unselectSlide(slideId)) {
            return;
        }

        this.slides.push(slideId);
    }

    private unselectSlide(slideId: number): boolean {
        for (let i = 0; i < this.slides.length; i++) {
            if (this.slides[i] == slideId) {
                this.slides.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    // Attachments
    public isAttachmentSelected(attachmentId: number): boolean {
        return this.attachments.some(selectedAttachmentId => selectedAttachmentId == attachmentId);
    }

    public selectAttachment(attachmentId: number): void {
        if (this.unselectAttachment(attachmentId)) {
            return;
        }

        this.attachments.push(attachmentId);
    }

    private unselectAttachment(attachmentId: number): boolean {
        for (let i = 0; i < this.attachments.length; i++) {
            if (this.attachments[i] == attachmentId) {
                this.attachments.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    // General
    public clear() {
        this.slides = [];
        this.attachments = [];
    }
}