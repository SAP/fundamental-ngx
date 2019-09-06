import { AfterContentInit, OnDestroy, QueryList } from '@angular/core';
import { MegaMenuItemComponent } from '../mega-menu-item/mega-menu-item.component';
import { MenuKeyboardService } from '../../menu/menu-keyboard.service';
/**
 *  Directive represents mega menu list, which contains items.
 *  ```html
 *  <ul fd-mega-menu-list>
 *      <fd-mega-menu-item>
 *          <a fd-mega-menu-link>Item 0</a>
 *          <li fd-mega-menu-subitem>
 *              <a fd-mega-menu-sublink>Sub Item 1</a>
 *          </li>
 *          <li fd-mega-menu-subitem>
 *              <a fd-mega-menu-sublink>Sub Item 2</a>
 *          </li>
 *          <li fd-mega-menu-subitem>
 *              <a fd-mega-menu-sublink>Sub Item 3</a>
 *          </li>
 *      </fd-mega-menu-item>
 *  </ul>
 *  ```
 * */
export declare class MegaMenuListDirective implements AfterContentInit, OnDestroy {
    private menuKeyboardService;
    /** @hidden */
    fdMegaMenuClass: boolean;
    /** @hidden */
    items: QueryList<MegaMenuItemComponent>;
    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$;
    /** @hidden */
    constructor(menuKeyboardService: MenuKeyboardService);
    /** @hidden */
    ngAfterContentInit(): void;
    /** Method that provides handles keydown events from menu item list */
    handleListKeyDown(event: KeyboardEvent, index: number): void;
    /** @hidden */
    ngOnDestroy(): void;
}
