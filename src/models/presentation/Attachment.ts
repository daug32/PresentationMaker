import { AttachmentType } from "./AttachmentType";
import { Vector2 } from "../other/Vector2";

export class Attachment {
    constructor(
        public id: number, 

        public transform: Vector2, 
        public rotation: number, 
        public scale: Vector2,

        public data: string, 
        public attachmentType: AttachmentType
    ) {}
}