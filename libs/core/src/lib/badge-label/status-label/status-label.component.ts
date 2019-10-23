import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
import { BadgeStatus, BadgeIconStatus } from '../label/label.component';

/**
 * Status Label component with some default icons based on status input used to indicate status.
 * Icons are used to easily highlight the state of an object.
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-status-label]',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./status-label.component.scss']
})
export class StatusLabelComponent extends AbstractFdNgxClass {
    /** Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label. */
    @Input() status: BadgeStatus;

    /** Built-in status icon. Options include 'available', 'away', 'busy', and 'offline'. */
    @Input() statusIcon: BadgeIconStatus;

    /** The icon used with the status indicator. See the icon page for the list of icons. */
    @Input() icon: string = '';

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-status-label');
        if (this.status) {
            this._addClassToElement('fd-status-label--' + this.status);
        }
        if (this.statusIcon) {
            this._addClassToElement('fd-status-label--' + this.statusIcon);
        }
        if (this.icon) {
            this._addClassToElement('sap-icon--' + this.icon);
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
