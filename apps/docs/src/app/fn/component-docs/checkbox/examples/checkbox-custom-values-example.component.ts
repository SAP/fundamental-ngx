import { Component } from '@angular/core';

@Component({
    selector: 'fd-checkbox-custom-values-example',
    template: `
        <div>
            <fn-checkbox
                label="I accept the new Terms of Service"
                [values]="{ trueValue: 'Yes', falseValue: 'No' }"
                [(ngModel)]="checkboxValue1"
            >
            </fn-checkbox>
        </div>
        <p>
            <i>Value: {{ checkboxValue1 }}</i>
        </p>

        <div>
            <fn-checkbox
                label="Banana is the best fruit"
                [values]="{ trueValue: 'Yes', falseValue: 'No' }"
                [(ngModel)]="checkboxValue2"
            >
            </fn-checkbox>
        </div>
        <p>
            <i>Value: {{ checkboxValue2 }}</i>
        </p>
    `
})
export class CheckboxCustomValuesExampleComponent {
    checkboxValue1 = 'Yes';
    checkboxValue2 = 'Yes';
}
