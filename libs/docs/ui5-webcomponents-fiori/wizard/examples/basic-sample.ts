import { Component, computed, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { Wizard } from '@fundamental-ngx/ui5-webcomponents-fiori/wizard';
import { WizardStep } from '@fundamental-ngx/ui5-webcomponents-fiori/wizard-step';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { MessageStrip } from '@fundamental-ngx/ui5-webcomponents/message-strip';
import { RadioButton } from '@fundamental-ngx/ui5-webcomponents/radio-button';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { TextArea } from '@fundamental-ngx/ui5-webcomponents/text-area';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import icons
import '@ui5/webcomponents-icons/dist/accept.js';
import '@ui5/webcomponents-icons/dist/cart.js';
import '@ui5/webcomponents-icons/dist/employee.js';
import '@ui5/webcomponents-icons/dist/palette.js';
import '@ui5/webcomponents-icons/dist/product.js';

interface WizardStepData {
    titleText: string;
    subtitleText?: string;
    icon: string;
    completed: boolean;
    valid: boolean;
}

@Component({
    selector: 'ui5-doc-wizard-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Wizard, WizardStep, Button, Input, Label, Title, Text, TextArea, CheckBox, RadioButton, MessageStrip],
    styles: [
        `
            .wizard-container {
                width: 100%;
                height: 600px;
            }
            .step-content {
                padding: 2rem;
            }
            .form-row {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }
            .form-group {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .radio-group {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-top: 0.5rem;
            }
            .navigation-buttons {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
                padding-top: 1rem;
                border-top: 1px solid var(--sapGroup_ContentBorderColor, #d9d9d9);
            }
            .summary-section {
                margin-bottom: 1.5rem;
            }
            .summary-item {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
            }
            .summary-label {
                font-weight: bold;
                min-width: 150px;
            }
        `
    ]
})
export class BasicSample {
    // Current step index
    currentStep = signal(0);

    // Step 1: Product Information
    productName = signal('');
    productDescription = signal('');

    // Step 2: Pricing
    selectedPrice = signal('basic');

    // Step 3: Delivery Options
    standardDelivery = signal(true);
    expressDelivery = signal(false);
    giftWrap = signal(false);

    // Step 4: Contact Information
    customerName = signal('');
    customerEmail = signal('');
    customerPhone = signal('');

    // Computed: Step validation
    step1Valid = computed(() => this.productName().trim().length > 0 && this.productDescription().trim().length > 0);

    step2Valid = computed(() => this.selectedPrice().length > 0);

    step3Valid = computed(() => this.standardDelivery() || this.expressDelivery());

    step4Valid = computed(() => {
        const emailValid = this.customerEmail().includes('@');
        return this.customerName().trim().length > 0 && emailValid;
    });

    // Steps configuration
    steps = computed<WizardStepData[]>(() => [
        {
            titleText: 'Product Information',
            subtitleText: 'Enter product details',
            icon: 'product',
            completed: this.currentStep() > 0,
            valid: this.step1Valid()
        },
        {
            titleText: 'Pricing',
            subtitleText: 'Select pricing plan',
            icon: 'palette',
            completed: this.currentStep() > 1,
            valid: this.step2Valid()
        },
        {
            titleText: 'Delivery Options',
            subtitleText: 'Choose delivery method',
            icon: 'cart',
            completed: this.currentStep() > 2,
            valid: this.step3Valid()
        },
        {
            titleText: 'Contact Information',
            subtitleText: 'Provide contact details',
            icon: 'employee',
            completed: this.currentStep() > 3,
            valid: this.step4Valid()
        },
        {
            titleText: 'Summary',
            subtitleText: 'Review and confirm',
            icon: 'accept',
            completed: false,
            valid: true
        }
    ]);

    // Computed: Can navigate to next step
    canGoNext = computed(() => {
        switch (this.currentStep()) {
            case 0:
                return this.step1Valid();
            case 1:
                return this.step2Valid();
            case 2:
                return this.step3Valid();
            case 3:
                return this.step4Valid();
            default:
                return false;
        }
    });

    // Computed: Can navigate to previous step
    canGoPrevious = computed(() => this.currentStep() > 0);

    // Computed: Can submit wizard
    canSubmit = computed(
        () => this.step1Valid() && this.step2Valid() && this.step3Valid() && this.step4Valid() && this.isLastStep()
    );

    // Computed: Is last step
    isLastStep = computed(() => this.currentStep() === this.steps().length - 1);

    onStepChange(event: UI5WrapperCustomEvent<Wizard, 'ui5StepChange'>): void {
        const detail = event.detail;
        if (detail && detail.step) {
            const stepElement = detail.step;
            const stepIndex = Array.from(stepElement.parentElement?.children || []).indexOf(stepElement);
            if (stepIndex !== -1) {
                this.currentStep.set(stepIndex);
            }
        }
    }

    goToNextStep(): void {
        if (this.canGoNext() && !this.isLastStep()) {
            this.currentStep.update((current) => Math.min(current + 1, this.steps().length - 1));
        }
    }

    goToPreviousStep(): void {
        if (this.canGoPrevious()) {
            this.currentStep.update((current) => Math.max(current - 1, 0));
        }
    }

    submitWizard(): void {
        if (this.isLastStep()) {
            alert('Wizard completed successfully!');
            this.resetWizard();
        }
    }

    resetWizard(): void {
        this.currentStep.set(0);
        this.productName.set('');
        this.productDescription.set('');
        this.selectedPrice.set('basic');
        this.standardDelivery.set(true);
        this.expressDelivery.set(false);
        this.giftWrap.set(false);
        this.customerName.set('');
        this.customerEmail.set('');
        this.customerPhone.set('');
    }

    onProductNameChange(event: UI5WrapperCustomEvent<Input, 'ui5Input'>): void {
        this.productName.set(event.currentTarget.value);
    }

    onProductDescriptionChange(event: UI5WrapperCustomEvent<TextArea, 'ui5Input'>): void {
        this.productDescription.set(event.currentTarget.value);
    }

    onCustomerNameChange(event: UI5WrapperCustomEvent<Input, 'ui5Input'>): void {
        this.customerName.set(event.currentTarget.value);
    }

    onCustomerEmailChange(event: UI5WrapperCustomEvent<Input, 'ui5Input'>): void {
        this.customerEmail.set(event.currentTarget.value);
    }

    onCustomerPhoneChange(event: UI5WrapperCustomEvent<Input, 'ui5Input'>): void {
        this.customerPhone.set(event.currentTarget.value);
    }

    onPriceChange(price: string): void {
        this.selectedPrice.set(price);
    }

    onStandardDeliveryChange(event: UI5WrapperCustomEvent<CheckBox, 'ui5Change'>): void {
        this.standardDelivery.set(event.currentTarget.checked);
        if (event.currentTarget.checked) {
            this.expressDelivery.set(false);
        }
    }

    onExpressDeliveryChange(event: UI5WrapperCustomEvent<CheckBox, 'ui5Change'>): void {
        this.expressDelivery.set(event.currentTarget.checked);
        if (event.currentTarget.checked) {
            this.standardDelivery.set(false);
        }
    }

    onGiftWrapChange(event: UI5WrapperCustomEvent<CheckBox, 'ui5Change'>): void {
        this.giftWrap.set(event.currentTarget.checked);
    }
}
