import { Observable, Subject } from 'rxjs';

export class AlertRef {
    
    private readonly _afterClosed: Subject<undefined> = new Subject<undefined>();
    public afterClosed: Observable<undefined> = this._afterClosed.asObservable();

    public data: any;
    
    dismiss(): void {
        this._afterClosed.next();
    }
}
