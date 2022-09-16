import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGeneratorService, DynamicFormGroup } from '@fundamental-ngx/platform/form';
import { WizardGeneratorFormsValue, WizardGeneratorItem } from '@fundamental-ngx/platform/wizard-generator';

@Component({
    selector: 'fdp-wizard-generator-onchange-example',
    templateUrl: './wizard-generator-onchange-example.component.html',
    // Provide local form generator service here to ignore other example forms on the page.
    providers: [FormGeneratorService]
})
export class WizardGeneratorOnchangeExampleComponent {
    wizardValue: WizardGeneratorFormsValue;

    stepItems: WizardGeneratorItem[] = [
        {
            name: 'Account information',
            id: 'accountInformationStep',
            formGroups: [
                {
                    title: '1. Account information',
                    id: 'accountInformation',
                    formItems: [
                        {
                            name: 'name',
                            message: 'Account name',
                            type: 'input',
                            validators: [Validators.required],
                            onchange: (value, forms) => {
                                const repositoryForm = forms.get('repositoryInformation') as DynamicFormGroup;

                                const control = this._formGeneratorService.getFormControl(
                                    repositoryForm,
                                    'repositoryName'
                                );

                                control.setValue(`${value}-repo`);
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: 'Repository information',
            id: 'repositoryInformationStep',
            formGroups: [
                {
                    title: '2. Repository information',
                    id: 'repositoryInformation',
                    formItems: [
                        {
                            name: 'repositoryName',
                            message: 'Repository name',
                            type: 'input',
                            validators: [Validators.required]
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

    constructor(private _formGeneratorService: FormGeneratorService) {}

    wizardFinished(wizardValue: WizardGeneratorFormsValue): void {
        this.wizardValue = wizardValue;
    }
}
