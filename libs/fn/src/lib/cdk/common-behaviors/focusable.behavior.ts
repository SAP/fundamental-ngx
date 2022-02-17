import { Directive, HostBinding, Input, OnDestroy } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { merge, Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DisabledBehavior } from '../interfaces/DisabledBehavior';
import { ReadonlyBehavior } from '../interfaces/ReadonlyBehavior';

@Directive()
export class FocusableBehavior extends ReplaySubject<boolean> implements OnDestroy {
    @Input()
    set fnFocusable(val: BooleanInput) {
        const isFocusable = coerceBooleanProperty(val);
        if (isFocusable !== this._focusable) {
            this._focusable = isFocusable;
            this.next(isFocusable);
            this.focusable$.next(isFocusable);
        }
    }

    get fnFocusable(): boolean {
        return this._focusable;
    }

    @HostBinding('attr.tabindex')
    tabIndex = 0;

    protected _focusable = true;
    protected focusable$ = new ReplaySubject<boolean>(1);

    constructor(protected disabled$?: DisabledBehavior, protected readonly$?: ReadonlyBehavior) {
        super(1);
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
    }

    ngOnDestroy(): void {
        this.focusable$.complete();
    }

    protected _updateTabIndex(): void {
        let tabIndex = 0;
        if (!this._focusable || this.disabled$?.fnDisabled || this.readonly$?.fnReadonly) {
            tabIndex = -1;
        }
        this.tabIndex = tabIndex;
    }
}
