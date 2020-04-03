import { Directive, HostBinding } from '@angular/core';

/**
 * The directive that represents a listing structure of the menu.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-list]'
})
export class MenuListDirective {

    /** @hidden */
    @HostBinding('class.fd-menu__list')
    fdMenuListClass: boolean = true;
}
