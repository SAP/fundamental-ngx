import { Component, ElementRef, Inject, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Component({
    selector: 'fd-tile',
    host: {
        '[attr.role]': "(this.isButton === true ? 'button' : '')"
    },
    templateUrl: './tile.component.html'
})
export class TileComponent extends AbstractFdNgxClass {
    @Input() disabled: boolean = false;

    @Input() isButton: boolean = false;

    @Input() rowSpan: number;

    @Input() columnSpan: number;

    @Input() colorAccent: number;

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

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
