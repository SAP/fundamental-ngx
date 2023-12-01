import { Directive } from '@angular/core';

/**
 * The right side area of the Bar component.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-bar-right]',
    host: {
        class: 'fd-bar__right'
    },
    standalone: true
})
export class BarRightDirective {}
