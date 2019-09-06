import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Label directive, used to indicate status, without any background or border
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
export declare class LabelDirective extends AbstractFdNgxClass {
    private elementRef;
    /** Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label. */
    status: string;
    /** @hidden */
    _setProperties(): void;
    /** @hidden */
    constructor(elementRef: ElementRef);
}
