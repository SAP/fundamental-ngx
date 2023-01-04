import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, filter, ReplaySubject } from 'rxjs';
import { DisabledBehavior } from './disabled-behavior.interface';
import { setDisabledState } from './set-disabled-state';
import { FN_DISABLED_DIRECTIVE } from './fn-disabled.token';
import { DisabledViewModifier } from './disabled-view-modifier.interface';
import { FnClickedProvider } from '../clicked';
import { DestroyedService } from '../../services/destroyed.service';

@Directive({
    selector: '[fdDisabled]',
    providers: [
        {
            provide: FN_DISABLED_DIRECTIVE,
            useExisting: DisabledBehaviorDirective
        },
        DestroyedService,
        FnClickedProvider
    ]
})
export class DisabledBehaviorDirective
    extends ReplaySubject<boolean>
    implements OnDestroy, AfterViewInit, DisabledBehavior, DisabledViewModifier
{
    /** @hidden */
    @Input()
    set fdDisabled(value: BooleanInput) {
        const val = coerceBooleanProperty(value);
        this._clicked.setPreventDefault(val);
        this._fnDisableInput$.next(val);
    }

    get fdDisabled(): boolean {
        return this._disabled;
    }

    /** @hidden */
    private _disabled = false;
    /** @hidden */
    private readonly _fnDisableInput$ = new BehaviorSubject(false);

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _destroy$: DestroyedService,
        private _clicked: FnClickedProvider
    ) {
        super(1);
    }

    /** @hidden */
    setDisabledState = (isDisabled: boolean): void => {
        setDisabledState(this._elementRef, isDisabled);
    };

    /** @hidden */
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

    /** @hidden */
    ngOnDestroy(): void {
        this.complete();
    }
}
