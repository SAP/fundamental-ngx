import { booleanAttribute, Directive, input } from '@angular/core';

/**
 * The right side area of the Bar component.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-bar-right]',
    host: {
        class: 'fd-bar__right',
        '[class.fd-bar__right--stack-contents-vertically]': 'stackContentsVertically()'
    },
    standalone: true
})
export class BarRightDirective {
    /** Whether to stack the contents of this portion of the bar vertically. */
    readonly stackContentsVertically = input(false, { transform: booleanAttribute });
}
