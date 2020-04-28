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
        <textarea fd-form-control id="id" [attr.aria-label]="ariaLabel" [placeholder]="placeholderVar" [disabled]="disabledVar" [compact]="compactVar" [state]="stateVar"></textarea>
        </div>
  `,
    props: {
        stateVar: select('State', {
            information: 'information',
            success: 'success',
            error: 'error',
            warning: 'warning',
            none: '',
        }, ''),
        compactVar: boolean('Compact', false),
        disabledVar: boolean('Disabled', false),
        placeholderVar: text('Placeholder', 'Enter text here'),
        id: text('Id', 'textarea1'),
        ariaLabel: text('Aria Label', 'textarea1')

    }
});