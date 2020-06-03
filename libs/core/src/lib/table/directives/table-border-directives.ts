import { Directive } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-table-no-horizontal-borders]',
    host: {
        '[class.fd-table--no-horizontal-borders]': 'true'
    }
})
export class TableNoHorizontalBordersDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-table-no-vertical-borders]',
    host: {
        '[class.fd-table--no-vertical-borders]': 'true'
    }
})
export class TableNoVerticalBordersDirective {}
