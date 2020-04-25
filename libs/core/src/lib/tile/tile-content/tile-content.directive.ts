import { Directive } from '@angular/core';

/**
 * Directive that represents a tile content.
 * ```html
 * <div fd-tile-content>
 *    <h2 fd-tile-title>Tile Tile</h2>
 *    <p>Tile Description</p>
 * </div>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tile-content]',
    host: {
        class: 'fd-tile__content'
    }
})
export class TileContentDirective {}
