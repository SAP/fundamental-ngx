import { moduleMetadata } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';

import { ShellbarComponent, ShellbarModule } from 'libs/core/src/lib/shellbar/public_api';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
    title: 'Fd shellbar',
    component: ShellbarComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [ShellbarModule],
            declarations: []
        })
    ]
};

export const Shellbar = () => ({
    template:
        `
        <br>
        <fd-shellbar>
            <fd-shellbar-logo>
                <a href="#" class="fd-shellbar__logo fd-shellbar__logo--image-replaced" aria-label="SAP"></a>
            </fd-shellbar-logo>
            <fd-shellbar-title>
                {{shellbarTitle}}
            </fd-shellbar-title>
            <fd-shellbar-actions [user]="{initials: 'WW', colorAccent: 11}" [closePopoverOnSelect]="true">
            </fd-shellbar-actions>
        </fd-shellbar>
  `,
    props: {
        shellbarTitle: text('shellbarTitle', 'Corporate Portal'),
    }
});
