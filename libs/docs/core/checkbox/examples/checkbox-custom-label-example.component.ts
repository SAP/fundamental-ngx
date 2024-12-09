import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';

@Component({
    selector: 'fd-checkbox-custom-label-example',
    template: `
        <fd-checkbox [(ngModel)]="checkboxValue"> I accept&nbsp;<a href="#">Terms and conditions</a> </fd-checkbox>
        Value: {{ checkboxValue }}
    `,
    imports: [CheckboxComponent, FormsModule]
})
export class CheckboxCustomLabelExampleComponent {
    checkboxValue = false;
}
