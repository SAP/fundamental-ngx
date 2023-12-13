import { ContentChild, Directive, HostBinding } from '@angular/core';
import { NestedListComponent } from '@fundamental-ngx/cx/nested-list';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[cxSideNavigationUtility], [fdx-side-nav-utility]'
})
export class SideNavigationUtilityDirective {
    /** @ignore */
    @ContentChild(NestedListComponent)
    list: NestedListComponent;

    /** @ignore */
    @HostBinding('class.fdx-side-nav__utility')
    classSideNavUtility = true;
}
