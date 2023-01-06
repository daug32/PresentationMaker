import { Vector2 } from "src/models/other/Vector2";
import { Attachment, ImageAttachment, PrimitiveAttachment, TextAttachment } from "src/models/presentation/Attachment";
import { AttachmentType } from "src/models/presentation/AttachmentType";

export function createAttachment(id: number, attachmentType: AttachmentType): Attachment {
    switch (attachmentType) {
        case AttachmentType.Image:
            return new ImageAttachment(id);

        case AttachmentType.Text:
            return new TextAttachment(id);

        case AttachmentType.Shape:
            return new PrimitiveAttachment(id, []);

        case AttachmentType.Rectangle:
            return new PrimitiveAttachment(id, [
                new Vector2(0, 0),
                new Vector2(1, 0),
                new Vector2(1, 1),
                new Vector2(0, 1)
            ], attachmentType);

        case AttachmentType.Triangle:
            return new PrimitiveAttachment(id, [
                new Vector2(0, 1),
                new Vector2(0.5, 0.14),
                new Vector2(1, 1)
            ], attachmentType);

        case AttachmentType.Circle:
            return new PrimitiveAttachment(id, [], attachmentType);
    }
}

// General attachment functions
export function copyAttachment(newId: number, attachment: Attachment): Attachment {
    return {
        ...attachment,
        id: newId,
    };
}

export function selectAttachment(attachmentId: Attachment): void {
    // something
}

export function setAttachmentSize(attachment: Attachment, newSize: Vector2): Attachment {
    return {
        ...attachment,
        size: newSize
    };
}

export function setAttachmentPosition(attachment: Attachment, newPosition: Vector2): Attachment {
    return {
        ...attachment,
        position: newPosition
    }
}

// Text attachment
export function setAttachmentText(attachment: TextAttachment, newText: string): TextAttachment {
    return {
        ...attachment,
        text: newText
    };
}

// Image attachment
export function setAttachmentImage(attachment: ImageAttachment, content: string): ImageAttachment {
    return {
        ...attachment,
        image: content
    };
}
