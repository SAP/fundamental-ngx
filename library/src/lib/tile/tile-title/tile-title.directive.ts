import { Directive, HostBinding } from '@angular/core';

/**
 * Applies the tile title style to a header element. It can be used with any header level.
 *
 * ```html
 * <h1 fd-tile-title>Tile Title</h1>
 * <h2 fd-tile-title>Tile Title</h2>
 * <h3 fd-tile-title>Tile Title</h3>
 * ```
 */

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tile-title]'
})
export class TileTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__title')
    fdTileTitleClass: boolean = true;
}
