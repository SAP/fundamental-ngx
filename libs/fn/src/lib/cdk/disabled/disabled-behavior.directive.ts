import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { DestroyedBehavior } from '../common-behaviors/destroyed-behavior';
import { DisabledBehavior } from './disabled-behavior.interface';
import { setDisabledState } from './set-disabled-state';
import { DisabledObserver } from './disabled.observer';
import { fnDisabled } from './fn-disabled.token';

@Directive({
    selector: '[fnDisabled]',
    providers: [
        {
            provide: fnDisabled,
            useExisting: DisabledBehaviorDirective
        },
        DestroyedBehavior
    ]
})
export class DisabledBehaviorDirective extends ReplaySubject<boolean> implements OnDestroy, DisabledBehavior {
    @Input()
    set fnDisabled(value: BooleanInput) {
        setDisabledState(this._elementRef, coerceBooleanProperty(value));
    }

    get fnDisabled(): boolean {
        return this._disabled;
    }

    _disabled = false;

    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _disabledObserver: DisabledObserver,
        private _destroy$: DestroyedBehavior
    ) {
        super(1);
        this._disabledObserver
            .observe(this._elementRef)
            .pipe(
                tap((isDisabled) => {
                    if (isDisabled !== this._disabled) {
                        this._disabled = isDisabled;
                        this.next(isDisabled);
                    }
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
