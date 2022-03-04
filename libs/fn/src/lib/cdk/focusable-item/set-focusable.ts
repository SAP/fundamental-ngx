import { ElementRef } from '@angular/core';
import { getNativeElement } from '@fundamental-ngx/fn/utils';
import { HasElementRef } from '../has-element-ref';

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
