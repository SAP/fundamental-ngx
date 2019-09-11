import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Applies the tile text style to a p element.
 *
 * ```html
 * <p fd-tile-text>Tile Text</p>
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: '[fd-tile-text]',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class TileTextComponent {
    /** @hidden */
    @HostBinding('class.fd-tile__text')
    fdTileTextClass: boolean = true;
}
