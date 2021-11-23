import { Component } from '@angular/core';

@Component({
    selector: 'fd-checkbox-custom-values-example',
    template: `
        <div>
            <fd-checkbox
                label="I accept the new Terms of Service"
                [values]="{ trueValue: 'Yes', falseValue: 'No' }"
                [(ngModel)]="checkboxValue1"
            >
            </fd-checkbox>
            Value: {{ checkboxValue1 }}
        </div>

        <div>
            <fd-checkbox
                label="Banana is the best fruit"
                tristate="true"
                [values]="{ trueValue: 'Yes', falseValue: 'No', thirdStateValue: 'I dont have an opinion' }"
                [(ngModel)]="checkboxValue2"
            >
            </fd-checkbox>
            Value: {{ checkboxValue2 }}
        </div>
    `
})
export class CheckboxCustomValuesExampleComponent {
    checkboxValue1 = 'Yes';
    checkboxValue2 = 'Yes';
}
