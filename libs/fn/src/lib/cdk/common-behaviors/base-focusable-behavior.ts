import { first, merge, Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DisabledBehavior } from '../interfaces/DisabledBehavior';
import { ReadonlyBehavior } from '../interfaces/ReadonlyBehavior';

export class BaseFocusableBehavior {
    set focusable(isFocusable: boolean) {
        if (isFocusable !== this._focusable) {
            this._focusable = isFocusable;
            this.focusable$.next(isFocusable);
        }
    }

    get focusable(): boolean {
        return this._focusable;
    }

    tabIndex = 0;

    protected _focusable = true;
    protected focusable$ = new ReplaySubject<boolean>(1);

    constructor(
        destroy$: Observable<void>,
        protected disabled$?: DisabledBehavior,
        protected readonly$?: ReadonlyBehavior
    ) {
        const events$: Observable<boolean>[] = [this.focusable$];
        if (disabled$) {
            events$.push(disabled$);
        }
        if (readonly$) {
            events$.push(readonly$);
        }
        merge(...events$)
            .pipe(tap(() => this._updateTabIndex()))
            .subscribe();
        destroy$.pipe(first()).subscribe(() => this.focusable$.complete());
    }

    protected _updateTabIndex(): void {
        let tabIndex = 0;
        if (!this._focusable || this.disabled$?.fnDisabled || this.readonly$?.fnReadonly) {
            tabIndex = -1;
        }
        this.tabIndex = tabIndex;
    }
}
