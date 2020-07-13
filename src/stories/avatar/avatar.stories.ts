import { moduleMetadata } from '@storybook/angular';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { AvatarModule } from '../../../libs/core/src/lib/avatar/avatar.module';
import { AvatarComponent } from '../../../libs/core/src/lib/avatar/avatar.component';
import { icons } from '../../utils';

export default {
    title: 'Fd avatar',
    component: AvatarComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [AvatarModule],
            declarations: []
        })
    ]
};

export const Avatar = () => ({
    template: `
        <fd-avatar
            [size]="size"
            [glyph]="glyph"
            [circle]="circle"
            [transparent]="transparent"
            [placeholder]="placeholder"
            [tile]="tile"
            [colorAccent]="colorAccent"
            [zoomGlyph]="zoomGlyph"
            [border]="border"
            [ariaLabel]="ariaLabel"
        >
        {{initials}}
        </fd-avatar>
    `,
    props: {
        size: select(
            'Size',
            {
                xs: 'xs',
                s: 's',
                m: 'm',
                l: 'l',
                xl: 'xl'
            },
            'l'
        ),
        glyph: select('Glyph', icons, ''),
        circle: boolean('Circle', false),
        transparent: boolean('Transparent', false),
        placeholder: boolean('Placeholder', false),
        tile: boolean('Tile', false),
        zoomGlyph: select('ZoomGlyph', icons, ''),
        border: boolean('Border', false),
        initials: text('Initals', ''),
        ariaLabel: text('Aria label', ''),
        colorAccent: select(
            'Accent Color',
            {
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
                9: 9,
                10: 10
            },
            null
        ),
    }
});
