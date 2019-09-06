import { ElementRef } from '@angular/core';
/**
 *  Directive represents mega menu sub link.
 *  ```html
 * <a fd-mega-menu-sublink href="#">Link</a>
 *  ```
 * */
export declare class MegaMenuSublinkDirective {
    itemEl: ElementRef;
    /** @hidden */
    fdMegaMenuClass: boolean;
    /** @hidden */
    constructor(itemEl: ElementRef);
    focus(): void;
    click(): void;
}
