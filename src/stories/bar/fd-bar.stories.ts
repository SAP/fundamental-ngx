import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ReactiveFormsModule } from '@angular/forms';

import { BarComponent, BarModule } from 'libs/core/src/lib/bar/public_api';

export default {
    title: 'Fd bar',
    component: BarComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [BarModule, ReactiveFormsModule],
            declarations: []
        })
    ]
};

const barDesign = {
    header: 'header',
    subheader: 'subheader',
    footer: 'footer',
    floatingFooter: 'floating-footer',
}

export const Bar = () => ({
    template: `
    <div style="padding: 30px">
        <fd-bar [barDesign]="barDesign" [cosy]="cosy">
            <div fd-bar-left>
                <fd-bar-element>
                Left Section
                </fd-bar-element>
            </div>
            <div fd-bar-middle>
                <fd-bar-element>
                Middle Section
                </fd-bar-element>
            </div>
            <div fd-bar-right>
                <fd-bar-element>
                Right Section
                </fd-bar-element>
            </div>
        </fd-bar>
    </div>
  `,
    props: {
        barDesign: select('barDesign', barDesign, 'header'),
        cosy: boolean('cosy', false)
    }
});
