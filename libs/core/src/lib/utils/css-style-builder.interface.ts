import { ElementRef } from '@angular/core';

export interface Hash {
    [key: string]: any;
}

export interface CssStyleBuilder {
    elementRef(): ElementRef;
    buildComponentCssStyle(): Hash;
}
