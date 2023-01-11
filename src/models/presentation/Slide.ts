import { Attachment } from "./Attachment";

export class Slide {
    constructor( 
        public id: number, 
        public attachments: Attachment[],
        public orderPosition: number, 
        public backgroundColor: string = "#ffffff", 
        public image: string = ""
    ) { }

    public get hasImage(): boolean { return this.image.length > 0; }

    public deleteImage(): void {
        this.image = "";
    }
}