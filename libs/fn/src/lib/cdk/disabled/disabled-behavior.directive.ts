import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { DestroyedBehavior } from '../common-behaviors/destroyed-behavior';
import { DisabledBehavior } from './disabled-behavior.interface';
import { setDisabledState } from './set-disabled-state';
import { DisabledObserver } from './disabled.observer';
import { FN_DISABLED_DIRECTIVE } from './fn-disabled.token';
import { DisabledViewModifier } from './disabled-view-modifier.interface';

@Directive({
    selector: '[fnDisabled]',
    providers: [
        {
            provide: FN_DISABLED_DIRECTIVE,
            useExisting: DisabledBehaviorDirective
        },
        DestroyedBehavior
    ]
})
export class DisabledBehaviorDirective
    extends ReplaySubject<boolean>
    implements OnDestroy, AfterViewInit, DisabledBehavior, DisabledViewModifier
{
    @Input()
    set fnDisabled(value: BooleanInput) {
        this._fnDisableInput$.next(coerceBooleanProperty(value));
    }

    get fnDisabled(): boolean {
        return this._disabled;
    }

    _disabled = false;
    _fnDisableInput$ = new BehaviorSubject(false);

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
                        this.setDisabledState(isDisabled);
                        this._disabled = isDisabled;
                        this.next(isDisabled);
                    }
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    setDisabledState = (isDisabled: boolean): void => {
        setDisabledState(this._elementRef, isDisabled);
    };

    ngAfterViewInit(): void {
        this._fnDisableInput$.pipe(tap(this.setDisabledState), takeUntil(this._destroy$)).subscribe();
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
