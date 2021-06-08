import { ContentChild, Directive, HostBinding } from '@angular/core';
import { NestedListDirective } from '@fundamental-ngx/core/nested-list';

@Directive({
    selector: '[fdSideNavigationUtility], [fd-side-nav-utility]'
})
export class SideNavigationUtilityDirective {
    /** @hidden */
    @ContentChild(NestedListDirective)
    list: NestedListDirective;

    /** @hidden */
    @HostBinding('class.fd-side-nav__utility')
    classSideNavUtility = true;
}
