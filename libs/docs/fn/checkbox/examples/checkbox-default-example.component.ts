import { Component } from '@angular/core';

@Component({
    selector: 'fd-checkbox-default-example',
    template: `
        <div>
            <fn-checkbox
                label="Option 1"
                [(ngModel)]="checkboxValue"
                [required]="true"
                inputId="defaultCheckbox"
            ></fn-checkbox>
        </div>
        <p>
            <i>Value: {{ checkboxValue }}</i>
        </p>
    `
})
export class CheckboxDefaultExampleComponent {
    checkboxValue = false;
}
