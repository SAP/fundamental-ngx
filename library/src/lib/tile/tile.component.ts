import { Component, ElementRef, Inject, Input } from '@angular/core';
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
@Component({
    selector: 'fd-tile',
    host: {
        '[attr.role]': '(this.isButton === true ? \'button\' : \'\')'
    },
    templateUrl: './tile.component.html'
})
export class TileComponent extends AbstractFdNgxClass {
    /** Whether the tile is disabled. */
    @Input() disabled: boolean = false;

    /** Whether the tile is rendered as a button. */
    @Input() isButton: boolean = false;

    /** Specifies the number of rows a tile should span. */
    @Input() rowSpan: number;

    /** Specifies the number of columns a tile should span. */
    @Input() columnSpan: number;

    /** A number specifying the background color of the tile. */
    @Input() colorAccent: number;

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-tile');
        if (this.disabled) {
            this._addClassToElement('is-disabled');
        }
        if (this.rowSpan) {
            this._addClassToElement('fd-has-grid-row-span-' + this.rowSpan);
        }
        if (this.columnSpan) {
            this._addClassToElement('fd-has-grid-column-span-' + this.columnSpan);
        }
        if (this.colorAccent) {
            this._addClassToElement('fd-has-background-color-accent-' + this.colorAccent);
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
