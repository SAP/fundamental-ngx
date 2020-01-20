import {Component} from '@angular/core';

@Component({
    selector: 'fd-checkbox-states-example',
    template: `
        <div>
            States:
            <fd-checkbox [(ngModel)]="checkboxValue1" label="No state"></fd-checkbox>
            <fd-checkbox [(ngModel)]="checkboxValue2" state="information" label="Info state"></fd-checkbox>
            <fd-checkbox [(ngModel)]="checkboxValue3" state="valid" label="Valid state"></fd-checkbox>
            <fd-checkbox [(ngModel)]="checkboxValue4" state="warning" label="Warning state"></fd-checkbox>
            <fd-checkbox [(ngModel)]="checkboxValue5" state="invalid" label="Invalid state"></fd-checkbox>
        </div>
        <div>
            Disabled:
            <fd-checkbox [(ngModel)]="checkboxValue6" [disabled]="true" label="Disabled label"></fd-checkbox>
        </div>
        <div>
            Compact:
            <fd-checkbox [(ngModel)]="checkboxValue7" [compact]="true" label="Compact label"></fd-checkbox>
        </div>
    `,
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
