import { JsonPipe } from '@angular/common';
import {
    AfterViewInit,
    Component,
    computed,
    effect,
    inject,
    Injector,
    runInInjectionContext,
    signal,
    ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Card } from '@fundamental-ngx/ui5-webcomponents/card';
import { CardHeader } from '@fundamental-ngx/ui5-webcomponents/card-header';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Panel } from '@fundamental-ngx/ui5-webcomponents/panel';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';
import { SuggestionItem } from '@fundamental-ngx/ui5-webcomponents/suggestion-item';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';

import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/form-label.css';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/panel.css';
import 'fundamental-styles/dist/section.css';

import '@sap-ui/common-css/dist/sap-flex.css';
import '@sap-ui/common-css/dist/sap-margin.css';
import '@sap-ui/common-css/dist/sap-padding.css';
import '@sap-ui/common-css/dist/sap-text.css';

@Component({
    selector: 'ui5-input-sample',
    templateUrl: './input-sample.html',
    standalone: true,
    imports: [
        Input,
        Button,
        Label,
        Panel,
        Switch,
        Select,
        Option,
        Card,
        CardHeader,
        SuggestionItem,
        ReactiveFormsModule,
        JsonPipe
    ]
})
export class InputExample implements AfterViewInit {
    // Basic input example signals
    readonly basicValue = signal<string>('');
    readonly basicPlaceholder = signal<string>('Enter your text here...');

    // Configuration signals
    readonly isDisabled = signal<boolean>(false);
    readonly isReadonly = signal<boolean>(false);
    readonly isRequired = signal<boolean>(false);
    readonly showClearIcon = signal<boolean>(false);
    readonly showSuggestions = signal<boolean>(false);
    readonly maxLength = signal<number | undefined>(undefined);
    readonly currentValueState = signal<'None' | 'Positive' | 'Negative' | 'Critical' | 'Information'>('None');
    readonly maxLengthExample = signal<number>(500);
    readonly maxLengthExample2 = signal<number>(20);

    // Input type configuration
    readonly inputType = signal<'Text' | 'Email' | 'Password' | 'Tel' | 'URL' | 'Number'>('Text');
    readonly availableTypes = signal<string[]>(['Text', 'Email', 'Password', 'Tel', 'URL', 'Number']);
    readonly availableValueStates = signal<string[]>(['None', 'Positive', 'Negative', 'Critical', 'Information']);

    // ViewChild references
    @ViewChild('basicInput') basicInput!: Input;
    @ViewChild('validationInput') validationInput!: Input;
    @ViewChild('reactiveInput') reactiveInput!: Input;

    // Signal to track when ViewChild is ready
    readonly viewInitialized = signal(false);

    // Injector for running effects in proper context
    private injector = inject(Injector);

    // Form Builder for reactive forms
    private fb = new FormBuilder();

    // Reactive form with various validators
    readonly userForm: FormGroup = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.pattern(/^[+]?[\d\s()-]+$/)]],
        website: ['', [Validators.pattern(/^https?:\/\/.+/)]],
        age: ['', [Validators.min(18), Validators.max(120)]],
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        bio: ['', [Validators.maxLength(500)]]
    });

    // Form control signals for reactive access
    readonly firstName = computed(() => this.userForm.get('firstName') as FormControl);
    readonly lastName = computed(() => this.userForm.get('lastName') as FormControl);
    readonly email = computed(() => this.userForm.get('email') as FormControl);
    readonly phone = computed(() => this.userForm.get('phone') as FormControl);
    readonly website = computed(() => this.userForm.get('website') as FormControl);
    readonly age = computed(() => this.userForm.get('age') as FormControl);
    readonly username = computed(() => this.userForm.get('username') as FormControl);
    readonly bio = computed(() => this.userForm.get('bio') as FormControl);

    // Form validation signals that update reactively
    readonly isFormValid = signal(false);
    readonly isFormDirty = signal(false);
    readonly isFormTouched = signal(false);

    // Computed properties for individual field states
    readonly firstNameState = computed(() => {
        const control = this.firstName();
        if (!control.touched) {
            return 'None';
        }
        return control.valid ? 'Positive' : 'Negative';
    });

    readonly lastNameState = computed(() => {
        const control = this.lastName();
        if (!control.touched) {
            return 'None';
        }
        return control.valid ? 'Positive' : 'Negative';
    });

    readonly emailState = computed(() => {
        const control = this.email();
        if (!control.touched) {
            return 'None';
        }
        return control.valid ? 'Positive' : 'Negative';
    });

    readonly phoneState = computed(() => {
        const control = this.phone();
        if (!control.touched) {
            return 'None';
        }
        if (control.value && !control.valid) {
            return 'Critical';
        }
        return control.valid ? 'Positive' : 'None';
    });

    readonly websiteState = computed(() => {
        const control = this.website();
        if (!control.touched) {
            return 'None';
        }
        if (control.value && !control.valid) {
            return 'Negative';
        }
        return control.valid ? 'Positive' : 'None';
    });

    readonly ageState = computed(() => {
        const control = this.age();
        if (!control.touched) {
            return 'None';
        }
        return control.valid ? 'Positive' : 'Negative';
    });

    readonly usernameState = computed(() => {
        const control = this.username();
        if (!control.touched) {
            return 'None';
        }
        return control.valid ? 'Positive' : 'Negative';
    });

    // Event handling signals
    readonly inputEvents = signal<string[]>([]);
    readonly changeEvents = signal<string[]>([]);
    readonly selectionEvents = signal<string[]>([]);

    // Search/suggestion example
    readonly searchValue = signal<string>('');
    readonly searchSuggestions = signal<string[]>([
        'Angular',
        'TypeScript',
        'JavaScript',
        'HTML',
        'CSS',
        'React',
        'Vue',
        'Node.js',
        'Express',
        'MongoDB'
    ]);
    readonly filteredSuggestions = computed(() => {
        const value = this.searchValue().toLowerCase();
        if (!value) {
            return [];
        }
        return this.searchSuggestions()
            .filter((suggestion) => suggestion.toLowerCase().includes(value))
            .slice(0, 5);
    });

    // Dynamic value state example
    readonly dynamicStateValue = signal<string>('');
    readonly dynamicStateMessage = signal<string>('');

    // Computed properties for display
    readonly basicValueDisplay = computed(() => {
        const value = this.basicValue();
        return value || 'No value entered';
    });

    readonly configurationSummary = computed(() => ({
        disabled: this.isDisabled(),
        readonly: this.isReadonly(),
        required: this.isRequired(),
        showClearIcon: this.showClearIcon(),
        showSuggestions: this.showSuggestions(),
        maxLength: this.maxLength(),
        valueState: this.currentValueState(),
        type: this.inputType()
    }));

    readonly formSummary = computed(() => ({
        valid: this.isFormValid(),
        dirty: this.isFormDirty(),
        touched: this.isFormTouched(),
        values: this.userForm.value,
        errors: this.getFormErrors()
    }));

    ngAfterViewInit(): void {
        this.viewInitialized.set(true);

        // Subscribe to form status changes to update reactive signals
        this.userForm.statusChanges.subscribe(() => {
            this.isFormValid.set(this.userForm.valid);
            this.isFormDirty.set(this.userForm.dirty);
            this.isFormTouched.set(this.userForm.touched);
        });

        // Subscribe to form value changes
        this.userForm.valueChanges.subscribe(() => {
            this.isFormValid.set(this.userForm.valid);
            this.isFormDirty.set(this.userForm.dirty);
            this.isFormTouched.set(this.userForm.touched);
        });

        // Initial update of form state signals
        this.isFormValid.set(this.userForm.valid);
        this.isFormDirty.set(this.userForm.dirty);
        this.isFormTouched.set(this.userForm.touched);

        // Demonstrate reactive selectedItems access after view init
        runInInjectionContext(this.injector, () => {
            effect(() => {
                if (this.viewInitialized() && this.basicInput) {
                    console.log('Basic input element ready:', this.basicInput.element);
                }
            });

            // Watch form changes reactively
            effect(() => {
                const formValue = this.userForm.value;
                console.log('Form value changed:', formValue);
            });
        });
    }

    // Event handlers
    onBasicInput(event: UI5WrapperCustomEvent<Input, 'ui5Input'>): void {
        const target = event.target?.['value'];
        this.basicValue.set(target.value || '');
        this.addInputEvent(`Input: "${target.value}"`);
    }

    onBasicChange(event: UI5WrapperCustomEvent<Input, 'ui5Change'>): void {
        const target = event.target as any;
        this.addChangeEvent(`Change: "${target.value}"`);
    }

    onSelection(event: UI5WrapperCustomEvent<Input, 'ui5Select'>): void {
        const target = event.target as any;
        this.addSelectionEvent(`Selection at: ${target.selectionStart}-${target.selectionEnd}`);
    }

    onSearchInput(event: UI5WrapperCustomEvent<Input, 'ui5Input'>): void {
        const target = event.target as any;
        this.searchValue.set(target.value || '');
    }

    // Configuration methods
    toggleDisabled(): void {
        this.isDisabled.update((value) => !value);
    }

    toggleReadonly(): void {
        this.isReadonly.update((value) => !value);
    }

    toggleRequired(): void {
        this.isRequired.update((value) => !value);
    }

    toggleClearIcon(): void {
        this.showClearIcon.update((value) => !value);
    }

    toggleSuggestions(): void {
        this.showSuggestions.update((value) => !value);
    }

    onTypeChange(event: UI5WrapperCustomEvent<Select, 'ui5Change'>): void {
        const selectedOption = event.detail.selectedOption;
        if (selectedOption) {
            this.inputType.set(
                event.detail.selectedOption.textContent as 'Text' | 'Email' | 'Password' | 'Tel' | 'URL' | 'Number'
            );
        }
    }

    onValueStateChange(event: UI5WrapperCustomEvent<Select, 'ui5Change'>): void {
        const selectedOption = event.detail.selectedOption;
        if (selectedOption) {
            this.currentValueState.set(
                selectedOption.textContent as 'None' | 'Positive' | 'Negative' | 'Critical' | 'Information'
            );
        }
    }

    onMaxLengthChange(event: UI5WrapperCustomEvent<Input, 'ui5Change'>): void {
        const value = parseInt(event.target?.['value'], 10);
        this.maxLength.set(isNaN(value) ? undefined : value);
    }

    // Form methods
    onSubmit(): void {
        if (this.userForm.valid) {
            console.log('Form submitted:', this.userForm.value);
        } else {
            this.markAllFieldsAsTouched();
        }
    }

    resetForm(): void {
        this.userForm.reset();
        this.updateFormStateSignals();
    }

    fillSampleData(): void {
        this.userForm.patchValue({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+1-555-123-4567',
            website: 'https://johndoe.dev',
            age: 30,
            username: 'johndoe',
            bio: 'Software developer with passion for Angular and TypeScript'
        });
        this.updateFormStateSignals();
    }

    markAllFieldsAsTouched(): void {
        Object.keys(this.userForm.controls).forEach((key) => {
            this.userForm.get(key)?.markAsTouched();
        });
        this.updateFormStateSignals();
    }

    private updateFormStateSignals(): void {
        this.isFormValid.set(this.userForm.valid);
        this.isFormDirty.set(this.userForm.dirty);
        this.isFormTouched.set(this.userForm.touched);
    }

    // Utility methods
    private addInputEvent(event: string): void {
        this.inputEvents.update((events) => {
            const newEvents = [event, ...events.slice(0, 4)];
            return newEvents;
        });
    }

    private addChangeEvent(event: string): void {
        this.changeEvents.update((events) => {
            const newEvents = [event, ...events.slice(0, 4)];
            return newEvents;
        });
    }

    private addSelectionEvent(event: string): void {
        this.selectionEvents.update((events) => {
            const newEvents = [event, ...events.slice(0, 4)];
            return newEvents;
        });
    }

    private getFormErrors(): { [key: string]: any } {
        const errors: { [key: string]: any } = {};
        Object.keys(this.userForm.controls).forEach((key) => {
            const control = this.userForm.get(key);
            if (control && control.errors && control.touched) {
                errors[key] = control.errors;
            }
        });
        return errors;
    }

    getFieldErrorMessage(fieldName: string): string {
        const control = this.userForm.get(fieldName);
        if (!control || !control.errors || !control.touched) {
            return '';
        }

        const errors = control.errors;
        if (errors['required']) {
            return `${fieldName} is required`;
        }
        if (errors['minlength']) {
            return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
        }
        if (errors['maxlength']) {
            return `${fieldName} must not exceed ${errors['maxlength'].requiredLength} characters`;
        }
        if (errors['email']) {
            return 'Please enter a valid email address';
        }
        if (errors['pattern']) {
            if (fieldName === 'phone') {
                return 'Please enter a valid phone number';
            }
            if (fieldName === 'website') {
                return 'Please enter a valid URL starting with http:// or https://';
            }
        }
        if (errors['min']) {
            return `${fieldName} must be at least ${errors['min'].min}`;
        }
        if (errors['max']) {
            return `${fieldName} must not exceed ${errors['max'].max}`;
        }

        return 'Invalid value';
    }
}
