import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ReactiveFormsModule } from '@angular/forms';

import { CheckboxComponent, CheckboxModule } from 'libs/core/src/lib/checkbox/public_api';
import { semanticStates } from '../../utils';

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
    template: `
        <fd-checkbox [(ngModel)]="checkboxValue1"
            [state]="state"
            [label]="label"
            [name]="name"
            [disabled]="disabled"
            [compact]="compact"
            [tristate]="tristate"
            [tristateSelectable]="tristateSelectable">
        </fd-checkbox>
  `,
    props: {
        checkboxValue1: boolean('checkbox 1', false),
        state: select('state', semanticStates, null),
        label: text('label', 'Checkbox'),
        name: text('name', 'Checkbox'),
        disabled: boolean('disabled', false),
        compact: boolean('compact', false),
        tristate: boolean('tristate', false),
        tristateSelectable: boolean('tristateSelectable', false)
    }
});
