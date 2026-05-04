import { booleanAttribute, Directive, input } from '@angular/core';

/**
 * Applies css to a legend html element.
 *
 * <legend fd-form-legend>Legend</legend>
 */
@Directive({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-form-legend]',
    host: {
        class: 'fd-fieldset__legend',
        '[class.is-disabled]': 'disabled()'
    }
})
export class FormLegendDirective {
    /** Whether the legend is disabled. */
    readonly disabled = input(false, { transform: booleanAttribute });
}
