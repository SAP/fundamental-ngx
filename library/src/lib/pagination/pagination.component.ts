import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginationService } from './pagination.service';
import { Pagination } from './pagination.model';

@Component({
    selector: 'fd-pagination',
    templateUrl: './pagination.component.html',
    providers: [PaginationService],
    host: {
        class: 'fd-pagination'
    },
    styles: [`
        a {
            cursor: pointer;
        }
    `]
})
export class PaginationComponent implements OnChanges {
    @Input()
    totalItems: number;
    @Input()
    currentPage: number;
    @Input()
    itemsPerPage: number;

    @Input()
    displayTotalItems: boolean = true;
    @Input()
    displayText: string = 'items';

    @Output()
    pageChangeStart = new EventEmitter<number>();

    pages: number[];

    constructor(private paginationService: PaginationService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.currentPage) {
            this.currentPage = changes.currentPage.currentValue;
        }
        this.pages = this.paginationService.getPages(this.getPaginationObject());
        const totalPages = this.paginationService.getTotalPages(this.getPaginationObject());
        if (!this.currentPage || this.currentPage < 1) {
            this.currentPage = 1;
        } else if (this.currentPage > totalPages) {
            this.currentPage = totalPages;
        }
    }

    isLastPage(): boolean {
        return this.currentPage === this.paginationService.getTotalPages(this.getPaginationObject());
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
        if (page > this.paginationService.getTotalPages(this.getPaginationObject()) || page < 1) {
            return;
        }
        this.pages = this.paginationService.getPages(this.getPaginationObject());
        this.pageChangeStart.emit(page);
    }

    getPaginationObject() {
        const retVal = {
            totalItems: this.totalItems,
            currentPage: this.currentPage,
            itemsPerPage: this.itemsPerPage
        };
        return retVal;
    }
}
