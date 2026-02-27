import { DestroyRef, Directive, ElementRef, booleanAttribute, effect, input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FdkClickedProvider } from '../clicked';
import { DisabledBehavior } from './disabled-behavior.interface';
import { DisabledViewModifier } from './disabled-view-modifier.interface';
import { FDK_DISABLED_DIRECTIVE } from './fdk-disabled.token';
import { setDisabledState } from './set-disabled-state';

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
    implements DisabledBehavior, DisabledViewModifier
{
    /**
     * Whether the element is disabled.
     */
    readonly fdkDisabledInput = input(false, { alias: 'fdkDisabled', transform: booleanAttribute });

    /**
     * Whether to add `disabledClass` class to the element.
     */
    readonly addDisabledClass = input(true);

    /**
     * Disabled css class to apply to the element.
     */
    readonly disabledClass = input('is-disabled');

    /**
     * Getter for fdkDisabled to maintain interface compatibility.
     */
    get fdkDisabled(): boolean {
        return this.fdkDisabledInput();
    }

    /** @hidden */
    private _previousDisabledState = false;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _destroyRef: DestroyRef,
        private _clicked: FdkClickedProvider
    ) {
        super(1);
        this._destroyRef.onDestroy(() => this.complete());

        // React to disabled state changes
        effect(() => {
            const isDisabled = this.fdkDisabledInput();

            // Set prevent default on click provider
            this._clicked.setPreventDefault(isDisabled);

            // Only emit if the value actually changed
            if (isDisabled !== this._previousDisabledState) {
                this.setDisabledState(isDisabled);
                this._previousDisabledState = isDisabled;
                this.next(isDisabled);
            }
        });
    }

    /** @hidden */
    setDisabledState = (isDisabled: boolean): void => {
        setDisabledState(this._elementRef, isDisabled, this.disabledClass(), this.addDisabledClass());
    };
}
