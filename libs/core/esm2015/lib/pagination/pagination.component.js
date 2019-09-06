/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
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
export class PaginationComponent {
    /**
     * @hidden
     * @param {?} paginationService
     */
    constructor(paginationService) {
        this.paginationService = paginationService;
        /**
         * Whether to display the total number of items.
         */
        this.displayTotalItems = true;
        /**
         * The text appended to the total number of items.
         * The default text is set to 'items'
         */
        this.displayText = 'items';
        /**
         * Label for the 'previous' page button.
         */
        this.previousLabel = 'Previous';
        /**
         * Label for the 'next' page button.
         */
        this.nextLabel = 'Next';
        /**
         * Event fired when the page is changed.
         */
        this.pageChangeStart = new EventEmitter();
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes && changes.currentPage) {
            this.currentPage = changes.currentPage.currentValue;
        }
        this.pages = this.paginationService.getPages(this.getPaginationObject());
        /** @type {?} */
        const totalPages = this.paginationService.getTotalPages(this.getPaginationObject());
        if (!this.currentPage || this.currentPage < 1) {
            this.currentPage = 1;
        }
        else if (this.currentPage > totalPages) {
            this.currentPage = totalPages;
        }
    }
    /**
     * Checks if the current page is the last page.
     * @return {?}
     */
    isLastPage() {
        return this.currentPage === this.paginationService.getTotalPages(this.getPaginationObject());
    }
    /**
     * Navigates to a specific page when the user presses 'Space' or 'Enter' key.
     * @param {?} page The number of the page.
     * @param {?} $event The keyboard event.
     * @return {?}
     */
    onKeypressHandler(page, $event) {
        if ($event.code === 'Space' || $event.code === 'Enter') {
            $event.preventDefault();
            this.goToPage(page);
        }
    }
    /**
     * Navigates to a specific page.
     * @param {?} page The number of the page to navigate to.
     * @param {?=} $event The mouse event (optional).
     * @return {?}
     */
    goToPage(page, $event) {
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
     * @return {?}
     */
    getPaginationObject() {
        /** @type {?} */
        const retVal = {
            totalItems: this.totalItems,
            currentPage: this.currentPage,
            itemsPerPage: this.itemsPerPage
        };
        return retVal;
    }
}
PaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-pagination',
                template: "<span class=\"fd-pagination__total\" *ngIf=\"displayTotalItems && totalItems\">{{ totalItems }} {{displayText}}</span>\n<nav class=\"fd-pagination__nav\" *ngIf=\"totalItems && totalItems >= itemsPerPage\">\n    <a class=\"fd-pagination__link fd-pagination__link--previous\"\n       tabindex=\"0\"\n       role=\"button\"\n       [attr.aria-label]=\"previousLabel\"\n       [attr.aria-disabled]=\"currentPage === 1 ? true : null\"\n       (keypress)=\"onKeypressHandler(currentPage - 1, $event)\"\n       (click)=\"goToPage(currentPage - 1)\">\n    </a>\n    <ng-container *ngFor=\"let page of pages\">\n        <a class=\"fd-pagination__link\"\n           tabindex=\"0\"\n           role=\"button\"\n           (keypress)=\"onKeypressHandler(page, $event)\"\n           (click)=\"goToPage(page, $event)\"\n           *ngIf=\"page !== -1; else more\"\n           [attr.aria-selected]=\"currentPage === page\">{{page}}</a>\n        <ng-template #more>\n            <span class=\"fd-pagination__link fd-pagination__link--more\"\n                  aria-hidden=\"true\"\n                  aria-label=\"...\"\n                  role=\"presentation\"></span>\n        </ng-template>\n    </ng-container>\n    <a class=\"fd-pagination__link fd-pagination__link--next\"\n       [attr.aria-label]=\"nextLabel\"\n       tabindex=\"0\"\n       role=\"button\"\n       [attr.aria-disabled]=\"isLastPage()\"\n       (keypress)=\"onKeypressHandler(currentPage + 1, $event)\"\n       (click)=\"goToPage(currentPage + 1)\">\n    </a>\n</nav>\n",
                providers: [PaginationService],
                host: {
                    class: 'fd-pagination'
                },
                encapsulation: ViewEncapsulation.None,
                styles: [`
        .fd-pagination a {
            cursor: pointer;
        }
    `]
            }] }
];
/** @nocollapse */
PaginationComponent.ctorParameters = () => [
    { type: PaginationService }
];
PaginationComponent.propDecorators = {
    totalItems: [{ type: Input }],
    currentPage: [{ type: Input }],
    itemsPerPage: [{ type: Input }],
    displayTotalItems: [{ type: Input }],
    displayText: [{ type: Input }],
    previousLabel: [{ type: Input }],
    nextLabel: [{ type: Input }],
    pageChangeStart: [{ type: Output }]
};
if (false) {
    /**
     * Represents the total number of items.
     * @type {?}
     */
    PaginationComponent.prototype.totalItems;
    /**
     * Represents the current page number.
     * @type {?}
     */
    PaginationComponent.prototype.currentPage;
    /**
     * Represents the number of items per page.
     * @type {?}
     */
    PaginationComponent.prototype.itemsPerPage;
    /**
     * Whether to display the total number of items.
     * @type {?}
     */
    PaginationComponent.prototype.displayTotalItems;
    /**
     * The text appended to the total number of items.
     * The default text is set to 'items'
     * @type {?}
     */
    PaginationComponent.prototype.displayText;
    /**
     * Label for the 'previous' page button.
     * @type {?}
     */
    PaginationComponent.prototype.previousLabel;
    /**
     * Label for the 'next' page button.
     * @type {?}
     */
    PaginationComponent.prototype.nextLabel;
    /**
     * Event fired when the page is changed.
     * @type {?}
     */
    PaginationComponent.prototype.pageChangeStart;
    /**
     * @hidden
     * @type {?}
     */
    PaginationComponent.prototype.pages;
    /**
     * @type {?}
     * @private
     */
    PaginationComponent.prototype.paginationService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7Ozs7O0FBMEJ6RCxNQUFNLE9BQU8sbUJBQW1COzs7OztJQXdDNUIsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7Ozs7UUF6QnhELHNCQUFpQixHQUFZLElBQUksQ0FBQzs7Ozs7UUFPbEMsZ0JBQVcsR0FBVyxPQUFPLENBQUM7Ozs7UUFJOUIsa0JBQWEsR0FBVyxVQUFVLENBQUM7Ozs7UUFJbkMsY0FBUyxHQUFXLE1BQU0sQ0FBQzs7OztRQUkzQixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFNYyxDQUFDOzs7Ozs7SUFHNUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztTQUN2RDtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDOztjQUNuRSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUNuRixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztTQUN4QjthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7U0FDakM7SUFDTCxDQUFDOzs7OztJQUtELFVBQVU7UUFDTixPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7Ozs7Ozs7SUFPRCxpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsTUFBcUI7UUFDakQsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUNwRCxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7Ozs7Ozs7SUFPRCxRQUFRLENBQUMsSUFBWSxFQUFFLE1BQW1CO1FBQ3RDLElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDckYsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBTUQsbUJBQW1COztjQUNULE1BQU0sR0FBRztZQUNYLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1NBQ2xDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7O1lBcEhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsa2dEQUEwQztnQkFDMUMsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0JBQzlCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsZUFBZTtpQkFDekI7Z0JBTUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7eUJBTDVCOzs7O0tBSVI7YUFFSjs7OztZQXpCUSxpQkFBaUI7Ozt5QkE0QnJCLEtBQUs7MEJBSUwsS0FBSzsyQkFJTCxLQUFLO2dDQUlMLEtBQUs7MEJBT0wsS0FBSzs0QkFJTCxLQUFLO3dCQUlMLEtBQUs7OEJBSUwsTUFBTTs7Ozs7OztJQS9CUCx5Q0FDbUI7Ozs7O0lBR25CLDBDQUNvQjs7Ozs7SUFHcEIsMkNBQ3FCOzs7OztJQUdyQixnREFDa0M7Ozs7OztJQU1sQywwQ0FDOEI7Ozs7O0lBRzlCLDRDQUNtQzs7Ozs7SUFHbkMsd0NBQzJCOzs7OztJQUczQiw4Q0FDNkM7Ozs7O0lBRzdDLG9DQUFnQjs7Ozs7SUFHSixnREFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnaW5hdGlvblNlcnZpY2UgfSBmcm9tICcuL3BhZ2luYXRpb24uc2VydmljZSc7XG5cbi8qKlxuICogVGhlIGNvbXBvbmVudCB0aGF0IGlzIHVzZWQgdG8gcHJvdmlkZSBuYXZpZ2F0aW9uIGJldHdlZW4gcGFnZWQgaW5mb3JtYXRpb24uXG4gKiBgYGBodG1sXG4gKiA8ZmQtcGFnaW5hdGlvbiBcbiAqICAgICAgICAgIFt0b3RhbEl0ZW1zXT1cIjUwXCIgXG4gKiAgICAgICAgICBbaXRlbXNQZXJQYWdlXT1cIjEwXCIgXG4gKiAgICAgICAgICBbY3VycmVudFBhZ2VdPVwiM1wiPlxuICogPC9mZC1wYWdpbmF0aW9uPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtcGFnaW5hdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhZ2luYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogW1BhZ2luYXRpb25TZXJ2aWNlXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnZmQtcGFnaW5hdGlvbidcbiAgICB9LFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLmZkLXBhZ2luYXRpb24gYSB7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIC8qKiBSZXByZXNlbnRzIHRoZSB0b3RhbCBudW1iZXIgb2YgaXRlbXMuICovXG4gICAgQElucHV0KClcbiAgICB0b3RhbEl0ZW1zOiBudW1iZXI7XG4gICAgXG4gICAgLyoqIFJlcHJlc2VudHMgdGhlIGN1cnJlbnQgcGFnZSBudW1iZXIuICovXG4gICAgQElucHV0KClcbiAgICBjdXJyZW50UGFnZTogbnVtYmVyO1xuICAgIFxuICAgIC8qKiBSZXByZXNlbnRzIHRoZSBudW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2UuICovXG4gICAgQElucHV0KClcbiAgICBpdGVtc1BlclBhZ2U6IG51bWJlcjtcblxuICAgIC8qKiBXaGV0aGVyIHRvIGRpc3BsYXkgdGhlIHRvdGFsIG51bWJlciBvZiBpdGVtcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc3BsYXlUb3RhbEl0ZW1zOiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICAvKiogXG4gICAgICogVGhlIHRleHQgYXBwZW5kZWQgdG8gdGhlIHRvdGFsIG51bWJlciBvZiBpdGVtcy4gXG4gICAgICogVGhlIGRlZmF1bHQgdGV4dCBpcyBzZXQgdG8gJ2l0ZW1zJyBcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc3BsYXlUZXh0OiBzdHJpbmcgPSAnaXRlbXMnO1xuXG4gICAgLyoqIExhYmVsIGZvciB0aGUgJ3ByZXZpb3VzJyBwYWdlIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIHByZXZpb3VzTGFiZWw6IHN0cmluZyA9ICdQcmV2aW91cyc7XG5cbiAgICAvKiogTGFiZWwgZm9yIHRoZSAnbmV4dCcgcGFnZSBidXR0b24uICovXG4gICAgQElucHV0KClcbiAgICBuZXh0TGFiZWw6IHN0cmluZyA9ICdOZXh0JztcblxuICAgIC8qKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBwYWdlIGlzIGNoYW5nZWQuICovXG4gICAgQE91dHB1dCgpXG4gICAgcGFnZUNoYW5nZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHBhZ2VzOiBudW1iZXJbXTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdpbmF0aW9uU2VydmljZTogUGFnaW5hdGlvblNlcnZpY2UpIHt9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMgJiYgY2hhbmdlcy5jdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGNoYW5nZXMuY3VycmVudFBhZ2UuY3VycmVudFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFnZXMgPSB0aGlzLnBhZ2luYXRpb25TZXJ2aWNlLmdldFBhZ2VzKHRoaXMuZ2V0UGFnaW5hdGlvbk9iamVjdCgpKTtcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IHRoaXMucGFnaW5hdGlvblNlcnZpY2UuZ2V0VG90YWxQYWdlcyh0aGlzLmdldFBhZ2luYXRpb25PYmplY3QoKSk7XG4gICAgICAgIGlmICghdGhpcy5jdXJyZW50UGFnZSB8fCB0aGlzLmN1cnJlbnRQYWdlIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50UGFnZSA+IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0b3RhbFBhZ2VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IHBhZ2UgaXMgdGhlIGxhc3QgcGFnZS5cbiAgICAgKi9cbiAgICBpc0xhc3RQYWdlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UGFnZSA9PT0gdGhpcy5wYWdpbmF0aW9uU2VydmljZS5nZXRUb3RhbFBhZ2VzKHRoaXMuZ2V0UGFnaW5hdGlvbk9iamVjdCgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOYXZpZ2F0ZXMgdG8gYSBzcGVjaWZpYyBwYWdlIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyAnU3BhY2UnIG9yICdFbnRlcicga2V5LlxuICAgICAqIEBwYXJhbSBwYWdlIFRoZSBudW1iZXIgb2YgdGhlIHBhZ2UuXG4gICAgICogQHBhcmFtICRldmVudCBUaGUga2V5Ym9hcmQgZXZlbnQuXG4gICAgICovXG4gICAgb25LZXlwcmVzc0hhbmRsZXIocGFnZTogbnVtYmVyLCAkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKCRldmVudC5jb2RlID09PSAnU3BhY2UnIHx8ICRldmVudC5jb2RlID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuZ29Ub1BhZ2UocGFnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOYXZpZ2F0ZXMgdG8gYSBzcGVjaWZpYyBwYWdlLlxuICAgICAqIEBwYXJhbSBwYWdlIFRoZSBudW1iZXIgb2YgdGhlIHBhZ2UgdG8gbmF2aWdhdGUgdG8uXG4gICAgICogQHBhcmFtICRldmVudCBUaGUgbW91c2UgZXZlbnQgKG9wdGlvbmFsKS5cbiAgICAgKi9cbiAgICBnb1RvUGFnZShwYWdlOiBudW1iZXIsICRldmVudD86IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKCRldmVudCkge1xuICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhZ2UgPiB0aGlzLnBhZ2luYXRpb25TZXJ2aWNlLmdldFRvdGFsUGFnZXModGhpcy5nZXRQYWdpbmF0aW9uT2JqZWN0KCkpIHx8IHBhZ2UgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWdlcyA9IHRoaXMucGFnaW5hdGlvblNlcnZpY2UuZ2V0UGFnZXModGhpcy5nZXRQYWdpbmF0aW9uT2JqZWN0KCkpO1xuICAgICAgICB0aGlzLnBhZ2VDaGFuZ2VTdGFydC5lbWl0KHBhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIFxuICAgICAqIHRoZSB0b3RhbCBudW1iZXIgb2YgaXRlbXMsIHRoZSBjdXJyZW50IHBhZ2UsIGFuZCB0aGUgbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlLlxuICAgICAqL1xuICAgIGdldFBhZ2luYXRpb25PYmplY3QoKSB7XG4gICAgICAgIGNvbnN0IHJldFZhbCA9IHtcbiAgICAgICAgICAgIHRvdGFsSXRlbXM6IHRoaXMudG90YWxJdGVtcyxcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLmN1cnJlbnRQYWdlLFxuICAgICAgICAgICAgaXRlbXNQZXJQYWdlOiB0aGlzLml0ZW1zUGVyUGFnZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH1cbn1cbiJdfQ==