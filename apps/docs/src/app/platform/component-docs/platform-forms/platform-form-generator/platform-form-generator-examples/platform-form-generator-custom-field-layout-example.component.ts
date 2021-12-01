import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';

import { DynamicFormItem, DynamicFormValue, FormGeneratorComponent } from '@fundamental-ngx/platform/form';

export const dummyAwaitablePromise = (timeout = 200) =>
    new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });

@Component({
    selector: 'fdp-platform-form-generator-custom-field-layout-example',
    templateUrl: './platform-form-generator-custom-field-layout-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PlatformFormGeneratorCustomFieldLayoutExampleComponent {
    @ViewChild(FormGeneratorComponent) formGenerator: FormGeneratorComponent;

    loading = false;

    formCreated = false;
    formValue: DynamicFormValue;

    questions: DynamicFormItem[] = [
        {
            type: 'input',
            name: 'formGroupColumnDefinition',
            message: 'Form container column layout definition',
            default: 'John',
            placeholder: 'Please provide your first name',
            guiOptions: {
                hint: 'Some contextual hint',
                column: 1
            },
            validators: [Validators.required]
        },
        {
            name: 'personalInformation',
            message: 'Form field group column layout definition',
            guiOptions: {
                labelColumnLayout: { S: 12, M: 4 },
                fieldColumnLayout: { S: 12, M: 8 }
            },
            items: [
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Your name',
                    default: 'John',
                    placeholder: 'Please provide your first name',
                    guiOptions: {
                        hint: 'Some contextual hint',
                        column: 1
                    },
                    validators: [Validators.required]
                },
                {
                    type: 'input',
                    name: 'secondName',
                    message: 'Your name',
                    default: 'Doe',
                    placeholder: 'Please provide your second name',
                    guiOptions: {
                        hint: 'Some contextual hint',
                        column: 2
                    },
                    validators: [Validators.required]
                }
            ]
        },
        {
            name: 'contactInformation',
            message: 'Individual column layout per field',
            items: [
                {
                    type: 'input',
                    name: 'state',
                    message: 'State/Province',
                    placeholder: 'Please provide your state or province name',
                    guiOptions: {
                        hint: 'Some contextual hint',
                        column: 1,
                        labelColumnLayout: { S: 12, M: 4 },
                        fieldColumnLayout: { S: 12, M: 8 }
                    },
                    validators: [Validators.required]
                },
                {
                    type: 'input',
                    name: 'street',
                    message: 'Street',
                    placeholder: 'Please provide your street name',
                    guiOptions: {
                        hint: 'Some contextual hint',
                        column: 2,
                        labelColumnLayout: { S: 12, M: 4 },
                        fieldColumnLayout: { S: 12, M: 8 }
                    },
                    validators: [Validators.required]
                }
            ]
        }
    ];

    onFormCreated(): void {
        this.formCreated = true;
    }

    async onFormSubmitted(value: DynamicFormValue): Promise<void> {
        console.log(value);

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
