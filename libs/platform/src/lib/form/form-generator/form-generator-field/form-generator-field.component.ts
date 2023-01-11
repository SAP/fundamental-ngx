import {
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input,
    OnInit,
    Provider,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FD_FORM_FIELD } from '@fundamental-ngx/cdk/forms';
import { FieldHintOptions, PlatformFormField } from '@fundamental-ngx/platform/shared';
import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../../form-group/constants';
import { FormFieldComponent } from '../../form-group/form-field/form-field.component';
import { DynamicFormControl } from '../dynamic-form-control';
import { FormGeneratorService } from '../form-generator.service';
import { DynamicFormGroup } from '../interfaces/dynamic-form-group';
import { DynamicFormItemValidationObject } from '../interfaces/dynamic-form-item';

const formFieldProvider: Provider = {
    provide: FD_FORM_FIELD,
    useExisting: forwardRef(() => FormGeneratorFieldComponent)
};

const formGroupChildProvider: Provider = {
    provide: FORM_GROUP_CHILD_FIELD_TOKEN,
    useExisting: forwardRef(() => FormGeneratorFieldComponent)
};

@Component({
    selector: 'fdp-form-generator-field',
    templateUrl: './form-generator-field.component.html',
    providers: [formFieldProvider, formGroupChildProvider],
    encapsulation: ViewEncapsulation.None
})
export class FormGeneratorFieldComponent implements OnInit {
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
    @ViewChild(forwardRef(() => FormFieldComponent)) fieldRenderer: PlatformFormField;

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

    /** @hidden */
    _errorModels: { type: string; value: any }[] = [];

    /** @hidden */
    constructor(private _fgService: FormGeneratorService, private _cdr: ChangeDetectorRef) {}

    /** @hidden */
    ngOnInit(): void {
        this._errorModels = this._getErrors();
        this._cdr.detectChanges();
    }

    /** @hidden */
    private _getErrors(): { type: string; value: any }[] {
        const registeredErrors = this._fgService.validationErrorHints;

        const returnErrors: { type: string; value: any }[] = [
            {
                type: `${this.field.formItem.name}Validator`,
                value: null
            }
        ];

        Object.entries(registeredErrors).forEach((type) => {
            const [errorType, errorValue] = type;

            returnErrors.push({
                type: errorType,
                value: errorValue
            });
        });

        return returnErrors;
    }

    /** @hidden */
    _isAdvancedError(error: any): error is DynamicFormItemValidationObject {
        return error.heading && error.description && error.type;
    }
}
