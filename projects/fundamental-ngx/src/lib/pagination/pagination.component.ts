import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { PaginationService } from './pagination.service';
import { Pagination } from './pagination.model';

@Component({
    selector: 'fd-pagination',
    templateUrl: './pagination.component.html',
    providers: [PaginationService]
})
export class PaginationComponent implements OnChanges {
    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter<number>();

    pages: number[];

    constructor(private paginationService: PaginationService) {}

    ngOnChanges() {
        this.pages = this.paginationService.getPages(this.pagination);
    }

    isLastPage(): boolean {
        return this.pagination.currentPage === this.paginationService.getTotalPages(this.pagination);
    }

    onKeypressHandler(page: number, $event: KeyboardEvent) {
        if ($event.code === 'Space' || $event.code === 'Enter') {
            $event.preventDefault();
            this.goToPage(page);
        }
    }

    goToPage(page: number, $event?: MouseEvent) {
        if ($event) {
            $event.preventDefault();
        }
        if (page > this.paginationService.getTotalPages(this.pagination) || page < 1) {
            return;
        }
        this.pagination.currentPage = page;
        this.pages = this.paginationService.getPages(this.pagination);
        this.selected.emit(page);
    }
}
