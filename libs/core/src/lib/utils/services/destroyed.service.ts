import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class DestroyedService extends ReplaySubject<void> implements OnDestroy {
    /** @hidden */
    constructor() {
        super(1);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.next();
        this.complete();
    }
}
