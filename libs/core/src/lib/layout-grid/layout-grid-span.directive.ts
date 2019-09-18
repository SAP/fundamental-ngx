import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Directive({
  selector: '[fdLayoutGridSpan], [fd-layout-grid-span]'
})
export class LayoutGridSpanDirective extends AbstractFdNgxClass {

    /** @Input Column span for the grid system */
    @Input()
    columnSpan: number;

    /** @hidden */
    _setProperties() {
        if (this.columnSpan) {
            this._addClassToElement('fd-layout-grid__span-column-' + this.columnSpan);
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
