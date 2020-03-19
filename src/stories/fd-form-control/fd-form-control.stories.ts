import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlDirective, FormModule } from 'libs/core/src/lib/form/public_api';

export default {
    title: 'Fd form-control',
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

export const FormControl = () => ({
    template:
        `
        <div fd-form-item>
        <label fd-form-label for="input-1" [required]="requiredVar">Default Input</label>
        <fd-form-input-message-group>
        <input id="form-input" aria-label="input1" fd-form-control type="text" id="input-52" placeholder="Field placeholder text" [compact]="compactVar" [state]="stateVar"/>
        <fd-form-message [type]="messageStateVar">
            {{messageText}}
        </fd-form-message>
    </fd-form-input-message-group>
        
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
        messageStateVar: select('Message state', {
            information: 'information',
            success: 'success',
            error: 'error',
            warning: 'warning',
            none: '',
        }, ''),
        compactVar: boolean('Compact', false),
        requiredVar: boolean('Required', false),
        messageText: text('Message Text', 'Message'),

    }
});
