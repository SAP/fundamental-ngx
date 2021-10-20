import { ElementRef, EventEmitter } from '@angular/core';
import { KeyboardSupportItemInterface } from '@fundamental-ngx/core/utils';

export class ListFocusItem implements KeyboardSupportItemInterface {
    /** @hidden Implementation of KeyboardSupportItemInterface */
    keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    constructor(readonly elementRef: ElementRef) {}

    /** @hidden */
    click(): void {
        this.elementRef?.nativeElement?.click();
    }

    /** @hidden */
    focus(): void {
        this.elementRef?.nativeElement?.focus();
    }
}
