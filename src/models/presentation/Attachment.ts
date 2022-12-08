import { AttachmentType } from "./AttachmentType";
import { Vector2 } from "../other/Vector2";

export abstract class Attachment {
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

    public width: number = 100;
    public height: number = 100;
}