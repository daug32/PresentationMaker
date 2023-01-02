import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Attachment, ImageAttachment, PrimitiveAttachment, TextAttachment } from 'src/models/presentation/Attachment';
import { AttachmentType } from 'src/models/presentation/AttachmentType';
import { SettingsComponent } from './settings/settings.component';
import { Vector2 } from 'src/models/other/Vector2';

@Component({
	selector: 'attachment',
	templateUrl: './attachment.component.html',
	styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {
	@Input() attachment!: Attachment;
	@Output() onInput = new EventEmitter<any>();

	@Output() focus = new EventEmitter<number>();

	@ViewChild('canvas') canvas: ElementRef | null = null;

	private isContextMenuVisisble: boolean = false;
	@ViewChild('contextMenu') contextMenu!: ElementRef;

	@ViewChild('container') container!: CdkDrag;

	private _hasOpenedSettings: boolean = false;
	@ViewChild('attachmentSettings', { read: ElementRef }) attachmentSettings!: ElementRef;

	constructor() {}

	ngOnInit(): void {
		let type: AttachmentType = this.attachment.attachmentType;

		this.isText = type == AttachmentType.Text;
		this.isImage = type == AttachmentType.Image;
		this.isPrimitive = !this.isText && !this.isImage;
	}

	// Text
	public isText: boolean = false;
	public get textAttachment(): TextAttachment { return this.attachment as TextAttachment; }

	public get isBold(): boolean { return this.textAttachment.fontStyle.some(style => style == 'bold'); }
	public get isItalic(): boolean { return this.textAttachment.fontStyle.some(style => style == 'italic'); }
	public get isStriked(): boolean { return this.textAttachment.fontStyle.some(style => style == 'striked'); }

	// Image
	public isImage: boolean = false;
	public get imageAttachment(): ImageAttachment { return this.attachment as ImageAttachment; }

	// Primitives
	public isPrimitive: boolean = false;
	public get primitiveAttachment(): PrimitiveAttachment { return this.attachment as PrimitiveAttachment; }

	public parsePolygonPointsFromVertices(): string {
		let points: string = this.primitiveAttachment.vertices.reduce((result, el) => {
			let x = el.x * this.primitiveAttachment.size.x;
			let y = el.y * this.primitiveAttachment.size.y;
			return result + `${x},${y} `;
		}, '');

		return points;
	}

	// Methods
	public onDragDropped(data: CdkDragEnd): void {
		this.attachment.position.x += data.distance.x;
		this.attachment.position.y += data.distance.y;
	}

	public onRightClick(event: MouseEvent): void {
		event.preventDefault();

		if (SettingsComponent.isShown) {
			SettingsComponent.close();
		}

		if (!this._hasOpenedSettings) {
			SettingsComponent.open(this.attachmentSettings);
		}

		this._hasOpenedSettings = !this._hasOpenedSettings;
	}

	public onLeftClick(event: any): void {
		event.preventDefault();
		console.log(this.attachment.id);

		this.focus.emit(this.attachment.id);
	}

}
