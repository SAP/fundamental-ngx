import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';

import { DynamicFormItem, DynamicFormValue, FormGeneratorComponent } from '@fundamental-ngx/platform/form';

export const dummyAwaitablePromise = (timeout = 200): Promise<boolean> =>
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
            message: 'Form Container Column Layout Definition',
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
            message: 'Form Field Group Column Layout Definition',
            guiOptions: {
                hint: 'Some hint?',
                labelColumnLayout: { S: 12, M: 4 },
                fieldColumnLayout: { S: 12, M: 8 }
            },
            items: [
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Your Name',
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
                    message: 'Your Name',
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
            message: 'Individual Column Layout Per Field',
            items: [
                {
                    type: 'input',
                    name: 'state',
                    message: 'State/Province',
                    placeholder: 'Please Provide Your State Or Province Name',
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
                    placeholder: 'Please Provide Your Street Name',
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
