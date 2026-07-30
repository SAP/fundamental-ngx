import { ContentChild, Directive, HostBinding } from '@angular/core';
import { NestedListComponent } from '@fundamental-ngx/cx/nested-list';

@Directive({
    selector: '[cxSideNavigationUtility], [fdx-side-nav-utility]',
    standalone: true
})
export class SideNavigationUtilityDirective {
    /** @hidden */
    @ContentChild(NestedListComponent)
    list: NestedListComponent;

    /** @hidden */
    @HostBinding('class.fdx-side-nav__utility')
    classSideNavUtility = true;
}
