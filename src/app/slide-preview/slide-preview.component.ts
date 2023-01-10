import { Component, Input, OnInit } from '@angular/core';
import { Slide } from 'src/models/presentation/Slide';

@Component({
    selector: 'slide-preview',
    templateUrl: './slide-preview.component.html',
    styleUrls: ['./slide-preview.component.scss']
})
export class SlidePreviewComponent implements OnInit {
    @Input() slide!: Slide;
    @Input() isSelected: boolean = false;

    constructor() {}

    ngOnInit(): void {
    }
}
