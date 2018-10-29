import { Component } from '@angular/core';

@Component({
    selector: 'fd-pagination-example',
    template: `<fd-pagination [class]="'fd-demo-pagination'" [pagination]="{totalItems: totalItems, itemsPerPage:  itemsPerPage, currentPage: currentPage}"></fd-pagination>`
})
export class PaginationExampleComponent {
    totalItems = 50;
    itemsPerPage = 10;
    currentPage = 3;
}