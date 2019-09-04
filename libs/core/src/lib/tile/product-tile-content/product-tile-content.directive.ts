import { Directive } from '@angular/core';

/**
 * Component that represents a product tile content. 
 * ```html
 * <div fd-product-tile-content>
 *    <h2 fd-product-tile-title>Default Product Tile</h2>
 * </div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-product-tile-content]',
    host: {
        'class': 'fd-product-tile__content'
    }
})
export class ProductTileContentDirective {}
