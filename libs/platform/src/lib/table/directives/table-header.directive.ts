import { Directive, TemplateRef } from '@angular/core';
import { FdpCellDefContext } from './table-cell.directive';

export interface FdpHeaderCellDefContext<T = any> {
    $implicit: T;
}

/** Column header container. */
// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'fdp-table-header' })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FdpTableHeader {}

/**
 * Header cell definition for a platform table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({ selector: '[fdpHeaderCellDef]' })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FdpHeaderCellDef<T = any> {
    /** @hidden */
    constructor(public templateRef: TemplateRef<FdpCellDefContext<T>>) {}

    /** @hidden */
    static ngTemplateContextGuard(dir: FdpHeaderCellDef, ctx: FdpHeaderCellDefContext): ctx is FdpHeaderCellDefContext {
        return true;
    }
}
