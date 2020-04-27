import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * Use a layout grid to arrange components evenly in a grid layout.
 */
@Component({
    selector: 'fd-layout-grid',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./layout-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutGridComponent extends AbstractFdNgxClass {
    /** @Input Column span for the grid system */
    @Input()
    col: number;

    /** Whether the grid should have a gap. */
    @Input()
    nogap: boolean = false;

    /** Whether the grid should have a gap. */
    @Input()
    gapSize: number;

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-layout-grid');

        if (this.nogap) {
            this._addClassToElement('fd-layout-grid--no-gap');
        }

        if (this.gapSize) {
            this._addClassToElement('fd-layout-grid--gap-' + this.gapSize);
        }

        if (this.col) {
            this._addClassToElement('fd-layout-grid--col-' + this.col);
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
