import { Slide } from 'src/models/presentation/Slide';
import { Presentation } from './models/presentation/Presentation';

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

export function removeSlides(presentation: Presentation, sildesIds: number[]): Presentation {
    let newPresentation = {
        ...presentation,
        slides: presentation.slides.filter(x => sildesIds.every(id => id != x.id))
    };

    return newPresentation;
}

export function removeSlide(presentation: Presentation, slideId: number): Presentation {
    return removeSlides(presentation, [slideId]);
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