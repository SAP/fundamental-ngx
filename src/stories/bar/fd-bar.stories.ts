import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ReactiveFormsModule } from '@angular/forms';

import { BarComponent, BarModule } from 'libs/core/src/lib/bar/public_api';
import { ButtonModule } from 'libs/core/src/lib/button/public_api';
import { ImageModule } from 'libs/core/src/lib/image/public_api';

export default {
    title: 'Fd bar',
    component: BarComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [BarModule, ButtonModule, ImageModule, ReactiveFormsModule],
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

const sizes = {
    default: '',
    small: 's',
    medium_large: 'm_l',
    extra_large: 'xl'
}

export const Bar = () => ({
    template: `
    <div style="padding:20px;">
        <div fd-bar 
            [barDesign]="barDesignVar"
            [cosy]="cosy"
            [inHomePage]="inHomePage"
            [inPage]="inPage"
            [size]="size">
            <div fd-bar-left *ngIf="showLeft">
                <fd-bar-element>
                    <button fd-button 
                        [glyph]="'basket'">btn
                    </button>
                </fd-bar-element>
                <fd-bar-element>
                    Left Section
                </fd-bar-element>
            </div>
            <div fd-bar-middle *ngIf="showMiddle">
                <fd-bar-element [fullWidth]="fullwidthVar">
                    <button fd-button 
                        [glyph]="'basket'">btn
                    </button>
                </fd-bar-element>
                <fd-bar-element>
                Middle Section
                </fd-bar-element>
                <fd-bar-element>
                    <button fd-button 
                        [glyph]="'basket'">btn
                    </button>
                </fd-bar-element>
            </div>
            <div fd-bar-right *ngIf="showRight">
                <fd-bar-element>
                Right Section
                </fd-bar-element>
                <fd-bar-element>
                    <button fd-button 
                        [glyph]="'basket'">btn
                    </button>
                </fd-bar-element>
            </div>
        </div>
    </div>
  `,
    props: {
        cosy: boolean('cosy', false),
        showLeft: boolean('Show Left Section', true),
        showRight: boolean('Show Right Section', true),
        showMiddle: boolean('Show Middle Section', true),
        barDesignVar: select('Bar Design', barDesign, 'header'),
        inHomePage: boolean('In Home Page', true),
        inPage: boolean('In Page', true),
        size: select('Size', sizes, 's'),
        fullwidthVar: boolean('Full width element', true),
    }
});
