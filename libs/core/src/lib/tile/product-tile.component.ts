import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * Product tile is used to display product information.
 * ```html
 * <fd-product-tile>
 *     <fd-product-tile-media [photo]="'https://placeimg.com/600/600/nature'">
 *     </fd-product-tile-media>
 *     <fd-product-tile-content>
 *         <h2 fd-product-tile-title>Default Product Tile</h2>
 *     </fd-product-tile-content>
 * </fd-product-tile>
 * ```
 */
@Component({
    selector: 'fd-product-tile',
    host: {
        '[attr.role]': '(this.isButton === true ? "button" : "")',
        '[class.fd-product-tile-custom]': 'true'
    },
    templateUrl: './product-tile.component.html',
    styleUrls: ['./product-tile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTileComponent extends AbstractFdNgxClass {
    /** Whether the product tile is disabled. */
    @Input() disabled = false;

    /** Whether the product tile is rendered as a button. */
    @Input() isButton = false;

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-product-tile');
        if (this.disabled) {
            this._addClassToElement('is-disabled');
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
