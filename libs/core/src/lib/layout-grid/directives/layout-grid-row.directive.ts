import { Directive } from '@angular/core';

@Directive({
    selector: '[fd-layout-grid-row], [fdLayoutGridRow]',
    host: {
        class: 'fd-row'
    }
})
export class LayoutGridRowDirective {}
