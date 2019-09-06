/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, isDevMode } from '@angular/core';
/** @type {?} */
const DISPLAY_NUM_PAGES = 3;
/**
 * Service that is used to retrieve all the pages,
 * the number of pages,
 * and to validate the pagination object.
 */
export class PaginationService {
    /**
     * @hidden
     */
    constructor() {
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
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    getPages(pagination) {
        /** @type {?} */
        const pages = [];
        this.validate(pagination);
        /** @type {?} */
        const totalPages = this.getTotalPages(pagination);
        if (totalPages <= DISPLAY_NUM_PAGES) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        else {
            if (pagination.currentPage <= DISPLAY_NUM_PAGES) {
                for (let i = 1; i <= DISPLAY_NUM_PAGES; i++) {
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
                for (let i = totalPages - (DISPLAY_NUM_PAGES - 1); i <= totalPages; i++) {
                    pages.push(i);
                }
            }
            else {
                pages.push(1);
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                /** @type {?} */
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
    /**
     * Retrieves the total number of pages.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    getTotalPages(pagination) {
        if (pagination.itemsPerPage <= 0) {
            pagination.itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE;
        }
        return Math.ceil(pagination.totalItems / pagination.itemsPerPage);
    }
    /**
     * Provides validation for the pagination object.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    validate(pagination) {
        if (!pagination.totalItems && isDevMode()) {
            console.warn(`No pages provided in the Pagination object. This warning only appears in development mode.`);
        }
        if (!pagination.itemsPerPage) {
            pagination.itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE;
        }
        else if (pagination.itemsPerPage < 0 && isDevMode()) {
            console.warn(`itemsPerPage must be greater than zero. This warning only appears in development mode.`);
        }
        if (!pagination.currentPage) {
            pagination.currentPage = 1;
        }
    }
}
PaginationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PaginationService.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7TUFHaEQsaUJBQWlCLEdBQUcsQ0FBQzs7Ozs7O0FBUTNCLE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFRMUI7Ozs7UUFOTywyQkFBc0IsR0FBRyxFQUFFLENBQUM7Ozs7UUFHNUIsU0FBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBR0YsQ0FBQzs7Ozs7O0lBTVQsUUFBUSxDQUFDLFVBQXNCOztjQUM1QixLQUFLLEdBQUcsRUFBRTtRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztjQUNwQixVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFFakQsSUFBSSxVQUFVLElBQUksaUJBQWlCLEVBQUU7WUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQjtTQUNKO2FBQU07WUFDSCxJQUFJLFVBQVUsQ0FBQyxXQUFXLElBQUksaUJBQWlCLEVBQUU7Z0JBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDekMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakI7Z0JBQ0QsSUFBSSxVQUFVLEtBQUssaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO29CQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDekI7Z0JBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMxQjtpQkFBTSxJQUFJLFVBQVUsQ0FBQyxXQUFXLEdBQUcsVUFBVSxHQUFHLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxVQUFVLEtBQUssaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO29CQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDekI7Z0JBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxVQUFVLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNyRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQjthQUNKO2lCQUFNO2dCQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxVQUFVLEtBQUssaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO29CQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDekI7O3NCQUNLLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztnQkFDaEQsS0FBSyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsV0FBVyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksVUFBVSxDQUFDLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3JGLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pCO2dCQUNELElBQUksVUFBVSxLQUFLLGlCQUFpQixHQUFHLENBQUMsRUFBRTtvQkFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3pCO2dCQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDMUI7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQU1NLGFBQWEsQ0FBQyxVQUFzQjtRQUN2QyxJQUFJLFVBQVUsQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFO1lBQzlCLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1NBQ3pEO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Ozs7OztJQU1NLFFBQVEsQ0FBQyxVQUFzQjtRQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLDRGQUE0RixDQUFDLENBQUM7U0FDOUc7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRTtZQUMxQixVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztTQUN6RDthQUFNLElBQUksVUFBVSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDbkQsT0FBTyxDQUFDLElBQUksQ0FBQyx3RkFBd0YsQ0FBQyxDQUFDO1NBQzFHO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDekIsVUFBVSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDOzs7WUF0RkosVUFBVTs7Ozs7Ozs7O0lBR1AsbURBQW1DOzs7OztJQUduQyxpQ0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuL3BhZ2luYXRpb24ubW9kZWwnO1xuXG5jb25zdCBESVNQTEFZX05VTV9QQUdFUyA9IDM7XG5cbi8qKlxuICogU2VydmljZSB0aGF0IGlzIHVzZWQgdG8gcmV0cmlldmUgYWxsIHRoZSBwYWdlcyxcbiAqIHRoZSBudW1iZXIgb2YgcGFnZXMsXG4gKiBhbmQgdG8gdmFsaWRhdGUgdGhlIHBhZ2luYXRpb24gb2JqZWN0LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvblNlcnZpY2Uge1xuICAgIC8qKiBDb25zdGFudCByZXByZXNlbnRpbmcgdGhlIGRlZmF1bHQgbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlLiAqL1xuICAgIHB1YmxpYyBERUZBVUxUX0lURU1TX1BFUl9QQUdFID0gMTA7XG4gICAgXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwdWJsaWMgTU9SRSA9IC0xO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbnVtYmVyIGFycmF5IHJlcHJlc2VudGluZyB0aGUgcGFnZXMgb2YgdGhlIHBhZ2luYXRpb24gb2JqZWN0LlxuICAgICAqIEBwYXJhbSBwYWdpbmF0aW9uIEFuIG9iamVjdCBvZiB0eXBlICpQYWdpbmF0aW9uKi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UGFnZXMocGFnaW5hdGlvbjogUGFnaW5hdGlvbik6IG51bWJlcltdIHtcbiAgICAgICAgY29uc3QgcGFnZXMgPSBbXTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZShwYWdpbmF0aW9uKTtcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IHRoaXMuZ2V0VG90YWxQYWdlcyhwYWdpbmF0aW9uKTtcblxuICAgICAgICBpZiAodG90YWxQYWdlcyA8PSBESVNQTEFZX05VTV9QQUdFUykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdG90YWxQYWdlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGFnZXMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwYWdpbmF0aW9uLmN1cnJlbnRQYWdlIDw9IERJU1BMQVlfTlVNX1BBR0VTKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gRElTUExBWV9OVU1fUEFHRVM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodG90YWxQYWdlcyAhPT0gRElTUExBWV9OVU1fUEFHRVMgKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2godGhpcy5NT1JFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFnZXMucHVzaCh0b3RhbFBhZ2VzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFnaW5hdGlvbi5jdXJyZW50UGFnZSA+IHRvdGFsUGFnZXMgLSAoRElTUExBWV9OVU1fUEFHRVMgLSAxKSkge1xuICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2goMSk7XG4gICAgICAgICAgICAgICAgaWYgKHRvdGFsUGFnZXMgIT09IERJU1BMQVlfTlVNX1BBR0VTICsgMSkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKHRoaXMuTU9SRSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0b3RhbFBhZ2VzIC0gKERJU1BMQVlfTlVNX1BBR0VTIC0gMSk7IGkgPD0gdG90YWxQYWdlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKDEpO1xuICAgICAgICAgICAgICAgIGlmICh0b3RhbFBhZ2VzICE9PSBESVNQTEFZX05VTV9QQUdFUyArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXMucHVzaCh0aGlzLk1PUkUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBidWZmZXIgPSBNYXRoLmZsb29yKERJU1BMQVlfTlVNX1BBR0VTIC8gMik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHBhZ2luYXRpb24uY3VycmVudFBhZ2UgLSBidWZmZXI7IGkgPD0gcGFnaW5hdGlvbi5jdXJyZW50UGFnZSArIGJ1ZmZlcjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0b3RhbFBhZ2VzICE9PSBESVNQTEFZX05VTV9QQUdFUyArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXMucHVzaCh0aGlzLk1PUkUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKHRvdGFsUGFnZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYWdlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIHRvdGFsIG51bWJlciBvZiBwYWdlcy5cbiAgICAgKiBAcGFyYW0gcGFnaW5hdGlvbiBBbiBvYmplY3Qgb2YgdHlwZSAqUGFnaW5hdGlvbiouXG4gICAgICovXG4gICAgcHVibGljIGdldFRvdGFsUGFnZXMocGFnaW5hdGlvbjogUGFnaW5hdGlvbik6IG51bWJlciB7XG4gICAgICAgIGlmIChwYWdpbmF0aW9uLml0ZW1zUGVyUGFnZSA8PSAwKSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uLml0ZW1zUGVyUGFnZSA9IHRoaXMuREVGQVVMVF9JVEVNU19QRVJfUEFHRTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHBhZ2luYXRpb24udG90YWxJdGVtcyAvIHBhZ2luYXRpb24uaXRlbXNQZXJQYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyB2YWxpZGF0aW9uIGZvciB0aGUgcGFnaW5hdGlvbiBvYmplY3QuXG4gICAgICogQHBhcmFtIHBhZ2luYXRpb24gQW4gb2JqZWN0IG9mIHR5cGUgKlBhZ2luYXRpb24qLlxuICAgICAqL1xuICAgIHB1YmxpYyB2YWxpZGF0ZShwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKSB7XG4gICAgICAgIGlmICghcGFnaW5hdGlvbi50b3RhbEl0ZW1zICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vIHBhZ2VzIHByb3ZpZGVkIGluIHRoZSBQYWdpbmF0aW9uIG9iamVjdC4gVGhpcyB3YXJuaW5nIG9ubHkgYXBwZWFycyBpbiBkZXZlbG9wbWVudCBtb2RlLmApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcGFnaW5hdGlvbi5pdGVtc1BlclBhZ2UpIHtcbiAgICAgICAgICAgIHBhZ2luYXRpb24uaXRlbXNQZXJQYWdlID0gdGhpcy5ERUZBVUxUX0lURU1TX1BFUl9QQUdFO1xuICAgICAgICB9IGVsc2UgaWYgKHBhZ2luYXRpb24uaXRlbXNQZXJQYWdlIDwgMCAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBpdGVtc1BlclBhZ2UgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby4gVGhpcyB3YXJuaW5nIG9ubHkgYXBwZWFycyBpbiBkZXZlbG9wbWVudCBtb2RlLmApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcGFnaW5hdGlvbi5jdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgcGFnaW5hdGlvbi5jdXJyZW50UGFnZSA9IDE7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=