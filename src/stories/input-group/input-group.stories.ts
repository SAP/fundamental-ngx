import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text, number } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ReactiveFormsModule } from '@angular/forms';

import {
    InputGroupComponent,
    InputGroupModule
} from 'libs/core/src/lib/input-group/public_api';
import { icons, semanticStates } from '../../utils';

export default {
    title: 'Fd input-group',
    component: InputGroupComponent,
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

export const InputGroup = () => ({
    template: `
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
        placementVar: select(
            'Placement',
            {
                before: 'before',
                after: 'after'
            },
            'after'
        ),
        buttonTypeVar: select(
            'Button Type',
            {
                standard: 'standard',
                positive: 'positive',
                medium: 'medium',
                negative: 'negative'
            },
            'standard'
        ),
        buttonOptionsVar: select(
            'Button Options',
            {
                emphasized: 'emphasized',
                light: 'light',
                empty: ''
            },
            ''
        ),
        stateVar: select('State', semanticStates, null),
        compactVar: boolean('Compact', false),
        inlineVar: boolean('Inline', false),
        placeholderVar: text('Placeholder', 'Default placeholder'),
        addOnTextVar: text('Add on text', ''),
        glyphVar: select('Glyph', icons, ''),
        buttonFocusableVar: boolean('Button Focusable', true),
        buttonVar: boolean('Add on is Button', false),
        disabledVar: boolean('Disabled', false)
    }
});
