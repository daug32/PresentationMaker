import { Presentation } from "src/models/presentation/Presentation";

export class ReserveCopier {
    public static interval: number = 30;
    
    public static loadPresentation(): Presentation | null{
        let presentation: Presentation;
        
        let jsonContent: string | null = localStorage.getItem('presentationJSON');        
        if (!jsonContent) { 
            return null; 
        }
        
        try {
            presentation = JSON.parse(jsonContent);
            return presentation;
        } catch (e: unknown) {
            return null;
        }
    }

    public static reserveCopyPresentation(presentation: Presentation): void {
        let jsonContent: string = JSON.stringify(presentation);
        localStorage.setItem('presentationJSON', jsonContent);
    }
}