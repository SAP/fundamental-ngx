import { Directive } from '@angular/core';

@Directive({
    selector: '[fdTableFooter], [fd-table-footer]',
    host: {
        class: 'fd-table__footer'
    }
})
export class TableFooterDirective {}
