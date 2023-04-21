import { Directive } from '@angular/core';

/**
 * The left side area of the Bar component.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-bar-left]',
    host: {
        class: 'fd-bar__left'
    },
    standalone: true
})
export class BarLeftDirective {}
