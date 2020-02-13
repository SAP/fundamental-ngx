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
        `
        Inline Help
        <fd-inline-help [placement]="placementVar">
            Lorem ipsum
        </fd-inline-help>
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
    }
});