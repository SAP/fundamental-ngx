import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import { BusyIndicatorComponent, BusyIndicatorModule } from 'libs/core/src/lib/busy-indicator/public_api';

export default {
    title: 'Fd busy-indicator',
    component: BusyIndicatorComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [BusyIndicatorModule],
            declarations: []
        })
    ]
};

const size = {
    default: '',
    m: 'm',
    l: 'l'
};

export const BusyIndicator = () => ({
    template: `
        <div class="fd-panel" style="margin:50px">
            <fd-busy-indicator 
                [size]="size"
                [loadingLabel]="loadingLabel"
                [loading]="loading"></fd-busy-indicator>
        </div>
    `,
    props: {
        size: select('size', size, 'default'),
        loadingLabel: text('loadingLabel', 'Loading data'),
        loading: boolean('loading', true)
    }
});
