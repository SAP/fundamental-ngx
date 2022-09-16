import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';
import { WizardGeneratorFormsValue, WizardGeneratorItem } from '@fundamental-ngx/platform/wizard-generator';

@Component({
    selector: 'fundamental-ngx-wizard-generator-special-elements-example',
    templateUrl: './wizard-generator-special-elements-example.component.html',
    providers: [
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
export class WizardGeneratorSpecialElementsExampleComponent {
    wizardValue: WizardGeneratorFormsValue;

    stepItems: WizardGeneratorItem[] = [
        {
            name: 'Customer information',
            id: 'customerInformationStep',
            formGroups: [
                {
                    title: '1. Customer Information',
                    id: 'customerInformation',
                    formItems: [
                        {
                            name: 'name',
                            message: 'Name',
                            type: 'input',
                            validators: [Validators.required]
                        },
                        {
                            name: 'email',
                            message: 'Email',
                            type: 'email',
                            validators: [Validators.required]
                        },
                        {
                            name: 'password',
                            message: 'Password',
                            type: 'password',
                            controlType: 'password',
                            validators: [Validators.required]
                        },
                        {
                            name: 'date',
                            message: 'Date of Birth',
                            type: 'datepicker',
                            validators: [Validators.required]
                        },
                        {
                            name: 'bio',
                            message: 'Short Bio',
                            type: 'editor'
                        }
                    ]
                }
            ]
        },
        {
            name: 'Address Details',
            id: 'address details',
            formGroups: [
                {
                    title: '2. Address',
                    id: 'address',
                    formItems: [
                        {
                            name: 'address',
                            message: 'Address Line 1',
                            type: 'input',
                            validators: [Validators.required]
                        },
                        {
                            name: 'address',
                            message: 'Address Line 2',
                            type: 'input',
                            validators: [Validators.required]
                        }
                    ]
                }
            ]
        },
        {
            name: 'Phone Number',
            id: 'phonenumber',
            formGroups: [
                {
                    title: '3. Phone number',
                    id: 'phonenumber',
                    formItems: [
                        {
                            name: 'phonenumber',
                            message: 'Enter your phone number',
                            type: 'number'
                        }
                    ]
                }
            ]
        },
        {
            name: 'Summary',
            id: 'summary',
            summary: true
        }
    ];
    wizardFinished(wizardValue: WizardGeneratorFormsValue): void {
        this.wizardValue = wizardValue;
    }
}
