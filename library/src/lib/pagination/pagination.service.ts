import { Injectable } from '@angular/core';
import { Pagination } from './pagination.model';

const DISPLAY_NUM_PAGES = 3;

@Injectable()
export class PaginationService {
    public DEFAULT_ITEMS_PER_PAGE = 10;
    public MORE = -1;

    constructor() {}

    public getPages(pagination: Pagination): number[] {
        const pages = [];
        this.validate(pagination);
        const totalPages = this.getTotalPages(pagination);

        if (totalPages <= DISPLAY_NUM_PAGES) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (pagination.currentPage <= DISPLAY_NUM_PAGES) {
                for (let i = 1; i <= DISPLAY_NUM_PAGES; i++) {
                    pages.push(i);
                }
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                pages.push(totalPages);
            } else if (pagination.currentPage > totalPages - (DISPLAY_NUM_PAGES - 1)) {
                pages.push(1);
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                for (let i = totalPages - (DISPLAY_NUM_PAGES - 1); i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                const buffer = Math.floor(DISPLAY_NUM_PAGES / 2);
                for (let i = pagination.currentPage - buffer; i <= pagination.currentPage + buffer; i++) {
                    pages.push(i);
                }
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                pages.push(totalPages);
            }
        }
        return pages;
    }

    public getTotalPages(pagination: Pagination): number {
        if (pagination.itemsPerPage <= 0) {
            pagination.itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE;
        }
        return Math.ceil(pagination.totalItems / pagination.itemsPerPage);
    }

    public validate(pagination: Pagination) {
        if (!pagination.totalItems) {
            console.error(`No pages provided in the Pagination object; we cannot provide paging`);
        }
        if (!pagination.itemsPerPage) {
            pagination.itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE;
        } else if (pagination.itemsPerPage < 0) {
            console.error(`itemsPerPage must be greater than zero`);
        }
        if (!pagination.currentPage) {
            pagination.currentPage = 1;
        }
    }
}
