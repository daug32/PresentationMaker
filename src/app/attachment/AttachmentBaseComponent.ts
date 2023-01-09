import { Attachment, ImageAttachment, PrimitiveAttachment, TextAttachment } from "src/models/presentation/Attachment";
import { AttachmentType } from "src/models/presentation/AttachmentType";

export class AttachmentBaseComponent {
	public attachment!: Attachment;

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
    public strokeWidth: number = 1;
	public get primitiveAttachment(): PrimitiveAttachment { return this.attachment as PrimitiveAttachment; }

	public parsePolygonPointsFromVertices(): string {
		let points: string = this.primitiveAttachment.vertices.reduce((result, el) => {
			let x = el.x * this.primitiveAttachment.size.x;
			let y = el.y * this.primitiveAttachment.size.y;
			return result + `${x},${y} `;
		}, '');

		return points;
	}

	public updateSettings(): void {
		let type: AttachmentType = this.attachment.attachmentType;

		this.isText = type == AttachmentType.Text;
		this.isImage = type == AttachmentType.Image;
		this.isPrimitive = !this.isText && !this.isImage;
	}
}