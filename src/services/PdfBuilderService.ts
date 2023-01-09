import *as jsPDF from 'jspdf';
import html2Canvas from "html2canvas"

export class PdfBuilderService {

    public pdfConvertor(slides: HTMLCollection, title: string): void {
        let pdf = new jsPDF.jsPDF('l', 'px', [800, 600]);

        this.convert(slides).then((canvases: HTMLCanvasElement[]) => this.buildPdf(canvases, pdf, title));
    }

    private buildPdf(canvases: HTMLCanvasElement[], pdf: jsPDF.jsPDF, title: string) {
        for (let i = 0; i < canvases.length; i++) {
            let canvas = canvases[i];
            const contentDataURL = canvas.toDataURL('image/png')
            let position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, 800, 600);
            if (i < canvases.length - 1) {
                pdf.addPage();
            }
        }
        pdf.save(title + '.pdf'); // Generated PDF 
    }

    private async convert(slides: HTMLCollection): Promise<HTMLCanvasElement[]> {
        let canvases: HTMLCanvasElement[] = [];

        for (let i = 0; i < slides.length; i++) {
            let slide: HTMLElement = slides.item(i) as HTMLElement;
            let transform = slide.style.transform;
            let border = slide.style.borderStyle;
            slide.style.transform = 'none';
            slide.style.borderStyle = 'hidden';
            let canvas = await html2Canvas(slide);
            slide.style.borderStyle = border;
            slide.style.transform = transform;
            canvases.push(canvas);
        }
        return canvases
    }
}