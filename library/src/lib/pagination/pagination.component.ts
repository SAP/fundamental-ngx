import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
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
@Component({
    selector: 'fd-pagination',
    templateUrl: './pagination.component.html',
    providers: [PaginationService],
    host: {
        class: 'fd-pagination'
    },
    styles: [`
        .fd-pagination a {
            cursor: pointer;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnChanges {
    /** Represents the total number of items. */
    @Input()
    totalItems: number;
    
    /** Represents the current page number. */
    @Input()
    currentPage: number;
    
    /** Represents the number of items per page. */
    @Input()
    itemsPerPage: number;

    /** Whether to display the total number of items. */
    @Input()
    displayTotalItems: boolean = true;
    
    /** 
     * The text appended to the total number of items. 
     * The default text is set to 'items' 
     */
    @Input()
    displayText: string = 'items';

    /** Label for the 'previous' page button. */
    @Input()
    previousLabel: string = 'Previous';

    /** Label for the 'next' page button. */
    @Input()
    nextLabel: string = 'Next';

    /** Event fired when the page is changed. */
    @Output()
    pageChangeStart = new EventEmitter<number>();

    /** @hidden */
    pages: number[];

    /** @hidden */
    constructor(private paginationService: PaginationService) {}

    /** @hidden */
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

    /**
     * Checks if the current page is the last page.
     */
    isLastPage(): boolean {
        return this.currentPage === this.paginationService.getTotalPages(this.getPaginationObject());
    }

    /**
     * Navigates to a specific page when the user presses 'Space' or 'Enter' key.
     * @param page The number of the page.
     * @param $event The keyboard event.
     */
    onKeypressHandler(page: number, $event: KeyboardEvent) {
        if ($event.code === 'Space' || $event.code === 'Enter') {
            $event.preventDefault();
            this.goToPage(page);
        }
    }

    /**
     * Navigates to a specific page.
     * @param page The number of the page to navigate to.
     * @param $event The mouse event (optional).
     */
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

    /**
     * Retrieves an object that represents 
     * the total number of items, the current page, and the number of items per page.
     */
    getPaginationObject() {
        const retVal = {
            totalItems: this.totalItems,
            currentPage: this.currentPage,
            itemsPerPage: this.itemsPerPage
        };
        return retVal;
    }
}
