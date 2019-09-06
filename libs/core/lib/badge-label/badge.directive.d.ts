import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Badge directive, used to indicate status.
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
export declare class BadgeDirective extends AbstractFdNgxClass {
    private elementRef;
    /** Color coded status for the badge. Options are 'success', 'warning', and 'error'. Leave empty for default badge. */
    status: any;
    /** Modifier for the badge. Options are 'pill' and 'filled'. Leave empty for normal. */
    modifier: any;
    /** @hidden */
    fdBadgeClass: boolean;
    /** @hidden */
    _setProperties(): void;
    /** @hidden */
    constructor(elementRef: ElementRef);
}
