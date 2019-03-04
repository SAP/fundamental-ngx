import { Observable, Subject } from 'rxjs';

export class AlertRef {
    
    private readonly _afterDismissed: Subject<undefined> = new Subject<undefined>();
    public afterDismissed: Observable<undefined> = this._afterDismissed.asObservable();

    public data: any;
    
    dismiss(): void {
        this._afterDismissed.next();
    }
}
