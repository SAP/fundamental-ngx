import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[fdColumnSortable]',
    host: {
        class: 'fd-table__sort-column',
        '[class.fd-table__sort-column--dsc]': 'sortDir === "desc" || sortDir === "dsc"',
        '[class.fd-table__sort-column--asc]': 'sortDir === "asc"'
    }
})
export class ColumnSortableDirective {

    @Input() sortDir: SortDirections;

}
export type SortDirections = 'asc' | 'dsc' | 'desc' | 'none';
