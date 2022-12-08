import { Component } from '@angular/core';

@Component({
    selector: 'fd-pagination-mobile-example',
    templateUrl: './pagination-mobile-example.component.html'
})
export class PaginationMobileExampleComponent {
    totalItems = 50;
    currentPage = 2;

    onPageChange(page: number): void {
        this.currentPage = page;
    }
}
