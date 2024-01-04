import { signal } from '@angular/core';

export class TableService {
    /** @hidden */
    propagateKeys$ = signal<string[]>([]);

    /** @hidden */
    changeKeys(keys: string[]): void {
        if (keys && keys.length > 0) {
            this.propagateKeys$.set([...keys]);
        }
    }
}
