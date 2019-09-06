/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Service that is responsible for providing keyboard actions support
 *
 */
var TabsService = /** @class */ (function () {
    function TabsService() {
        /**
         * Event is thrown always when tab is selected by keyboard actions
         */
        this.tabSelected = new Subject();
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} index
     * @param {?} event
     * @param {?} elements
     * @return {?}
     */
    TabsService.prototype.tabHeaderKeyHandler = /**
     * @hidden
     * @param {?} index
     * @param {?} event
     * @param {?} elements
     * @return {?}
     */
    function (index, event, elements) {
        switch (event.code) {
            case ('ArrowLeft'): {
                if (index - 1 >= 0) {
                    this.getTabLinkFromIndex(index - 1, elements).focus();
                }
                else {
                    this.getTabLinkFromIndex(elements.length - 1, elements).focus();
                }
                break;
            }
            case ('ArrowRight'): {
                if (index + 1 < elements.length) {
                    this.getTabLinkFromIndex(index + 1, elements).focus();
                }
                else {
                    this.getTabLinkFromIndex(0, elements).focus();
                }
                break;
            }
            case ('Space'): {
                event.preventDefault();
                this.tabSelected.next(index);
                break;
            }
            case ('Enter'): {
                this.tabSelected.next(index);
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @private
     * @param {?} index
     * @param {?} elements
     * @return {?}
     */
    TabsService.prototype.getTabLinkFromIndex = /**
     * @hidden
     * @private
     * @param {?} index
     * @param {?} elements
     * @return {?}
     */
    function (index, elements) {
        return elements[index];
    };
    TabsService.decorators = [
        { type: Injectable }
    ];
    return TabsService;
}());
export { TabsService };
if (false) {
    /**
     * Event is thrown always when tab is selected by keyboard actions
     * @type {?}
     */
    TabsService.prototype.tabSelected;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RhYnMvdGFicy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBSS9CO0lBQUE7Ozs7UUFJVyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7SUFvQy9DLENBQUM7SUFsQ0csY0FBYzs7Ozs7Ozs7SUFDZCx5Q0FBbUI7Ozs7Ozs7SUFBbkIsVUFBb0IsS0FBYSxFQUFFLEtBQVUsRUFBRSxRQUF1QjtRQUNsRSxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDaEIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUN6RDtxQkFBTTtvQkFDSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ25FO2dCQUNELE1BQU07YUFDVDtZQUNELEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRTtvQkFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3pEO3FCQUFNO29CQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2pEO2dCQUNELE1BQU07YUFDVDtZQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNaLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdCLE1BQU07YUFDVDtZQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsY0FBYzs7Ozs7Ozs7SUFDTix5Q0FBbUI7Ozs7Ozs7SUFBM0IsVUFBNEIsS0FBYSxFQUFFLFFBQXVCO1FBQzlELE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7O2dCQXZDSixVQUFVOztJQXdDWCxrQkFBQztDQUFBLEFBeENELElBd0NDO1NBdkNZLFdBQVc7Ozs7OztJQUdwQixrQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG4vKipcbiAqIFNlcnZpY2UgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgcHJvdmlkaW5nIGtleWJvYXJkIGFjdGlvbnMgc3VwcG9ydFxuICogKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJzU2VydmljZSB7XG5cbiAgICAvKiogRXZlbnQgaXMgdGhyb3duIGFsd2F5cyB3aGVuIHRhYiBpcyBzZWxlY3RlZCBieSBrZXlib2FyZCBhY3Rpb25zICovXG4gICAgcHVibGljIHRhYlNlbGVjdGVkID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICB0YWJIZWFkZXJLZXlIYW5kbGVyKGluZGV4OiBudW1iZXIsIGV2ZW50OiBhbnksIGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdKTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAoJ0Fycm93TGVmdCcpOiB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGFiTGlua0Zyb21JbmRleChpbmRleCAtIDEsIGVsZW1lbnRzKS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGFiTGlua0Zyb21JbmRleChlbGVtZW50cy5sZW5ndGggLSAxLCBlbGVtZW50cykuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICgnQXJyb3dSaWdodCcpOiB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA8IGVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRhYkxpbmtGcm9tSW5kZXgoaW5kZXggKyAxLCBlbGVtZW50cykuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRhYkxpbmtGcm9tSW5kZXgoMCwgZWxlbWVudHMpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAoJ1NwYWNlJyk6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFiU2VsZWN0ZWQubmV4dChpbmRleCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICgnRW50ZXInKToge1xuICAgICAgICAgICAgICAgIHRoaXMudGFiU2VsZWN0ZWQubmV4dChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHByaXZhdGUgZ2V0VGFiTGlua0Zyb21JbmRleChpbmRleDogbnVtYmVyLCBlbGVtZW50czogSFRNTEVsZW1lbnRbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzW2luZGV4XTtcbiAgICB9XG59XG4iXX0=