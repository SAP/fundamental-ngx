import { Component, ViewEncapsulation } from '@angular/core';

/**
 *  Component represents mega menu group, which contains list with menu items.
 *  ```html
 *  <fd-mega-menu-group>
 *      <h3 fd-mega-menu-title>Title 1</h3>
 *      <ul fd-mega-menu-list>
 *          <fd-mega-menu-item>
 *              <a fd-mega-menu-link>Item 0</a>
 *              <li fd-mega-menu-subitem>
 *                 <a fd-mega-menu-sublink>Sub Item 1</a>
 *            </li>
 *              <li fd-mega-menu-subitem>
 *                <a fd-mega-menu-sublink>Sub Item 2</a>
 *           </li>
 *             <li fd-mega-menu-subitem>
 *                  <a fd-mega-menu-sublink>Sub Item 3</a>
 *             </li>
 *          </fd-mega-menu-item>
 *      </ul>
 *  </fd-mega-menu-group>
 *  ```
 * */
@Component({
    selector: 'fd-mega-menu-group',
    templateUrl: './mega-menu-group.component.html',
    encapsulation: ViewEncapsulation.None

})
export class MegaMenuGroupComponent {}
