import { ContentChild, Directive, HostBinding } from '@angular/core';
import { NestedListDirective } from '../nested-list/nested-list/nested-list.directive';

@Directive({
    selector: '[fdSideNavigationMain], [fd-side-nav-main]'
})
export class SideNavigationMainDirective {

    /** @hidden */
    @ContentChild(NestedListDirective)
    list: NestedListDirective;

    /** @hidden */
    @HostBinding('class.fd-side-nav__main-navigation')
    classSideNavMainNavigation: boolean = true;
}
