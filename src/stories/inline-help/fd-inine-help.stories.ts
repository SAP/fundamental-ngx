import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ReactiveFormsModule } from '@angular/forms';

import { InlineHelpComponent, InlineHelpModule } from 'libs/core/src/lib/inline-help/public_api';

export default {
    title: 'Fd inline-help',
    component: InlineHelpComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [InlineHelpModule],
            declarations: []
        })
    ]
};

export const InlineHelp = () => ({
    template:
        `<div style="display:flex;align-items:center;justify-content:center;margin-top:10%;">
        Inline Help
            <fd-inline-help style="margin-left:2px;" [placement]="placementVar">{{textValue}}</fd-inline-help>
        </div>
  `,
    props: {
        placementVar: select('Placement', {
            bottomStart: 'bottom-start',
            bottomEnd: 'bottom-end',
            right: 'right',
            rightStart: 'right-start',
            rightEnd: 'right-end',
            left: 'left',
            leftStart: 'left-start',
            leftEnd: 'left-end',

        }, 'bottom-start'),
        textValue: text('Text Value 6', 'Lorem ipsum'),

    }
});