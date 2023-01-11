import { ElementRef } from '@angular/core';
import { getNativeElement } from '../../helpers/get-native-element';
import { HasElementRef } from '../../interfaces/has-element-ref.interface';

/** @hidden */
export function setDisabledState(
    element: HasElementRef<Element> | Element | ElementRef<Element>,
    isDisabled: boolean
): void {
    const htmlElement = getNativeElement(element);
    if (isDisabled) {
        htmlElement.classList.add('is-disabled');
        htmlElement.setAttribute('disabled', '');
        htmlElement.setAttribute('aria-disabled', 'true');
    } else {
        htmlElement.classList.remove('is-disabled');
        htmlElement.removeAttribute('disabled');
        htmlElement.removeAttribute('aria-disabled');
    }
}
