import { Presentation } from "src/models/presentation/Presentation"

export function createPresentation(): Presentation {
    return new Presentation("", []);
};

export function copyPresentation(presentation: Presentation): Presentation {
    return {
        ...presentation
    };
}

export function setPresentationName(presentation: Presentation, newName: string): Presentation {
    let newPresentation = copyPresentation(presentation);
    newPresentation.name = newName;
    return newPresentation;
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

export function openPresentation(): void {
    let input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.accept = '.asticots';
    input.onchange = _ => loadFile(input, (presentation: Presentation) => console.log(presentation));

    input.click();

    document.body.removeChild(input);
};

export function exportPresentation(): void {
};

function loadFile(input: HTMLInputElement, onLoad: (presentation: Presentation) => void): void {
    let files: FileList | null = input?.files;
    if (files = null) {
        return;
    }

    let file: File | null | undefined = input.files?.item(0);
    if (file == null) {
        return;
    }

    let reader = new FileReader();

    reader.onload = () => {
        let result: string = reader.result as string;
        console.log(result);

        let loadedPresentation: Presentation = JSON.parse(result);

        onLoad(loadedPresentation);
    };

    reader.readAsText(file);
}