import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, filter, ReplaySubject } from 'rxjs';
import { DisabledBehavior } from './disabled-behavior.interface';
import { setDisabledState } from './set-disabled-state';
import { FDK_DISABLED_DIRECTIVE } from './fdk-disabled.token';
import { DisabledViewModifier } from './disabled-view-modifier.interface';
import { FdkClickedProvider } from '../clicked';
import { DestroyedService } from '../../services/destroyed.service';

@Directive({
    selector: '[fdkDisabled]',
    providers: [
        {
            provide: FDK_DISABLED_DIRECTIVE,
            useExisting: DisabledBehaviorDirective
        },
        DestroyedService,
        FdkClickedProvider
    ]
})
export class DisabledBehaviorDirective
    extends ReplaySubject<boolean>
    implements OnDestroy, AfterViewInit, DisabledBehavior, DisabledViewModifier
{
    /** @hidden */
    @Input()
    set fdkDisabled(value: BooleanInput) {
        const val = coerceBooleanProperty(value);
        this._clicked.setPreventDefault(val);
        this._fdkDisableInput$.next(val);
    }

    get fdkDisabled(): boolean {
        return this._disabled;
    }

    /** @hidden */
    private _disabled = false;
    /** @hidden */
    private readonly _fdkDisableInput$ = new BehaviorSubject(false);

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _destroy$: DestroyedService,
        private _clicked: FdkClickedProvider
    ) {
        super(1);
    }

    /** @hidden */
    setDisabledState = (isDisabled: boolean): void => {
        setDisabledState(this._elementRef, isDisabled);
    };

    /** @hidden */
    ngAfterViewInit(): void {
        this._fdkDisableInput$
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
