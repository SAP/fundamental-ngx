import { Directive, HostBinding } from '@angular/core';

/**
 * The directive that represents the menu title.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-title]'
})
export class MenuTitleDirective {

    /** @hidden */
    @HostBinding('class.fd-menu__title')
    fdMenuTitleClass: boolean = true;
}
