import { Attachment } from 'src/models/presentation/Attachment';
import { Slide } from 'src/models/presentation/Slide';

export function createSlide(id: number, orderPosition: number): Slide {
    return new Slide(id, [], orderPosition);
}

export function copySlide(slide: Slide): Slide {
    return new Slide(
        slide.id,
        [...slide.attachments],
        slide.orderPosition,
        slide.backgroundColor, 
        slide.image
    );
}

export function deleteAttachment(slide: Slide, attachmentId: number): Slide {
    let newSlide: Slide = copySlide(slide);
    newSlide.attachments = slide.attachments.filter(a => a.id != attachmentId);

    return newSlide;
}

export function deleteAttachments(slide: Slide, attachments: number[]): Slide {
    let newSlide: Slide = copySlide(slide);
    newSlide.attachments = slide.attachments.filter(a => attachments.every(excludeAttachmentId => excludeAttachmentId !== a.id));

    return newSlide;
}

export function setOrderPosition(slide: Slide, orderPosition: number): Slide {
    let newSlide = copySlide(slide);
    newSlide.orderPosition = orderPosition;
    return newSlide;
}

export function setSlideBackground(slide: Slide, color: string): Slide {
    let newSlide = new Slide(
        slide.id,
        [...slide.attachments],
        slide.orderPosition,
        color
    );

    return newSlide;
}

export function addSlideAttachment(slide: Slide, attachment: Attachment): Slide {
    let newSlide = copySlide(slide);
    newSlide.attachments.push(attachment);
    return newSlide;
}