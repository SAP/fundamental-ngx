import { Component, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a navigation item.
 * ```html
 *   <fd-side-nav-item>
 *      <fd-side-nav-link>
 *         <a [attr.href]="'#'">Link Item</a>
 *      </fd-side-nav-link>
 *   </fd-side-nav-item>
 * ```
 */
@Component({
    selector: 'fd-side-nav-item',
    templateUrl: './side-navigation-item.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SideNavigationItemComponent {}
