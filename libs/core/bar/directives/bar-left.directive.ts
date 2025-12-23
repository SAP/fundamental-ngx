import { Directive, input } from '@angular/core';

/**
 * The left side area of the Bar component.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-bar-left]',
    host: {
        class: 'fd-bar__left',
        '[class.fd-bar__left--stack-contents-vertically]': 'stackContentsVertically()'
    },
    standalone: true
})
export class BarLeftDirective {
    /** Whether to stack the contents of this portion of the bar vertically. */
    stackContentsVertically = input(false);
}
