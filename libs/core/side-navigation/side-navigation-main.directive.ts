import { ContentChild, Directive, HostBinding } from '@angular/core';
import { NestedListDirective } from '@fundamental-ngx/core/nested-list';

@Directive({
    selector: '[fdSideNavigationMain], [fd-side-nav-main]',
    standalone: true
})
export class SideNavigationMainDirective {
    /** @ignore */
    @ContentChild(NestedListDirective)
    list: NestedListDirective;

    /** @ignore */
    @HostBinding('class.fd-side-nav__main-navigation')
    classSideNavMainNavigation = true;
}
