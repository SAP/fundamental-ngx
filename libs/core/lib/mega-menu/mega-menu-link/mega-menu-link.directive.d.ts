import { ElementRef } from '@angular/core';
/**
 *  Directive represents mega menu link.
 *  ```html
 * <a fd-mega-menu-link href="#">Link</a>
 *  ```
 * */
export declare class MegaMenuLinkDirective {
    itemEl: ElementRef;
    /** @hidden */
    fdMegaMenuClass: boolean;
    /** @hidden */
    hasChild: boolean;
    /** @hidden */
    isExpanded: boolean;
    /** @hidden */
    constructor(itemEl: ElementRef);
    focus(): void;
    click(): void;
}
