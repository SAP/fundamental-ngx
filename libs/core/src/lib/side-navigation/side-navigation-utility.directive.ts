import { ContentChild, Directive, HostBinding } from '@angular/core';
import { NestedListDirective } from '../nested-list/nested-list/nested-list.directive';

@Directive({
    selector: '[fdSideNavigationUtility], [fd-side-nav-utility]'
})
export class SideNavigationUtilityDirective {

    /** @hidden */
    @ContentChild(NestedListDirective)
    list: NestedListDirective;

    /** @hidden */
    @HostBinding('class.fd-side-nav__utility')
    classSideNavUtility: boolean = true;
}
