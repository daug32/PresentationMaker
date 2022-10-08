import { Component } from '@angular/core';
import { Presentation } from 'src/models/presentation/Presentation';
import { Slide } from 'src/models/presentation/Slide';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public presentation: Presentation;
    public currentSlide: Slide;

    constructor() {
        this.presentation = this.testPresentation();
        this.currentSlide = this.presentation.slides[0] ?? new Slide(0, []);
    }

    public onSlideChange(slide: Slide): void {
        this.currentSlide = slide;
        console.log(slide);
    }

    private testPresentation(): Presentation {
        let slides: Slide[] = [];
        for (let i = 0; i < 2; i++) {
            let slide = new Slide(i, []);
            slides.push(slide);
        }

        return new Presentation("Presentation", slides);
    }
}
