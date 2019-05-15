import { Component } from '@angular/core';
/**
 * The component that represents a navigation sublist structure.
 * ```html
 *  <fd-side-nav-link [hasSublist]="true"> 
 *      Link Item
 *      <fd-side-nav-subitem>
 *          <fd-side-nav-sublink>
 *               <a [attr.href]="'#'">Link Item</a>
 *          </fd-side-nav-sublink>
 *      </fd-side-nav-subitem>
 *  </fd-side-nav-link>
 * ```
 */
@Component({
    selector: 'fd-side-nav-sublist',
    templateUrl: './side-navigation-sublist.component.html'
})
export class SideNavigationSubListComponent {}
