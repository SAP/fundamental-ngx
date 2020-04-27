import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ReactiveFormsModule } from '@angular/forms';

import { MessageStripComponent, MessageStripModule } from 'libs/core/src/lib/message-strip/public_api';
import { ButtonModule } from 'libs/core/src/lib/button/public_api';
import { IconModule } from 'libs/core/src/lib/icon/public_api';

export default {
    title: 'Fd message-strip',
    component: MessageStripComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [MessageStripModule, ReactiveFormsModule, ButtonModule, IconModule],
            declarations: []
        })
    ]
};

const type = {
    default: '',
    warning: 'warning',
    success: 'success',
    information: 'information',
    error: 'error'
};

export const MessageStrip = () => ({
    template: `
    <div style="padding: 30px">
        <fd-message-strip 
            [type]="type" 
            [dismissible]="dismissible" 
            [noIcon]="noIcon"
            [width]="width"
            [minWidth]="minWidth">
            {{message}}
        </fd-message-strip>
    </div>
  `,
    props: {
        type: select('Type', type, ''),
        dismissible: boolean('dismissible', false),
        noIcon: boolean('noIcon', false),
        width: text('width', '100%'),
        minWidth: text('minWidth', '100px'),
        message: text('message', 'A dismissible warning message strip')
    }
});
