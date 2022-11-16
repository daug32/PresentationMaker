import { Vector2 } from "../other/Vector2";
import { Attachment } from "./Attachment";

export class Templates {
    public static get Text(): Attachment { return Attachment.Text('Text'); }

    public static get Image(): Attachment { return Attachment.Image('/assets/images/test.jpg'); }

    public static get Square(): Attachment { return Attachment.Shape(this.GenerateRegularPolygon(4)); }
    public static get Circle(): Attachment { return Attachment.Shape(this.GenerateRegularPolygon(32)); }
    public static get Triangle(): Attachment { return Attachment.Shape(this.GenerateRegularPolygon(3)); }

    private static GenerateRegularPolygon(verticesNumber: number): Vector2[] {
        let vertices: Vector2[] = [];

        for (let i = 0; i < verticesNumber; i++) {
            let radians: number = i * 2 * Math.PI / verticesNumber;

            let x: number = Math.cos(radians);
            let y: number = Math.sin(radians);

            vertices.push(new Vector2(x, y));
        }

        return vertices;
    }
}