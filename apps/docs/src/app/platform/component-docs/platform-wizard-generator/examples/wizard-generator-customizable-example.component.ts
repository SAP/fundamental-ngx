import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
    WizardDialogGeneratorService,
    WizardGeneratorFormsValue,
    WizardGeneratorItem,
    WizardTitle,
    FormattedFormStep
} from '@fundamental-ngx/platform/wizard-generator';

@Component({
    selector: 'fdp-wizard-generator-customizable-example',
    templateUrl: './wizard-generator-customizable-example.component.html'
})
export class WizardGeneratorCustomizableExampleComponent implements OnDestroy {
    @ViewChild('goNextTemplate') goNextTemplate: TemplateRef<any>;
    @ViewChild('goBackTemplate') goBackTemplate: TemplateRef<any>;
    @ViewChild('finishTemplate') finishTemplate: TemplateRef<any>;
    @ViewChild('cancelTemplate') cancelTemplate: TemplateRef<any>;
    @ViewChild('confirmationDialogTemplate') confirmationDialogTemplate: TemplateRef<any>;
    @ViewChild('summaryStepTemplate') summaryStepTemplate: TemplateRef<any>;
    @ViewChild('reviewButtonTemplate') reviewButtonTemplate: TemplateRef<any>;

    wizardValue: WizardGeneratorFormsValue | undefined;

    wizardTitle: WizardTitle = {
        size: 2,
        text: 'Checkout'
    };

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
                    responsivePaddings: true,
                    title: this.wizardTitle,
                    goNextButtonTemplate: this.goNextTemplate,
                    goBackButtonTemplate: this.goBackTemplate,
                    finishButtonTemplate: this.finishTemplate,
                    cancelButtonTemplate: this.cancelTemplate,
                    confirmationDialogTemplate: this.confirmationDialogTemplate,
                    summaryStepTemplate: this.summaryStepTemplate,
                    reviewButtonTemplate: this.reviewButtonTemplate
                }
            })
            .afterClosed.pipe(takeUntil(this._onDestroy$))
            .subscribe((wizardValue) => {
                this.wizardValue = wizardValue;
            });
    }

    _editStep(event: Event, stepId: string, callback: (stepId: string) => void): void {
        event.preventDefault();
        callback(stepId);
    }

    trackFn(_: number, formattedStep: FormattedFormStep): string {
        return formattedStep.id;
    }
}
