import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { LinkComponent, LinkModule } from 'libs/core/src/lib/link/public_api';
import { RouterModule } from '@angular/router';

export default {
    title: 'Fd link',
    component: LinkComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [LinkModule, RouterModule],
            declarations: []
        })
    ]
};

export const Link = () => ({
    template:
        `<a fd-link
        [href]="hrefVar"
        [emphasized]="emphasizedVar"
        [disabled]="disabledVar"
        fragment="inverted"
        [inverted]="invertedVar"
        >{{textValue}}</a>`,
    props: {
        emphasizedVar: boolean('Emphasized', false),
        disabledVar: boolean('Disabled', false),
        invertedVar: boolean('Inverted', true),
        textValue: text('Text Value', 'Standard Link'),
        hrefVar: text('Link', '#'),

    }
});

