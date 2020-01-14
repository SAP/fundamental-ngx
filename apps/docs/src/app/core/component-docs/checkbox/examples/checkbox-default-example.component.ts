import {Component} from '@angular/core';

@Component({
    selector: 'fd-default-checkbox-example',
    template: `
        <fd-checkbox label="Option 1" [(ngModel)]="checkboxValue"></fd-checkbox>
        Value: {{checkboxValue}}
    `
})
export class CheckboxDefaultExampleComponent {
    checkboxValue = false;
}
