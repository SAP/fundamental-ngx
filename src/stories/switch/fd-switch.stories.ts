import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToggleComponent, ToggleModule } from 'libs/core/src/lib/toggle/public_api';

export default {
    title: 'Fd toggle',
    component: ToggleComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [ToggleModule, FormsModule],
            declarations: []
        })
    ]
};

export const Toggle = () => ({
    template:
        `
        <fd-toggle 
            [(ngModel)]="toggleValue1" 
            [noText]="noText"
            [semantic]="semantic"
            [compact]="compact"
            [disabled]="disabled">
        </fd-toggle>
  `,
    props: {
        toggleValue1: boolean('toggle 1', false),
        noText: boolean('noText', false),
        semantic: boolean('semantic', false),
        disabled: boolean('disabled', false),
        compact: boolean('compact', false),
    }
});
