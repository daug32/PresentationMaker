import { AttachmentType } from "./AttachmentType";
import { Vector2 } from "../other/Vector2";

export class Attachment {
    constructor(
        public id: number, 

        public data: any, 
        public attachmentType: AttachmentType,

        public position: Vector2 = new Vector2(0, 0), 
        public scale: Vector2 = new Vector2(100, 100),
    ) {}

    public static Image(path: string) {
        return new Attachment(1, path, AttachmentType.Image);
    }

    public static Shape(vertices: Vector2[]) {
        return new Attachment(1, vertices, AttachmentType.Shape);
    }

    public static Text(text: string) {
        return new Attachment(1, text, AttachmentType.Text);
    }
}