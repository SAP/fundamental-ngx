import { Directive, booleanAttribute, input } from '@angular/core';

@Directive({
    selector: '[fdTableHeader], [fd-table-header]',
    host: {
        class: 'fd-table__header',
        '[class.fd-table__header--no-horizontal-borders]': 'noBorderX()',
        '[class.fd-table__header--no-vertical-borders]': 'noBorderY()',
        '[class.fd-table__header--non-interactive]': 'nonInteractive()',
        '[attr.role]': 'role()'
    }
})
export class TableHeaderDirective {
    /** ARIA role for the table header */
    readonly role = input('rowgroup');

    /** Whether or not to show the table header's horizontal borders */
    readonly noBorderX = input(false, { transform: booleanAttribute });

    /** Whether or not to show the table header's vertical borders */
    readonly noBorderY = input(false, { transform: booleanAttribute });

    /**
     * Whether or not the header cells should be interactive
     * (have hover and active states)
     * default: false
     */
    readonly nonInteractive = input(false, { transform: booleanAttribute });
}
