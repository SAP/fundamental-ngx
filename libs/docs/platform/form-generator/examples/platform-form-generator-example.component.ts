import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';

import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { DynamicFormItem, DynamicFormValue, FormGeneratorComponent } from '@fundamental-ngx/platform/form';

export const dummyAwaitablePromise = (timeout = 200): Promise<boolean> =>
    new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });

@Component({
    selector: 'fdp-platform-form-generator-example',
    templateUrl: './platform-form-generator-example.component.html',
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
export class PlatformFormGeneratorExampleComponent {
    @ViewChild(FormGeneratorComponent) formGenerator: FormGeneratorComponent;

    loading = false;

    formCreated = false;
    formValue: DynamicFormValue;

    questions: DynamicFormItem[] = [
        {
            name: 'some',
            message: 'Some Group Name',
            guiOptions: {
                hint: 'Some contextual hint on group header'
            },
            items: [
                {
                    type: 'input',
                    name: 'nameInGroup',
                    message: 'Your Name (Group)',
                    default: 'John',
                    placeholder: 'Please provide your name',
                    guiOptions: {
                        hint: {
                            content: 'Some contextual hint',
                            glyph: 'accidental-leave'
                        },
                        appendColon: true,
                        column: 1
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
                }
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: 'Your Name',
            default: 'John',
            placeholder: 'Please provide your name',
            guiOptions: {
                hint: 'Some contextual hint',
                column: 1
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
            name: 'password',
            message: 'Password',
            validators: [Validators.required],
            validate: (value: string) => {
                const passwordPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\\w\\s]).{8,}$');
                return passwordPattern.test(value)
                    ? null
                    : 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';
            },
            guiOptions: {
                column: 1
            }
        },
        {
            type: 'number',
            name: 'age',
            controlType: 'number',
            message: () => 'Your Age',
            default: '18',
            validators: [Validators.required],
            guiOptions: {
                column: 1
            }
        },
        {
            type: 'editor',
            name: 'bio',
            message: 'Your Biography',
            guiOptions: {
                column: 1
            }
        },
        {
            type: 'checkbox',
            name: 'citizenship',
            message: 'Your Citizenship',
            guiOptions: {
                inline: true,
                column: 2
            },
            choices: () => [
                'USA',
                'Germany',
                {
                    label: 'Ukraine',
                    value: 'Ukraine'
                }
            ],
            validators: [Validators.required],
            validate: (input) => (input?.length > 0 ? null : 'You need to select some country')
        },
        {
            type: 'list',
            name: 'department',
            message: 'Department You Work In',
            validators: [Validators.required],
            default: 'IT',
            choices: ['IT', 'Accounting', 'Management'],
            guiOptions: {
                column: 2
            }
        },
        {
            type: 'list',
            name: 'main_speciality',
            message: 'Main Speciality',
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
                column: 2
            }
        },
        {
            type: 'confirm',
            name: 'agree',
            message: 'Do You Agree With Terms And Conditions?',
            choices: ['Yes', 'No'],
            validators: [Validators.required],
            validate: async (value) => {
                await dummyAwaitablePromise();
                return value === 'Yes' ? null : 'You must agree';
            },
            guiOptions: {
                column: 2
            }
        },
        {
            type: 'radio',
            name: 'choose_best_option',
            message: 'Primary Front-end Framework You Use',
            choices: ['Angular', 'React', 'VueJS'],
            guiOptions: {
                column: 2
            },
            validators: [Validators.required],
            validate: (result: string) => (result === 'Angular' ? null : 'You should pick Angular')
        },
        {
            type: 'datepicker',
            name: 'birthday',
            message: 'Your Birthday',
            guiOptions: {
                column: 1
            },
            validators: [Validators.required],
            validate: (value: FdDate) =>
                value !== null && value.year < 2020 ? null : 'You need to be born before 2020',
            transformer: (value: FdDate) => value?.toDateString()
        },
        {
            type: 'switch',
            name: 'enable_feature',
            message: 'Enable Some Analytics',
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
