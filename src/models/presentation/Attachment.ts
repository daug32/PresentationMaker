import { AttachmentType } from "./AttachmentType";
import { Vector2 } from "../other/Vector2";

export abstract class Attachment {
    public abstract readonly attachmentType: AttachmentType;

    constructor(
        public id: number,
        public size: Vector2 = new Vector2(100, 100),
        public position: Vector2 = new Vector2(0, 0),
    ) { }
}

export class TextAttachment extends Attachment {
    public readonly attachmentType: AttachmentType = AttachmentType.Text;

    public text: string = "";

    public color: string = "#000";
    public fontSize: number = 14;
    public fontFamily: string = "Calibria"; // TODO: register all supported fonts
}

export class ImageAttachment extends Attachment {
    public readonly attachmentType: AttachmentType = AttachmentType.Image;

    public image: string = "";
}

export class PrimitiveAttachment extends Attachment {
    public readonly attachmentType: AttachmentType;

    public borderColor: string = "#000";
    public backgroundColor: string = "#fff";

    public vertices: Vector2[] = [];

    constructor(
        id: number,
        vertices: Vector2[],
        size: Vector2 = new Vector2(100, 100),
        position: Vector2 = new Vector2(0, 0), 
        attachmentType: AttachmentType = AttachmentType.Shape
    ) {
        super(id, size, position);

        this.vertices = vertices;
        this.attachmentType = attachmentType;
    }
}