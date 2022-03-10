import { ElementRef } from '@angular/core';
import { HasElementRef } from '../has-element-ref';
import { getNativeElement } from '@fundamental-ngx/fn/utils';

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
