import { Component } from '@angular/core';
import { Vector2 } from 'src/models/other/Vector2';
import { Attachment } from 'src/models/presentation/Attachment';
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

    public onPresentationLoad(presentation: Presentation): void {
        this.presentation = presentation;
    }

    private testPresentation(): Presentation {
        let slides: Slide[] = [];
        for (let i = 0; i < 2; i++) {
            let slide = new Slide(i, this.testAttachments());
            slides.push(slide);
        }

        return new Presentation("Presentation", slides);
    }

    private testAttachments(): Attachment[] {
        let image = Attachment.Image('assets/images/test.jpg');
        let text = Attachment.Text('Test attachment text');
        let shape = Attachment.Shape([ 
            new Vector2(0, 0), 
            new Vector2(0, 0.4),
            new Vector2(0.4, 0.4),
            new Vector2(0.4, 0)
        ]);

        let height: number = 100;

        return [image, text, shape].map((el, index) => {
            el.scale = new Vector2(100, height);
            el.position = new Vector2(0, height * index);
            return el;
        });
    }
}
