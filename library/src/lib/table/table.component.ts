import { Directive } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-table]',
    host: {
        class: 'fd-table'
    }
})
export class TableDirective {}
