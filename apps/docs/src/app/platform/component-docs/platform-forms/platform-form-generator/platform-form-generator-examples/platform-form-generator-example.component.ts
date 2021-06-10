import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { DynamicFormItem } from '@fundamental-ngx/platform';
import { FdDate } from '@fundamental-ngx/core';

export const dummyAwaitablePromise = (timeout = 200) => {
    return new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });
};

@Component({
    selector: 'fdp-platform-form-generator-example',
    templateUrl: './platform-form-generator-example.component.html'
})
export class PlatformFormGeneratorExampleComponent {

    loading = false;

    formCreated = false;
    formValue: { [key: string]: any };

    questions: DynamicFormItem[] = [
        {
            type: 'input',
            name: 'name',
            message: 'Your name',
            default: 'John',
            guiOptions: {
                hint: 'Some contextual hint',
                contentDensity: 'compact',
                column: 1
            },
            validate: async (value) => {

                await dummyAwaitablePromise();

                return value === 'John' ? true : 'Your name should be John';
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
                return passwordPattern.test(value) ? true : 'Minimum eight characters, at least one letter, one number and one special character'
            },
            guiOptions: {
                column: 1
            }
        },
        {
            type: 'number',
            name: 'age',
            message: () => 'Your age',
            default: '18',
            validators: [Validators.required],
            guiOptions: {
                column: 1
            }
        },
        {
            type: 'editor',
            name: 'bio',
            message: 'Your biography',
            guiOptions: {
                column: 1
            }
        },
        {
            type: 'checkbox',
            name: 'citizenship2',
            message: 'Your citizenship',
            guiOptions: {
                inline: true,
                column: 2
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
            validate: (input, formValue) => {
                return input?.length > 0 ? null : 'You need to select some country';
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'Department you work in',
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
            message: 'Main speciality',
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
            message: 'Do you agree with terms and conditions?',
            choices: ['Yes', 'No'],
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
            message: 'Primary front-end framework you use',
            choices: ['Angular', 'React', 'VueJS'],
            guiOptions: {
                column: 2
            },
            validate: (result: string) => {
                return result === 'Angular' ? true : 'You should pick Angular';
            }
        },
        {
            type: 'datepicker',
            name: 'birthday',
            message: 'Your birthday',
            guiOptions: {
                column: 1
            },
            validators: [Validators.required],
            validate: (value: FdDate) => {
                return value !== null && value.year < 2020 ? true : 'You need to be born before 2020';
            },
            transformer: (value: FdDate) => {
                return value?.toDateString();
            }
        },
        {
            type: 'switch',
            name: 'enable_feature',
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

    async onFormSubmitted(value: { [key: string]: any }): Promise<void> {
        this.formValue = value;

        this.loading = true;

        // Simulate API request
        await dummyAwaitablePromise(5000);

        this.loading = false;
    }

}
