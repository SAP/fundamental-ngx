import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

/**
 * Component that represents a product tile media container.
 * ```html
 * <div fd-product-tile-media [photo]="'https://placeimg.com/600/600/nature'">
 * </div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-product-tile-media]'
})
export class ProductTileMediaDirective extends AbstractFdNgxClass {
    /** The image url. */
    @Input() photo: string;

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

    /** @hidden */
    _setProperties(): void {
        this._addClassToElement('fd-product-tile__media');
        if (this.photo) {
            this._addStyleToElement('background-image', 'url(' + this.photo + ')');
        }
    }
}
