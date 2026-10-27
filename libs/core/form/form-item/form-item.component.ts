import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    HostBinding,
    Input,
    Signal,
    ViewEncapsulation,
    WritableSignal
} from '@angular/core';
import { FORM_ITEM_CONTROL, FormItemControl } from '../form-item-control/form-item-control';
import { FormLabelComponent } from '../form-label/form-label.component';

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
    styleUrl: './form-item.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormItemComponent implements AfterContentInit {
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
    ngAfterContentInit(): void {
        if (this.formLabel && this.formItemControl && !this._getAriaLabelledBy()) {
            this._setAriaLabelledBy(this.formLabel.formLabelId);
        }
    }

    /** @hidden Reads `ariaLabelledBy` whether the control exposes it as a signal or a plain property. */
    private _getAriaLabelledBy(): string | null | undefined {
        const ariaLabelledBy = this.formItemControl?.ariaLabelledBy;
        return typeof ariaLabelledBy === 'function' ? ariaLabelledBy() : ariaLabelledBy;
    }

    /** @hidden Writes `ariaLabelledBy` whether the control exposes it as a writable signal or a plain property. */
    private _setAriaLabelledBy(value: string | null | undefined): void {
        if (!this.formItemControl) {
            return;
        }
        const ariaLabelledBy = this.formItemControl.ariaLabelledBy;
        if (this._isWritableSignal(ariaLabelledBy)) {
            ariaLabelledBy.set(value);
        } else if (typeof ariaLabelledBy !== 'function') {
            this.formItemControl.ariaLabelledBy = value;
        }
    }

    /** @hidden Narrows a form-item control field to a writable signal. */
    private _isWritableSignal(
        value: string | null | undefined | Signal<string | null | undefined>
    ): value is WritableSignal<string | null | undefined> {
        return typeof value === 'function' && typeof (value as Partial<WritableSignal<unknown>>).set === 'function';
    }
}
