import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdVerticalNavigationGroupHeader], [fd-vertical-navigation-group-header]',
    standalone: true
})
export class VerticalNavigationGroupHeaderDirective {
    /** @hidden */
    @HostBinding('class.fd-vertical-nav__group-header')
    fdVerticalNavigationGroupHeaderClass = true;
}
