import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Panels are used to encapsulate part of the content, form elements, lists, collections, etc., on a page.
 */
export declare class PanelComponent extends AbstractFdNgxClass {
    private elementRef;
    /** @Input Column span for the panel in the grid system */
    columnSpan: number;
    /** @Input Background image of the panel. */
    backgroundImage: string;
    /** @hidden */
    fdPanelClass: boolean;
    /** @hidden */
    _setProperties(): void;
    /** @hidden */
    constructor(elementRef: ElementRef);
}
