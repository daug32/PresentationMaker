export class Utils {
    public static isDeleteButton(event: KeyboardEvent): boolean {
        return event.keyCode == 46;
    }

    public static hasUndoCombination(event: KeyboardEvent): boolean {
        return event.keyCode == 90 && event.ctrlKey;
    }

    public static hasRedoCombination(event: KeyboardEvent): boolean {
        return event.keyCode == 89 && event.ctrlKey;
    }

    public static isClassClicked(event: Event, targetClass: string): boolean {
        let path: EventTarget[] = event.composedPath();
        return path.some(target => {
            let element = target as HTMLElement;
            element.classList?.contains(targetClass);
        });
    }
}