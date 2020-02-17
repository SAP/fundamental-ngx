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

const ariaLabelConst: string = 'Optioanl Label';

export const Switch = () => ({
    template:
        `
        <fd-switch 
            id="sb-switch-1"
            [ariaLabel]="optionalText"
            [(ngModel)]="switchValue1" 
            [optionalText]="optionalText"
            [semantic]="semantic"
            [compact]="compact"
            [disabled]="disabled">
        </fd-switch>
  `,
    props: {
        switchValue1: boolean('Switched', false),
        ariaLabel: text('Aria Label', ariaLabelConst),
        optionalText: boolean('Optional Text', false),
        semantic: boolean('Semantic Design', false),
        disabled: boolean('Disabled', false),
        compact: boolean('Compact Mode', false),
    }
});
