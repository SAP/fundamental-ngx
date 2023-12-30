import { Directive, Signal, TemplateRef } from '@angular/core';

export interface TableCellHeaderPopoverDirectiveContext {
    $implicit: Signal<TemplateRef<any>[]>;
}

@Directive({
    selector: '[fdpTableCellHeaderPopover]',
    standalone: true
})
export class TableCellHeaderPopoverDirective {
    /** @hidden */
    constructor(public templateRef: TemplateRef<TableCellHeaderPopoverDirectiveContext>) {}

    /** @hidden */
    static ngTemplateContextGuard(
        directive: TableCellHeaderPopoverDirective,
        context: unknown
    ): context is TableCellHeaderPopoverDirectiveContext {
        return true;
    }
}
