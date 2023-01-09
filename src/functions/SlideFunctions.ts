import { Slide } from 'src/models/presentation/Slide';

export function createSlide(id: number, orderPosition: number): Slide {
    return new Slide(id, [], orderPosition);
}

export function copySlide(id: number, slide: Slide): Slide {
    return new Slide(
        id,
        [...slide.attachments],
        slide.orderPosition,
        slide.backgroundColor
    );
}

export function deleteAttachment(slide: Slide, attachmentId: number): Slide {
    let newSlide: Slide = copySlide(slide.id, slide);
    newSlide.attachments = slide.attachments.filter(a => a.id != attachmentId);

    return newSlide;
}

export function deleteAttachments(slide: Slide, attachments: number[]): Slide {
    let newSlide: Slide = copySlide(slide.id, slide);
    newSlide.attachments = slide.attachments.filter(a => attachments.every(excludeAttachmentId => excludeAttachmentId !== a.id));

    return newSlide;
}

export function selectSlide(slide: Slide): void {
}

export function setOrderPosition(slide: Slide, orderPosition: number): Slide {
    let newSlide = copySlide(slide.id, slide);
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