import { Directive, ElementRef, Inject, Input } from '@angular/core';
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
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tile-grid]'
})
export class TileGridDirective extends AbstractFdNgxClass {
    /** 
     * The number of columns in the grid layout.
     * The default is 3-col grid.
     */
    @Input() col: number;

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-tile-grid');
        if (this.col) {
            this._addClassToElement('fd-tile-grid--' + this.col + 'col');
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
