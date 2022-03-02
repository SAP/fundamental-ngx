import { Directive, ElementRef, HostBinding, Inject, Input } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DisabledBehavior, FN_DISABLED, FnDisabledProvider } from '../disabled';
import { FN_READONLY, ReadonlyBehavior, FnReadonlyProvider } from '../readonly';
import { FN_FOCUSABLE } from './focusable.tokens';
import { BaseFocusableBehavior } from '../common-behaviors/base-focusable-behavior';
import { DestroyedBehavior } from '../common-behaviors/destroyed-behavior';
import { HasElementRef } from '../HasElementRef';

@Directive({
    selector: '[fnFocusableItem]',
    providers: [
        {
            provide: FN_FOCUSABLE,
            useExisting: FocusableItemDirective
        },
        DestroyedBehavior,
        FnDisabledProvider,
        FnReadonlyProvider
    ]
})
export class FocusableItemDirective extends ReplaySubject<boolean> implements HasElementRef {
    @Input()
    set fnFocusable(val: BooleanInput) {
        const isFocusable = coerceBooleanProperty(val);
        if (isFocusable !== this.baseFocusableInstance.focusable) {
            this.baseFocusableInstance.focusable = isFocusable;
            this.next(isFocusable);
        }
    }

    get fnFocusable(): boolean {
        return this.baseFocusableInstance.focusable;
    }

    @HostBinding('attr.tabindex')
    tabIndex = 0;

    private baseFocusableInstance: BaseFocusableBehavior;

    constructor(
        destroy$: DestroyedBehavior,
        @Inject(FN_DISABLED) disabled$: DisabledBehavior,
        @Inject(FN_READONLY) readonly$: ReadonlyBehavior,
        private _elementRef: ElementRef<HTMLElement>
    ) {
        super(1);
        this.baseFocusableInstance = new BaseFocusableBehavior(disabled$, readonly$);
        this.baseFocusableInstance.focusable$.pipe(takeUntil(destroy$)).subscribe((isFocusable) => {
            this.tabIndex = isFocusable ? 0 : -1;
        });
        destroy$.subscribe(() => this.complete());
    }

    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }
}
