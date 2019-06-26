import { Directive, ElementRef, Input} from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * Badge component, used to indicate status.
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-status-label]'
})
export class StatusLabelDirective extends AbstractFdNgxClass {
    /** Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label. */
    @Input() status: string = '';

    /** Built-in status icon. Options include 'available', 'away', 'busy', and 'offline'. */
    @Input() statusIcon: string = '';

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
