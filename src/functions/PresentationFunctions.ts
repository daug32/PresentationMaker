import { Presentation } from "src/models/presentation/Presentation"
import { Slide } from "src/models/presentation/Slide";

export function createPresentation(): Presentation {
    return new Presentation("", []);
};

export function copyPresentation(presentation: Presentation): Presentation {
    return {
        ...presentation,
        slides: [...presentation.slides ]
    };
}

export function savePresentation(presentation: Presentation): void {
    let fileContent: string = JSON.stringify(presentation);

    let element: HTMLElement = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    element.setAttribute('download', `${presentation.name}.asticots`);
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

export function setPresentationName(presentation: Presentation, newName: string): Presentation {
    let newPresentation = copyPresentation(presentation);
    newPresentation.name = newName;
    return newPresentation;
}

export function addPresentationSlide(presentation: Presentation, slide: Slide): Presentation {
    let newPresentation = copyPresentation(presentation);
    newPresentation.slides.push(slide);
    return newPresentation;
}

export function removeSlide(presentation: Presentation, slideId: number): Presentation {
    let newPresentation = copyPresentation(presentation);
    newPresentation.slides = presentation.slides.filter(slide => slide.id != slideId);
    return newPresentation;
}

export function movePresentationSlidesUp(presentation: Presentation, slideIds: number[]): Presentation {
    let newPresentation = copyPresentation(presentation);

    for (let i = 0; i < newPresentation.slides.length; i++) {
        let slide = newPresentation.slides[i];
        if (!slideIds.some(slideId => slideId == slide.id)) {
            continue;
        }

        newPresentation = movePresentationSlideUp(newPresentation, slide.id)!;
    }

    return newPresentation;
}

export function movePresentationSlideUp(presentation: Presentation, slideId: number): Presentation | null {
    let newPresentation = copyPresentation(presentation);
    
    let index = newPresentation.slides.findIndex(slide => slide.id == slideId);
    if (index < 0) {
        return null;
    }

    if (index - 1 < 0) {
        return null;
    }

    let changed = newPresentation.slides[index - 1];
    newPresentation.slides[index - 1] = newPresentation.slides[index];
    newPresentation.slides[index] = changed;

    return newPresentation;
}

export function movePresentationSlidesDown(presentation: Presentation, slideIds: number[]): Presentation {
    let newPresentation = copyPresentation(presentation);

    for (let i = newPresentation.slides.length - 1; i > -1; i--) {
        let slide = newPresentation.slides[i];
        if (!slideIds.some(slideId => slideId == slide.id)) {
            continue;
        }

        newPresentation = movePresentationSlideDown(presentation, slide.id)!;
    }

    return newPresentation;
}

export function movePresentationSlideDown(presentation: Presentation, slideId: number): Presentation | null {
    let newPresentation = copyPresentation(presentation);
    
    let index = newPresentation.slides.findIndex(slide => slide.id == slideId);
    if (index == -1) {
        return null;
    }

    if (index + 1 >= newPresentation.slides.length) {
        return null;
    }

    let changed = newPresentation.slides[index + 1];
    newPresentation.slides[index + 1] = newPresentation.slides[index];
    newPresentation.slides[index] = changed;

    return newPresentation;
}
