import { Presentation } from "src/models/presentation/Presentation"

export function createPresentation(): Presentation {
    return new Presentation("", []);
};

export function copyPresentation(presentation: Presentation): Presentation {
    return {
        ...presentation
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

export function removeSlide(presentation: Presentation, slideId: number): Presentation {
    return removeSlides(presentation, [slideId]);
}

export function removeSlides(presentation: Presentation, sildesIds: number[]): Presentation {
    let newPresentation = copyPresentation(presentation);
    newPresentation.slides = presentation.slides.filter(x => sildesIds.every(id => id != x.id));

    return newPresentation;
}
