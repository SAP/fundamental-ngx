import { moduleMetadata } from '@storybook/angular';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { StepInputModule } from '../../../libs/core/src/lib/step-input/step-input.module';
import { StepInputComponent } from '../../../libs/core/src/lib/step-input/step-input.component';
import { icons, semanticStates, textAlign } from '../../utils';

export default {
    title: 'Fd step-input',
    component: StepInputComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [StepInputModule],
            declarations: []
        })
    ]
};

export const StepInput = () => ({
    template: `
        <fd-step-input
            [(value)]="value"
            [unit]="unit"
            [min]="min"
            [max]="max"
            [step]="step"
            [name]="name"
            [state]="state"
            [compact]="compact"
            [readonly]="readonly"
            [disabled]="disabled"
            [ariaLabel]="ariaLabel"
            [textAlign]="textAlign"
            [inputTitle]="inputTitle"
            [hasStepButtons]="hasStepButtons"
            [incrementButtonIcon]="incrementButtonIcon"
            [decrementButtonIcon]="decrementButtonIcon"
            [incrementButtonTitle]="incrementButtonTitle"
            [decrementButtonTitle]="decrementButtonTitle"
        >
        </fd-step-input>
    `,
    props: {
        unit: text('Unit', ''),
        value: text('Value', ''),
        name: text('Input name', ''),
        inputTitle: text('Input title', ''),
        ariaLabel: text('Aria label', ''),
        incrementButtonTitle: text('Increment button title', ''),
        decrementButtonTitle: text('Decrement button title', ''),

        min: number('Min value', null),
        max: number('Max value', null),
        step: number('Step value', 1),

        state: select('State', semanticStates, null),
        textAlign: select('Text alignment', textAlign, 'right'),
        incrementButtonIcon: select('Increment button icon', icons, 'add'),
        decrementButtonIcon: select('Decrement button icon', icons, 'less'),

        compact: boolean('Compact', false),
        disabled: boolean('Disabled', false),
        readonly: boolean('Readonly', false),
        hasStepButtons: boolean('Has step buttons', true),
    }
});
