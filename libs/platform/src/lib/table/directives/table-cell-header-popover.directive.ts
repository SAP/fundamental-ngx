import { Directive, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface TableCellHeaderPopoverDirectiveContext {
    $implicit: Observable<TemplateRef<any>[]>;
}

@Directive({
    selector: '[fdpTableCellHeaderPopover]'
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
