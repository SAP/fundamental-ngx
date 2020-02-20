import { Directive, HostBinding, Input } from '@angular/core';

/**
 * An element of the Bar.
 */
@Directive({
    selector: 'fd-bar-element',
    host: {
        class: 'fd-bar__element'
    }
})
export class BarElementDirective {
    /** Whether the element should take the whole width of the container. */
    @Input()
    @HostBinding('class.fd-bar__element--full-width')
    fullWidth: boolean = false;
}
