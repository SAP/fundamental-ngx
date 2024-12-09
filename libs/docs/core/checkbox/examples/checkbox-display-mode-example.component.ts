import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-checkbox-display-mode-example',
    template: `
        <p>Display-only checkboxes can be controlled programmatically. They will not react on any user interaction.</p>
        <label fd-form-label for="displayModeCheckbox">Display-only checkbox</label>
        <fd-checkbox
            label="Option 1"
            [(ngModel)]="checkboxValue"
            [displayOnly]="true"
            inputId="displayModeCheckbox"
        ></fd-checkbox>
        Value: {{ checkboxValue }}
        <br />
        <button fd-button (click)="toggleCheckboxValue()">
            Change value to {{ checkboxValue ? 'false' : 'true' }}
        </button>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormLabelComponent, CheckboxComponent, FormsModule, ButtonComponent]
})
export class CheckboxDisplayModeExampleComponent {
    checkboxValue = false;

    toggleCheckboxValue(): void {
        this.checkboxValue = !this.checkboxValue;
    }
}
