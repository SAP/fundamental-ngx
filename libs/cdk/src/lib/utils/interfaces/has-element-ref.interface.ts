import { ElementRef } from '@angular/core';

export interface HasElementRef {
    elementRef(): ElementRef;
}

export const ELEMENT_REF_EXCEPTION = 'HasElementRef interface has to be implemented';
