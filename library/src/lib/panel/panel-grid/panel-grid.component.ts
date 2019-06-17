import { Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

/**
 * Use a panel grid to arrange panels evenly in a grid layout.
 */
@Component({
    selector: 'fd-panel-grid',
    templateUrl: './panel-grid.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PanelGridComponent extends AbstractFdNgxClass {

    /** Number of columns for the grid. */
    @Input() col: number;

    /** Whether the grid should have a gap. */
    @Input() nogap: boolean = false;

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-panel-grid');

        if (this.nogap) {
            this._addClassToElement('fd-panel-grid--nogap');
        }

        if (this.col) {
            this._addClassToElement('fd-panel-grid--' + this.col + 'col');
        }
    }
}
