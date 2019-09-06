import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PaginationService } from './pagination.service';
/**
 * The component that is used to provide navigation between paged information.
 * ```html
 * <fd-pagination
 *          [totalItems]="50"
 *          [itemsPerPage]="10"
 *          [currentPage]="3">
 * </fd-pagination>
 * ```
 */
export declare class PaginationComponent implements OnChanges {
    private paginationService;
    /** Represents the total number of items. */
    totalItems: number;
    /** Represents the current page number. */
    currentPage: number;
    /** Represents the number of items per page. */
    itemsPerPage: number;
    /** Whether to display the total number of items. */
    displayTotalItems: boolean;
    /**
     * The text appended to the total number of items.
     * The default text is set to 'items'
     */
    displayText: string;
    /** Label for the 'previous' page button. */
    previousLabel: string;
    /** Label for the 'next' page button. */
    nextLabel: string;
    /** Event fired when the page is changed. */
    pageChangeStart: EventEmitter<number>;
    /** @hidden */
    pages: number[];
    /** @hidden */
    constructor(paginationService: PaginationService);
    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Checks if the current page is the last page.
     */
    isLastPage(): boolean;
    /**
     * Navigates to a specific page when the user presses 'Space' or 'Enter' key.
     * @param page The number of the page.
     * @param $event The keyboard event.
     */
    onKeypressHandler(page: number, $event: KeyboardEvent): void;
    /**
     * Navigates to a specific page.
     * @param page The number of the page to navigate to.
     * @param $event The mouse event (optional).
     */
    goToPage(page: number, $event?: MouseEvent): void;
    /**
     * Retrieves an object that represents
     * the total number of items, the current page, and the number of items per page.
     */
    getPaginationObject(): {
        totalItems: number;
        currentPage: number;
        itemsPerPage: number;
    };
}
