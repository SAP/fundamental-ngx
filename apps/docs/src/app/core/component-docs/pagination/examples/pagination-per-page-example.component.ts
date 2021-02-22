import { Component } from '@angular/core';

@Component({
    selector: 'fd-pagination-per-page-example',
    templateUrl: './pagination-per-page-example.component.html'
})
export class PaginationPerPageExampleComponent {
    totalItems = 50;
    currentPage1 = 1;
    currentPage2 = 1;
    currentPage3 = 1;

    customItemsPerPage = 5;

    pageChanged1(event: number): void {
        this.currentPage1 = event;
    }
    pageChanged2(event: number): void {
        this.currentPage2 = event;
    }
    pageChanged3(event: number): void {
        this.currentPage3 = event;
    }
}
