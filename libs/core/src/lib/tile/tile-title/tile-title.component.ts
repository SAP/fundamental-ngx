import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Applies the tile title style to a header element. It can be used with any header level.
 *
 * ```html
 * <h1 fd-tile-title>Tile Title</h1>
 * <h2 fd-tile-title>Tile Title</h2>
 * <h3 fd-tile-title>Tile Title</h3>
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: '[fd-tile-title]',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class TileTitleComponent {
    /** @hidden */
    @HostBinding('class.fd-tile__title')
    fdTileTitleClass: boolean = true;
}
