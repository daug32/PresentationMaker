import { Attachment } from "./Attachment";
import { AttachmentType } from "./AttachmentType";

export class ImageAttachment extends Attachment {
    public readonly attachmentType: AttachmentType = AttachmentType.Image;

    public image: string = "";
}