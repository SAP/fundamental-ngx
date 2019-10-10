import { AfterContentInit, Component, ContentChild, OnDestroy, ViewEncapsulation } from '@angular/core';
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
@Component({
    selector: 'fd-side-nav-item',
    templateUrl: './side-navigation-item.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SideNavigationItemComponent implements AfterContentInit, OnDestroy {
    @ContentChild(SideNavigationLinkDirective) linkElement: SideNavigationLinkDirective;
    @ContentChild(SideNavigationSublistDirective) subListElement: SideNavigationSublistDirective;

    /** @Hidden */
    subListOpenChanged$: Subscription;

    public ngAfterContentInit(): void {
        if (this.linkElement && this.subListElement) {
            /** After view content check if there is flag with opened true */
            this.subListElement.subListIsOpenChange(this.linkElement.sublistIsOpen);
            this.subListOpenChanged$ = this.linkElement.onSubListOpenChange.subscribe(isOpen => {
                this.subListElement.subListIsOpenChange(isOpen);
            });
        }
    }

    ngOnDestroy(): void {
        if (this.subListOpenChanged$) {
            this.subListOpenChanged$.unsubscribe();
        }
    }

}
