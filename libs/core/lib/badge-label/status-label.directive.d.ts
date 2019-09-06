import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Status Label directive with some default icons based on status input used to indicate status.
 * Icons are used to easily highlight the state of an object.
 */
export declare class StatusLabelDirective extends AbstractFdNgxClass {
    private elementRef;
    /** Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label. */
    status: string;
    /** Built-in status icon. Options include 'available', 'away', 'busy', and 'offline'. */
    statusIcon: string;
    /** The icon used with the status indicator. See the icon page for the list of icons. */
    icon: string;
    /** @hidden */
    _setProperties(): void;
    /** @hidden */
    constructor(elementRef: ElementRef);
}
