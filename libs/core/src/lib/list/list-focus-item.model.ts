import { Directive, ElementRef, EventEmitter, HostListener } from '@angular/core';
import { KeyboardSupportItemInterface } from '@fundamental-ngx/core/utils';
import { Subject } from 'rxjs';

@Directive()
export abstract class ListFocusItem implements KeyboardSupportItemInterface {
    /** @hidden */
    readonly _focused$ = new Subject<void>();

    /** @hidden */
    readonly _clicked$ = new Subject<MouseEvent>();

    /** @hidden */
    protected _isFirstItem = false;

    /** @hidden Implementation of KeyboardSupportItemInterface */
    keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    @HostListener('focus')
    protected onFocus(): void {
        this._focused$.next();
    }

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
