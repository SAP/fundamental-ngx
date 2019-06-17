import { Component, Directive, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a sub item.
 * ```html
 * <fd-side-nav>
 *    <fd-side-nav-group>
 *        <h1 fd-side-nav-title>Group Name</h1>
 *          <div fd-side-nav-list>
 *            <a fd-side-nav-link>Link Item</a>
 *                <div fd-side-nav-sublist>
 *                    <div fd-side-nav-subitem>
 *                        <a fd-side-nav-sublink [attr.href]="'#'">Link Item</a>
 *                    </div>
 *                    <div fd-side-nav-subitem>
 *                        <a fd-side-nav-sublink [routerLink]="'#'">Link Item</a>
 *                    </div>
 *              </div>
 *          </div>>
 *    </fd-side-nav-group>
 * </fd-side-nav>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-side-nav-subitem]',
    host: {
        class: 'fd-side-nav__subitem'
    }
})
export class SideNavigationSubitemDirective {}
