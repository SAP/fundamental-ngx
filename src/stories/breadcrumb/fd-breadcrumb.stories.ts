import { moduleMetadata } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';

import { BreadcrumbComponent, BreadcrumbModule } from 'libs/core/src/lib/breadcrumb/public_api';
import { RouterModule } from '@angular/router';
import { RtlService } from 'libs/core/src/lib/utils/services/rtl.service';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
    title: 'Fd breadcrumb',
    component: BreadcrumbComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [BreadcrumbModule, RouterModule],
            declarations: [],
            providers: [RtlService]
        })
    ]
};

export const Breadcrumb = () => ({
    template:
        `
        <br>
        <fd-breadcrumb>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [attr.href]="breadcrumbHref1">{{ breadcrumbLabel1 }}</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [attr.href]="breadcrumbHref2">{{ breadcrumbLabel2 }}</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [attr.href]="breadcrumbHref3">{{ breadcrumbLabel3 }}</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <span>{{ breadcrumbLabel4 }}</span>
            </fd-breadcrumb-item>
        </fd-breadcrumb>
  `,
  props: {
        breadcrumbLabel1: text('breadcrumbLabel1', 'Breadcrumb Level 1'),
        breadcrumbLabel2: text('breadcrumbLabel2', 'Breadcrumb Level 2'),
        breadcrumbLabel3: text('breadcrumbLabel3', 'Breadcrumb Level 3'),
        breadcrumbLabel4: text('breadcrumbLabel4', 'Breadcrumb Level 4'),
        breadcrumbHref1: text('breadcrumbHref1', '#'),
        breadcrumbHref2: text('breadcrumbHref2', '#'),
        breadcrumbHref3: text('breadcrumbHref3', '#')
  }
});
