import { Vector2 } from "../models/other/Vector2";

export class Utils {
    public static getRegularPolygonVertices(verticesNumber: number): Vector2[] {
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