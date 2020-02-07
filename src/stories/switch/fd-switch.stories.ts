import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SwitchComponent, SwitchModule } from 'libs/core/src/lib/switch/public_api';

export default {
    title: 'Fd switch',
    component: SwitchComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [SwitchModule, FormsModule],
            declarations: []
        })
    ]
};

export const Switch = () => ({
    template:
        `
        <fd-switch 
            [(ngModel)]="switchValue1" 
            [optionalText]="optionalText"
            [semantic]="semantic"
            [compact]="compact"
            [disabled]="disabled">
        </fd-switch>
  `,
    props: {
        switchValue1: boolean('switch 1', false),
        optionalText: boolean('optionalText', false),
        semantic: boolean('semantic', false),
        disabled: boolean('disabled', false),
        compact: boolean('compact', false),
    }
});
