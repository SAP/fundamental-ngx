import { EventEmitter } from '@angular/core';
import { DefaultMenuItem } from '../menu/default-menu-item';
import { MegaMenuSublinkDirective } from './mega-menu-sublink.directive';
/**
 *  Directive represents mega menu subitem, which can contain sublink.
 *  ```html
 * <li fd-mega-menu-subitem>
 *      <a fd-mega-menu-sublink>Sub Item 2</a>
 * </li>
 *  ```
 * */
export declare class MegaMenuSubitemDirective implements DefaultMenuItem {
    /** @hidden */
    fdMegaMenuClass: boolean;
    /** @hidden */
    link: MegaMenuSublinkDirective;
    /** */
    readonly keyDown: EventEmitter<KeyboardEvent>;
    /** @hidden */
    handleKeyboardEvent(event: KeyboardEvent): void;
    /** @hidden */
    focus(): void;
    /** @hidden */
    click(): void;
}
