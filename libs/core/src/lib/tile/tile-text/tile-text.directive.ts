import { Directive, HostBinding } from '@angular/core';

/**
 * Applies the tile text style to a <p> element.
 *
 * ```html
 * <p fd-tile-text>Tile Text</p>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tile-text]'
})
export class TileTextDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__text')
    fdTileTextClass: boolean = true;
}
