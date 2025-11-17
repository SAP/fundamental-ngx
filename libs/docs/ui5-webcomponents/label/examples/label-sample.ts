import { Component, computed, effect, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { Form } from '@fundamental-ngx/ui5-webcomponents/form';
import { FormGroup } from '@fundamental-ngx/ui5-webcomponents/form-group';
import { FormItem } from '@fundamental-ngx/ui5-webcomponents/form-item';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { RadioButton } from '@fundamental-ngx/ui5-webcomponents/radio-button';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';
import { TextArea } from '@fundamental-ngx/ui5-webcomponents/text-area';
import { WrappingType } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';
import 'fundamental-styles/dist/panel.css';
import 'fundamental-styles/dist/section.css';

@Component({
    selector: 'ui5-label-sample',
    templateUrl: './label-sample.html',
    standalone: true,
    imports: [
        Label,
        Input,
        TextArea,
        Button,
        CheckBox,
        RadioButton,
        Select,
        Option,
        Switch,
        SegmentedButton,
        SegmentedButtonItem,
        Form,
        FormGroup,
        FormItem
    ]
})
export class LabelExample {
    // Form field values using Angular 20 signals
    readonly firstName = signal<string>('');
    readonly textAreaRows = signal<number>(3);
    readonly lastName = signal<string>('');
    readonly email = signal<string>('');
    readonly description = signal<string>('');
    readonly acceptTerms = signal<boolean>(false);
    readonly gender = signal<string>('');
    readonly country = signal<string>('');
    readonly notifications = signal<boolean>(true);

    // Label configuration options using signals
    readonly showColon = signal<boolean>(false);
    readonly showRequired = signal<boolean>(false);
    readonly currentWrappingType = signal<WrappingType>(WrappingType.Normal);

    // Available wrapping types
    readonly wrappingTypes = computed(() => Object.values(['Normal', 'None'] as WrappingType[]));

    // Form validation states
    readonly isFormValid = computed(
        () =>
            this.firstName().trim().length > 0 &&
            this.lastName().trim().length > 0 &&
            this.email().trim().length > 0 &&
            this.acceptTerms()
    );

    // Display computed values
    readonly formSummary = computed(() => ({
        firstName: this.firstName(),
        lastName: this.lastName(),
        email: this.email(),
        description: this.description(),
        acceptTerms: this.acceptTerms(),
        gender: this.gender(),
        country: this.country(),
        notifications: this.notifications()
    }));

    constructor() {
        // Using Angular 20 effect for side effects and logging
        effect(() => {
            console.log('Label configuration changed:', {
                showColon: this.showColon(),
                showRequired: this.showRequired(),
                wrappingType: this.currentWrappingType()
            });
        });

        effect(() => {
            console.log('Form validity changed:', this.isFormValid());
        });
    }

    // Event handlers for form controls
    onFirstNameChange(event: any): void {
        this.firstName.set(event.target.value);
    }

    onLastNameChange(event: any): void {
        this.lastName.set(event.target.value);
    }

    onEmailChange(event: any): void {
        this.email.set(event.target.value);
    }

    onDescriptionChange(event: any): void {
        this.description.set(event.target.value);
    }

    onTermsChange(event: any): void {
        this.acceptTerms.set(event.target.checked);
    }

    onGenderChange(event: any): void {
        this.gender.set(event.target.value);
    }

    onCountryChange(event: any): void {
        this.country.set(event.detail.selectedOption?.textContent || '');
    }

    onNotificationsChange(event: any): void {
        this.notifications.set(event.target.checked);
    }

    // Label configuration handlers
    toggleColon(): void {
        this.showColon.update((current) => !current);
    }

    toggleRequired(): void {
        this.showRequired.update((current) => !current);
    }

    onWrappingTypeChange(event: any): void {
        const selectedItems = event.detail.selectedItems;
        if (selectedItems && selectedItems.length > 0) {
            const selectedType = selectedItems[0].innerText as WrappingType;
            this.currentWrappingType.set(selectedType);
        }
    }

    // Form actions
    onSubmit(): void {
        if (this.isFormValid()) {
            console.log('Form submitted with data:', this.formSummary());
            alert('Form submitted successfully! Check console for details.');
        } else {
            alert('Please fill in all required fields and accept the terms.');
        }
    }

    onReset(): void {
        this.firstName.set('');
        this.lastName.set('');
        this.email.set('');
        this.description.set('');
        this.acceptTerms.set(false);
        this.gender.set('');
        this.country.set('');
        this.notifications.set(true);
    }

    // Demo preset data
    loadSampleData(): void {
        this.firstName.set('John');
        this.lastName.set('Doe');
        this.email.set('john.doe@example.com');
        this.description.set('This is a sample description for demonstration purposes.');
        this.acceptTerms.set(true);
        this.gender.set('male');
        this.country.set('United States');
        this.notifications.set(false);
    }
}
