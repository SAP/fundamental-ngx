import { moduleMetadata } from '@storybook/angular';
import { withKnobs, number, text, boolean } from '@storybook/addon-knobs';
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
                       [currentPage]="currentPage"
                       [displayText]="displayTextVar"
                       [nextLabel]="nextLabelVar"
                       [previousLabel]="prevLabelVar"
                       [displayTotalItems]="displayTotalItemsVar"></fd-pagination>
  `,
    props: {
        totalItems: number('Total Items', 50),
        itemsPerPage: number('Items Per page', 10),
        currentPage: number('Current PAge', 3),
        displayTextVar: text('Text appended', 'items'),
        nextLabelVar: text('Next Aria Page Label', 'Next'),
        prevLabelVar: text('Prev Aria Page Label', 'Next'),
        displayTotalItemsVar: boolean('Display total number of items', false),

        newPageClicked: (event: number) => {
            alert('Page ' + event + ' clicked!');
        }
    }
});
