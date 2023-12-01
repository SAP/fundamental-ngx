import { Injectable, isDevMode } from '@angular/core';

import { Pagination } from './pagination.model';

/** Constant representing the number of pages which appear before and after current page. */
const CORNER_DISPLAY_PAGES = 1;
const SIDE_CURRENT_DISPLAY_PAGES = 2;

/**
 * Service that is used to retrieve all the pages, the number of pages, and to validate the pagination object.
 */
@Injectable()
export class PaginationService {
    /** @hidden */
    public readonly moreElementValue = -1;

    /**
     * Returns a number array representing the pages of the pagination object.
     * Array length always the same and configured by CORNER_DISPLAY_PAGES & SIDE_CURRENT_DISPLAY_PAGES.
     * @param pagination An object of type *Pagination*.
     */
    getPages(pagination: Pagination): number[] {
        if (!pagination.currentPage) {
            pagination.currentPage = 1;
        }

        this.validate(pagination);

        const totalPages = this.getTotalPages(pagination);
        const pages = new Array(totalPages).fill(undefined).map((_, i) => i + 1);

        // +1 for current page, +2 for "more" elements - after start & before end pages
        const pagesToDisplay = CORNER_DISPLAY_PAGES * 2 + SIDE_CURRENT_DISPLAY_PAGES * 2 + 1 + 2;

        if (pages.length <= pagesToDisplay) {
            return pages;
        }

        const pagesBefore = pagination.currentPage - 1;
        const pagesAfter = totalPages - pagination.currentPage;
        const minimalPagesGap = Math.round(pagesToDisplay / 2);

        if (pagesBefore < minimalPagesGap) {
            return [
                ...pages.slice(0, pagesToDisplay - 2),
                this.moreElementValue,
                ...pages.slice(totalPages - CORNER_DISPLAY_PAGES)
            ];
        }

        if (pagesAfter < minimalPagesGap) {
            return [
                ...pages.slice(0, CORNER_DISPLAY_PAGES),
                this.moreElementValue,
                ...pages.slice(totalPages - pagesToDisplay + 2)
            ];
        }

        return [
            ...pages.slice(0, CORNER_DISPLAY_PAGES),
            this.moreElementValue,
            ...pages.slice(
                pagination.currentPage - SIDE_CURRENT_DISPLAY_PAGES - 1,
                pagination.currentPage + SIDE_CURRENT_DISPLAY_PAGES
            ),
            this.moreElementValue,
            ...pages.slice(totalPages - CORNER_DISPLAY_PAGES)
        ];
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

            if (isNaN(pagination.itemsPerPage!) || pagination.itemsPerPage! <= 0) {
                console.warn(
                    `"itemsPerPage" must be a number greater than zero but got "${pagination.itemsPerPage}". This warning only appears in development mode.`
                );
            }
        }
    }
}
