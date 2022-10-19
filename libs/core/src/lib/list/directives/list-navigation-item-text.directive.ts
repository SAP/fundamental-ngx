import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector: '[fd-list-navigation-item-text], [fdListNavigaitonItemText]'
})
export class ListNavigationItemTextDirective {
    /** @hidden */
    @HostBinding('class.fd-list__navigation-item-text')
    navigationItemTextClass = true;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    get elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }
}
