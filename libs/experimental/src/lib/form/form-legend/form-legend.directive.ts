import { Directive, HostBinding } from '@angular/core';

/**
 * Applies css to a legend html element.
 *
 * <legend fd-form-legend>Legend</legend>
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fn-form-legend]'
})
export class ExperimentalFormLegendDirective {
    /** @hidden */
    @HostBinding('class.fd-fieldset__legend')
    fdFormLegendClass = true;
}
