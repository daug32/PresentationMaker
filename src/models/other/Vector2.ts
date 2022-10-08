export class Vector2 {
    private values: number[] = [0, 0];
    
    public get x(): number { 
        return this.values[0]; 
    }
    public set x(value: number) { 
        this.values[0] = value 
    };

    public get y(): number { 
        return this.values[1]; 
    }
    public set y(value: number) { 
        this.values[1] = value 
    };
}