import { ElementRef } from '@angular/core';

export abstract class HasElementRef<ElementType extends Element = HTMLElement> {
    abstract elementRef(): ElementRef<ElementType>;
}
