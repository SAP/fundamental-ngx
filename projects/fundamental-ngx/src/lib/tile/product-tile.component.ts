import { Component, ElementRef, Inject, Input } from '@angular/core';
import { AbstractCustomStyleManager } from '../utils/abstract-custom-style-manager';

@Component({
    selector: 'fd-product-tile',
    host: {
        '[attr.role]': "(this.isButton === true ? 'button' : '')"
    },
    templateUrl: './product-tile.component.html'
})
export class ProductTileComponent extends AbstractCustomStyleManager {
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
