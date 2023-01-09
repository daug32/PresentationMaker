import { Attachment } from "./Attachment";

export class Slide {
    constructor( 
        public id: number, 
        public attachments: Attachment[],
        public orderPosition: number,
        public backgroundColor: string = "white"
    ) { }
}