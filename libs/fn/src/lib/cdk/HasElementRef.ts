import { ElementRef } from '@angular/core';

export abstract class HasElementRef<ElementType extends HTMLElement = HTMLElement> {
    abstract elementRef(): ElementRef<ElementType>;
}
