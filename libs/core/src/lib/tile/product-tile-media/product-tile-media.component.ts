import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

/**
 * Component that represents a product tile media container.
 * ```html
 * <div fd-product-tile-media [photo]="'https://placeimg.com/800/400/nature'">
 * </div>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-product-tile-media]',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class ProductTileMediaComponent extends AbstractFdNgxClass {
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
            this._addStyleToElement('background-image', 'url(' + this.photo + ')')
        }
    }
}
