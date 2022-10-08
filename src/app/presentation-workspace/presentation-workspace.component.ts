import { Component, Input } from '@angular/core';
import { Slide } from 'src/models/presentation/Slide';

@Component({
    selector: 'presentation-workspace',
    templateUrl: './presentation-workspace.component.html',
    styleUrls: ['./presentation-workspace.component.scss']
})
export class PresentationWorkspaceComponent {
    @Input() slide!: Slide;
    constructor() { }
}
