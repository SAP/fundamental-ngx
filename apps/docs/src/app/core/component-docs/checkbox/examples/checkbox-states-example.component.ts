import {Component} from '@angular/core';

@Component({
    selector: 'fd-checkbox-states-example',
    template: `
        <div>
            States:
            <fd-checkbox label="No state"></fd-checkbox>
            <fd-checkbox state="information" label="Info state"></fd-checkbox>
            <fd-checkbox state="valid" label="Valid state"></fd-checkbox>
            <fd-checkbox state="warning" label="Warning state"></fd-checkbox>
            <fd-checkbox state="invalid" label="Invalid state"></fd-checkbox>
        </div>
        <div>
            Disabled:
            <fd-checkbox [disabled]="true" label="Disabled label"></fd-checkbox>
        </div>
        <div>
            Compact:
            <fd-checkbox [compact]="true" label="Compact label"></fd-checkbox>
        </div>
    `,
})
export class CheckboxStatesExampleComponent {
}
