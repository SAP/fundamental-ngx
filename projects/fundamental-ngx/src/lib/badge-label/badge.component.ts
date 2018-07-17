import { Input, Component, Inject, ElementRef } from '@angular/core';
import { AbstractCustomClassManager } from '../utils/AbstractCustomClassManager';

@Component({
    selector: 'fd-badge',
    templateUrl: './badge-label.component.html'
})
export class BadgeComponent extends AbstractCustomClassManager {
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
