/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, isDevMode } from '@angular/core';
/** @type {?} */
var DISPLAY_NUM_PAGES = 3;
/**
 * Service that is used to retrieve all the pages,
 * the number of pages,
 * and to validate the pagination object.
 */
var PaginationService = /** @class */ (function () {
    /** @hidden */
    function PaginationService() {
        /**
         * Constant representing the default number of items per page.
         */
        this.DEFAULT_ITEMS_PER_PAGE = 10;
        /**
         * @hidden
         */
        this.MORE = -1;
    }
    /**
     * Returns a number array representing the pages of the pagination object.
     * @param pagination An object of type *Pagination*.
     */
    /**
     * Returns a number array representing the pages of the pagination object.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    PaginationService.prototype.getPages = /**
     * Returns a number array representing the pages of the pagination object.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    function (pagination) {
        /** @type {?} */
        var pages = [];
        this.validate(pagination);
        /** @type {?} */
        var totalPages = this.getTotalPages(pagination);
        if (totalPages <= DISPLAY_NUM_PAGES) {
            for (var i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        else {
            if (pagination.currentPage <= DISPLAY_NUM_PAGES) {
                for (var i = 1; i <= DISPLAY_NUM_PAGES; i++) {
                    pages.push(i);
                }
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                pages.push(totalPages);
            }
            else if (pagination.currentPage > totalPages - (DISPLAY_NUM_PAGES - 1)) {
                pages.push(1);
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                for (var i = totalPages - (DISPLAY_NUM_PAGES - 1); i <= totalPages; i++) {
                    pages.push(i);
                }
            }
            else {
                pages.push(1);
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                /** @type {?} */
                var buffer = Math.floor(DISPLAY_NUM_PAGES / 2);
                for (var i = pagination.currentPage - buffer; i <= pagination.currentPage + buffer; i++) {
                    pages.push(i);
                }
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                pages.push(totalPages);
            }
        }
        return pages;
    };
    /**
     * Retrieves the total number of pages.
     * @param pagination An object of type *Pagination*.
     */
    /**
     * Retrieves the total number of pages.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    PaginationService.prototype.getTotalPages = /**
     * Retrieves the total number of pages.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    function (pagination) {
        if (pagination.itemsPerPage <= 0) {
            pagination.itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE;
        }
        return Math.ceil(pagination.totalItems / pagination.itemsPerPage);
    };
    /**
     * Provides validation for the pagination object.
     * @param pagination An object of type *Pagination*.
     */
    /**
     * Provides validation for the pagination object.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    PaginationService.prototype.validate = /**
     * Provides validation for the pagination object.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    function (pagination) {
        if (!pagination.totalItems && isDevMode()) {
            console.warn("No pages provided in the Pagination object. This warning only appears in development mode.");
        }
        if (!pagination.itemsPerPage) {
            pagination.itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE;
        }
        else if (pagination.itemsPerPage < 0 && isDevMode()) {
            console.warn("itemsPerPage must be greater than zero. This warning only appears in development mode.");
        }
        if (!pagination.currentPage) {
            pagination.currentPage = 1;
        }
    };
    PaginationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PaginationService.ctorParameters = function () { return []; };
    return PaginationService;
}());
export { PaginationService };
if (false) {
    /**
     * Constant representing the default number of items per page.
     * @type {?}
     */
    PaginationService.prototype.DEFAULT_ITEMS_PER_PAGE;
    /**
     * @hidden
     * @type {?}
     */
    PaginationService.prototype.MORE;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFHaEQsaUJBQWlCLEdBQUcsQ0FBQzs7Ozs7O0FBTzNCO0lBUUksY0FBYztJQUNkOzs7O1FBTk8sMkJBQXNCLEdBQUcsRUFBRSxDQUFDOzs7O1FBRzVCLFNBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUdGLENBQUM7SUFFaEI7OztPQUdHOzs7Ozs7SUFDSSxvQ0FBUTs7Ozs7SUFBZixVQUFnQixVQUFzQjs7WUFDNUIsS0FBSyxHQUFHLEVBQUU7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7WUFDcEIsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1FBRWpELElBQUksVUFBVSxJQUFJLGlCQUFpQixFQUFFO1lBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakI7U0FDSjthQUFNO1lBQ0gsSUFBSSxVQUFVLENBQUMsV0FBVyxJQUFJLGlCQUFpQixFQUFFO2dCQUM3QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3pDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pCO2dCQUNELElBQUksVUFBVSxLQUFLLGlCQUFpQixHQUFHLENBQUMsRUFBRTtvQkFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJ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ZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9wYWdpbmF0aW9uLm1vZGVsJztcblxuY29uc3QgRElTUExBWV9OVU1fUEFHRVMgPSAzO1xuXG4vKipcbiAqIFNlcnZpY2UgdGhhdCBpcyB1c2VkIHRvIHJldHJpZXZlIGFsbCB0aGUgcGFnZXMsXG4gKiB0aGUgbnVtYmVyIG9mIHBhZ2VzLFxuICogYW5kIHRvIHZhbGlkYXRlIHRoZSBwYWdpbmF0aW9uIG9iamVjdC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb25TZXJ2aWNlIHtcbiAgICAvKiogQ29uc3RhbnQgcmVwcmVzZW50aW5nIHRoZSBkZWZhdWx0IG51bWJlciBvZiBpdGVtcyBwZXIgcGFnZS4gKi9cbiAgICBwdWJsaWMgREVGQVVMVF9JVEVNU19QRVJfUEFHRSA9IDEwO1xuICAgIFxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcHVibGljIE1PUkUgPSAtMTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG51bWJlciBhcnJheSByZXByZXNlbnRpbmcgdGhlIHBhZ2VzIG9mIHRoZSBwYWdpbmF0aW9uIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gcGFnaW5hdGlvbiBBbiBvYmplY3Qgb2YgdHlwZSAqUGFnaW5hdGlvbiouXG4gICAgICovXG4gICAgcHVibGljIGdldFBhZ2VzKHBhZ2luYXRpb246IFBhZ2luYXRpb24pOiBudW1iZXJbXSB7XG4gICAgICAgIGNvbnN0IHBhZ2VzID0gW107XG4gICAgICAgIHRoaXMudmFsaWRhdGUocGFnaW5hdGlvbik7XG4gICAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSB0aGlzLmdldFRvdGFsUGFnZXMocGFnaW5hdGlvbik7XG5cbiAgICAgICAgaWYgKHRvdGFsUGFnZXMgPD0gRElTUExBWV9OVU1fUEFHRVMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHRvdGFsUGFnZXM7IGkrKykge1xuICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocGFnaW5hdGlvbi5jdXJyZW50UGFnZSA8PSBESVNQTEFZX05VTV9QQUdFUykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IERJU1BMQVlfTlVNX1BBR0VTOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXMucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRvdGFsUGFnZXMgIT09IERJU1BMQVlfTlVNX1BBR0VTICsgMSkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKHRoaXMuTU9SRSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2godG90YWxQYWdlcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhZ2luYXRpb24uY3VycmVudFBhZ2UgPiB0b3RhbFBhZ2VzIC0gKERJU1BMQVlfTlVNX1BBR0VTIC0gMSkpIHtcbiAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKDEpO1xuICAgICAgICAgICAgICAgIGlmICh0b3RhbFBhZ2VzICE9PSBESVNQTEFZX05VTV9QQUdFUyArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXMucHVzaCh0aGlzLk1PUkUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdG90YWxQYWdlcyAtIChESVNQTEFZX05VTV9QQUdFUyAtIDEpOyBpIDw9IHRvdGFsUGFnZXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFnZXMucHVzaCgxKTtcbiAgICAgICAgICAgICAgICBpZiAodG90YWxQYWdlcyAhPT0gRElTUExBWV9OVU1fUEFHRVMgKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2godGhpcy5NT1JFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gTWF0aC5mbG9vcihESVNQTEFZX05VTV9QQUdFUyAvIDIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBwYWdpbmF0aW9uLmN1cnJlbnRQYWdlIC0gYnVmZmVyOyBpIDw9IHBhZ2luYXRpb24uY3VycmVudFBhZ2UgKyBidWZmZXI7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodG90YWxQYWdlcyAhPT0gRElTUExBWV9OVU1fUEFHRVMgKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2godGhpcy5NT1JFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFnZXMucHVzaCh0b3RhbFBhZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFnZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSB0b3RhbCBudW1iZXIgb2YgcGFnZXMuXG4gICAgICogQHBhcmFtIHBhZ2luYXRpb24gQW4gb2JqZWN0IG9mIHR5cGUgKlBhZ2luYXRpb24qLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRUb3RhbFBhZ2VzKHBhZ2luYXRpb246IFBhZ2luYXRpb24pOiBudW1iZXIge1xuICAgICAgICBpZiAocGFnaW5hdGlvbi5pdGVtc1BlclBhZ2UgPD0gMCkge1xuICAgICAgICAgICAgcGFnaW5hdGlvbi5pdGVtc1BlclBhZ2UgPSB0aGlzLkRFRkFVTFRfSVRFTVNfUEVSX1BBR0U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsSXRlbXMgLyBwYWdpbmF0aW9uLml0ZW1zUGVyUGFnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgdmFsaWRhdGlvbiBmb3IgdGhlIHBhZ2luYXRpb24gb2JqZWN0LlxuICAgICAqIEBwYXJhbSBwYWdpbmF0aW9uIEFuIG9iamVjdCBvZiB0eXBlICpQYWdpbmF0aW9uKi5cbiAgICAgKi9cbiAgICBwdWJsaWMgdmFsaWRhdGUocGFnaW5hdGlvbjogUGFnaW5hdGlvbikge1xuICAgICAgICBpZiAoIXBhZ2luYXRpb24udG90YWxJdGVtcyAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBObyBwYWdlcyBwcm92aWRlZCBpbiB0aGUgUGFnaW5hdGlvbiBvYmplY3QuIFRoaXMgd2FybmluZyBvbmx5IGFwcGVhcnMgaW4gZGV2ZWxvcG1lbnQgbW9kZS5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBhZ2luYXRpb24uaXRlbXNQZXJQYWdlKSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uLml0ZW1zUGVyUGFnZSA9IHRoaXMuREVGQVVMVF9JVEVNU19QRVJfUEFHRTtcbiAgICAgICAgfSBlbHNlIGlmIChwYWdpbmF0aW9uLml0ZW1zUGVyUGFnZSA8IDAgJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgaXRlbXNQZXJQYWdlIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uIFRoaXMgd2FybmluZyBvbmx5IGFwcGVhcnMgaW4gZGV2ZWxvcG1lbnQgbW9kZS5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBhZ2luYXRpb24uY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICAgIHBhZ2luYXRpb24uY3VycmVudFBhZ2UgPSAxO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19