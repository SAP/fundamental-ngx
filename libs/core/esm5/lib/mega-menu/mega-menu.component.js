/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation } from '@angular/core';
/**
 *  Component represents mega menu element, which contains list with menu items, links, sublists, subitems and sublinks..
 *  ```html
 *  <fd-mega-menu>
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
 *  </fd-mega-menu>
 *  ```
 *
 */
var MegaMenuComponent = /** @class */ (function () {
    function MegaMenuComponent() {
    }
    MegaMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-mega-menu',
                    template: "<nav class=\"fd-mega-menu\">\n    <ng-content></ng-content>\n</nav>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [""]
                }] }
    ];
    return MegaMenuComponent;
}());
export { MegaMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYS1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tZWdhLW1lbnUvbWVnYS1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQjdEO0lBQUE7SUFNZ0MsQ0FBQzs7Z0JBTmhDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsaUZBQXlDO29CQUV6QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3hDOztJQUMrQix3QkFBQztDQUFBLEFBTmpDLElBTWlDO1NBQXBCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qKlxuICogIENvbXBvbmVudCByZXByZXNlbnRzIG1lZ2EgbWVudSBlbGVtZW50LCB3aGljaCBjb250YWlucyBsaXN0IHdpdGggbWVudSBpdGVtcywgbGlua3MsIHN1Ymxpc3RzLCBzdWJpdGVtcyBhbmQgc3VibGlua3MuLlxuICogIGBgYGh0bWxcbiAqICA8ZmQtbWVnYS1tZW51PlxuICogICAgICA8dWwgZmQtbWVnYS1tZW51LWxpc3Q+XG4gKiAgICAgICAgICA8ZmQtbWVnYS1tZW51LWl0ZW0+XG4gKiAgICAgICAgICAgICAgPGEgZmQtbWVnYS1tZW51LWxpbms+SXRlbSAwPC9hPlxuICogICAgICAgICAgICAgIDxsaSBmZC1tZWdhLW1lbnUtc3ViaXRlbT5cbiAqICAgICAgICAgICAgICAgICA8YSBmZC1tZWdhLW1lbnUtc3VibGluaz5TdWIgSXRlbSAxPC9hPlxuICogICAgICAgICAgICA8L2xpPlxuICogICAgICAgICAgICAgIDxsaSBmZC1tZWdhLW1lbnUtc3ViaXRlbT5cbiAqICAgICAgICAgICAgICAgIDxhIGZkLW1lZ2EtbWVudS1zdWJsaW5rPlN1YiBJdGVtIDI8L2E+XG4gKiAgICAgICAgICAgPC9saT5cbiAqICAgICAgICAgICAgIDxsaSBmZC1tZWdhLW1lbnUtc3ViaXRlbT5cbiAqICAgICAgICAgICAgICAgICAgPGEgZmQtbWVnYS1tZW51LXN1Ymxpbms+U3ViIEl0ZW0gMzwvYT5cbiAqICAgICAgICAgICAgIDwvbGk+XG4gKiAgICAgICAgICA8L2ZkLW1lZ2EtbWVudS1pdGVtPlxuICogICAgICA8L3VsPlxuICogIDwvZmQtbWVnYS1tZW51PlxuICogIGBgYFxuICogKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtbWVnYS1tZW51JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbWVnYS1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9tZWdhLW1lbnUuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1lZ2FNZW51Q29tcG9uZW50IHt9XG4iXX0=