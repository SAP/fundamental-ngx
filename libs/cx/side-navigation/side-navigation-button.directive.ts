import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[cxSideNavButton], [fdx-side-nav-button]'
})
export class SideNavigationButtonDirective {
    /** @ignore */
    @HostBinding('class.fdx-side-nav__button')
    fdSideNavButtonClass = true;
}
