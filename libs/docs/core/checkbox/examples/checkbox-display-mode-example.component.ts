import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxDisplayModeExampleComponent {
    checkboxValue = false;

    toggleCheckboxValue(): void {
        this.checkboxValue = !this.checkboxValue;
    }
}
