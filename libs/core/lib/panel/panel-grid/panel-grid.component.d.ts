import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Use a panel grid to arrange panels evenly in a grid layout.
 */
export declare class PanelGridComponent extends AbstractFdNgxClass {
    private elementRef;
    /** Number of columns for the grid. */
    col: number;
    /** Whether the grid should have a gap. */
    nogap: boolean;
    /** @hidden */
    constructor(elementRef: ElementRef);
    /** @hidden */
    _setProperties(): void;
}
