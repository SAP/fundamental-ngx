import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fd-list-navigation-item-text], [fdListNavigaitonItemText]'
})
export class ListNavigationItemTextDirective {
    /** @hidden */
    @HostBinding('class.fd-list__navigation-item-text')
    navigationItemTextClass = true;
}
