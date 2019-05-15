import { Component } from '@angular/core';

/**
 * The component that represents a navigation subitem.
 * ```html
 *  <fd-side-nav-subitem>
 *     <fd-side-nav-sublink>
 *        <a [attr.href]="'#'">Link Item</a>
 *     </fd-side-nav-sublink>
 *  </fd-side-nav-subitem>
 * ```
 */
@Component({
    selector: 'fd-side-nav-subitem',
    templateUrl: './side-navigation-subitem.component.html'
})
export class SideNavigationSubItemComponent {}
