import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    contentChild,
    input,
    ViewEncapsulation
} from '@angular/core';
import { FORM_ITEM_CONTROL, FormItemControl } from '../form-item-control/form-item-control';
import { FormLabelComponent } from '../form-label/form-label.component';
import { FormMessageComponent } from '../form-message/form-message.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-form-item]',
    template: `<ng-content></ng-content>`,
    styleUrl: './form-item.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    host: {
        class: 'fd-form-item',
        '[class.fd-form-item--inline]': 'isInline()',
        '[class.fd-form-item--horizontal]': 'horizontal()'
    }
})
export class FormItemComponent implements AfterViewInit {
    /** Whether the form item is inline. */
    isInline = input(false);

    /** Whether the form item is horizontal. */
    horizontal = input(false);

    /** @hidden */
    formLabel = contentChild(FormLabelComponent);

    /** @hidden */
    formMessage = contentChild(FormMessageComponent);

    /** @hidden */
    formItemControl = contentChild<FormItemControl>(FORM_ITEM_CONTROL);

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.formLabel() && this.formItemControl && !this.formItemControl()?.ariaLabelledBy) {
            const formItemControl = this.formItemControl();

            if (formItemControl) {
                formItemControl.ariaLabelledBy = this.formLabel()?.id();
                formItemControl.formItemAriaDescribedBy?.set(this.formMessage()?.id());
            }
        }
    }
}
