import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Tile is used to display information in a simple container format.
 * ```html
 * <fd-tile>
 *     <fd-tile-content>
 *         <h2 fd-tile-title>Tile Tile</h2>
 *         <p>Tile Description</p>
 *     </fd-tile-content>
 * </fd-tile>
 * ```
 */
export declare class TileComponent extends AbstractFdNgxClass {
    private elementRef;
    /** Whether the tile is disabled. */
    disabled: boolean;
    /** Whether the tile is rendered as a button. */
    isButton: boolean;
    /** Specifies the number of rows a tile should span. */
    rowSpan: number;
    /** Specifies the number of columns a tile should span. */
    columnSpan: number;
    /** A number specifying the background color of the tile. */
    colorAccent: number;
    /** @hidden */
    _setProperties(): void;
    /** @hidden */
    constructor(elementRef: ElementRef);
}
