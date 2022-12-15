import {Presentation} from "src/models/presentation/Presentation"

export class PresentationServis {
    private _presentation: Presentation = this.createPresentation();

    public createPresentation(): Presentation {
        let result = new Presentation("DefaultName", []);
        return result;
    };

    public savePresentation(presentation: Presentation): void {
        let file = JSON.stringify(presentation);

        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(file));
        element.setAttribute('download', `${presentation.name}.asticots`);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    public openPresentation(): void {
        let input: HTMLInputElement = document.createElement('input');
        input.type = 'file';
        input.accept = '.asticots';
        input.onchange = _ => this.loadFile(input);
        input.click();
    };

    public exportPresentation(): void {
       console.log("\_*_/");
    };

    public setPresentationName(presentation: Presentation, newName: string): Presentation {
        let newPresentation = { ...presentation};
        newPresentation.name = newName;
        return newPresentation;
    };

    private loadFile(input: HTMLInputElement): void {
        // you can use this method to get file and perform respective operations
        let files: FileList | null = input.files;
        if (files = null) {
            return;
        }

        let file = input.files?.item(0) as File;

        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = () => {
            let replaser: string = reader.result as string;
            let newPresentation: Presentation = JSON.parse(replaser);
            this._presentation = newPresentation;
        };
    };

    
}