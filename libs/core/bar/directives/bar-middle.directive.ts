import { Directive } from '@angular/core';

/**
 * The middle section of the Bar component.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-bar-middle]',
    host: {
        class: 'fd-bar__middle'
    },
    standalone: true
})
export class BarMiddleDirective {}
