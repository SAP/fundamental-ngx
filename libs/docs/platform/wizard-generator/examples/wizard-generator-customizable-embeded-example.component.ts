import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { JsonPipe } from '@angular/common';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import {
    FormattedFormStep,
    PlatformWizardGeneratorModule,
    WizardGeneratorFormsValue,
    WizardGeneratorItem,
    WizardTitle
} from '@fundamental-ngx/platform/wizard-generator';

@Component({
    selector: 'fdp-wizard-generator-customizable-embeded-example',
    templateUrl: './wizard-generator-customizable-embeded-example.component.html',
    imports: [
        PlatformWizardGeneratorModule,
        PlatformButtonModule,
        ContentDensityDirective,
        TitleComponent,
        LayoutGridModule,
        FormLabelComponent,
        PlatformLinkModule,
        JsonPipe
    ]
})
export class WizardGeneratorCustomizableEmbededExampleComponent {
    wizardTitle: WizardTitle = {
        size: 2,
        text: 'Checkout'
    };

    wizardValue: WizardGeneratorFormsValue;

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
            id: 'summary',
            summary: true,
            name: 'Review'
        }
    ];

    wizardFinished(wizardValue: WizardGeneratorFormsValue): void {
        this.wizardValue = wizardValue;
    }

    trackFn(_: number, formattedStep: FormattedFormStep): string {
        return formattedStep.id;
    }

    _editStep(event: Event, stepId: string, callback: (stepId: string) => void): void {
        event.preventDefault();
        callback(stepId);
    }
}
