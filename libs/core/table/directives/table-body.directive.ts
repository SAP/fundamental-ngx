import { Directive, booleanAttribute, input } from '@angular/core';

@Directive({
    selector: '[fdTableBody], [fd-table-body]',
    host: {
        class: 'fd-table__body',
        '[class.fd-table__body--no-horizontal-borders]': 'noBorderX()',
        '[class.fd-table__body--no-vertical-borders]': 'noBorderY()',
        '[attr.role]': 'role()'
    }
})
export class TableBodyDirective {
    /** ARIA role for the table body */
    readonly role = input('rowgroup');

    /**  Whether to show the table body's horizontal borders */
    readonly noBorderX = input(false, { transform: booleanAttribute });

    /**  Whether to show the table body's vertical borders */
    readonly noBorderY = input(false, { transform: booleanAttribute });
}
