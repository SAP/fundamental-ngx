import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Component that represents a product tile title.
 * ```html
 * <h2 fd-product-tile-title>Default Product Tile</h2>
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: '[fd-product-tile-title]',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class ProductTileTitleComponent {
    /** @hidden */
    @HostBinding('class.fd-product-tile__title')
    fdProductTileTitleClass: boolean = true;
}
