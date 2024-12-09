import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';

@Component({
    selector: 'fd-checkbox-tristate-example',
    template: `
        <div>
            Third state selectable:
            <fd-checkbox label="Option 1" [tristate]="true" [tristateSelectable]="true" [(ngModel)]="checkboxValue1">
            </fd-checkbox>
            Value: {{ checkboxValue1 | json }}
        </div>

        <br />

        <div>
            Third state unselectable:
            <fd-checkbox label="Option 2" [tristate]="true" [tristateSelectable]="false" [(ngModel)]="checkboxValue2">
            </fd-checkbox>
            Value: {{ checkboxValue2 | json }}
        </div>
    `,
    imports: [CheckboxComponent, FormsModule, JsonPipe]
})
export class CheckboxTristateExampleComponent {
    checkboxValue1 = false;
    checkboxValue2 = null;
}
