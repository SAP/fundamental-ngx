import { Component, ElementRef, Inject, Input } from '@angular/core';
import { CustomClassBaseComponent } from '../utils/custom-class-base-component';

@Component({
    selector: 'fd-tile',
    host: {
        '[attr.role]': "(this.isButton === true ? 'button' : '')"
    },
    templateUrl: './tile.component.html'
})
export class TileComponent extends CustomClassBaseComponent {
    @Input() disabled: boolean = false;

    @Input() isButton: boolean = false;

    @Input() rowSpan;

    @Input() columnSpan;

    @Input() colorAccent;

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
