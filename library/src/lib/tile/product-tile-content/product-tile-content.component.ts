import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Component that represents a product tile content. 
 * ```html
 * <fd-product-tile-content>
 *    <h2 fd-product-tile-title>Default Product Tile</h2>
 * </fd-product-tile-content>
 * ```
 */
@Component({
    selector: 'fd-product-tile-content',
    templateUrl: './product-tile-content.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ProductTileContentComponent {}
