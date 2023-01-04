import { ElementRef } from '@angular/core';
import { getNativeElement } from '../../helpers/get-native-element';
import { HasElementRef } from '../../interfaces/has-element-ref.interface';

/** @Hidden */
export function setFocusable(
    element: HasElementRef<Element> | Element | ElementRef<Element>,
    isFocusable: boolean
): void {
    const htmlElement = getNativeElement(element);
    if (isFocusable) {
        htmlElement.setAttribute('tabindex', '0');
    } else {
        htmlElement.setAttribute('tabindex', '-1');
    }
}
