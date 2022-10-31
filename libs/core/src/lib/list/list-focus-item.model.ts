import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input } from '@angular/core';
import { KeyboardSupportItemInterface } from '@fundamental-ngx/core/utils';
import { Subject } from 'rxjs';

@Directive()
export abstract class ListFocusItem implements KeyboardSupportItemInterface {
    /** tab index attribute */
    @Input()
    @HostBinding('attr.tabindex')
    set tabindex(value: number) {
        this._tabIndex = coerceNumberProperty(value, -1);
    }
    get tabindex(): number {
        if (this._isFirstItem && isNaN(this._tabIndex as number)) {
            return 0;
        }
        return this._tabIndex ?? -1;
    }

    /** @hidden */
    readonly _focused$ = new Subject<{ focusedWithin: boolean }>();

    /** @hidden */
    readonly _clicked$ = new Subject<MouseEvent>();

    /** @hidden */
    protected _isFirstItem = false;

    /** @hidden */
    protected _tabIndex: number | undefined;

    /** @hidden Implementation of KeyboardSupportItemInterface */
    keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    @HostListener('focusin', ['$event'])
    protected onFocus(event: FocusEvent): void {
        this._focused$.next({
            focusedWithin: event.target !== this.elementRef?.nativeElement
        });
    }

    /** @hidden */
    constructor(readonly elementRef: ElementRef) {}

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
        this._isFirstItem = value;
    }
}
