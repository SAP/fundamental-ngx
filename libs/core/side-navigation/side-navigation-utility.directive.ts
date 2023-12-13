import { ContentChild, Directive, HostBinding } from '@angular/core';
import { NestedListDirective } from '@fundamental-ngx/core/nested-list';

@Directive({
    selector: '[fdSideNavigationUtility], [fd-side-nav-utility]',
    standalone: true
})
export class SideNavigationUtilityDirective {
    /** @ignore */
    @ContentChild(NestedListDirective)
    list: NestedListDirective;

    /** @ignore */
    @HostBinding('class.fd-side-nav__utility')
    classSideNavUtility = true;
}
