import { ElementRef } from '@angular/core';
import { DefaultMenuItem } from './default-menu-item';
/**
 * The directive that represents a menu item.
 */
export declare class MenuItemDirective implements DefaultMenuItem {
    itemEl: ElementRef;
    /** @hidden*/
    fdMenuItemClass: boolean;
    /** @hidden */
    constructor(itemEl: ElementRef);
    focus(): void;
    click(): void;
}
