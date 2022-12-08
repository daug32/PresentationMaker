import { Attachment } from "../presentation/Attachment";
import { Slide } from "../presentation/Slide";

export class SelectedItem {
    constructor(
        public slide: Slide,
        public attachments: Attachment[]
    ) {}
}