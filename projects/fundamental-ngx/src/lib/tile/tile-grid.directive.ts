import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { AbstractCustomClassManager } from '../utils/AbstractCustomClassManager';

@Directive({
    selector: 'fd-tile-grid'
})
export class TileGridDirective extends AbstractCustomClassManager {
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
