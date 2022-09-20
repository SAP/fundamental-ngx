import { Component } from '@angular/core';

@Component({
    selector: 'fd-checkbox-custom-label-example',
    template: `
        <fd-checkbox [(ngModel)]="checkboxValue"> I accept&nbsp;<a href="#">Terms and conditions</a> </fd-checkbox>
        <br />Value: {{ checkboxValue }}
    `
})
export class CheckboxCustomLabelExampleComponent {
    checkboxValue = false;
}
