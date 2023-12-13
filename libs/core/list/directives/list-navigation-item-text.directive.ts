import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector: '[fd-list-navigation-item-text], [fdListNavigaitonItemText]',
    standalone: true
})
export class ListNavigationItemTextDirective {
    /** @ignore */
    @HostBinding('class.fd-list__navigation-item-text')
    navigationItemTextClass = true;

    /** @ignore */
    constructor(public readonly elementRef: ElementRef) {}
}
