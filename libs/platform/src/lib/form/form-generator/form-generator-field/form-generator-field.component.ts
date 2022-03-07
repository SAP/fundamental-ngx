import { Component, forwardRef, Input, Provider, TemplateRef, ViewChild } from '@angular/core';
import { FormField } from '@fundamental-ngx/platform/shared';
import { FormFieldComponent } from '../../form-group/form-field/form-field.component';
import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../../form-group/constants';
import { DynamicFormControl } from '../dynamic-form-control';
import { DynamicFormGroup } from '../interfaces/dynamic-form-group';
import { HintOptions } from '../interfaces/hint-options';

const defaultHintOptions: HintOptions = {
    text: undefined,
    placement: 'left',
    position: 'after',
    trigger: ['mouseenter', 'mouseleave', 'focusin', 'focusout'],
    glyph: 'message-information'
};

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
    @Input()
    get field(): DynamicFormControl {
        return this._field;
    }

    set field(value: DynamicFormControl) {
        this._field = value;
        this.hintOptions = this._calculateHintOptions(value);
    }

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

    hintOptions: HintOptions;

    private _field: DynamicFormControl;

    private _calculateHintOptions(field: DynamicFormControl): HintOptions {
        let hintOptions: HintOptions;
        const formItemHintOptions: string | HintOptions = field.formItem?.guiOptions.hint;
        const hintPlacement = field.formItem?.guiOptions.hintPlacement;
        if (this.isHintOptions(formItemHintOptions)) {
            hintOptions = {
                ...defaultHintOptions,
                placement: hintPlacement || defaultHintOptions.placement,
                ...formItemHintOptions
            };
        } else {
            hintOptions = {
                ...defaultHintOptions,
                placement: hintPlacement || defaultHintOptions.placement,
                text: formItemHintOptions
            };
        }
        if (formItemHintOptions) {
            console.log({ hintOptions, item: field.formItem, formItemHintOptions });
        }
        return hintOptions;
    }

    private isHintOptions(opts: string | HintOptions): opts is HintOptions {
        return opts && typeof opts !== 'string';
    }
}
