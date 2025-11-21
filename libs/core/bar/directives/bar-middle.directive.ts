import { Directive, input } from '@angular/core';

/**
 * The middle section of the Bar component.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-bar-middle]',
    host: {
        class: 'fd-bar__middle',
        '[class.fd-bar__middle--stack-contents-vertically]': 'stackContentsVertically()'
    },
    standalone: true
})
export class BarMiddleDirective {
    /** Whether to stack the contents of this portion of the bar vertically. */
    stackContentsVertically = input(false);
}
