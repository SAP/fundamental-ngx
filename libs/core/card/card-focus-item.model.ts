import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { computed, Directive, ElementRef, inject, input, output, signal } from '@angular/core';
import { KeyboardSupportItemInterface } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';

@Directive({
    host: {
        '(focusin)': 'onFocus($event)'
    }
})
export abstract class CardFocusItem<T = any> implements KeyboardSupportItemInterface {
    /**
     * Tab index attribute
     */
    readonly tabindex = input<number | undefined, NumberInput>(undefined, {
        // Preserve the "unset" state (null/undefined) so the first item can default
        // to tabindex=0 only when no input was provided. If we coerced null/undefined
        // to -1, an explicit "unset" would be indistinguishable from a real -1 value,
        // which changes legacy behavior.
        transform: (value: NumberInput) => (value == null ? undefined : coerceNumberProperty(value, -1))
    });

    /**
     * Value of the list item.
     */
    readonly value = input<T>();

    /**
     * @hidden
     * Implementation of KeyboardSupportItemInterface
     */
    readonly keyDown = output<KeyboardEvent>();

    /** @hidden */
    readonly elementRef: ElementRef = inject(ElementRef);

    /** @hidden */
    readonly _focused$ = new Subject<{ focusedWithin: boolean }>();

    /** @hidden */
    readonly _clicked$ = new Subject<MouseEvent>();

    /** @hidden */
    protected _isFirstItem$ = signal(false);

    /** @hidden */
    protected _normalizedTabIndex$ = computed(() => {
        const tabIndexValue = this.tabindex();

        // If no explicit tabindex was set and this is the first item, default to 0.
        if (this._isFirstItem$() && tabIndexValue == null) {
            return 0;
        }

        return tabIndexValue ?? -1;
    });

    /**
     * Get the current tab index.
     * Returns the internal tab index which may have been modified programmatically.
     * This getter is a replacement for directly binding to the `tabindex` input, which may not reflect the actual tab index if it was left unset and defaulted to 0 for the first item.
     */
    getTabIndex(): number {
        return this._normalizedTabIndex$();
    }

    /** @hidden */
    click(): void {
        this.elementRef?.nativeElement?.click();
    }

    /** @hidden */
    focus(): void {
        this.elementRef?.nativeElement?.focus();
    }

    /** @hidden */
    setIsFirst(value: boolean): void {
        this._isFirstItem$.set(value);
    }

    /** @hidden */
    protected onFocus(event: FocusEvent): void {
        this._focused$.next({
            focusedWithin: event.target !== this.elementRef?.nativeElement
        });
    }
}
