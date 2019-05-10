import { Directive, HostBinding } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-product-tile-title]'
})
export class ProductTileTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-product-tile__title')
    fdProductTileTitleClass: boolean = true;
}
