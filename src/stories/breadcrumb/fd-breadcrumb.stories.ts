import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
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

const breadcrumbText = 'Breadcrumb Link Level '

export const Breadcrumb = () => ({


    template:
        `<div style="width:300px; border: 1px solid red; padding: 10px;">
            <fd-breadcrumb>
                <fd-breadcrumb-item *ngFor="let row of getArray(bcLevels); let i = index;">
                    <a fd-breadcrumb-link [attr.href]="breadcrumbHref1">{{breadcrumbLabel + i}}</a>
                </fd-breadcrumb-item>
            </fd-breadcrumb>
        </div>`,
    props: {
        emphasizedVar: boolean('Disabled', false),
        bcLevels: number('Levels', 5),
        disabledVar: boolean('Disabled', false),
        invertedVar: boolean('Inverted', false),
        breadcrumbLabel: text('breadcrumbLabel', 'Breadcrumb Level'),
        breadcrumbHref1: text('breadcrumbHref1', '#'),
        getArray: (len: number) => {
            return new Array(len);
        },

    }
});
