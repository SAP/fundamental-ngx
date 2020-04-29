import { Directive, HostBinding } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-mega-menu-title]'
})
export class MegaMenuTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-mega-menu__title')
    fdMegaMenuTitleClass: boolean = true;
}
