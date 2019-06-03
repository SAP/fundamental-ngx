import { Directive, HostBinding } from '@angular/core';

/**
 * Directive that represents a product tile title.
 * ```html
 * <h2 fd-product-tile-title>Default Product Tile</h2>
 * ```
 */
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
