import { Directive, ElementRef, HostBinding } from '@angular/core';

/**
 * The directive that represents a menu item.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-item]',
})
export class MenuItemDirective {

    /** @hidden*/
    @HostBinding('class.fd-menu__item')
    fdMenuItemClass: boolean = true;

    /** @hidden */
    constructor (public itemEl: ElementRef) {}

    public focus(): void {
        this.itemEl.nativeElement.focus();
    }

    public click(): void {
        this.itemEl.nativeElement.click();
    }
}
