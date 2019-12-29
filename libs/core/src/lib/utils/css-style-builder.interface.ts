import { ElementRef } from '@angular/core';

export interface IHash {
    [key: string]: any;
}

export interface CssStyleBuilder {
    elementRef(): ElementRef;
    buildComponentCssStyle(): IHash;
}
