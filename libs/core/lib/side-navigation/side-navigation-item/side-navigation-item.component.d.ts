import { AfterContentInit, OnDestroy } from '@angular/core';
import { SideNavigationLinkDirective } from '../side-navigation-link/side-navigation-link.directive';
import { Subscription } from 'rxjs';
import { SideNavigationSublistDirective } from '../side-navigation-sublist/side-navigation-sublist.directive';
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
export declare class SideNavigationItemComponent implements AfterContentInit, OnDestroy {
    linkElement: SideNavigationLinkDirective;
    subListElement: SideNavigationSublistDirective;
    /** @Hidden */
    subListOpenChanged$: Subscription;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
