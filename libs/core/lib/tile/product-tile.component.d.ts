import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Product tile is used to display product information.
 * ```html
 * <fd-product-tile>
 *     <fd-product-tile-media [photo]="'https://techne.yaas.io/images/product-thumbnail-wide.png'">
 *     </fd-product-tile-media>
 *     <fd-product-tile-content>
 *         <h2 fd-product-tile-title>Default Product Tile</h2>
 *     </fd-product-tile-content>
 * </fd-product-tile>
 * ```
 */
export declare class ProductTileComponent extends AbstractFdNgxClass {
    private elementRef;
    /** Whether the product tile is disabled. */
    disabled: boolean;
    /** Whether the product tile is rendered as a button. */
    isButton: boolean;
    /** @hidden */
    _setProperties(): void;
    /** @hidden */
    constructor(elementRef: ElementRef);
}
