import { Directive } from '@angular/core';

@Directive({
    selector: '[fdTableInner], [fd-table-inner]',
    host: {
        class: 'fd-table__inner'
    }
})
export class TableInnerDirective {}
