import { Directive, Input, HostBinding } from '@angular/core';

/**
 * Directive to be applied to the parent of a form control.
 *
 * ```html
 * <div fd-form-item>
 *     <input fd-form-control type="text" />
 * </div>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-form-item]'
})
export class FormItemDirective {

    /** Whether the form item is a checkbox. */
    @Input()
    @HostBinding('class.fd-form__item--check')
    isCheck: boolean = false;

    /** Whether the form item is inline. */
    @Input()
    @HostBinding('class.fd-form__item--inline')
    isInline: boolean = false;

    /** @hidden */
    @HostBinding('class.fd-form__item')
    fdFormItemClass: boolean = true;
}
