import { Component, Input } from '@angular/core';

@Component({
    selector: 'presentation-toolbar',
    templateUrl: './presentation-toolbar.component.html',
    styleUrls: ['./presentation-toolbar.component.scss']
})
export class PresentationToolbarComponent {
    @Input() title!: string;

    constructor() { }
}
