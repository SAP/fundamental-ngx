import { Component } from '@angular/core';

@Component({
    selector: 'fd-checkbox-default-example',
    template: `
        <label fd-form-label for="defaultCheckbox" [required]="true">Default checkbox</label>
        <fd-checkbox
            label="Option 1"
            [(ngModel)]="checkboxValue"
            required="true"
            inputId="defaultCheckbox"
        ></fd-checkbox>
        Value: {{ checkboxValue }}
    `
})
export class CheckboxDefaultExampleComponent {
    checkboxValue = false;
}
