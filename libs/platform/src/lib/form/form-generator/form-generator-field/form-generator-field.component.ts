import { Component, forwardRef, Input, Provider, TemplateRef, ViewChild } from '@angular/core';
import { FormField } from '@fundamental-ngx/platform/shared';
import { FormFieldComponent } from '../../form-group/form-field/form-field.component';
import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../../form-group/constants';
import { DynamicFormControl } from '../dynamic-form-control';
import { DynamicFormGroup } from '../public_api';

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
     * Form generator's form.
     */
    @Input() form: DynamicFormGroup;

    /**
     * Form control.
     */
    @Input() field: DynamicFormControl;

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
     * Than lower number then higher priority.
     */
    @Input() rank: number;

    /**
     * Whether or not this field should be visible.
     */
    @Input() shouldShow: boolean;

    /**
     * Form field component.
     */
    @ViewChild(FormFieldComponent) fieldRenderer: FormFieldComponent;
}
