import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Directive that represents a tile grid.
 * A Tile Gird is a collection of fd-tile components in a gird layout.
 * ```html
 * <fd-tile-grid [col]="3">
 *      <fd-tile>
 *          <div fd-tile-content>
 *              <h2 fd-tile-title>Tile Tile 1</h2>
 *              <p>Tile Description</p>
 *          </div>
 *      </fd-tile>
 *      <fd-tile>
 *          <div fd-tile-content>
 *              <h2 fd-tile-title>Tile Tile 2</h2>
 *              <p>Tile Description</p>
 *          </div>
 *      </fd-tile>
 *      <fd-tile>
 * </fd-tile-grid>
 * ```
 */
export declare class TileGridDirective extends AbstractFdNgxClass {
    private elementRef;
    /**
     * The number of columns in the grid layout.
     * The default is 3-col grid.
     */
    col: number;
    /** @hidden */
    _setProperties(): void;
    /** @hidden */
    constructor(elementRef: ElementRef);
}
