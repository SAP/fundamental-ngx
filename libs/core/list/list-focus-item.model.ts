import { coerceNumberProperty } from '@angular/cdk/coercion';
import { computed, Directive, ElementRef, HostListener, inject, Input, output, signal } from '@angular/core';
import { KeyboardSupportItemInterface } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';

@Directive()
export abstract class ListFocusItem<T = any> implements KeyboardSupportItemInterface {
    @Input()
    set tabindex(value: number) {
        this._tabIndex$.set(coerceNumberProperty(value, -1));
    }
    get tabindex(): number {
        return this._normalizedTabIndex$();
    }

    /**
     * Value of the list item.
     * Used for dropdown-based controls such as combobox, select, etc.
     */
    @Input()
    value: T;

    /** @hidden Implementation of KeyboardSupportItemInterface */
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
    protected _tabIndex$ = signal<number | undefined>(undefined);

    /** @hidden */
    protected _normalizedTabIndex$ = computed(() => {
        if (this._isFirstItem$() && isNaN(this._tabIndex$() as number)) {
            return 0;
        }
        return this._tabIndex$() ?? -1;
    });

    /** @hidden */
    @HostListener('focusin', ['$event'])
    protected onFocus(event: FocusEvent): void {
        this._focused$.next({
            focusedWithin: event.target !== this.elementRef?.nativeElement
        });
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
}
