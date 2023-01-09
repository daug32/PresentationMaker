import *as jsPDF from 'jspdf';
import html2Canvas from "html2canvas"

export class PdfBuilderService {
    private _width: number = 800;
    private _heigth: number = 600;

    public pdfConvertor(slides: HTMLCollection, title: string): void {
        this.convert(slides).then((canvases: HTMLCanvasElement[]) => this.buildPdf(canvases, title));
    }

    private buildPdf(canvases: HTMLCanvasElement[], title: string) {
        let pdf = new jsPDF.jsPDF('l', 'px', [this._width, this._heigth]);

        for (let i = 0; i < canvases.length; i++) {
            let canvas = canvases[i];

            let image: string = canvas.toDataURL('image/png');
            pdf.addImage(image, 'PNG', 0, 0, this._width, this._heigth);

            if (i < canvases.length - 1) {
                pdf.addPage();
            }
        }

        pdf.save(`${title}.pdf`);
    }

    private async convert(slides: HTMLCollection): Promise<HTMLCanvasElement[]> {
        let canvases: HTMLCanvasElement[] = [];

        for (let i = 0; i < slides.length; i++) {
            let slide: HTMLElement = slides.item(i) as HTMLElement;

            let transform = slide.style.transform;
            slide.style.transform = 'none';
            let border = slide.style.borderStyle;
            slide.style.borderStyle = 'hidden';

            let canvas = await html2Canvas(slide);

            slide.style.borderStyle = border;
            slide.style.transform = transform;

            canvases.push(canvas);
        }

        return canvases;
    }
}