import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'presentation-toolbar',
    templateUrl: './presentation-toolbar.component.html',
    styleUrls: ['./presentation-toolbar.component.scss']
})
export class PresentationToolbarComponent {
    @Input() title!: string;

    @Output() saveEvent = new EventEmitter<undefined>();
    @Output() fileOpenEvent = new EventEmitter<undefined>();

    @Output() undoEvent = new EventEmitter<undefined>();
    @Output() redoEvent = new EventEmitter<undefined>();

    @Output() textEvent = new EventEmitter<undefined>();
    @Output() ImageEvent = new EventEmitter<undefined>();
    @Output() squareEvent = new EventEmitter<undefined>();
    @Output() circleEvent = new EventEmitter<undefined>();
    @Output() triangleEvent = new EventEmitter<undefined>();
     
    constructor() { }
}