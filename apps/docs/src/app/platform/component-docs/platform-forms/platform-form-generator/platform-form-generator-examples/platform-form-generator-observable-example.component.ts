import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core';
import { DynamicFormItem } from '@fundamental-ngx/platform';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const dummyAwaitablePromise = (timeout = 200) => {
    return new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });
};

@Component({
  selector: 'fdp-platform-form-generator-observable-example',
  templateUrl: './platform-form-generator-observable-example.component.html'
})
export class PlatformFormGeneratorObservableExampleComponent implements OnInit {

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
            // Emulate some API request
            validate: (value) => of(value === 'John' ? true : 'Your name should be John').pipe(delay(400)),
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
                const passwordPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$');
                return passwordPattern.test(value) ? true : 'Minimum eight characters, at least one letter, one number and one special character'
            },
            guiOptions: {
                column: 1
            }
        },
        {
            type: 'number',
            name: 'age',
            message: () => of('Your age').pipe(delay(400)),
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
            name: 'citizenship3',
            message: 'Your citizenship',
            guiOptions: {
                inline: true,
                column: 2
            },
            choices: (answers) => of([
                'USA',
                'Germany',
                {
                    label: 'Ukraine',
                    value: 'Ukraine'
                }
            ]),
            validate: (input, answers) => {
                return input?.length > 0;
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'Department you work in',
            validators: [Validators.required],
            default: 'IT',
            choices: () => of(['IT', 'Accounting', 'Management']),
            guiOptions: {
                column: 2
            }
        },
        {
            type: 'list',
            name: 'main_speciality',
            message: 'Main speciality',
            validators: [Validators.required],
            choices: () => of(['Front-end', 'Back-end']),
            when: (answers: any) => of(answers.department === 'IT'),
            guiOptions: {
                column: 2
            }
        },
        {
            type: 'confirm',
            name: 'agree',
            message: 'Do you agree with terms and conditions?',
            choices: ['Yes', 'No'],
            validate: (value) => of(value === 'Yes'),
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
            validate: (result: string) => of(result === 'Angular' ? true : 'You should pick Angular')
        },
        {
            type: 'datepicker',
            name: 'birthday',
            message: 'Your birthday',
            guiOptions: {
                datePicker: {},
                column: 1
            },
            validators: [Validators.required],
            validate: (value: FdDate) => of(value !== null && value.year < 2020 ? true : 'You need to be born before 2020'),
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
                semantic: true
            }
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

    onFormCreated(form: FormGroup): void {
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
