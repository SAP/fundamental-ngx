import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/**
 * @deprecated Use Angular's built-in `DestroyRef` and `takeUntilDestroyed` instead.
 * Will be removed in next release
 */
@Injectable()
export class DestroyedService extends ReplaySubject<void> implements OnDestroy {
    /** @hidden */
    constructor() {
        super(1);
        console.warn(
            `DestroyedService is deprecated. Use Angular's built-in 'DestroyRef' and 'takeUntilDestroyed' instead.`
        );
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.next();
        this.complete();
    }
}
