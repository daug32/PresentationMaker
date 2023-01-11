import { BehaviorSubject, Observable } from 'rxjs';

export class DataService<T> {
    private _dataObject: BehaviorSubject<T>;
    public readonly observable: Observable<T>;

    constructor(initial: T) {
        this._dataObject = new BehaviorSubject(initial);
        this.observable = this._dataObject.asObservable();
    }

    public get value(): T { 
        return this._dataObject.value;
    }

    public set value(newValue: T) {
        this._dataObject.next(newValue);
    }
}