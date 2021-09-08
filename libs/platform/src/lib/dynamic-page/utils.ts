import { Renderer2 } from '@angular/core';

export const addClassNameToElement = (renderer: Renderer2, element: Element, className: string): void => {
    renderer.addClass(element, className);
};

export const removeClassNameFromElement = (renderer: Renderer2, element: Element, className: string): void => {
    renderer.removeClass(element, className);
};
