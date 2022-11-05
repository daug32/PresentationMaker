import { Vector2 } from "src/models/other/Vector2";
import { Attachment } from "src/models/presentation/Attachment";

export class ShapeDrawerService {
    private _context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        if (!canvas) {
            throw new Error('Expected canvas element, null is given');
        }

        this._context = canvas.getContext('2d')!;
        this._context.scale(1, 1);
    }

    public draw(attachment: Attachment): void {
        let vertices = attachment.data as Vector2[];
        if (!vertices || vertices.length < 1) {
            return;
        }
        vertices = vertices.map(el => new Vector2(el.x * attachment.scale.x, el.y * attachment.scale.y));

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