import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PaginationService } from './pagination.service';
import { Pagination } from './pagination.model';


@Component({
    selector: 'fd-pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnChanges {

    @Input() pagination: Pagination; 

    @Output() selected = new EventEmitter <number>(); 

    total: number;

    pages: number[];

    constructor(private paginationService: PaginationService){}

    ngOnChanges() {
        this.total = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
        
        if (this.pagination.currentPage > this.total || this.pagination.currentPage < 1) {
            throw new Error(
                `Pagination requires a current page ${this.pagination.currentPage} below ${
                    this.total
                } or greater than 0`
            );
        }

        this.pages = this.paginationService.calculatePagination(this.pagination.currentPage, this.total);
    }


    goToPage(page: number, $event: MouseEvent) {
        if ($event) {
            $event.preventDefault();
        }
        if (page > this.total || page < 1) {
            return;
        }
        this.pagination.currentPage = page;
        this.pages = this.paginationService.calculatePagination(page, this.total);
        this.selected.emit(page);
    }
}
