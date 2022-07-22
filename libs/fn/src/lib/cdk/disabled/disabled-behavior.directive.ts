import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, filter, ReplaySubject } from 'rxjs';
import { DestroyedBehavior } from '../common-behaviors/destroyed-behavior';
import { DisabledBehavior } from './disabled-behavior.interface';
import { setDisabledState } from './set-disabled-state';
import { FN_DISABLED_DIRECTIVE } from './fn-disabled.token';
import { DisabledViewModifier } from './disabled-view-modifier.interface';
import { FnClickedProvider } from '../clicked';

@Directive({
    selector: '[fnDisabled]',
    providers: [
        {
            provide: FN_DISABLED_DIRECTIVE,
            useExisting: DisabledBehaviorDirective
        },
        DestroyedBehavior,
        FnClickedProvider
    ]
})
export class DisabledBehaviorDirective
    extends ReplaySubject<boolean>
    implements OnDestroy, AfterViewInit, DisabledBehavior, DisabledViewModifier
{
    @Input()
    set fnDisabled(value: BooleanInput) {
        const val = coerceBooleanProperty(value);
        this._clicked.setPreventDefault(val);
        this._fnDisableInput$.next(val);
    }

    get fnDisabled(): boolean {
        return this._disabled;
    }

    _disabled = false;
    _fnDisableInput$ = new BehaviorSubject(false);

    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _destroy$: DestroyedBehavior,
        private _clicked: FnClickedProvider
    ) {
        super(1);
    }

    setDisabledState = (isDisabled: boolean): void => {
        setDisabledState(this._elementRef, isDisabled);
    };

    ngAfterViewInit(): void {
        this._fnDisableInput$
            .pipe(
                filter((isDisabled) => isDisabled !== this._disabled),
                tap((isDisabled) => {
                    this.setDisabledState(isDisabled);
                    this._disabled = isDisabled;
                    this.next(isDisabled);
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
