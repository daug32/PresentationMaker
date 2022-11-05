import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Attachment } from 'src/models/presentation/Attachment';
import { AttachmentType } from 'src/models/presentation/AttachmentType';
import { ShapeDrawerService } from 'src/services/ShapeDrawerService';

@Component({
	selector: 'attachment',
	templateUrl: './attachment.component.html',
	styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit, AfterViewInit {
	@Input() attachment!: Attachment;
	@ViewChild('canvas') canvas!: ElementRef;

	private isContextMenuVisisble: boolean = false;
	@ViewChild('contextMenu') contextMenu!: ElementRef;

	@ViewChild('container') container!: CdkDrag;

	public settingsGroup = new FormGroup({
		colorControl: new FormControl(),
		fillControl: new FormControl(),
		fontFamily: new FormControl(),
		fontSize: new FormControl(),
	});

	constructor() { }

	public get isText() { return this.attachment.attachmentType == AttachmentType.Text; }
	public get isShape() { return this.attachment.attachmentType == AttachmentType.Shape; }
	public get isImage() { return this.attachment.attachmentType == AttachmentType.Image; }

	ngOnInit(): void {
		this.updateSettings();
	}

	ngAfterViewInit(): void {
		if (this.isShape) {
			let drawer = new ShapeDrawerService(this.canvas.nativeElement);
			drawer.draw(this.attachment);
		}
	}

	public onDragDropped(data: CdkDragEnd): void {
		this.attachment.position.x += data.distance.x;
		this.attachment.position.y += data.distance.y;
		this.updateSettings();
	}

	public onRightClick(event: MouseEvent): void {
		event.preventDefault();

		this.isContextMenuVisisble = !this.isContextMenuVisisble;
		this.contextMenu.nativeElement.style.visibility = this.isContextMenuVisisble ? 'visible' : 'hidden';
		this.contextMenu.nativeElement.style.left = `${event.clientX}`;
		this.contextMenu.nativeElement.style.top = `${event.clientY}`;
	}

	public onSubmitSettings(): void {
		this.attachment.position.x = this.settingsGroup.get('positionXControl')!.value;
		this.attachment.position.y = this.settingsGroup.get('positionYControl')!.value;

		this.container.setFreeDragPosition(this.attachment.position);
	}

	private updateSettings(): void {
		this.settingsGroup.setValue({
			colorControl: '#000',
			fillControl: '#000',
			fontFamily: 'Roboto',
			fontSize: 14,
		});
	}
}
