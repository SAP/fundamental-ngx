import { Component } from '@angular/core';

@Component({
    selector: 'fd-checkbox-states-example',
    template: `
        <h4 fd-form-header>Checkbox States Examples</h4>
        <div>
            <p>States:</p>
            <fd-checkbox [(ngModel)]="checkboxValue1" label="No state"></fd-checkbox>
            <br /><fd-checkbox [(ngModel)]="checkboxValue2" state="information" label="Info state"></fd-checkbox>
            <br /><fd-checkbox [(ngModel)]="checkboxValue3" state="success" label="Success state"></fd-checkbox>
            <br /><fd-checkbox [(ngModel)]="checkboxValue4" state="warning" label="Warning state"></fd-checkbox>
            <br /><fd-checkbox [(ngModel)]="checkboxValue5" state="error" label="Error state"></fd-checkbox>
        </div>
        <div>
            <p>Disabled:</p>
            <fd-checkbox [(ngModel)]="checkboxValue6" [disabled]="true" label="Disabled label"></fd-checkbox>
        </div>
        <div>
            <p>Compact:</p>
            <fd-checkbox [(ngModel)]="checkboxValue7" fdCompact label="Compact label"></fd-checkbox>
        </div>
    `
})
export class CheckboxStatesExampleComponent {
    public checkboxValue1 = false;
    public checkboxValue2 = false;
    public checkboxValue3 = false;
    public checkboxValue4 = false;
    public checkboxValue5 = false;
    public checkboxValue6 = false;
    public checkboxValue7 = false;
}
