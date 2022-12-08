import { Utils } from "../../services/Utils";
import { Vector2 } from "../other/Vector2";
import { Attachment } from "./Attachment";
import { AttachmentType } from "./AttachmentType";

export class PrimitiveAttachment extends Attachment {
    public readonly attachmentType: AttachmentType = AttachmentType.Shape;

    public borderColor: string = "#000";
    public backgroundColor: string = "#fff";

    constructor(
        id: number,
        public vertices: Vector2[],
        size: Vector2 = new Vector2(100, 100),
        position: Vector2 = new Vector2(0, 0)
    ) {
        super(id, size, position);
    }

    public static Triangle(id: number, position: Vector2 = new Vector2(0, 0)): PrimitiveAttachment {
        return new PrimitiveAttachment(id, Utils.getRegularPolygonVertices(3), position);
    }

    public static Rectangle(id: number, position: Vector2 = new Vector2(0, 0)): PrimitiveAttachment {
        return new PrimitiveAttachment(id, Utils.getRegularPolygonVertices(4), position);
    }

    public static Circle(id: number, position: Vector2 = new Vector2(0, 0)): PrimitiveAttachment {
        return new PrimitiveAttachment(id, Utils.getRegularPolygonVertices(32), position);
    }
}