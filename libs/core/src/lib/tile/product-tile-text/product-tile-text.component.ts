import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Component that represents a product tile text.
 * ```html
 * <p fd-product-tile-text>Default Product Tile</p>
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: '[fd-product-tile-text]',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class ProductTileTextComponent {
    /** @hidden */
    @HostBinding('class.fd-product-tile__text')
    fdProductTileTextClass: boolean = true;
}
