import { Vector2 } from "src/models/other/Vector2";
import { PrimitiveAttachment } from "src/models/presentation/Attachment";

export class ShapeDrawerService {
    private _context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        if (!canvas) {
            throw new Error('Expected canvas element, null is given');
        }

        this._context = canvas.getContext('2d')!;
        this._context.scale(1, 1);
    }

    public draw(attachment: PrimitiveAttachment): void {
        let vertices = attachment.vertices.map(el => new Vector2(el.x * attachment.size.x, el.y * attachment.size.y));
        if (!vertices || vertices.length < 1) {
            return;
        }

        let start = vertices[0];

        this._context.beginPath();

        this._context.moveTo(start.x, start.y);
        for (const vector of vertices) {
            this._context.lineTo(vector.x, vector.y);
        }
        this._context.lineTo(start.x, start.y);

        this._context.stroke();
    }
}