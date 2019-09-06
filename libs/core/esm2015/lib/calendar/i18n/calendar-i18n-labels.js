/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Provides i18n support for labels inside the calendar component.
 */
export class CalendarI18nLabels {
    constructor() {
        // This will be needed when we use OnPush change detection.
        // readonly labelsChange: Subject<void> = new Subject<void>();
        /**
         * Year selection aria label. Used on the button to navigate to the years view.
         */
        this.yearSelectionLabel = 'Year selection';
        /**
         * Previous year aria label. Used on the button to switch to a previous year in the years view.
         */
        this.previousYearLabel = 'Previous year';
        /**
         * Next year aria label. Used on the button to switch to a next year in the years view.
         */
        this.nextYearLabel = 'Next year';
        /**
         * Month selection aria label. Used on the button to navigate to the months view.
         */
        this.monthSelectionLabel = 'Month selection';
        /**
         * Previous month aria label. Used on the button to switch to a previous month in the months view.
         */
        this.previousMonthLabel = 'Previous month';
        /**
         * Next month aria label. Used on the button to switch to a next month in the months view.
         */
        this.nextMonthLabel = 'Next month';
    }
}
CalendarI18nLabels.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ CalendarI18nLabels.ngInjectableDef = i0.defineInjectable({ factory: function CalendarI18nLabels_Factory() { return new CalendarI18nLabels(); }, token: CalendarI18nLabels, providedIn: "root" });
if (false) {
    /**
     * Year selection aria label. Used on the button to navigate to the years view.
     * @type {?}
     */
    CalendarI18nLabels.prototype.yearSelectionLabel;
    /**
     * Previous year aria label. Used on the button to switch to a previous year in the years view.
     * @type {?}
     */
    CalendarI18nLabels.prototype.previousYearLabel;
    /**
     * Next year aria label. Used on the button to switch to a next year in the years view.
     * @type {?}
     */
    CalendarI18nLabels.prototype.nextYearLabel;
    /**
     * Month selection aria label. Used on the button to navigate to the months view.
     * @type {?}
     */
    CalendarI18nLabels.prototype.monthSelectionLabel;
    /**
     * Previous month aria label. Used on the button to switch to a previous month in the months view.
     * @type {?}
     */
    CalendarI18nLabels.prototype.previousMonthLabel;
    /**
     * Next month aria label. Used on the button to switch to a next month in the months view.
     * @type {?}
     */
    CalendarI18nLabels.prototype.nextMonthLabel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaTE4bi1sYWJlbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvaTE4bi9jYWxlbmRhci1pMThuLWxhYmVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFNM0MsTUFBTSxPQUFPLGtCQUFrQjtJQUQvQjs7Ozs7O1FBT0ksdUJBQWtCLEdBQVcsZ0JBQWdCLENBQUM7Ozs7UUFHOUMsc0JBQWlCLEdBQVcsZUFBZSxDQUFDOzs7O1FBRzVDLGtCQUFhLEdBQVcsV0FBVyxDQUFDOzs7O1FBR3BDLHdCQUFtQixHQUFXLGlCQUFpQixDQUFDOzs7O1FBR2hELHVCQUFrQixHQUFXLGdCQUFnQixDQUFDOzs7O1FBRzlDLG1CQUFjLEdBQVcsWUFBWSxDQUFDO0tBRXpDOzs7WUF4QkEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7Ozs7Ozs7SUFPNUIsZ0RBQThDOzs7OztJQUc5QywrQ0FBNEM7Ozs7O0lBRzVDLDJDQUFvQzs7Ozs7SUFHcEMsaURBQWdEOzs7OztJQUdoRCxnREFBOEM7Ozs7O0lBRzlDLDRDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBQcm92aWRlcyBpMThuIHN1cHBvcnQgZm9yIGxhYmVscyBpbnNpZGUgdGhlIGNhbGVuZGFyIGNvbXBvbmVudC5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJJMThuTGFiZWxzIHtcblxuICAgIC8vIFRoaXMgd2lsbCBiZSBuZWVkZWQgd2hlbiB3ZSB1c2UgT25QdXNoIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgLy8gcmVhZG9ubHkgbGFiZWxzQ2hhbmdlOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBZZWFyIHNlbGVjdGlvbiBhcmlhIGxhYmVsLiBVc2VkIG9uIHRoZSBidXR0b24gdG8gbmF2aWdhdGUgdG8gdGhlIHllYXJzIHZpZXcuICovXG4gICAgeWVhclNlbGVjdGlvbkxhYmVsOiBzdHJpbmcgPSAnWWVhciBzZWxlY3Rpb24nO1xuXG4gICAgLyoqIFByZXZpb3VzIHllYXIgYXJpYSBsYWJlbC4gVXNlZCBvbiB0aGUgYnV0dG9uIHRvIHN3aXRjaCB0byBhIHByZXZpb3VzIHllYXIgaW4gdGhlIHllYXJzIHZpZXcuICovXG4gICAgcHJldmlvdXNZZWFyTGFiZWw6IHN0cmluZyA9ICdQcmV2aW91cyB5ZWFyJztcblxuICAgIC8qKiBOZXh0IHllYXIgYXJpYSBsYWJlbC4gVXNlZCBvbiB0aGUgYnV0dG9uIHRvIHN3aXRjaCB0byBhIG5leHQgeWVhciBpbiB0aGUgeWVhcnMgdmlldy4gKi9cbiAgICBuZXh0WWVhckxhYmVsOiBzdHJpbmcgPSAnTmV4dCB5ZWFyJztcblxuICAgIC8qKiBNb250aCBzZWxlY3Rpb24gYXJpYSBsYWJlbC4gVXNlZCBvbiB0aGUgYnV0dG9uIHRvIG5hdmlnYXRlIHRvIHRoZSBtb250aHMgdmlldy4gKi9cbiAgICBtb250aFNlbGVjdGlvbkxhYmVsOiBzdHJpbmcgPSAnTW9udGggc2VsZWN0aW9uJztcblxuICAgIC8qKiBQcmV2aW91cyBtb250aCBhcmlhIGxhYmVsLiBVc2VkIG9uIHRoZSBidXR0b24gdG8gc3dpdGNoIHRvIGEgcHJldmlvdXMgbW9udGggaW4gdGhlIG1vbnRocyB2aWV3LiAqL1xuICAgIHByZXZpb3VzTW9udGhMYWJlbDogc3RyaW5nID0gJ1ByZXZpb3VzIG1vbnRoJztcblxuICAgIC8qKiBOZXh0IG1vbnRoIGFyaWEgbGFiZWwuIFVzZWQgb24gdGhlIGJ1dHRvbiB0byBzd2l0Y2ggdG8gYSBuZXh0IG1vbnRoIGluIHRoZSBtb250aHMgdmlldy4gKi9cbiAgICBuZXh0TW9udGhMYWJlbDogc3RyaW5nID0gJ05leHQgbW9udGgnO1xuXG59XG4iXX0=