import { ElementRef } from '@angular/core';
import { ReadonlyViewModifier } from './readonly-view-modifier.interface';
import { setReadonlyState } from './set-readonly-state';

export class DefaultReadonlyViewModifier implements ReadonlyViewModifier {
    /** @hidden */
    constructor(private elementRef: ElementRef<Element>) {}

    /** @hidden */
    setReadonlyState = (isDisabled: boolean): void => {
        setReadonlyState(this.elementRef, isDisabled);
    };
}
