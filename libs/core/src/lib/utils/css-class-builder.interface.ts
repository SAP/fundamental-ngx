import { ElementRef } from '@angular/core';

export interface CssClassBuilder {
    class: string // user's custom classes
    elementRef(): ElementRef;
    buildComponentCssClass(): string;
}
