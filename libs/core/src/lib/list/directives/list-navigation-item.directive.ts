import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fd-list-navigation-item], [fdListNavigaitonItem]'
})
export class ListNavigationItemDirective {
    /** @hidden */
    @HostBinding('class.fd-list__navigation-item')
    navigationItemClass = true;

    /** Whether or not the list item is expandable (when the list item has sub items) */
    @HostBinding('class.fd-list__navigation-item--expandable')
    expandable = false;

    /** Whether or not the list item is expanded. */
    @HostBinding('class.is-expanded')
    expanded = false;
}
