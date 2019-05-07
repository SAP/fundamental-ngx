import { Directive, HostBinding } from '@angular/core';

/**
 * Label to be linked to a form control.
 *
 * ```html
 * <label fd-form-label for="input-id">Label Text</label>
 * <input fd-form-control type="text" id="input-id" />
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-form-label]',
})
export class FormLabelDirective {
    /** @hidden */
    @HostBinding('class.fd-form__label')
    fdFormLabelClass: boolean = true;
}
