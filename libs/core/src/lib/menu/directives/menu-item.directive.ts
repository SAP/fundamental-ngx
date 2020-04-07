import { Directive, ElementRef, HostBinding } from '@angular/core';
import { DefaultMenuItem } from '../default-menu-item.class';

/**
 * The directive that represents a menu item.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-item]'
})
export class MenuItemDirective implements DefaultMenuItem {
    /** @hidden*/
    @HostBinding('class.fd-menu__item')
    fdMenuItemClass: boolean = true;

    /** @hidden */
    constructor (public elementRef: ElementRef) {}

    public focus(): void {
        this.elementRef.nativeElement.focus();
    }

    public click(): void {
        this.elementRef.nativeElement.click();
    }
}
