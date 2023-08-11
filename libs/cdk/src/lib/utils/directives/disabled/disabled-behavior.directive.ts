import { AfterViewInit, DestroyRef, Directive, ElementRef, Input } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, filter, ReplaySubject } from 'rxjs';
import { DisabledBehavior } from './disabled-behavior.interface';
import { setDisabledState } from './set-disabled-state';
import { FDK_DISABLED_DIRECTIVE } from './fdk-disabled.token';
import { DisabledViewModifier } from './disabled-view-modifier.interface';
import { FdkClickedProvider } from '../clicked';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
    selector: '[fdkDisabled]',
    standalone: true,
    providers: [
        {
            provide: FDK_DISABLED_DIRECTIVE,
            useExisting: DisabledBehaviorDirective
        },
        FdkClickedProvider
    ]
})
export class DisabledBehaviorDirective
    extends ReplaySubject<boolean>
    implements AfterViewInit, DisabledBehavior, DisabledViewModifier
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

    /**
     * Whether to add `disabledClass` class to the element.
     */
    @Input()
    addDisabledClass = true;

    /**
     * Disabled css class to apply to the element.
     */
    @Input()
    disabledClass = 'is-disabled';

    /** @hidden */
    private _disabled = false;
    /** @hidden */
    private readonly _fdkDisableInput$ = new BehaviorSubject(false);

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _destroyRef: DestroyRef,
        private _clicked: FdkClickedProvider
    ) {
        super(1);
        this._destroyRef.onDestroy(() => this.complete());
    }

    /** @hidden */
    setDisabledState = (isDisabled: boolean): void => {
        setDisabledState(this._elementRef, isDisabled, this.disabledClass, this.addDisabledClass);
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
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }
}
