import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ReactiveFormsModule } from '@angular/forms';

import { FormControlDirective, FormModule } from 'libs/core/src/lib/form/public_api';

export default {
    title: 'Fd text-area',
    component: FormControlDirective,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [FormModule, ReactiveFormsModule],
            declarations: []
        })
    ]
};

export const TextArea = () => ({
    template:
        `
        <div fd-form-item>
        <label fd-form-label for="input-1">Default Text Area</label>
        <textarea fd-form-control type="text" id="input-1" placeholder="Field placeholder text"
        [compact]="compactVar"
        [state]="stateVar"
        >
        </textarea>
        </div>
  `,
    props: {
        stateVar: select('State', {
            information: 'information',
            valid: 'valid',
            invalid: 'invalid',
            warning: 'warning',
            none: '',
        }, ''),
        compactVar: boolean('Compact', false),
    }
});
