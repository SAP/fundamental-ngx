import { ElementRef } from '@angular/core';
import { ReadonlyViewModifier } from './readonly-view-modifier.interface';
import { setReadonlyState } from './set-readonly-state';

export class DefaultReadonlyViewModifier implements ReadonlyViewModifier {
    constructor(private elementRef: ElementRef<Element>) {}

    setReadonlyState = (isDisabled: boolean): void => {
        setReadonlyState(this.elementRef, isDisabled);
    };
}
