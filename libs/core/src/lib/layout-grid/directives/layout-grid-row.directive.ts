import { Directive } from '@angular/core';

@Directive({
    selector: '[fdLayoutGridRow]',
    host: {
        class: 'fd-row'
    }
})
export class LayoutGridRowDirective { }
