import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';
import { DynamicFormItem, DynamicFormValue, FormGeneratorComponent } from '@fundamental-ngx/platform/form';

export const dummyAwaitablePromise = (timeout = 200) => {
    return new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });
};

@Component({
    selector: 'fdp-platform-form-generator-field-layout-example',
    templateUrl: './platform-form-generator-field-layout-example.component.html',
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ]
})
export class PlatformFormGeneratorFieldLayoutExampleComponent {
    @ViewChild(FormGeneratorComponent) formGenerator: FormGeneratorComponent;

    loading = false;

    formCreated = false;
    formValue: DynamicFormValue;

    questions: DynamicFormItem[] = [
        {
            type: 'input',
            name: 'name1',
            message: 'Your name: XL: 1, L: 2, M: 1, S: 2',
            default: 'John',
            placeholder: 'Please provide your name',
            guiOptions: {
                hint: 'Some contextual hint: XL: 1, L: 2, M: 1, S: 2',
                columnLayout: { XL: 1, L: 2, M: 1, S: 1 },
            },
            validate: async (value) => {
                await dummyAwaitablePromise();

                return value === 'John' ? null : 'Your name should be John';
            },
            transformer: async (value: any) => {
                await dummyAwaitablePromise();
                return `${value}777`;
            },
            validators: [Validators.required]
        },
        {
            type: 'password',
            controlType: 'password',
            name: 'password1',
            message: 'Password: XL: 1, L: 2, M: 2, S: 1',
            validators: [Validators.required],
            validate: (value: string) => {
                const passwordPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\\w\\s]).{8,}$');
                return passwordPattern.test(value)
                    ? null
                    : 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';
            },
            guiOptions: {
                hint: 'XL: 1, L: 2, M: 2, S: 1',
                columnLayout: { XL: 1, L: 2, M: 2, S: 1 },
            }
        },
        {
            type: 'number',
            name: 'age1',
            controlType: 'number',
            message: () => 'Your age: XL: 1, L: 2, M: 1, S: 1',
            default: '18',
            validators: [Validators.required],
            guiOptions: {
                columnLayout: { XL: 1, L: 2, M: 1, S: 1 },
                hint: 'XL: 1, L: 2, M: 1, S: 1',
            }
        },
        {
            type: 'editor',
            name: 'bio1',
            message: 'Your biography: XL: 2, L: 1, M: 2, S: 1',
            guiOptions: {
                columnLayout: { XL: 2, L: 1, M: 2, S: 1 },
                hint: 'XL: 2, L: 1, M: 2, S: 1',
            }
        },
        {
            type: 'checkbox',
            name: 'citizenship1',
            message: 'Your citizenship: XL: 2 true, L: 1 false, M: 2 true, S: 1 false',
            guiOptions: {
                inline: true,
                columnLayout: { XL: 2, L: 1, M: 2, S: 1 },
                inlineLayout: { XL: true, L: false, M: true, S: false },
                hint: 'XL: 2 true, L: 1 false, M: 2 true, S: 1 false',
            },
            choices: (formValue) => {
                return [
                    'USA',
                    'Germany',
                    {
                        label: 'Ukraine',
                        value: 'Ukraine'
                    }
                ];
            },
            validators: [Validators.required],
            validate: (input, formValue) => {
                return input?.length > 0 ? null : 'You need to select some country';
            }
        },
        {
            type: 'list',
            name: 'department1',
            message: 'Department you work in: column: 2',
            validators: [Validators.required],
            default: 'IT',
            choices: ['IT', 'Accounting', 'Management'],
            guiOptions: {
                column: 2,
                hint: 'column: 2',
            }
        },
        {
            type: 'list',
            name: 'main_speciality1',
            message: 'Main speciality: XL: 2, L: 1, M: 1, S: 1',
            validators: [Validators.required],
            choices: async () => {
                await dummyAwaitablePromise();
                return ['Front-end', 'Back-end'];
            },
            when: async (formValue: any) => {
                await dummyAwaitablePromise();
                return formValue.department === 'IT';
            },
            guiOptions: {
                columnLayout: { XL: 2, L: 1, M: 1, S: 1 },
                hint: 'XL: 2, L: 1, M: 1, S: 1',
            }
        },
        {
            type: 'confirm',
            name: 'agree1',
            message: 'Do you agree with terms and conditions?: XL: 2, L: 1, M: 2, S: 1',
            choices: ['Yes', 'No'],
            validators: [Validators.required],
            validate: async (value) => {
                await dummyAwaitablePromise();
                return value === 'Yes' ? null : 'You must agree';
            },
            guiOptions: {
                columnLayout: { XL: 2, L: 1, M: 2, S: 1 },
                hint: 'XL: 2, L: 1, M: 2, S: 1',
            }
        },
        {
            type: 'radio',
            name: 'choose_best_option1',
            message: 'Primary front-end framework: XL: 2 false, L: 1 true, M: 1 false, S: 1 true',
            choices: ['Angular', 'React', 'VueJS'],
            guiOptions: {
                columnLayout: { XL: 2, L: 1, M: 1 },
                inlineLayout: { XL: false, L: true, M: false, S: true },
                hint: 'XL: 2 false, L: 1 true, M: 1 false, S: 1 true'
            },
            validators: [Validators.required],
            validate: (result: string) => {
                return result === 'Angular' ? null : 'You should pick Angular';
            }
        },
        {
            type: 'datepicker',
            name: 'birthday1',
            message: 'Your birthday: XL: 1, L: 2, M: 1, S: 1',
            guiOptions: {
                columnLayout: { XL: 1, L: 2, M: 1, S: 1 },
                hint: 'XL: 1, L: 2, M: 1, S: 1'
            },
            validators: [Validators.required],
            validate: (value: FdDate) => {
                return value !== null && value.year < 2020 ? null : 'You need to be born before 2020';
            },
            transformer: (value: FdDate) => {
                return value?.toDateString();
            }
        },
        {
            type: 'switch',
            name: 'enable_feature1',
            message: 'Enable some analytics',
            default: false,
            guiOptions: {
                additionalData: {
                    semantic: true
                }
            }
        }
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
