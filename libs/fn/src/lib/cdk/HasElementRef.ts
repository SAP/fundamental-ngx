import { ElementRef } from '@angular/core';

export abstract class HasElementRef {
    abstract elementRef(): ElementRef<HTMLElement>;
}
