import { Directive, HostBinding } from '@angular/core';

/**
 * The directive that represents a listing structure of the menu.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-item-addon]'
})
export class MenuItemAddonDirective {
    /** @hidden */
    @HostBinding('class.fd-menu__addon-before')
    fdMenuItemAddonClass: boolean = true;
}
