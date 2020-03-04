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
    <div fd-bar [barDesign]="barDesignVar">
    <div fd-bar-left>
        <fd-bar-element>
            <button fd-button [fdType]="buttonTypeVar" [options]="buttonOptionsVar" [glyph]="buttonGlyphVar" [compact]="buttonCompactVar"></button>
        </fd-bar-element>
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
        <fd-bar-element>
           <fd-image [size]="imageSizeVar" [photo]="photoVar">
           </fd-image>
        </fd-bar-element>
    </div>
</div>
  `,
    props: {
        cosy: boolean('cosy', false),
        barDesignVar: text('Bar Design', 'header'),
        buttonTypeVar: select('Button Type', {
            standard: 'standard',
            positive: 'positive',
            medium: 'medium',
            negative: 'negative',
        }, 'standard'),
        buttonOptionsVar: select('Button Options', {
            emphasized: 'emphasized',
            light: 'light',
            empty: '',
        }, ''),
        buttonCompactVar: boolean('loading', true),

        buttonGlyphVar: text('Glyph', 'Home'),
        imageSizeVar: select('Image Size', {
            small: 's',
            medium: 'm',
            large: 'l',
        }, 's'),
        photoVar: text('Image link', 'https://placeimg.com/400/400/nature'),


    }
});
