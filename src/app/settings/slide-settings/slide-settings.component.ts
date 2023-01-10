import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Vector2 } from 'src/models/other/Vector2';
import { Slide } from 'src/models/presentation/Slide';

abstract class SlideSettingsComponentController {
    public static isShown: boolean = false;
    static settings?: ElementRef;

    public static open(instance: ElementRef, position: Vector2): void {
        if (this.isShown) {
            this.close();
        }

        this.isShown = true;
        this.settings = instance;
        this.showChild(this.settings.nativeElement);
        this.updatePosition(this.settings.nativeElement, position);
    }

    public static close(): void {
        this.isShown = false;
        if (this.settings) {
            this.hideChild(this.settings.nativeElement);
        }
    }

    private static hideChild(element: HTMLElement): void {
        element.style.visibility = 'hidden';
    }

    private static showChild(element: HTMLElement): void {
        element.style.visibility = 'visible';
    }

    private static updatePosition(element: HTMLElement, position: Vector2): void {
        element.style.left = `${position.x}px`;
        element.style.top = `${position.y}px`;
    }
}

@Component({
    selector: 'slide-settings',
    templateUrl: './slide-settings.component.html',
    styleUrls: ['./slide-settings.component.scss']
})
export class SlideSettingsComponent extends SlideSettingsComponentController implements OnInit {
    @Input() public slide!: Slide;

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

    public onFileLoad(): void {
        let input: HTMLInputElement = document.createElement('input');
        input.type = 'file';
        input.accept = '.png, .jpeg, .jpg, .gif';

        input.onchange = _ => {
            let file = input.files?.item(0) as File;
            if (file == null) {
                return;
            }

            let reader = new FileReader();
            reader.onloadend = () => {
                this.slide.image = reader.result as string;
                console.log(this.slide);
            }
            reader.readAsDataURL(file);
        };

        input.click();
    }
}
