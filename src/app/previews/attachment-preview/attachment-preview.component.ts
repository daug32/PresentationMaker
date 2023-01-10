import { Component, Input, OnInit } from '@angular/core';
import { Attachment } from 'src/models/presentation/Attachment';
import { Vector2 } from 'src/models/other/Vector2';
import { AttachmentBaseComponent } from 'src/app/attachment/AttachmentBaseComponent';

@Component({
	selector: 'attachment-preview',
	templateUrl: './attachment-preview.component.html',
	styleUrls: ['./attachment-preview.component.scss']
})
export class AttachmentPreviewComponent extends AttachmentBaseComponent implements OnInit {
	@Input() public override attachment!: Attachment;
	@Input() public isSelected!: boolean;

	constructor() {
		super();
	}

	ngOnInit(): void {
		this.updateSettings();
	}

	public get position(): Vector2 { 
		return this.attachment.position;
	}
}
