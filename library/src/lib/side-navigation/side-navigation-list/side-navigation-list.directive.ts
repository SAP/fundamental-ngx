import { Directive } from '@angular/core';

/**
 * The directive that represents a list group.
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
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-side-nav-list]',
    host: {
        class: 'fd-side-nav__list'
    }
})
export class SideNavigationListDirective {}
