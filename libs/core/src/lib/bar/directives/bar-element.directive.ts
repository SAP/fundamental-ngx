import { Directive, HostBinding, Input } from '@angular/core';
import deprecated from 'deprecated-decorator';

/**
 * An element of the Bar.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-bar-element'
})
export class BarElementDirective {
    /** Whether the element should take the whole width of the container. */
    @Input()
    @HostBinding('class.fd-bar__element--full-width')
    fullWidth = false;

    /** @deprecated */
    @Input()
    @deprecated()
    isTitle = false;

    /** @hidden */
    @HostBinding('class.fd-bar__element')
    barElement = true;
}
