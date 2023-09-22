import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector: '[fd-list-navigation-item-text], [fdListNavigaitonItemText]',
    standalone: true
})
export class ListNavigationItemTextDirective {
    /** @hidden */
    @HostBinding('class.fd-list__navigation-item-text')
    navigationItemTextClass = true;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}
}
