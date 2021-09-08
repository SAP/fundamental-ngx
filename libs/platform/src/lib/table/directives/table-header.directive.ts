import { Directive, TemplateRef } from '@angular/core';

/** Column header container. */
// tslint:disable-next-line:directive-selector
@Directive({ selector: 'fdp-table-header' })
export class FdpTableHeader {}

/**
 * Header cell definition for a platform table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({ selector: '[fdpHeaderCellDef]' })
export class FdpHeaderCellDef {
    constructor(public templateRef: TemplateRef<any>) {}
}
