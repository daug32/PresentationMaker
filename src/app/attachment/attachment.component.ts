import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Attachment } from 'src/models/presentation/Attachment';
import { SettingsComponent } from '../settings/attachment-settings/attachment-settings.component';
import { Vector2 } from 'src/models/other/Vector2';
import { AttachmentBaseComponent } from '../../models/other/AttachmentBaseComponent';

@Component({
	selector: 'attachment',
	templateUrl: './attachment.component.html',
	styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent extends AttachmentBaseComponent implements OnInit {
	@Input() public isSelected! : boolean;
	@Input() public override attachment!: Attachment;

	@ViewChild('container') container!: CdkDrag;
	@ViewChild('contextMenu') contextMenu!: ElementRef;

	private _hasOpenedSettings: boolean = false;
	@ViewChild('attachmentSettings', { read: ElementRef }) attachmentSettings!: ElementRef;

	constructor() {
		super();
	}

	ngOnInit(): void {
		this.updateSettings();
	}

	// General 
	public get position(): Vector2 { return this.attachment.position; }
	public set position(value: Vector2) { this.attachment.position = value; }

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

}
