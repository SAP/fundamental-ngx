import { Component, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DynamicFormGroup, DynamicFormValue, FormGeneratorService } from '@fundamental-ngx/platform/form';
import {
    WizardDialogGeneratorService,
    WizardGeneratorFormsValue,
    WizardGeneratorItem,
    WizardTitle
} from '@fundamental-ngx/platform/wizard-generator';

@Component({
    selector: 'fdp-wizard-generator-visibility-between-steps-example',
    templateUrl: './wizard-generator-visibility-between-steps-example.component.html'
})
export class WizardGeneratorVisibilityBetweenStepsExampleComponent implements OnDestroy {
    wizardTitle: WizardTitle = {
        size: 2,
        text: 'Checkout'
    };

    wizardValue: WizardGeneratorFormsValue | undefined;

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
                        },
                        {
                            name: 'cpuManufacturer',
                            message: 'Select appropriate CPU Manufacturer',
                            type: 'select',
                            choices: ['Intel', 'AMD', 'Apple'],
                            validators: [Validators.required],
                            when: (formValue: DynamicFormValue): boolean => formValue.product === 'Desktop'
                        }
                    ]
                },
                {
                    title: '1.1. Protective case',
                    id: 'protectiveCase',
                    dependencyFields: {
                        productTypeStep: {
                            productType: ['product']
                        }
                    },
                    when: (completedSteps: string[], answers: WizardGeneratorFormsValue) => {
                        const value = answers.productTypeStep?.productType?.product;
                        return value !== undefined && value !== 'Desktop';
                    },
                    formItems: [
                        {
                            name: 'protectiveCaseNeeded',
                            message: 'Would you like to include a protective case?',
                            type: 'switch',
                            default: false
                        },
                        {
                            name: 'protectiveCaseMaterial',
                            message: 'Select protective case material',
                            type: 'select',
                            choices: ['Leather', 'Silicone'],
                            validators: [Validators.required],
                            when: (formValue: DynamicFormValue): boolean => formValue.protectiveCaseNeeded
                        }
                    ]
                }
            ]
        },
        {
            name: 'Warranty',
            id: 'warrantyStep',
            formGroups: [
                {
                    title: '2. Warranty',
                    id: 'warranty',
                    formItems: [
                        {
                            name: 'handheldWarranty',
                            message: 'Include handheld devices warranty',
                            type: 'switch',
                            default: true,
                            dependencyFields: {
                                productTypeStep: {
                                    productType: ['product']
                                }
                            },
                            when: (formValue: DynamicFormValue, forms: Map<string, DynamicFormGroup>): boolean => {
                                const productTypeForm = forms.get('productType') as DynamicFormGroup;

                                const productControl = this._formGeneratorService.getFormControl(
                                    productTypeForm,
                                    'product'
                                );

                                return productControl?.value !== 'Desktop';
                            }
                        },
                        {
                            name: 'desktopWarranty',
                            message: 'Include Desktop devices warranty',
                            type: 'switch',
                            default: true,
                            dependencyFields: {
                                productTypeStep: {
                                    productType: ['product']
                                }
                            },
                            when: (formValue: DynamicFormValue, forms: Map<string, DynamicFormGroup>): boolean => {
                                const productTypeForm = forms.get('productType') as DynamicFormGroup;

                                const productControl = this._formGeneratorService.getFormControl(
                                    productTypeForm,
                                    'product'
                                );

                                return productControl?.value === 'Desktop';
                            }
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
            name: 'Payment method',
            id: 'paymentMethodStep',
            formGroups: [
                {
                    title: '3. Payment method',
                    id: 'paymentMethodForm',
                    formItems: [
                        {
                            name: 'paymentMethod',
                            message: 'Select appropriate payment method',
                            type: 'select',
                            choices: ['Credit Card', 'Bank Transfer'],
                            validators: [Validators.required]
                        }
                    ]
                }
            ]
        },
        {
            name: 'Credit Card Details',
            id: 'creditCardStep',
            when: (_completedSteps, answers) =>
                answers.paymentMethodStep?.paymentMethodForm?.paymentMethod === 'Credit Card',
            dependencyFields: {
                paymentMethodStep: {
                    paymentMethodForm: ['paymentMethod']
                }
            },
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
            name: 'Bank Details',
            id: 'bankDetailsStep',
            when: (_completedSteps, answers) =>
                answers.paymentMethodStep?.paymentMethodForm?.paymentMethod === 'Bank Transfer',
            dependencyFields: {
                paymentMethodStep: {
                    paymentMethodForm: ['paymentMethod']
                }
            },
            formGroups: [
                {
                    title: '4. Bank Details',
                    id: 'bankDetailsForm',
                    formItems: [
                        {
                            name: 'bankDetails',
                            message: 'Enter your bank details',
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
            when: (_completedSteps, answers) =>
                answers.paymentMethodStep?.paymentMethodForm?.paymentMethod === 'Bank Transfer' ||
                answers.paymentMethodStep?.paymentMethodForm?.paymentMethod === 'Credit Card',
            formGroups: [
                {
                    title: '5. Discount details',
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

    constructor(
        private _wizardDialogService: WizardDialogGeneratorService,
        private _formGeneratorService: FormGeneratorService
    ) {}

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
