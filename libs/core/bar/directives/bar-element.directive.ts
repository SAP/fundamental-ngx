import { booleanAttribute, Directive, input } from '@angular/core';

/**
 * An element of the Bar.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-bar-element',
    host: {
        class: 'fd-bar__element',
        '[class.fd-bar__element--full-width]': 'fullWidth()'
    }
})
export class BarElementDirective {
    /** Whether the element should take the whole width of the container. */
    readonly fullWidth = input(false, { transform: booleanAttribute });
}
