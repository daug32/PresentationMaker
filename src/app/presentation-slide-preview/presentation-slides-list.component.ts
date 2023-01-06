import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Slide } from 'src/models/presentation/Slide';

@Component({
    selector: 'presentation-slide-preview',
    templateUrl: './presentation-slide-preview.component.html',
    styleUrls: ['./presentation-slide-preview.component.scss']
})
export class PresentationSlidePreview {
    @Input() slide!: Slide;
    @Output() onClick = new EventEmitter<Slide>();

    @Output() onRaise = new EventEmitter<number>();
    @Output() onDelete = new EventEmitter<number>();
    @Output() onDrop = new EventEmitter<number>();

    constructor() {}
}
