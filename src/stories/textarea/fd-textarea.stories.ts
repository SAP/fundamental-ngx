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
        <textarea fd-form-control id="id" [attr.aria-label]="ariaLabel" [placeholder]="placeholderOfTextArea" [disabled]="disabledOfTextArea" [compact]="compactOfTextArea" [state]="stateOfTextArea"></textarea>
        </div>
  `,
    props: {
        stateOfTextArea: select('State', {
            information: 'information',
            success: 'success',
            error: 'error',
            warning: 'warning',
            none: '',
        }, ''),
        compactOfTextArea: boolean('Compact', false),
        disabledOfTextArea: boolean('Disabled', false),
        placeholderOfTextArea: text('Placeholder', 'Enter text here'),
        id: text('ID', 'textarea1'),
        ariaLabel: text('Aria Label', 'textarea1')

    }
});
