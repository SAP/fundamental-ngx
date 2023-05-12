import { TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { WizardGeneratorItem } from './interfaces/wizard-generator-item.interface';
import { WizardTitle } from './interfaces/wizard-title.interface';
import { WizardDialogGeneratorService } from './wizard-dialog-generator.service';

const wizardTitle: WizardTitle = {
    size: 2,
    text: 'Checkout'
};

const stepItems: WizardGeneratorItem[] = [
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

describe('WizardDialogGeneratorService', () => {
    let service: WizardDialogGeneratorService;
    let dialogService: DialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DialogModule, NoopAnimationsModule],
            providers: [WizardDialogGeneratorService]
        });
        service = TestBed.inject(WizardDialogGeneratorService);
        dialogService = TestBed.inject(DialogService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should open dialog with wizard', () => {
        service.open({
            width: '100%',
            height: '100%',
            verticalPadding: false,
            data: {
                items: stepItems,
                appendToWizard: false,
                displaySummaryStep: false,
                responsivePaddings: false,
                title: wizardTitle
            }
        });
        expect(dialogService.hasOpenDialogs()).toBe(true);

        // Dismissal is tesed in dialog service itself. No need to repeat it.
    });
});
