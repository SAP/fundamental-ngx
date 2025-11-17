import { JsonPipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { Form } from '@fundamental-ngx/ui5-webcomponents/form';
import { FormGroup as UI5FormGroup } from '@fundamental-ngx/ui5-webcomponents/form-group';
import { FormItem } from '@fundamental-ngx/ui5-webcomponents/form-item';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { MessageStrip } from '@fundamental-ngx/ui5-webcomponents/message-strip';
import { TextArea, TextAreaInputEventDetail } from '@fundamental-ngx/ui5-webcomponents/text-area';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';
import 'fundamental-styles/dist/panel.css';

interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

@Component({
    selector: 'ui5-form-validation-sample',
    templateUrl: './validation.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        Form,
        UI5FormGroup,
        FormItem,
        Label,
        Input,
        TextArea,
        CheckBox,
        Button,
        MessageStrip,
        JsonPipe
    ]
})
export class FormValidationSample {
    readonly registrationForm: FormGroup;

    readonly isSubmitted = signal<boolean>(false);
    readonly submitAttempts = signal<number>(0);
    readonly validationMessages = signal<string[]>([]);

    readonly formValidation = computed((): ValidationResult => {
        const form = this.registrationForm;
        const errors: string[] = [];

        if (form.get('firstName')?.invalid && (form.get('firstName')?.dirty || this.isSubmitted())) {
            if (form.get('firstName')?.errors?.['required']) {
                errors.push('First name is required');
            }
            if (form.get('firstName')?.errors?.['minlength']) {
                errors.push('First name must be at least 2 characters');
            }
        }

        if (form.get('email')?.invalid && (form.get('email')?.dirty || this.isSubmitted())) {
            if (form.get('email')?.errors?.['required']) {
                errors.push('Email is required');
            }
            if (form.get('email')?.errors?.['email']) {
                errors.push('Please enter a valid email address');
            }
        }

        if (form.get('password')?.invalid && (form.get('password')?.dirty || this.isSubmitted())) {
            if (form.get('password')?.errors?.['required']) {
                errors.push('Password is required');
            }
            if (form.get('password')?.errors?.['minlength']) {
                errors.push('Password must be at least 8 characters');
            }
            if (form.get('password')?.errors?.['pattern']) {
                errors.push(
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                );
            }
        }

        if (form.get('confirmPassword')?.invalid && (form.get('confirmPassword')?.dirty || this.isSubmitted())) {
            if (form.get('confirmPassword')?.errors?.['required']) {
                errors.push('Password confirmation is required');
            }
            if (form.get('confirmPassword')?.errors?.['mismatch']) {
                errors.push('Passwords do not match');
            }
        }

        if (form.get('terms')?.invalid && (form.get('terms')?.dirty || this.isSubmitted())) {
            if (form.get('terms')?.errors?.['required']) {
                errors.push('You must accept the terms and conditions');
            }
        }

        return {
            isValid: errors.length === 0 && form.valid,
            errors
        };
    });

    constructor(private fb: FormBuilder) {
        this.registrationForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
            confirmPassword: ['', [Validators.required]],
            phone: ['', [Validators.pattern(/^\+?[\d\s-()]+$/)]],
            bio: ['', [Validators.maxLength(500)]],
            terms: [false, [Validators.requiredTrue]]
        });

        this.registrationForm.get('confirmPassword')?.addValidators(this.passwordMatchValidator.bind(this));

        effect(() => {
            const validation = this.formValidation();
            this.validationMessages.set(validation.errors);
        });
    }

    onSubmit(): void {
        this.isSubmitted.set(true);
        this.submitAttempts.update((count) => count + 1);

        if (this.registrationForm.valid) {
            console.log('Form submitted successfully:', this.registrationForm.value);
        } else {
            console.log('Form has validation errors');
            this.markAllFieldsAsTouched();
        }
    }

    resetForm(): void {
        this.registrationForm.reset();
        this.isSubmitted.set(false);
        this.submitAttempts.set(0);
        this.validationMessages.set([]);
    }

    hasFieldError(fieldName: string): boolean {
        const field = this.registrationForm.get(fieldName);
        return !!(field?.invalid && (field?.dirty || field?.touched || this.isSubmitted()));
    }

    getFieldErrorMessage(fieldName: string): string {
        const field = this.registrationForm.get(fieldName);
        if (!field?.errors) {
            return '';
        }

        const errors = field.errors;
        if (errors['required']) {
            return `${this.getFieldLabel(fieldName)} is required`;
        }
        if (errors['email']) {
            return 'Please enter a valid email address';
        }
        if (errors['minlength']) {
            return `Minimum ${errors['minlength'].requiredLength} characters required`;
        }
        if (errors['maxlength']) {
            return `Maximum ${errors['maxlength'].requiredLength} characters allowed`;
        }
        if (errors['pattern'] && fieldName === 'password') {
            return 'Password must contain uppercase, lowercase, and number';
        }
        if (errors['pattern'] && fieldName === 'phone') {
            return 'Please enter a valid phone number';
        }
        if (errors['mismatch']) {
            return 'Passwords do not match';
        }

        return 'Invalid input';
    }

    onInputChange(fieldName: string, event: CustomEvent): void {
        const value = (event.target as any)?.value;
        this.registrationForm.get(fieldName)?.setValue(value);
        this.registrationForm.get(fieldName)?.markAsDirty();
    }

    onTextAreaChange(fieldName: string, event: CustomEvent<TextAreaInputEventDetail>): void {
        const value = (event.target as any)?.value;
        this.registrationForm.get(fieldName)?.setValue(value);
        this.registrationForm.get(fieldName)?.markAsDirty();
    }

    onCheckboxChange(fieldName: string, event: CustomEvent): void {
        const checked = (event.target as any)?.checked;
        this.registrationForm.get(fieldName)?.setValue(checked);
        this.registrationForm.get(fieldName)?.markAsDirty();
    }

    private passwordValidator(control: AbstractControl): { pattern: true } | null {
        const value = control.value;
        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);

        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            return { pattern: true };
        }

        return null;
    }

    private passwordMatchValidator(control: AbstractControl): { mismatch: true } | null {
        const password = this.registrationForm?.get('password')?.value;
        const confirmPassword = control.value;

        if (password !== confirmPassword) {
            return { mismatch: true };
        }

        return null;
    }

    private markAllFieldsAsTouched(): void {
        Object.keys(this.registrationForm.controls).forEach((key) => {
            this.registrationForm.get(key)?.markAsTouched();
        });
    }

    private getFieldLabel(fieldName: string): string {
        const labels: Record<string, string> = {
            firstName: 'First name',
            lastName: 'Last name',
            email: 'Email',
            password: 'Password',
            confirmPassword: 'Password confirmation',
            phone: 'Phone number',
            bio: 'Bio',
            terms: 'Terms acceptance'
        };
        return labels[fieldName] || fieldName;
    }
}
