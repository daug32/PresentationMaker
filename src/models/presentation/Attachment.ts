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
    
    public color: string = "#000000";
    public fillColor: string = "#ffffff";
    
    public text: string = "";
    public fontSize: number = 16;
    public fontFamily: string = "Roboto"; // TODO: register all supported fonts
    public fontStyle: string[] = [];
}

export class ImageAttachment extends Attachment {
    public readonly attachmentType: AttachmentType = AttachmentType.Image;

    public image: string = "";
}

export class PrimitiveAttachment extends Attachment {
    public readonly attachmentType: AttachmentType;

    public color: string = "#000";
    public fillColor: string = "#fff";
    public strokeWidth: number = 1;

    public vertices: Vector2[] = [];

    constructor(
        id: number,
        vertices: Vector2[], 
        attachmentType: AttachmentType = AttachmentType.Shape,
        size: Vector2 = new Vector2(100, 100),
        position: Vector2 = new Vector2(0, 0)
    ) {
        super(id, size, position);

        this.vertices = vertices;
        this.attachmentType = attachmentType;
    }
}