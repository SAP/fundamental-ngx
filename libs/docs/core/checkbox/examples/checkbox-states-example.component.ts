import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormHeaderComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-checkbox-states-example',
    template: `
        <h4 fd-form-header>Checkbox States Examples</h4>
        <div>
            <p>States:</p>
            <fd-checkbox [(ngModel)]="checkboxValue1" label="No state"></fd-checkbox>
            <fd-checkbox [(ngModel)]="checkboxValue2" state="information" label="Info state"></fd-checkbox>
            <fd-checkbox [(ngModel)]="checkboxValue3" state="success" label="Success state"></fd-checkbox>
            <fd-checkbox [(ngModel)]="checkboxValue4" state="warning" label="Warning state"></fd-checkbox>
            <fd-checkbox [(ngModel)]="checkboxValue5" state="error" label="Error state"></fd-checkbox>
        </div>
        <div>
            <p>Disabled:</p>
            <fd-checkbox [(ngModel)]="checkboxValue6" [disabled]="true" label="Disabled label"></fd-checkbox>
        </div>
        <div>
            <p>
                Read only:
                <fd-checkbox
                    [(ngModel)]="checkboxValue7"
                    [readonly]="true"
                    label="Readonly label when false"
                ></fd-checkbox>
                <fd-checkbox
                    [(ngModel)]="checkboxValue8"
                    [readonly]="true"
                    [tristate]="true"
                    label="Readonly label when null (in tristate)"
                ></fd-checkbox>
                <fd-checkbox
                    [(ngModel)]="checkboxValue9"
                    [readonly]="true"
                    label="Readonly label when true"
                ></fd-checkbox>
            </p>
        </div>
        <div>
            <p>Display-only:</p>
            <span style="display: flex;">
                <fd-checkbox
                    [(ngModel)]="displayOnlyCheckboxValue"
                    [displayOnly]="true"
                    label="Display-only label"
                ></fd-checkbox>
                <button fd-button (click)="toggleCheckboxValue()">
                    Change value to {{ displayOnlyCheckboxValue ? 'false' : 'true' }}
                </button>
            </span>
            <br />
            <span style="display: flex;"
                ><fd-checkbox
                    [(ngModel)]="displayOnlyCheckboxTristateValue"
                    [displayOnly]="true"
                    [tristate]="true"
                    label="Display-only tristate label"
                >
                </fd-checkbox>
                <button fd-button (click)="toggleCheckboxTristateValue()">
                    Change tristate value to
                    {{
                        displayOnlyCheckboxTristateValue
                            ? 'false'
                            : displayOnlyCheckboxTristateValue === false
                              ? 'null'
                              : 'true'
                    }}
                </button></span
            >
        </div>
        <div>
            <p>Compact:</p>
            <fd-checkbox [(ngModel)]="checkboxValue10" fdCompact label="Compact label"></fd-checkbox>
        </div>
    `,
    imports: [FormHeaderComponent, CheckboxComponent, FormsModule, ContentDensityDirective, ButtonComponent]
})
export class CheckboxStatesExampleComponent {
    public checkboxValue1 = false;
    public checkboxValue2 = false;
    public checkboxValue3 = false;
    public checkboxValue4 = false;
    public checkboxValue5 = false;
    public checkboxValue6 = false;
    public checkboxValue7 = false;
    public checkboxValue8 = null;
    public checkboxValue9 = true;
    public checkboxValue10 = false;

    // Change state programmatically with display-only
    displayOnlyCheckboxValue = false;
    displayOnlyCheckboxTristateValue: boolean | null = false;

    toggleCheckboxValue(): void {
        this.displayOnlyCheckboxValue = !this.displayOnlyCheckboxValue;
    }

    toggleCheckboxTristateValue(): void {
        this.displayOnlyCheckboxTristateValue =
            this.displayOnlyCheckboxTristateValue == true
                ? false
                : this.displayOnlyCheckboxTristateValue == false
                  ? null
                  : true;
    }
}
