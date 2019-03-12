import { Component } from '@angular/core';

@Component({
    selector: 'fd-pagination-example',
    template: `<fd-pagination [totalItems]="totalItems" (selected)="newPageSelected($event)" [itemsPerPage]="itemsPerPage" [currentPage]="currentPage"></fd-pagination>`
})
export class PaginationExampleComponent {
    totalItems = 50;
    itemsPerPage = 10;
    currentPage = 3;

    newPageSelected(event) {
        alert('New page selected: ' + event);
    }
}
