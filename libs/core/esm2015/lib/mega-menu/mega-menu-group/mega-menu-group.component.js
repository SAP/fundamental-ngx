/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 *
 */
export class MegaMenuGroupComponent {
}
MegaMenuGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-mega-menu-group',
                template: "<div class=\"fd-mega-menu__group\">\n    <ng-content select=\"[fd-mega-menu-title]\"></ng-content>\n    <ng-content select=\"[fd-mega-menu-list]\"></ng-content>\n</div>\n<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYS1tZW51LWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tZWdhLW1lbnUvbWVnYS1tZW51LWdyb3VwL21lZ2EtbWVudS1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCN0QsTUFBTSxPQUFPLHNCQUFzQjs7O1lBTmxDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixpTkFBK0M7Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBRXhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqICBDb21wb25lbnQgcmVwcmVzZW50cyBtZWdhIG1lbnUgZ3JvdXAsIHdoaWNoIGNvbnRhaW5zIGxpc3Qgd2l0aCBtZW51IGl0ZW1zLlxuICogIGBgYGh0bWxcbiAqICA8ZmQtbWVnYS1tZW51LWdyb3VwPlxuICogICAgICA8aDMgZmQtbWVnYS1tZW51LXRpdGxlPlRpdGxlIDE8L2gzPlxuICogICAgICA8dWwgZmQtbWVnYS1tZW51LWxpc3Q+XG4gKiAgICAgICAgICA8ZmQtbWVnYS1tZW51LWl0ZW0+XG4gKiAgICAgICAgICAgICAgPGEgZmQtbWVnYS1tZW51LWxpbms+SXRlbSAwPC9hPlxuICogICAgICAgICAgICAgIDxsaSBmZC1tZWdhLW1lbnUtc3ViaXRlbT5cbiAqICAgICAgICAgICAgICAgICA8YSBmZC1tZWdhLW1lbnUtc3VibGluaz5TdWIgSXRlbSAxPC9hPlxuICogICAgICAgICAgICA8L2xpPlxuICogICAgICAgICAgICAgIDxsaSBmZC1tZWdhLW1lbnUtc3ViaXRlbT5cbiAqICAgICAgICAgICAgICAgIDxhIGZkLW1lZ2EtbWVudS1zdWJsaW5rPlN1YiBJdGVtIDI8L2E+XG4gKiAgICAgICAgICAgPC9saT5cbiAqICAgICAgICAgICAgIDxsaSBmZC1tZWdhLW1lbnUtc3ViaXRlbT5cbiAqICAgICAgICAgICAgICAgICAgPGEgZmQtbWVnYS1tZW51LXN1Ymxpbms+U3ViIEl0ZW0gMzwvYT5cbiAqICAgICAgICAgICAgIDwvbGk+XG4gKiAgICAgICAgICA8L2ZkLW1lZ2EtbWVudS1pdGVtPlxuICogICAgICA8L3VsPlxuICogIDwvZmQtbWVnYS1tZW51LWdyb3VwPlxuICogIGBgYFxuICogKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtbWVnYS1tZW51LWdyb3VwJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbWVnYS1tZW51LWdyb3VwLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG5cbn0pXG5leHBvcnQgY2xhc3MgTWVnYU1lbnVHcm91cENvbXBvbmVudCB7fVxuIl19