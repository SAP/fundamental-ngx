import { Component, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a navigation group.
 * ```html
 * <fd-side-nav>
 *    <fd-side-nav-group>
 *        <fd-side-nav-title>Group Name</fd-side-nav-title>
 *          <fd-side-nav-list>    
 *             <fd-side-nav-item>
 *                <fd-side-nav-link>
 *                    <a [attr.href]="'#'">Link Item</a>
 *                </fd-side-nav-link>
 *             </fd-side-nav-item>
 *          </fd-side-nav-list>
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
