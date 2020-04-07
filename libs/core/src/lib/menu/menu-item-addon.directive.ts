import { Directive, HostBinding } from '@angular/core';

/**
 * The directive for menu item addon(for icons).
 */
// TODO REMOVE!
@Directive({
    selector: '[fd-menu-item-addon], [fdMenuItemAddon]'
})
export class MenuItemAddonDirective {
    /** @hidden */
    @HostBinding('class.fd-menu__addon-before')
    fdMenuItemAddonClass: boolean = true;
}
