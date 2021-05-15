import { Component } from '@angular/core';

@Component({
    selector: 'fd-checkbox-default-example',
    template: `
        <fd-checkbox label="Option 1" [(ngModel)]="checkboxValue"></fd-checkbox>
        Value: {{ checkboxValue }}
    `
})
export class CheckboxDefaultExampleComponent {
    checkboxValue = false;
}
