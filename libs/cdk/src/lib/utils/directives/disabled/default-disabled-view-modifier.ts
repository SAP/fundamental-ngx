import { ElementRef } from '@angular/core';
import { DisabledViewModifier } from './disabled-view-modifier.interface';
import { setDisabledState } from './set-disabled-state';

export class DefaultDisabledViewModifier implements DisabledViewModifier {
    /** @hidden */
    constructor(private elementRef: ElementRef<Element>) {}

    /** @hidden */
    setDisabledState = (isDisabled: boolean): void => {
        setDisabledState(this.elementRef, isDisabled);
    };
}
