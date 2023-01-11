import { ElementRef } from '@angular/core';
import { getNativeElement } from '../../helpers/get-native-element';
import { HasElementRef } from '../../interfaces/has-element-ref.interface';

/** @Hidden */
export function setReadonlyState(
    element: HasElementRef<Element> | Element | ElementRef<Element>,
    isReadonly: boolean
): void {
    const htmlElement = getNativeElement(element);
    if (isReadonly) {
        htmlElement.classList.add('is-readonly');
        htmlElement.setAttribute('readonly', '');
    } else {
        htmlElement.classList.remove('is-readonly');
        htmlElement.removeAttribute('readonly');
    }
}
