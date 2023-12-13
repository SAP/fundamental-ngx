import { ElementRef } from '@angular/core';
import { DisabledViewModifier } from './disabled-view-modifier.interface';
import { setDisabledState } from './set-disabled-state';

export class DefaultDisabledViewModifier implements DisabledViewModifier {
    /** @ignore */
    constructor(private elementRef: ElementRef<Element>) {}

    /** @ignore */
    setDisabledState = (isDisabled: boolean): void => {
        setDisabledState(this.elementRef, isDisabled, 'is-disabled', true);
    };
}
