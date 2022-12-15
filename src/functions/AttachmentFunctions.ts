import { Vector2 } from "src/models/other/Vector2";
import { Attachment, ImageAttachment, PrimitiveAttachment, TextAttachment } from "src/models/presentation/Attachment";
import { AttachmentType } from "src/models/presentation/AttachmentType";
import { Slide } from "src/models/presentation/Slide";

export function createAttachment(id: number, attachmentType: AttachmentType): Attachment {
    switch (attachmentType) {
        case AttachmentType.Image:
            return new ImageAttachment(id);

        case AttachmentType.Text:
            return new TextAttachment(id);

        case AttachmentType.Shape:
            return new PrimitiveAttachment(id, []);

        case AttachmentType.Rectangle:
            return new PrimitiveAttachment(id, getRegularPolygonVertices(4));

        case AttachmentType.Triangle:
            return new PrimitiveAttachment(id, getRegularPolygonVertices(3));

        case AttachmentType.Circle:
            return new PrimitiveAttachment(id, getRegularPolygonVertices(32));
    }
}

// General attachment functions
export function deleteAttachment(slide: Slide, attachmentId: number): Slide {
    let copySlide: Slide = {
        // id: SlideService._currentId++,
        id: -1,
        attachments: slide.attachments.filter(a => a.id != attachmentId)
    };

    return copySlide;
}

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

// Other
function getRegularPolygonVertices(verticesNumber: number): Vector2[] {
    let vertices: Vector2[] = [];

    for (let i = 0; i < verticesNumber; i++) {
        let radians: number = i * 2 * Math.PI / verticesNumber;

        let x: number = Math.cos(radians);
        let y: number = Math.sin(radians);

        vertices.push(new Vector2(x, y));
    }

    return vertices;
}