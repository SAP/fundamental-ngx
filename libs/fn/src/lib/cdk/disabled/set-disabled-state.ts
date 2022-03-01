import { ElementRef } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/fn/cdk';
import { getNativeElement } from '@fundamental-ngx/fn/utils';

export function setDisabledState(
    element: HasElementRef | HTMLElement | ElementRef<HTMLElement>,
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
