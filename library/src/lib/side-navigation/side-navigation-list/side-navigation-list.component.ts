import { Component, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a list structure.
 * ```html
 *    <fd-side-nav-list>
 *       <fd-side-nav-item>
 *           <fd-side-nav-link>
 *               <a [attr.href]="'#'">Link Item</a>
 *           </fd-side-nav-link>
 *       </fd-side-nav-item>
 *   </fd-side-nav-list>
 * ```
 */
@Component({
    selector: 'fd-side-nav-list',
    templateUrl: './side-navigation-list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SideNavigationListComponent {}
