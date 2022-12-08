import { Slide } from 'src/models/presentation/Slide';
import { Vector2 } from './models/other/Vector2';
import { Attachment } from './models/presentation/Attachment';

export interface ISlideFunctions {
    createSlide(attachments: Attachment[], position: number): Slide;
    removeSlide(slide: Slide): Slide;
    removeSlides(sildes: Slide[]): Slide[];
    setBackground(slide: Slide, color: string): Slide;
    
    // перенести в presentationService
    selectSlides(slides: Slide[]): Slide;
    moveTo(order: number): Slide;
}

class SlideFunctions implements ISlideFunctions {
    private _slides: Slide[] = [];

    public createSlide(attachments: Attachment[], position: number): Slide {
        let slide = new Slide(
            this.createId(),
            attachments, 
            position
        );
        this._slides.push(slide);
        
        return slide;
    }

    public removeSlide(slide: Slide): Slide {
        let index: number = this._slides.findIndex(a => a.id == slide.id);
        let result: Slide = this._slides[index];

        if (index != -1) {
            let currSlide: Slide = this._slides[index].getCopy();
            this._slides.splice(index, 1);
            return currSlide;
        }

        return slide.getCopy();
    }

    public setBackground(slide: Slide, color: string): Slide {
        let index: number = this._slides.findIndex(a => a.id == slide.id);
        if (index != -1) {
            this._slides[index].setBackground(color);
            return this._slides[index].getCopy();
        }
        
        return slide.getCopy();
    }
    
    private createId(): number {
        return ++this._slides.length; 
    } 
}