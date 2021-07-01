import { Component, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { WizardDialogGeneratorService, WizardGeneratorFormsValue, WizardGeneratorItem, WizardTitle } from '@fundamental-ngx/platform';

@Component({
  selector: 'fdp-wizard-generator-customizable-example',
  templateUrl: './wizard-generator-customizable-example.component.html'
})
export class WizardGeneratorCustomizableExampleComponent implements OnDestroy {

    wizardValue: WizardGeneratorFormsValue;

    wizardTitle: WizardTitle = {
        size: 2,
        text: 'Checkout'
    };

    allowSubscribe = true;

    stepItems: WizardGeneratorItem[] = [
        {
            name: 'Product type',
            id: 'productTypeStep',
            icon: 'product',
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
            icon: 'account',
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
            icon: 'credit-card',
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
            icon: 'pie-chart',
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
        }
    ];

    constructor(
        private _wizardDialogService: WizardDialogGeneratorService
    ) { }

    ngOnDestroy(): void {
        this.allowSubscribe = false;
    }

    openDialog(): void {
        this._wizardDialogService.open({
            width: '100%',
            height: '100%',
            verticalPadding: false,
            data: {
                items: this.stepItems,
                appendToWizard: false,
                addSummary: false,
                responsivePaddings: false,
                title: this.wizardTitle
            }
        }).afterClosed.pipe(takeWhile(() => this.allowSubscribe))
        .subscribe((wizardValue: WizardGeneratorFormsValue) => {
            this.wizardValue = wizardValue;
        }, () => {});
    }
}
