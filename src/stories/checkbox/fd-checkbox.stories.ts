import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ReactiveFormsModule } from '@angular/forms';

import { CheckboxComponent, CheckboxModule } from 'libs/core/src/lib/checkbox/public_api';

export default {
    title: 'Fd checkbox',
    component: CheckboxComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [CheckboxModule, ReactiveFormsModule],
            declarations: []
        })
    ]
};


export const Checkbox = () => ({
    template:
        `
        <fd-checkbox [(ngModel)]="checkboxValue1" label="No state"></fd-checkbox>
        <fd-checkbox [(ngModel)]="checkboxValue2" state="information" label="Info state"></fd-checkbox>
        <fd-checkbox [(ngModel)]="checkboxValue3" state="valid" label="Valid state"></fd-checkbox>
        <fd-checkbox [(ngModel)]="checkboxValue4" state="warning" label="Warning state"></fd-checkbox>
        <fd-checkbox [(ngModel)]="checkboxValue5" state="invalid" label="Invalid state"></fd-checkbox>
        <fd-checkbox [(ngModel)]="checkboxValue6" state="information" [compact]="true" label="Compact"></fd-checkbox>
        <fd-checkbox [(ngModel)]="checkboxValue7" state="information" [disabled]="true" label="Disabled"></fd-checkbox>
  `,
    props: {
        checkboxValue1: boolean('checkbox 1', false),
        checkboxValue2: boolean('checkbox 2', false),
        checkboxValue3: boolean('checkbox 3', false),
        checkboxValue4: boolean('checkbox 4', false),
        checkboxValue5: boolean('checkbox 5', false),
        checkboxValue6: boolean('checkbox 6', false),
        checkboxValue7: boolean('checkbox 7', false),
    }
});
