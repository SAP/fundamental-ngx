import { Directive } from '@angular/core';

/**
 * The middle section of the Bar component.
 */
@Directive({
    selector: '[fd-bar-middle]',
    host: {
        class: 'fd-bar__middle'
    }
})
export class BarMiddleDirective { }
