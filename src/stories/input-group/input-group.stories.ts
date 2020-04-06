import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text, number } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ReactiveFormsModule } from '@angular/forms';

import { InputGroupComponent, InputGroupNumberComponent, InputGroupModule } from 'libs/core/src/lib/input-group/public_api';

export default {
    title: 'Fd input-group',
    component: InputGroupNumberComponent, InputGroupComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [InputGroupModule, ReactiveFormsModule],
            declarations: []
        })
    ]
};

export const InputGroupNumber = () => ({
    template:
        `
        <label fd-form-label>Input Group</label>
        <fd-input-group-number 
        [placeholder]="placeholderVar"
        [disabled]="disabledVar"
        [stepDownLabel]="stepDownLabel"
        [stepUpLabel]="stepUpLabel"
        [(ngModel)]="number"
        ></fd-input-group-number>
  `,
    props: {
        placeholderVar: text('Placeholder', 'Choose a number'),
        disabledVar: boolean('Disabled', false),
        stepDownLabel: text('Step down aria label', 'step-down'),
        stepUpLabel: text('Step up aria label', 'step-up'),
        number: number('Number', 0),

    }
});


export const InputGroup = () => ({
    template:
        `
        <label fd-form-label>Input Group</label>
        <fd-input-group 
        [placement]="placementVar"
        [addOnText]="addOnTextVar" 
        [placeholder]="placeholder"
        [compact]="compactVar"
        [inline]="inlineVar"
        [buttonFocusable]="buttonFocusable"
        [buttonType]="buttonTypeVar"
        
        [glyph]="glyphVar"
        [button]="buttonVar"
        [disabled]="disabledVar"
        [state]="stateVar"
        ></fd-input-group>
  `,
    props: {
        placementVar: select('Placement', {
            before: 'before',
            after: 'after',
        }, 'after'),
        buttonTypeVar: select('Button Type', {
            standard: 'standard',
            positive: 'positive',
            medium: 'medium',
            negative: 'negative',
        }, 'standard'),
        buttonOptionsVar: select('Button Options', {
            emphasized: 'emphasized',
            light: 'light',
            empty: '',
        }, ''),
        stateVar: select('State', {
            valid: 'valid',
            invalid: 'invalid',
            information: 'information',
            empty: '',
        }, ''),
        compactVar: boolean('Compact', false),
        inlineVar: boolean('Inline', false),
        placeholderVar: text('Placeholder', 'Default placeholder'),
        addOnTextVar: text('Add on text', ''),
        glyphVar: text('Glyph', ''),
        buttonFocusableVar: boolean('Button Focusable', true),
        buttonVar: boolean('Add on is Button', false),
        disabledVar: boolean('Disabled', false),

    }
});
