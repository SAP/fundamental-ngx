import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

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
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLabelComponent {
    /** @hidden */
    @HostBinding('class.fd-form-label')
    fdFormLabelClass: boolean = true;

    /** Whether form is required */
    @Input()
    @HostBinding('class.fd-form-label--required')
    required: boolean = false;

    /** Whether label is for checkbox */
     @Input()
    @HostBinding('class.fd-form-label--checkbox')
    checkbox: boolean = false;

    /** Whether label is for radio */
    @Input()
    @HostBinding('class.fd-form-label--radio')
    radio: boolean = false;

    /** Whether label is for inline-help */
    @Input()
    @HostBinding('class.fd-form-label--inline-help')
    inlineHelp: boolean = false;
}
