import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdVerticalNavigationGroupHeader], [fd-vertical-navigation-group-header]'
})
export class VerticalNavigationGroupHeaderDirective {
    /** @hidden */
    @HostBinding('class.fd-vertical-nav__group-header')
    fdVerticalNavigationGroupHeaderClass = true;
}
