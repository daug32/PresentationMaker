import { Vector2 } from "src/models/other/Vector2";
import { Attachment, ImageAttachment, TextAttachment } from "src/models/presentation/Attachment";
import { AttachmentType } from "src/models/presentation/AttachmentType";
import { PrimitiveAttachment } from "src/models/presentation/PrimitiveAttachment";
import { Slide } from "src/models/presentation/Slide";

export interface IAttachmentService {
    // Other
    copyAttachment(attachment: Attachment): Attachment;
    selectAttachment(attachmentId: Attachment): void;

    // CRUD
    createAttachment(attachmentType: AttachmentType): Attachment;
    setAttachmentSize(attachment: Attachment, newSize: Vector2): Attachment;
    setAttachmentPosition(attachment: Attachment, newPosition: Vector2): Attachment;

    // move to slide service
    deleteAttachment(slide: Slide, attachmentId: number): Slide;
}

export class AttachmentService implements IAttachmentService {
    private static _currentId: number = 0;

    constructor(existingAttachments: Attachment[]) {
        AttachmentService._currentId = existingAttachments.reduce((result: number, attachment: Attachment) => result = Math.max(attachment.id), 0);
    }

    createAttachment(attachmentType: AttachmentType): Attachment {
        switch (attachmentType) {
            case AttachmentType.Image:
                return new ImageAttachment(AttachmentService._currentId++);

            case AttachmentType.Text:
                return new TextAttachment(AttachmentService._currentId++);

            case AttachmentType.Shape:
                return new PrimitiveAttachment(AttachmentService._currentId++, []);
        }
    }

    deleteAttachment(slide: Slide, attachmentId: number): Slide {
        let copySlide: Slide = {
            // id: SlideService._currentId++,
            id: -1,
            attachments: slide.attachments.filter(a => a.id != attachmentId)
        };

        return copySlide;
    }

    copyAttachment(attachment: Attachment): Attachment {
        return { 
            ...attachment,
            id: AttachmentService._currentId,
        };
    }

    selectAttachment(attachmentId: Attachment): void {
        // something
    }

    setAttachmentSize(attachment: Attachment, newSize: Vector2): Attachment {
        return {
            ...attachment, 
            size: newSize
        };
    }

    setAttachmentPosition(attachment: Attachment, newPosition: Vector2): Attachment {
        return {
            ...attachment, 
            position: newPosition
        }
    }
}