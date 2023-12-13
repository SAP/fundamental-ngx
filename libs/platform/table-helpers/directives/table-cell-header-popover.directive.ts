import { Directive, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface TableCellHeaderPopoverDirectiveContext {
    $implicit: Observable<TemplateRef<any>[]>;
}

@Directive({
    selector: '[fdpTableCellHeaderPopover]',
    standalone: true
})
export class TableCellHeaderPopoverDirective {
    /** @ignore */
    constructor(public templateRef: TemplateRef<TableCellHeaderPopoverDirectiveContext>) {}

    /** @ignore */
    static ngTemplateContextGuard(
        directive: TableCellHeaderPopoverDirective,
        context: unknown
    ): context is TableCellHeaderPopoverDirectiveContext {
        return true;
    }
}
