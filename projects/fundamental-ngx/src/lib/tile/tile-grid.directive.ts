import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { CustomClassBaseComponent } from '../utils/custom-class-base-component';

@Directive({
    selector: 'fd-tile-grid'
})
export class TileGridDirective extends CustomClassBaseComponent {
    @Input() col;

    _setProperties() {
        this._addClassToElement('fd-tile-grid');
        if (this.col) {
            this._addClassToElement('fd-tile-grid--' + this.col + 'col');
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
