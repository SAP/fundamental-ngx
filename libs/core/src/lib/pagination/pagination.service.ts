import { Injectable, isDevMode } from '@angular/core';

import { Pagination } from './pagination.model';

/** Constant representing the number of pages which appear before and after current page. */
const SIDE_CURRENT_DISPLAY_PAGES = 1;
const MIN_CORNER_DISPLAY_PAGES = 2;

/**
 * Service that is used to retrieve all the pages,
 * the number of pages,
 * and to validate the pagination object.
 */
@Injectable()
export class PaginationService {
    /** @hidden */
    buffer = -1;
    /**
     * Returns a number array representing the pages of the pagination object.
     * @param pagination An object of type *Pagination*.
     */
    getPages(pagination: Pagination): number[] {
        if (!pagination.currentPage) {
            pagination.currentPage = 1;
        }

        this.validate(pagination);

        const pages = [];
        const totalPages = this.getTotalPages(pagination);

        if (totalPages <= SIDE_CURRENT_DISPLAY_PAGES * 2 + MIN_CORNER_DISPLAY_PAGES + 1 + 2) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            for (let i = 1; i <= totalPages; i++) {
                if (i === pagination.currentPage) {
                    pages.push(i);
                } else if (pagination.currentPage <= SIDE_CURRENT_DISPLAY_PAGES && i <= MIN_CORNER_DISPLAY_PAGES + 1) {
                    pages.push(i);
                } else if (
                    pagination.currentPage >= totalPages - SIDE_CURRENT_DISPLAY_PAGES &&
                    i >= totalPages - MIN_CORNER_DISPLAY_PAGES
                ) {
                    pages.push(i);
                } else {
                    if (i === 1) {
                        pages.push(i);
                    } else if (i === totalPages) {
                        pages.push(i);
                    } else if (
                        i >= pagination.currentPage - SIDE_CURRENT_DISPLAY_PAGES &&
                        i < pagination.currentPage + SIDE_CURRENT_DISPLAY_PAGES + 1
                    ) {
                        pages.push(i);
                    }
                }
            }

            if (pagination.currentPage > SIDE_CURRENT_DISPLAY_PAGES + 2) {
                pages.splice(1, 0, this.buffer);
            }

            if (pagination.currentPage < totalPages - (SIDE_CURRENT_DISPLAY_PAGES + 1)) {
                pages.splice(pages.length - 1, 0, this.buffer);
            }
        }
        return pages;
    }

    /**
     * Retrieves the total number of pages.
     * @param pagination An object of type *Pagination*.
     */
    getTotalPages(pagination: Pagination): number {
        if (!pagination.itemsPerPage) {
            return 0;
        }

        return Math.ceil(pagination.totalItems / pagination.itemsPerPage);
    }

    /**
     * Provides validation for the pagination object.
     * @param pagination An object of type *Pagination*.
     */
    validate(pagination: Pagination): void {
        if (isDevMode()) {
            if (isNaN(pagination.totalItems) || pagination.totalItems <= 0) {
                console.warn(
                    `"totalItems" must be a number greater than zero but got "${pagination.totalItems}". This warning only appears in development mode.`
                );
            }

            if (isNaN(pagination.itemsPerPage) || pagination.itemsPerPage <= 0) {
                console.warn(
                    `"itemsPerPage" must be a number greater than zero but got "${pagination.itemsPerPage}". This warning only appears in development mode.`
                );
            }
        }
    }
}
