import { BehaviorSubject } from 'rxjs';

export class TableService {
    /** @ignore */
    propagateKeys$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    /** @ignore */
    changeKeys(keys: string[]): void {
        if (keys && keys.length > 0) {
            this.propagateKeys$.next([...keys]);
        }
    }
}
