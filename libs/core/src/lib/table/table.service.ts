import { BehaviorSubject } from 'rxjs';

export class TableService {
    /** @hidden */
    propagateKeys$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    /** @hidden */
    changeKeys(keys: string[]): void {
        if (keys && keys.length > 0) {
            this.propagateKeys$.next([...keys]);
        }
    }
}
