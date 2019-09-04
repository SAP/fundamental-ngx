import { Input, Directive, ElementRef, HostBinding } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * Badge directive, used to indicate status.
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-badge]'
})
export class BadgeDirective extends AbstractFdNgxClass {
    /** Color coded status for the badge. Options are 'success', 'warning', and 'error'. Leave empty for default badge. */
    @Input() status;

    /** Modifier for the badge. Options are 'pill' and 'filled'. Leave empty for normal. */
    @Input() modifier;

    /** @hidden */
    @HostBinding('class.fd-badge')
    fdBadgeClass: boolean = true;

    /** @hidden */
    _setProperties() {
        if (this.status) {
            this._addClassToElement('fd-badge--' + this.status);
        }
        if (this.modifier) {
            this._addClassToElement('fd-badge--' + this.modifier);
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
