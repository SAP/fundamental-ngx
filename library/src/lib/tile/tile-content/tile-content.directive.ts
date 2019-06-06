import { Directive } from '@angular/core';

/**
 * Directive that represents a tile content. 
 * ```html
 * <fd-tile-content>
 *    <h2 fd-tile-title>Tile Tile</h2>
 *    <p>Tile Description</p>
 * </fd-tile-content>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: 'fd-tile-content',
    host: {
        class: 'fd-tile__content'
    }
})
export class TileContentDirective {}
