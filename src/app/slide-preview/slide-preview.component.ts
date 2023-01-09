import { Component, Input } from '@angular/core';
import { Slide } from 'src/models/presentation/Slide';

@Component({
    selector: 'slide-preview',
    templateUrl: './slide-preview.component.html',
    styleUrls: ['./slide-preview.component.scss']
})
export class SlidePreviewComponent {
    @Input() slide!: Slide;

    constructor() {}
}
