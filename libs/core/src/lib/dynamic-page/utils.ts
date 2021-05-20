import { Renderer2 } from '@angular/core';
import { DynamicPageResponsiveSize } from './constants';

export const addClassNameToElement = (renderer: Renderer2, element: Element, className: string): void => {
    renderer.addClass(element, className);
};

/** @hidden Returns dynamic page size based on width
 * @param width - dynamic page window width
 **/
export function dynamicPageWidthToSize(width: number): DynamicPageResponsiveSize {
    if (width < 599) {
        return 'small';
    } else if (width < 1023) {
        return 'medium';
    } else if (width < 1439) {
        return 'large';
    }
    return 'extra-large';
}
