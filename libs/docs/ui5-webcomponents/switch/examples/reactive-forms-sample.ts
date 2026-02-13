import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-label.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-reactive-forms-switch',
    templateUrl: './reactive-forms-sample.html',
    standalone: true,
    imports: [Switch, Label, ReactiveFormsModule]
})
export class ReactiveFormSwitchExample {
    private fb = new FormBuilder();

    settingsForm: FormGroup = this.fb.group({
        notifications: [true],
        darkMode: [false],
        autoSave: [true],
        shareData: [false]
    });

    onSubmit(): void {
        console.log('Form submitted:', this.settingsForm.value);
    }

    resetForm(): void {
        this.settingsForm.reset({
            notifications: true,
            darkMode: false,
            autoSave: true,
            shareData: false
        });
    }
}
