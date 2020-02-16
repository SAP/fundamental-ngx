import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
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
        `
        <br>
        <fd-breadcrumb>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [routerLink]="'#'">Breadcrumb Level 1</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [routerLink]="'#'">Breadcrumb Level 2</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [routerLink]="'#'" [queryParams]="'#'">Breadcrumb Level 3</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <span>Breadcrumb Level 4</span>
            </fd-breadcrumb-item>
        </fd-breadcrumb>
  `,
    props: {
        routerLink: text('routerLink', null),
        queryParams: text('queryParams', null)
    }
});
