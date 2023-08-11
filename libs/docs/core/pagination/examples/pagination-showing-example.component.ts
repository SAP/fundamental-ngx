import { Component } from '@angular/core';

@Component({
    selector: 'fd-pagination-showing-example',
    template: `
        <fd-pagination
            [totalItems]="totalItems"
            [displayTextTemplate]="customDisplayTextTemplate"
            [itemsPerPage]="itemsPerPage"
            [currentPage]="currentPage"
            (pageChangeStart)="pageChanged($event)"
            ariaLabel="Pagination with displayTextTemplate property"
        ></fd-pagination>
        <ng-template #customDisplayTextTemplate let-showing="showing">
            From {{ showing.from }} to {{ showing.to }}. Total items {{ showing.totalCount }}
        </ng-template>
    `
})
export class PaginationShowingExampleComponent {
    totalItems = 50;
    itemsPerPage = 10;
    currentPage = 1;

    pageChanged(event: number): void {
        this.currentPage = event;
    }
}
