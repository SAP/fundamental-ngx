import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';

import { DynamicFormItem, FormGeneratorComponent, FormGeneratorService } from '@fundamental-ngx/platform/form';

@Component({
  selector: 'fdp-platform-form-generator-custom-error-example',
  templateUrl: './platform-form-generator-custom-error-example.component.html'
})
export class PlatformFormGeneratorCustomErrorExampleComponent {

    formCreated = false;

    @ViewChild(FormGeneratorComponent) formGenerator: FormGeneratorComponent;

    formItems: DynamicFormItem[] = [
        {
            type: 'input',
            message: 'Custom validation error example',
            name: 'custom_validation_error_example',
            required: true,
            validate: (value) => value ? null : 'This field needs to be filled',
            guiOptions: {
                hint: 'Keep it empty to see validation error on submit'
            }
        },
        {
            type: 'input',
            message: 'Default validation error example',
            name: 'default_validation_error_example',
            validators: [Validators.required],
            guiOptions: {
                hint: 'Keep it empty to see validation error on submit'
            }
        },
        {
            type: 'input',
            name: 'custom_validation_example',
            message: 'Custom generic validation error example',
            validators: [Validators.pattern('^\\d+$')],
            guiOptions: {
                hint: 'This field will fail validation if non-numeric symbols are present in the input'
            }
        }
    ];

    constructor(
        private readonly _formGeneratorService: FormGeneratorService
    ) {
        this._formGeneratorService.addValidationErrorHint('pattern', 'This field is not matching the pattern');
    }

    submitForm(): void {
        this.formGenerator.submit();
    }

    onFormCreated(): void {
        this.formCreated = true;
    }
}
