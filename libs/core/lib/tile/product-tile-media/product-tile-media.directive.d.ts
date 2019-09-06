import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Component that represents a product tile media container.
 * ```html
 * <div fd-product-tile-media [photo]="'https://techne.yaas.io/images/product-thumbnail-wide.png'">
 * </div>
 * ```
 */
export declare class ProductTileMediaDirective extends AbstractFdNgxClass {
    private elementRef;
    /** The image url. */
    photo: string;
    /** @hidden */
    constructor(elementRef: ElementRef);
    /** @hidden */
    _setProperties(): void;
}
