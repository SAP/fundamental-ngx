import { moduleMetadata } from '@storybook/angular';
import { withKnobs, number } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import { PaginationComponent, PaginationModule } from 'libs/core/src/lib/pagination/public_api';

export default {
    title: 'Fd pagination',
    component: PaginationComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [PaginationModule],
            declarations: []
        })
    ]
};

export const Pagination = () => ({
    template:
        `
        <fd-pagination [totalItems]="totalItems" (pageChangeStart)="newPageClicked($event)" 
                       [itemsPerPage]="itemsPerPage"
                       [currentPage]="currentPage"></fd-pagination>
  `,
    props: {
        totalItems: number('totalItems', 50),
        itemsPerPage: number('itemsPerPage', 10),
        currentPage: number('currentPage', 3),
        newPageClicked: (event: number) => {
            alert('Page ' + event + ' clicked!');
        }
    }
});
