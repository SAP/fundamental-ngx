import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
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
export class DisabledBehaviorDirective
    extends ReplaySubject<boolean>
    implements OnDestroy, AfterViewInit, DisabledBehavior
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
                        console.log({ isDisabled });
                        this._disabled = isDisabled;
                        this.next(isDisabled);
                    }
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    ngAfterViewInit(): void {
        this._fnDisableInput$
            .pipe(
                tap((isDisabled) => setDisabledState(this._elementRef, isDisabled)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
