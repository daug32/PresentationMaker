import { Attachment } from "./Attachment";

export class Slide {
    constructor( 
        public id: number, 
        public attachments: Attachment[]
    ) {}
}