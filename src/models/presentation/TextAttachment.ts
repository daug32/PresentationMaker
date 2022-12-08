import { Attachment } from "./Attachment";
import { AttachmentType } from "./AttachmentType";

export class TextAttachment extends Attachment {
    public readonly attachmentType: AttachmentType = AttachmentType.Text;

    public text: string = "";

    public color: string = "#000";
    public fontSize: number = 14;
    public fontFamily: string = "Calibria"; // TODO: register all supported fonts
}