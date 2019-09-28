import { Directive, HostBinding } from '@angular/core';

/**
 * Directive that represents a product tile text.
 * ```html
 * <p fd-product-tile-text>Default Product Tile Text</p>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-product-tile-text]'
})
export class ProductTileTextDirective {
    /** @hidden */
    @HostBinding('class.fd-product-tile__text')
    fdProductTileTextClass: boolean = true;
}
