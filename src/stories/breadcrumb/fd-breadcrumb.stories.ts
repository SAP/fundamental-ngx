import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { BreadcrumbComponent, BreadcrumbModule } from 'libs/core/src/lib/breadcrumb/public_api';

export default {
    title: 'Fd breadcrumb',
    component: BreadcrumbComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [BreadcrumbModule],
            declarations: []
        })
    ]
};

export const Breadcrumb = () => ({
    template:
        `<fd-breadcrumb>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [attr.href]="breadcrumbHref1">{{breadcrumbLabel1}}</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [attr.href]="breadcrumbHref2">{{breadcrumbLabel2}}</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <span fd-breadcrumb-link [attr.href]="'#'">{{breadcrumbLabel3}}</span>
            </fd-breadcrumb-item>
        </fd-breadcrumb>`,
    props: {
        emphasizedVar: boolean('Disabled', false),
        disabledVar: boolean('Disabled', false),
        invertedVar: boolean('Inverted', false),
        breadcrumbLabel1: text('breadcrumbLabel1', 'Breadcrumb Level 1'),
        breadcrumbLabel2: text('breadcrumbLabel2', 'Breadcrumb Level 2'),
        breadcrumbLabel3: text('breadcrumbLabel3', 'Breadcrumb Level 3'),
        breadcrumbHref1: text('breadcrumbHref1', '#'),
        breadcrumbHref2: text('breadcrumbHref2', '#'),
        breadcrumbHref3: text('breadcrumbHref3', '#')
    }
});
