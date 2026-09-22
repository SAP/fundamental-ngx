import { Directive, input } from '@angular/core';

@Directive({
    selector: '[fdTableFooter], [fd-table-footer]',
    host: {
        class: 'fd-table__footer',
        '[attr.role]': 'role()'
    }
})
export class TableFooterDirective {
    /** ARIA role for the table footer */
    readonly role = input('rowgroup');
}
