import { Component, forwardRef, Input, Provider, TemplateRef, ViewChild } from '@angular/core';
import { FieldHintOptions, FormField } from '@fundamental-ngx/platform/shared';
import { FormFieldComponent } from '../../form-group/form-field/form-field.component';
import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../../form-group/constants';
import { DynamicFormControl } from '../dynamic-form-control';
import { DynamicFormGroup } from '../interfaces/dynamic-form-group';

const formFieldProvider: Provider = {
    provide: FormField,
    useExisting: forwardRef(() => FormGeneratorFieldComponent)
};

const formGroupChildProvider: Provider = {
    provide: FORM_GROUP_CHILD_FIELD_TOKEN,
    useExisting: forwardRef(() => FormGeneratorFieldComponent)
};

@Component({
    selector: 'fdp-form-generator-field',
    templateUrl: './form-generator-field.component.html',
    styleUrls: ['./form-generator-field.component.scss'],
    providers: [formFieldProvider, formGroupChildProvider]
})
export class FormGeneratorFieldComponent {
    /**
     * Form control.
     */
    @Input() field: DynamicFormControl;

    /**
     * Form generator's form.
     */
    @Input() form: DynamicFormGroup;

    /**
     * Translations template reference.
     */
    @Input() i18n: TemplateRef<any>;

    /**
     * Form control name
     */
    @Input() formFieldName: string;

    /**
     * Path of the form group.
     */
    @Input() formGroupNamePath: string;

    /**
     * Rank is used for ordering.
     * The lower number the higher priority.
     */
    @Input() rank: number;

    /**
     * Whether this field should be visible.
     */
    @Input() shouldShow: boolean;

    /**
     * Describes hint options for field label
     */
    @Input() hintOptions?: FieldHintOptions;

    /**
     * Form field component.
     */
    @ViewChild(FormFieldComponent) fieldRenderer: FormFieldComponent;

    /** @hidden */
    get _placeholder(): string {
        if (!this.field) {
            return '';
        }
        if (this.field.formItem?.placeholder) {
            return this.field.formItem?.placeholder as string;
        }
        if (this.field.formItem?.useMessageAsPlaceholder) {
            return this.field.formItem?.message as string;
        }
        return '';
    }
}
