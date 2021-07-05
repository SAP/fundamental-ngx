import { Component, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { WizardGeneratorItem, WizardTitle, WizardDialogGeneratorService, WizardGeneratorFormsValue } from '@fundamental-ngx/platform';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'fdp-wizard-generator-responsive-dialog-example',
  templateUrl: './wizard-generator-responsive-dialog-example.component.html'
})
export class WizardGeneratorResponsiveDialogExampleComponent implements OnDestroy {
    wizardValue: any;

    wizardTitle: WizardTitle = {
        size: 2,
        text: 'Checkout'
    };

    allowSubscribe = true;

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
                    title: '4. Credit Card Details',
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
                addSummary: true,
                responsivePaddings: true,
                title: this.wizardTitle
            }
        }).afterClosed.pipe(takeWhile(() => this.allowSubscribe))
        .subscribe((wizardValue: WizardGeneratorFormsValue) => {
            this.wizardValue = wizardValue;
        }, () => {});
    }

    wizardFinished(wizardValue: WizardGeneratorFormsValue): void {
        this.wizardValue = wizardValue;
    }
}
