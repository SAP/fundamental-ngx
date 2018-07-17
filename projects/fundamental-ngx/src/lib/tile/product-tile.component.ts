import { Component, ElementRef, Inject, Input } from '@angular/core';
import { AbstractCustomClassManager } from '../utils/AbstractCustomClassManager';

@Component({
    selector: 'fd-product-tile',
    host: {
        '[attr.role]': "(this.isButton === true ? 'button' : '')"
    },
    templateUrl: './product-tile.component.html'
})
export class ProductTileComponent extends AbstractCustomClassManager {
    @Input() disabled: boolean = false;

    @Input() isButton: boolean = false;

    _setProperties() {
        this._addClassToElement('fd-product-tile');
        if (this.disabled) {
            this._addClassToElement('is-disabled');
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
