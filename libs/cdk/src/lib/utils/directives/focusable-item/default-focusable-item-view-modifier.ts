import { ElementRef } from '@angular/core';
import { FocusableItemViewModifier } from './focusable-item-view-modifier.interface';
import { setFocusable } from './set-focusable';

export class DefaultFocusableItemViewModifier implements FocusableItemViewModifier {
    /** @hidden */
    constructor(private elementRef: ElementRef<Element>) {}

    /**
     * Sets tabindex attribute value depending on whether element is focusable.
     */
    setFocusable(isFocusable: boolean): void {
        setFocusable(this.elementRef, isFocusable);
    }
}
