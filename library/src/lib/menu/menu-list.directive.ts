import { Directive, HostBinding } from '@angular/core';

/**
 * The directive that represents a listing structure of the menu.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-list]'
})
export class MenuListDirective {
    /** @hidden */
    @HostBinding('class.fd-menu_list')
    fdMenuListClass: boolean = true;
}
