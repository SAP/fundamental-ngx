import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Component that represents a product tile content. 
 * ```html
 * <div fd-product-tile-content>
 *    <h2 fd-product-tile-title>Default Product Tile</h2>
 * </div>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-product-tile-content]',
    host: {
        'class': 'fd-product-tile__content'
    },
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class ProductTileContentComponent {}
