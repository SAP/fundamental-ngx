import { Component } from '@angular/core';

@Component({
    selector: 'fd-checkbox-default-example',
    template: `
        <fd-checkbox label="Option 1" [(ngModel)]="checkboxValue" required="true"></fd-checkbox>
        Value: {{ checkboxValue }}
    `
})
export class CheckboxDefaultExampleComponent {
    checkboxValue = false;
}
