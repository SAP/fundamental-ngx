import { Input, Component, Inject, ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Component({
    selector: 'fd-badge',
    templateUrl: './badge-label.component.html'
})
export class BadgeComponent extends AbstractFdNgxClass {
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
