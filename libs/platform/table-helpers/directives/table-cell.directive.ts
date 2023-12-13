import { Directive, Input, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditableTableCell } from '../table-cell.class';

export interface FdpCellDefContext<T = any> {
    $implicit: T;
    popping: boolean;
    rowIndex: number;
}

/** Column cell container. */
// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'fdp-table-cell', standalone: true })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FdpTableCell {}

/**
 * Cell definition for a platform table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({ selector: '[fdpCellDef]', standalone: true })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FdpCellDef<T = any> {
    /** Property to support typings. */
    @Input()
    fdpCellDefAs: T;
    /** @ignore */
    constructor(public templateRef: TemplateRef<FdpCellDefContext<T>>) {}

    /** @ignore */
    static ngTemplateContextGuard<T>(dir: FdpCellDef<T>, ctx: FdpCellDefContext): ctx is FdpCellDefContext<T> {
        return true;
    }
}

@Directive({ selector: '[fdpEditableCellDef]', standalone: true })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FdpEditableCellDef {
    /** @ignore */
    constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
    selector: '[fdpEditableCellForm]',
    standalone: true,
    providers: [{ provide: EditableTableCell, useExisting: FdpEditableCellFormDirective }]
})
export class FdpEditableCellFormDirective implements EditableTableCell {
    /** @ignore */
    constructor(public form: NgForm) {}
}
