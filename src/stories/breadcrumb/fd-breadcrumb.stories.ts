import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { RouterModule } from '@angular/router';

import { RtlService } from 'libs/core/src/lib/utils/services/rtl.service';
import { BreadcrumbComponent, BreadcrumbModule } from 'libs/core/src/lib/breadcrumb/public_api';

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
        `<div #responsiveBreadcrumbContainer >
            <fd-breadcrumb 
                [containerElement]="responsiveBreadcrumbContainer">
                <fd-breadcrumb-item *ngFor="let row of getArray(bcLevels); let i = index;">
                    <a fd-breadcrumb-link [attr.href]="breadcrumbHref1">{{breadcrumbLabel + i}}</a>
                </fd-breadcrumb-item>
            </fd-breadcrumb>
        </div>`,
    props: {
        bcLevels: number('Levels', 5),
        breadcrumbLabel: text('breadcrumbLabel', 'Breadcrumb Level'),
        breadcrumbHref1: text('breadcrumbHref1', '#'),
        getArray: (len: number) => {
            return new Array(len);
        },
    }
});