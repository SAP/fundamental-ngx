import { ElementRef } from '@angular/core';
import { HasElementRef } from '../has-element-ref';
import { getNativeElement } from '@fundamental-ngx/fn/utils';

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
