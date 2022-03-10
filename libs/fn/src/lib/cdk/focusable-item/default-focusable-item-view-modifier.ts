import { ElementRef } from '@angular/core';
import { FocusableItemViewModifier } from './focusable-item-view-modifier.interface';
import { setFocusable } from './set-focusable';

export class DefaultFocusableItemViewModifier implements FocusableItemViewModifier {
    constructor(private elementRef: ElementRef<Element>) {}

    setFocusable(isFocusable: boolean): void {
        setFocusable(this.elementRef, isFocusable);
    }
}
