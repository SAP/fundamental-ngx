import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';

import { DynamicFormItem, DynamicFormValue, FormGeneratorComponent } from '@fundamental-ngx/platform/form';

export const dummyAwaitablePromise = (timeout = 200) => {
    return new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });
};

@Component({
  selector: 'fdp-platform-form-generator-no-colons-example',
  templateUrl: './platform-form-generator-no-colons-example.component.html'
})
export class PlatformFormGeneratorNoColonsExampleComponent {

    @ViewChild(FormGeneratorComponent) formGenerator: FormGeneratorComponent;

    loading = false;

    formCreated = false;
    formValue: DynamicFormValue;

    questions: DynamicFormItem[] = [
        {
            type: 'input',
            name: 'labelWithoutColon',
            message: 'Label without colon',
            guiOptions: {
                hint: 'Some contextual hint',
                column: 1,
                appendColon: false
            }
        },
        {
            type: 'input',
            name: 'labelWithColon',
            message: 'Label with colon',
            guiOptions: {
                hint: 'Some contextual hint',
                column: 1,
                appendColon: true
            }
        },
    ];

    onFormCreated(): void {
        this.formCreated = true;
    }

    async onFormSubmitted(value: DynamicFormValue): Promise<void> {
        this.formValue = value;

        this.loading = true;

        // Simulate API request
        await dummyAwaitablePromise(5000);

        this.loading = false;
    }

    submitForm(): void {
        this.formGenerator.submit();
    }

}
