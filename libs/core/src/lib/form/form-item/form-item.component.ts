import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { FormItemControl, FORM_ITEM_CONTROL } from './../form-item-control/form-item-control';
import { FormLabelComponent } from './../form-label/form-label.component';

/**
 * Directive to be applied to the parent of a form control.
 *
 * ```html
 * <div fd-form-item>
 *     <input fd-form-control type="text" />
 * </div>
 * ```
 */
@Component({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-form-item]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./form-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormItemComponent implements AfterViewInit {
    /** Whether the form item is inline. */
    @Input()
    @HostBinding('class.fd-form-item--inline')
    isInline = false;

    /** Whether the form item is horizontal. */
    @Input()
    @HostBinding('class.fd-form-item--horizontal')
    horizontal = false;

    /** @hidden */
    @HostBinding('class.fd-form-item')
    fdFormItemClass = true;

    /** @hidden */
    @ContentChild(FormLabelComponent)
    formLabel?: FormLabelComponent;

    /** @hidden */
    @ContentChild(FORM_ITEM_CONTROL)
    formItemControl?: FormItemControl;

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.formLabel && this.formItemControl && !this.formItemControl.ariaLabelledBy) {
            this.formItemControl.ariaLabelledBy = this.formLabel.formLabelId;
        }
    }
}
