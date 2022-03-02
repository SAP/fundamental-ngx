import { merge, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DisabledBehavior } from '../disabled/disabled-behavior.interface';
import { ReadonlyBehavior } from '../readonly/readonly-behavior.interface';

export class BaseFocusableBehavior {
    set focusable(isFocusable: boolean) {
        if (isFocusable !== this._focusable) {
            this._focusable = isFocusable;
            this._focusable$.next(isFocusable);
        }
    }

    get focusable(): boolean {
        return this._focusable && !this.disabled$?.fnDisabled && !this.readonly$?.fnReadonly;
    }

    focusable$: Observable<boolean>;

    private _focusable$ = new Subject<boolean>();
    protected _focusable = true;

    constructor(protected disabled$?: DisabledBehavior, protected readonly$?: ReadonlyBehavior) {
        const events$: Observable<boolean>[] = [this._focusable$];
        if (disabled$) {
            events$.push(disabled$);
        }
        if (readonly$) {
            events$.push(readonly$);
        }
        this.focusable$ = merge(...events$).pipe(map(() => this.focusable));
    }
}
