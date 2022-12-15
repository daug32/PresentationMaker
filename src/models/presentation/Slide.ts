import { Attachment } from "./Attachment";
import { AttachmentType } from "./AttachmentType";

export class Slide {
    constructor( 
        public id: number, 
        public attachments: Attachment[],
        public orderPosition: number,
        public backgroundColor: string = "white"
    ) { }
}