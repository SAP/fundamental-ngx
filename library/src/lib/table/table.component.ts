import { Directive } from '@angular/core';
/**
 * The directive that represents a table.
 * A table is a set of tabular data. Line items can support data, images and actions.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-table]',
    host: {
        class: 'fd-table'
    }
})
export class TableDirective {}
