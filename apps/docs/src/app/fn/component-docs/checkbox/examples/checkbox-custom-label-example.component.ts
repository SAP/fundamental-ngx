import { Component } from '@angular/core';

@Component({
    selector: 'fd-checkbox-custom-label-example',
    template: `
        <div>
            <fn-checkbox [(ngModel)]="checkboxValue"> I accept&nbsp;<a href="#">Terms and conditions</a> </fn-checkbox>
        </div>
        <p>
            <i>Value: {{ checkboxValue }}</i>
        </p>
    `
})
export class CheckboxCustomLabelExampleComponent {
    checkboxValue = false;
}
