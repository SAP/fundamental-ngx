import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

/**
 * Use a panel grid to arrange panels evenly in a grid layout.
 */
@Component({
    selector: 'fd-panel-grid',
    templateUrl: './panel-grid.component.html'
})
export class PanelGridComponent extends AbstractFdNgxClass {

    /** Number of columns for the grid. */
    @Input()
    col: number;

    /** Whether the grid shoul have a gap. */
    @Input()
    @HostBinding('class.fd-panel-grid--nogap')
    nogap: boolean = false;

    /** @hidden */
    @HostBinding('class.fd-panel-grid')
    fdPanelGridClass: boolean = true;

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

    /** @hidden */
    _setProperties() {
        if (this.col) {
            this._addClassToElement('fd-panel-grid--' + this.col + 'col');
        }
    }
}
