import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { LinkComponent, LinkModule } from 'libs/core/src/lib/link/public_api';

export default {
    title: 'Fd link',
    component: LinkComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [LinkModule],
            declarations: []
        })
    ]
};

export const Link = () => ({
    template:
        `<a [routerLink]="['./']"
        [emphasized]="emphasizedVar"
        [disabled]="disabled"
        [inverted]="invertedVar"
        fd-link>Standard Link</a>`,
    props: {
        emphasizedVar: boolean('Disabled', false),
        disabledVar: boolean('Disabled', false),
        invertedVar: boolean('Inverted', false),
    }
});
