import { Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

/**
 * Badge component, used to indicate status.
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-badge]',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./badge-label.component.scss']
})
export class BadgeComponent extends AbstractFdNgxClass {
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
