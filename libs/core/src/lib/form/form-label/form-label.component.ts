import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Label to be linked to a form control.
 *
 * ```html
 * <label fd-form-label for="input-id">Label Text</label>
 * <input fd-form-control type="text" id="input-id" />
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: '[fd-form-label]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./form-label.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FormLabelComponent {
    /** @hidden */
    @HostBinding('class.fd-form-label')
    fdFormLabelClass: boolean = true;
}
