import { Input, Component, Inject, ElementRef } from '@angular/core';
import { AbstractCustomStyleManager } from '../utils/abstract-custom-style-manager';

@Component({
    selector: 'fd-badge',
    templateUrl: './badge-label.component.html'
})
export class BadgeComponent extends AbstractCustomStyleManager {
    @Input() status;

    @Input() modifier;

    _setProperties() {
        this._addClassToElement('fd-badge');
        if (this.status) {
            this._addClassToElement('fd-badge--' + this.status);
        }
        if (this.modifier) {
            this._addClassToElement('fd-badge--' + this.modifier);
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
