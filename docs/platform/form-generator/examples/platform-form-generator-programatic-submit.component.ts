import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';
import { DynamicFormItem, DynamicFormValue, FormGeneratorComponent } from '@fundamental-ngx/platform/form';

export const dummyAwaitablePromise = (timeout = 200): Promise<boolean> =>
    new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });

@Component({
    selector: 'fdp-platform-form-generator-programatic-submit',
    templateUrl: './platform-form-generator-programatic-submit.component.html',
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
export class PlatformFormGeneratorProgramaticSubmitComponent {
    @ViewChild(FormGeneratorComponent) formGenerator: FormGeneratorComponent;

    loading = false;

    formCreated = false;
    formValue: DynamicFormValue;

    questions: DynamicFormItem[] = [
        {
            type: 'input',
            name: 'name3',
            message: 'Your Name',
            default: 'John',
            guiOptions: {
                hint: 'Some contextual hint',
                column: 1
            },
            // Emulate some API request
            validate: (value) => of(value === 'John' ? null : 'Your name should be John').pipe(delay(400)),
            transformer: async (value: any) => {
                await dummyAwaitablePromise();
                return `${value}777`;
            },
            validators: [Validators.required]
        },
        {
            type: 'password',
            controlType: 'password',
            name: 'password3',
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
            name: 'age3',
            controlType: 'number',
            message: () => of('Your Age').pipe(delay(400)),
            default: '18',
            validators: [Validators.required],
            guiOptions: {
                column: 1
            }
        },
        {
            type: 'editor',
            name: 'bio3',
            message: 'Your Biography',
            guiOptions: {
                column: 1
            }
        },
        {
            type: 'checkbox',
            name: 'citizenship3',
            message: 'Your Citizenship',
            guiOptions: {
                inline: true,
                column: 2
            },
            choices: () =>
                of([
                    'USA',
                    'Germany',
                    {
                        label: 'Ukraine',
                        value: 'Ukraine'
                    }
                ]),
            validators: [Validators.required],
            validate: (input) => (input?.length > 0 ? null : 'You need to select some country')
        },
        {
            type: 'list',
            name: 'department3',
            message: 'Department You Work In',
            validators: [Validators.required],
            default: 'IT',
            choices: () => of(['IT', 'Accounting', 'Management']),
            guiOptions: {
                column: 2
            }
        },
        {
            type: 'list',
            name: 'main_speciality3',
            message: 'Main Speciality',
            validators: [Validators.required],
            choices: () => of(['Front-end', 'Back-end']),
            when: (formValue: any) => of(formValue.department === 'IT'),
            guiOptions: {
                column: 2
            }
        },
        {
            type: 'confirm',
            name: 'agree3',
            message: 'Do You Agree With Terms And Conditions?',
            choices: ['Yes', 'No'],
            validators: [Validators.required],
            validate: (value) => of(value === 'Yes' ? null : 'You must agree'),
            guiOptions: {
                column: 2
            }
        },
        {
            type: 'radio',
            name: 'choose_best_option3',
            message: 'Primary Front-end Framework You Use',
            choices: ['Angular', 'React', 'VueJS'],
            guiOptions: {
                column: 2
            },
            validators: [Validators.required],
            validate: (result: string) => of(result === 'Angular' ? null : 'You should pick Angular')
        },
        {
            type: 'datepicker',
            name: 'birthday3',
            message: 'Your Birthday',
            guiOptions: {
                column: 1
            },
            validators: [Validators.required],
            validate: (value: FdDate) =>
                of(value !== null && value.year < 2020 ? null : 'You need to be born before 2020'),
            transformer: (value: FdDate) => value?.toDateString()
        },
        {
            type: 'switch',
            name: 'enable_feature3',
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
