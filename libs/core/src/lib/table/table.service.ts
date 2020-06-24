import { BehaviorSubject } from 'rxjs';

export class TableService {
    propagateKeys$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);

    changeKeys(keys: string[]): void {
        if (keys && keys.length > 0) {
            this.propagateKeys$.next([...keys]);
        }
    }
}
