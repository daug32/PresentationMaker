import { Component } from '@angular/core';
import { Vector2 } from 'src/models/other/Vector2';
import { Attachment } from 'src/models/presentation/Attachment';
import { Presentation } from 'src/models/presentation/Presentation';
import { Slide } from 'src/models/presentation/Slide';
import { SelectedItem } from 'src/models/other/SelectedItem';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public presentation: Presentation;
    public currentSlide: Slide;
    public selectedItems: SelectedItem[] = [];

    constructor() {
        this.presentation = this.testPresentation();
        this.currentSlide = this.presentation.slides[0] ?? new Slide(0, [], 0);
    }

    public onSlideChange(slide: Slide): void {
        this.currentSlide = slide;
        console.log(slide);
    }

    public onPresentationLoad(presentation: Presentation): void {
        this.presentation = presentation;
    }

    public onContextMenu(slideId: number): void {
        let index: number = this.selectedItems.findIndex(a => a.slideId == slideId);

        if (index != -1) {
            // снять пометку с миниатюры слайда
            this.selectedItems.splice(index, 1);
        } else {
            // добавить пометку миниатюры слайда
            this.selectedItems.push(
                new SelectedItem(slideId, [])
            );
        }
    }

    

    private testPresentation(): Presentation {
        let slides: Slide[] = [];
        for (let i = 0; i < 2; i++) {
            let slide = new Slide(i, this.testAttachments(), 1);
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
