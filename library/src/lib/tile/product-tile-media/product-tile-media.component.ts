import { Component, Input } from '@angular/core';

/**
 * Component that represents a product tile media container.
 * ```html
 * <fd-product-tile-media [photo]="'https://techne.yaas.io/images/product-thumbnail-wide.png'">
 * </fd-product-tile-media>
 * ```
 */
@Component({
    selector: 'fd-product-tile-media',
    templateUrl: './product-tile-media.component.html'
})
export class ProductTileMediaComponent {
    /** The image url. */
    @Input() photo: string;
}
