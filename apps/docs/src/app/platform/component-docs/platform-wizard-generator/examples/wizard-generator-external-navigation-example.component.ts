import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';

import {
    WizardGeneratorComponent,
    WizardGeneratorFormsValue,
    WizardGeneratorItem
} from '@fundamental-ngx/platform/wizard-generator';

@Component({
    selector: 'fdp-wizard-generator-external-navigation-example',
    templateUrl: './wizard-generator-external-navigation-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardGeneratorExternalNavigationExampleComponent {
    @ViewChild(WizardGeneratorComponent)
    wizardGenerator: WizardGeneratorComponent;

    get isFirstStep(): boolean {
        return this.wizardGenerator?.isFirstStep || false;
    }

    get isLastStep(): boolean {
        return this.wizardGenerator?.isLastStep || false;
    }

    wizardValue: WizardGeneratorFormsValue;

    stepItems: WizardGeneratorItem[] = [
        {
            name: 'Product type',
            id: 'productTypeStep',
            formGroups: [
                {
                    title: '1. Product Type',
                    id: 'productType',
                    formItems: [
                        {
                            name: 'product',
                            message: 'Select appropriate product type',
                            type: 'select',
                            choices: ['Mobile', 'Tablet', 'Desktop'],
                            validators: [Validators.required]
                        }
                    ]
                }
            ]
        },
        {
            name: 'Customer information',
            id: 'customerInformationStep',
            formGroups: [
                {
                    title: '2. Customer Information',
                    id: 'customerInformation',
                    formItems: [
                        {
                            name: 'name',
                            message: 'Name',
                            type: 'input',
                            validators: [Validators.required]
                        },
                        {
                            name: 'address',
                            message: 'Address Line 1',
                            type: 'input',
                            validators: [Validators.required]
                        },
                        {
                            name: 'address2',
                            message: 'Address Line 2',
                            type: 'input'
                        }
                    ]
                }
            ]
        },
        {
            name: 'Credit Card Details',
            id: 'creditCardStep',
            formGroups: [
                {
                    title: '3. Credit Card Details',
                    id: 'cardPayment',
                    formItems: [
                        {
                            name: 'creditCardNumber',
                            message: 'Enter your credit card details',
                            type: 'input',
                            validators: [Validators.required]
                        }
                    ]
                }
            ]
        },
        {
            name: 'Discount',
            id: 'discountStep',
            formGroups: [
                {
                    title: '4. Discount details',
                    id: 'discountForm',
                    formItems: [
                        {
                            name: 'discount',
                            message: 'Enter your discount coupon code',
                            type: 'input'
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

    goNext(): void {
        this.wizardGenerator?.goNext();
    }

    goBack(): void {
        this.wizardGenerator?.goBack();
    }

    async finish(): Promise<void> {
        await this.wizardGenerator?.finish();
    }
}
