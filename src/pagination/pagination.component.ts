import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

export interface PaginationObject {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
}

enum PaginationPageType {
    More = -1
}

@Component({
    selector: 'fd-pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnChanges {
    private static readonly displayNumPages = 3;

    @Input() pagination: PaginationObject;

    @Output() selected = new EventEmitter<number>();

    total: number;

    pages: number[];

    ngOnChanges() {
        this.total = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);

        if (this.pagination.currentPage > this.total || this.pagination.currentPage < 1) {
            throw new Error(
                `Pagination requires a current page ${this.pagination.currentPage} below ${
                    this.total
                } or greater than 0`
            );
        }

        this.calculatePagination(this.pagination.currentPage);
    }

    calculatePagination(current: number) {
        const pages = [];

        if (this.total <= PaginationComponent.displayNumPages) {
            for (let i = 1; i <= this.total; i++) {
                pages.push(i);
            }
        } else {
            if (current <= PaginationComponent.displayNumPages) {
                for (let i = 1; i <= PaginationComponent.displayNumPages; i++) {
                    pages.push(i);
                }
                pages.push(PaginationPageType.More);
                pages.push(this.total);
            } else if (current > this.total - (PaginationComponent.displayNumPages - 1)) {
                pages.push(1);
                pages.push(PaginationPageType.More);
                for (let i = this.total - (PaginationComponent.displayNumPages - 1); i <= this.total; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push(PaginationPageType.More);
                const buffer = Math.floor(PaginationComponent.displayNumPages / 2);
                for (let i = current - buffer; i <= current + buffer; i++) {
                    pages.push(i);
                }
                pages.push(PaginationPageType.More);
                pages.push(this.total);
            }
        }

        this.pages = pages;
    }

    goToPage(page: number, $event: MouseEvent) {
        if ($event) {
            $event.preventDefault();
        }
        if (page > this.total || page < 1) {
            return;
        }
        this.pagination.currentPage = page;
        this.calculatePagination(page);
        this.selected.emit(page);
    }
}
