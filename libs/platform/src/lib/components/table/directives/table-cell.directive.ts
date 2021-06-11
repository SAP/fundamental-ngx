import { Directive, Input, TemplateRef } from '@angular/core';

/** Column cell container. */
// tslint:disable-next-line:directive-selector
@Directive({ selector: 'fdp-table-cell' })
export class FdpTableCell {
    /** Column cell custom ARIA label */
    @Input()
    ariaLabelKey: string;

    /** Whether cell inner is focusable, needed for the screen readers */
    @Input()
    focusable = false;
}

/**
 * Cell definition for a platform table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({ selector: '[fdpCellDef]' })
export class FdpCellDef {
    constructor(public templateRef: TemplateRef<any>) {}
}
