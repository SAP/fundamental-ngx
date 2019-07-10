import { Component, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a navigation group.
 * ```html
 * <fd-side-nav>
 *    <fd-side-nav-group>
 *        <h1 fd-side-nav-title>Group Name</h1>
 *          <div fd-side-nav-list>
 *             <fd-side-nav-item>
 *                <a fd-side-nav-link [attr.href]="'#'">Link Item</a>
 *             </fd-side-nav-item>
 *          </div>>
 *    </fd-side-nav-group>
 * </fd-side-nav>
 * ```
 */
@Component({
    selector: 'fd-side-nav-group',
    templateUrl: './side-navigation-group.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SideNavigationGroupComponent { }
