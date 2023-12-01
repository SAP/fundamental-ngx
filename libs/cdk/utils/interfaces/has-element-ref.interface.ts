import { ElementRef } from '@angular/core';

export interface HasElementRef<ElementType extends Element = HTMLElement> {
    readonly elementRef: ElementRef<ElementType>;
}

export const ELEMENT_REF_EXCEPTION = 'HasElementRef interface has to be implemented';
