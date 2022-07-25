import { ElementRef } from '@angular/core';
import { DisabledViewModifier } from './disabled-view-modifier.interface';
import { setDisabledState } from './set-disabled-state';

export class DefaultDisabledViewModifier implements DisabledViewModifier {
    constructor(private elementRef: ElementRef<Element>) {}

    setDisabledState = (isDisabled: boolean): void => {
        setDisabledState(this.elementRef, isDisabled);
    };
}
