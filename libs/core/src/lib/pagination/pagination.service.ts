import { Injectable, isDevMode } from '@angular/core';
import { Pagination } from './pagination.model';

const DISPLAY_NUM_PAGES = 3;

/**
 * Service that is used to retrieve all the pages,
 * the number of pages,
 * and to validate the pagination object.
 */
@Injectable()
export class PaginationService {
    /** Constant representing the default number of items per page. */
    public DEFAULT_ITEMS_PER_PAGE = 10;
    
    /** @hidden */
    public MORE = -1;

    /** @hidden */
    constructor() {}

    /**
     * Returns a number array representing the pages of the pagination object.
     * @param pagination An object of type *Pagination*.
     */
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
                if (totalPages !== DISPLAY_NUM_PAGES + 1 && pagination.currentPage !== totalPages - 2) {
                    pages.push(this.MORE);
                }
                pages.push(totalPages);
            }
        }
        return pages;
    }

    /**
     * Retrieves the total number of pages.
     * @param pagination An object of type *Pagination*.
     */
    public getTotalPages(pagination: Pagination): number {
        if (pagination.itemsPerPage <= 0) {
            pagination.itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE;
        }
        return Math.ceil(pagination.totalItems / pagination.itemsPerPage);
    }

    /**
     * Provides validation for the pagination object.
     * @param pagination An object of type *Pagination*.
     */
    public validate(pagination: Pagination) {
        if (!pagination.totalItems && isDevMode()) {
            console.warn(`No pages provided in the Pagination object. This warning only appears in development mode.`);
        }
        if (!pagination.itemsPerPage) {
            pagination.itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE;
        } else if (pagination.itemsPerPage < 0 && isDevMode()) {
            console.warn(`itemsPerPage must be greater than zero. This warning only appears in development mode.`);
        }
        if (!pagination.currentPage) {
            pagination.currentPage = 1;
        }
    }
}
