import { Directive } from '@angular/core';

@Directive({
    selector: '[fdTableFixed], [fd-table-fixed]',
    host: {
        class: 'fd-table--fixed'
    }
})
export class TableFixedDirective {}
