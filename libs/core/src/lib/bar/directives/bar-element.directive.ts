import { Directive, HostBinding, Input } from '@angular/core';

/**
 * An element of the Bar.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'fd-bar-element',
})
export class BarElementDirective {
    /** Whether the element should take the whole width of the container. */
    @Input()
    @HostBinding('class.fd-bar__element--full-width')
    fullWidth: boolean = false;

    /** @hidden */
    @HostBinding('class.fd-bar__element')
    barElement: boolean = true;
}
