import { Component, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
    WizardGeneratorItem,
    WizardTitle,
    WizardDialogGeneratorService,
    WizardGeneratorFormsValue
} from '@fundamental-ngx/platform/wizard-generator';

@Component({
    selector: 'fdp-wizard-generator-responsive-dialog-example',
    templateUrl: './wizard-generator-responsive-dialog-example.component.html'
})
export class WizardGeneratorResponsiveDialogExampleComponent implements OnDestroy {
    wizardValue: WizardGeneratorFormsValue | undefined;

    wizardTitle: WizardTitle = {
        size: 2,
        text: 'Checkout'
    };

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
        },
        {
            name: 'Summary',
            id: 'summary',
            summary: true
        }
    ];

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(private _wizardDialogService: WizardDialogGeneratorService) {}

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    openDialog(): void {
        this._wizardDialogService
            .open({
                width: '100%',
                height: '100%',
                verticalPadding: false,
                data: {
                    items: this.stepItems,
                    appendToWizard: false,
                    displaySummaryStep: true,
                    responsivePaddings: false,
                    title: this.wizardTitle
                }
            })
            .afterClosed.pipe(takeUntil(this._onDestroy$))
            .subscribe((wizardValue) => {
                this.wizardValue = wizardValue;
            });
    }

    wizardFinished(wizardValue: WizardGeneratorFormsValue): void {
        this.wizardValue = wizardValue;
    }
}
