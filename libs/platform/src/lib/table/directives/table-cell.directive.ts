import { Directive, TemplateRef } from '@angular/core';

/** Column cell container. */
// tslint:disable-next-line:directive-selector
@Directive({ selector: 'fdp-table-cell' })
export class FdpTableCell {}

/**
 * Cell definition for a platform table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({ selector: '[fdpCellDef]' })
export class FdpCellDef {
    constructor(public templateRef: TemplateRef<any>) {}
}
