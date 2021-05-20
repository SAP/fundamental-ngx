import { Renderer2 } from '@angular/core';

export const addClassNameToFacetElement = (renderer: Renderer2, element: Element, className: string): void => {
    renderer.addClass(element, className);
};
