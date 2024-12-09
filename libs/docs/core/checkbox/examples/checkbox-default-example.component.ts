import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-checkbox-default-example',
    template: `
        <label fd-form-label for="defaultCheckbox">Default checkbox</label>
        <fd-checkbox
            label="Option 1"
            [(ngModel)]="checkboxValue"
            [required]="true"
            inputId="defaultCheckbox"
        ></fd-checkbox>
        Value: {{ checkboxValue }}
    `,
    imports: [FormLabelComponent, CheckboxComponent, FormsModule]
})
export class CheckboxDefaultExampleComponent {
    checkboxValue = false;
}
