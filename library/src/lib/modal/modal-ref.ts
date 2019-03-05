import { Observable, Subject } from 'rxjs';

export class ModalRef {
    private readonly _afterClosed = new Subject<any>();
    public afterClosed: Observable<any> = this._afterClosed.asObservable();

    public data: any;

    close(result?: any): void {
        this._afterClosed.next(result);
    }

    dismiss(reason?: any): void {
        this._afterClosed.error(reason);
    }
}
