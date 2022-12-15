import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Attachment, ImageAttachment, PrimitiveAttachment, TextAttachment } from 'src/models/presentation/Attachment';
import { AttachmentType } from 'src/models/presentation/AttachmentType';
import { ShapeDrawerService } from 'src/services/ShapeDrawerService';

@Component({
	selector: 'attachment',
	templateUrl: './attachment.component.html',
	styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit, AfterViewInit {
	@Input() attachment!: Attachment;
	@Output() onInput = new EventEmitter<any>();

	@ViewChild('canvas') canvas: ElementRef | null = null;

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

	public isText: boolean = false;
	public isImage: boolean = false; 
	public isPrimitive: boolean = false;

	public get text(): string {
		if (!this.isText) {
			return "";
		}

		let textAttachment = this.attachment as TextAttachment;
		return textAttachment.text;
	}

	public set text(value: string) {
		if (!this.isText) {
			return;
		}

		this.onInput.emit(value);
	}

	public get imageContent(): string | null {
		if (!this.isImage) {
			return "";
		}

		let imageAttachment = this.attachment as ImageAttachment;
		return imageAttachment.image;
	}

	ngOnInit(): void {
		let type: AttachmentType = this.attachment.attachmentType;

		this.isText = type == AttachmentType.Text;
		this.isImage = type == AttachmentType.Image;
		this.isPrimitive = type == AttachmentType.Shape ||
			type == AttachmentType.Circle || 
			type == AttachmentType.Triangle ||
			type == AttachmentType.Rectangle;

		this.updateSettings();
	}

	ngAfterViewInit(): void {
		if (this.isPrimitive) {
			let drawer = new ShapeDrawerService(this.canvas!.nativeElement);
			drawer.draw(this.attachment as PrimitiveAttachment);
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
