import { Input, Component, Inject, ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * Badge component, used to indicate status.
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
@Component({
    selector: 'fd-badge',
    templateUrl: './badge-label.component.html'
})
export class BadgeComponent extends AbstractFdNgxClass {
    /** @Input Color coded status for the badge. Options are 'success', 'warning', and 'error'. Leave empty for default badge. */
    @Input() status;

    /** @Input Modifier for the badge. Options are 'pill' and 'filled'. Leave empty for normal. */
    @Input() modifier;

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-badge');
        if (this.status) {
            this._addClassToElement('fd-badge--' + this.status);
        }
        if (this.modifier) {
            this._addClassToElement('fd-badge--' + this.modifier);
        }
    }

    /** @hidden */
    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
