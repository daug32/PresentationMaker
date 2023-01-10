import { Slide } from "./Slide";

export class Presentation {
    constructor(
        public name: string, 
        public slides: Slide[],
    ) {}
}