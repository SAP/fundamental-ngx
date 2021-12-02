import { Directive, HostBinding } from '@angular/core';

/**
 * Applies css to a legend html element.
 *
 * <legend fd-form-legend>Legend</legend>
 */
@Directive({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-form-legend]'
})
export class FormLegendDirective {
    /** @hidden */
    @HostBinding('class.fd-fieldset__legend')
    fdFormLegendClass = true;
}
