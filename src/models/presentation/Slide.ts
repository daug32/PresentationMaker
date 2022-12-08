import { Attachment } from "./Attachment";
import { AttachmentType } from "./AttachmentType";

export class Slide {
    private _background: Attachment;

    constructor( 
        public id: number, 
        public attachments: Attachment[],
        public position: number
    ) {
        this._background = new Attachment(
            -1,
            'white',
            AttachmentType.Shape
        );
    }

    public getBackgound(): string {
        return this._background.data;
    }

    public setBackground(backgound: string) {
        this._background.data = backgound;
    }

    public getCopy(): Slide {
        return new Slide(
            this.id,
            [...this.attachments],
            this.position 
        );
    }
}