import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { AbstractCustomStyleManager } from '../utils/abstract-custom-style-manager';

@Directive({
    selector: 'fd-tile-grid'
})
export class TileGridDirective extends AbstractCustomStyleManager {
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
