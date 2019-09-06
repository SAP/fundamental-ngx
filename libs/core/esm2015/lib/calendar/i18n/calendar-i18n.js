/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import { FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * @param {?} locale
 * @return {?}
 */
export function CALENDAR_I18N_FACTORY(locale) {
    return new CalendarI18nDefault(locale);
}
/**
 * Abstract class which defines the behaviour calendar internationalization. See calendar examples for usage details.
 * @abstract
 */
export class CalendarI18n {
}
CalendarI18n.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
                useFactory: CALENDAR_I18N_FACTORY,
                deps: [LOCALE_ID]
            },] }
];
/** @nocollapse */ CalendarI18n.ngInjectableDef = i0.defineInjectable({ factory: function CalendarI18n_Factory() { return CALENDAR_I18N_FACTORY(i0.inject(i0.LOCALE_ID)); }, token: CalendarI18n, providedIn: "root" });
if (false) {
    /**
     * Aria label for a specific date.
     * @abstract
     * @param {?} date Native date object to use for the label.
     * @return {?}
     */
    CalendarI18n.prototype.getDayAriaLabel = function (date) { };
    /**
     * Get all short week day names, such as Mo for Monday.
     * @abstract
     * @return {?}
     */
    CalendarI18n.prototype.getAllShortWeekdays = function () { };
    /**
     * Get all short month names, such as Nov for November.
     * @abstract
     * @return {?}
     */
    CalendarI18n.prototype.getAllShortMonthNames = function () { };
    /**
     * Get all full month names.
     * @abstract
     * @return {?}
     */
    CalendarI18n.prototype.getAllFullMonthNames = function () { };
}
/**
 * Default implementation of the CalendarI18n service. It will get dates from the application locale if it is present.
 */
export class CalendarI18nDefault extends CalendarI18n {
    /**
     * Constructor takes in a locale_id and gets the appropriate data from Angular.
     * @param {?} locale
     */
    constructor(locale) {
        super();
        this.locale = locale;
        this.weekdaysFallback = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];
        this.monthsFullFallback = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        this.monthsShortFallback = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
            'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        if (locale) {
            /** @type {?} */
            const sundayStartWeekdays = getLocaleDayNames(locale, FormStyle.Standalone, TranslationWidth.Short);
            this.weekdaysShort = sundayStartWeekdays.map((/**
             * @param {?} day
             * @param {?} index
             * @return {?}
             */
            (day, index) => sundayStartWeekdays[index % 7]));
            this.monthsShort = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
            this.monthsFull = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Wide);
        }
        this.checkForFallback();
    }
    /**
     * Aria label for a specific date. Default implementation produces the label: {Date} {Month} {Year}.
     *
     * @param {?} date Native date object to use for the label.
     * @return {?}
     */
    getDayAriaLabel(date) {
        return date.getDate() + ' ' + this.monthsFull[date.getMonth()] + ' ' + date.getFullYear();
    }
    /**
     * Get all full month names.
     * @return {?}
     */
    getAllFullMonthNames() {
        return this.monthsFull;
    }
    /**
     * Get all short month names, such as Nov for November.
     * @return {?}
     */
    getAllShortMonthNames() {
        return this.monthsShort;
    }
    /**
     * Get all short week day names, such as Mo for Monday.
     * @return {?}
     */
    getAllShortWeekdays() {
        return this.weekdaysShort;
    }
    /**
     * Checks if a fallback is needed. Older versions of Angular may need this.
     * @private
     * @return {?}
     */
    checkForFallback() {
        if (!this.weekdaysShort || this.weekdaysShort.length === 0) {
            this.weekdaysShort = this.weekdaysFallback;
        }
        if (!this.monthsShort || this.monthsShort.length === 0) {
            this.monthsShort = this.monthsShortFallback;
        }
        if (!this.monthsFull || this.monthsFull.length === 0) {
            this.monthsFull = this.monthsFullFallback;
        }
    }
}
CalendarI18nDefault.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CalendarI18nDefault.ctorParameters = () => [
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [LOCALE_ID,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    CalendarI18nDefault.prototype.weekdaysShort;
    /**
     * @type {?}
     * @private
     */
    CalendarI18nDefault.prototype.monthsShort;
    /**
     * @type {?}
     * @private
     */
    CalendarI18nDefault.prototype.monthsFull;
    /**
     * @type {?}
     * @private
     */
    CalendarI18nDefault.prototype.weekdaysFallback;
    /**
     * @type {?}
     * @private
     */
    CalendarI18nDefault.prototype.monthsFullFallback;
    /**
     * @type {?}
     * @private
     */
    CalendarI18nDefault.prototype.monthsShortFallback;
    /**
     * @type {?}
     * @private
     */
    CalendarI18nDefault.prototype.locale;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaTE4bi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9pMThuL2NhbGVuZGFyLWkxOG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7QUFHdEcsTUFBTSxVQUFVLHFCQUFxQixDQUFDLE1BQU07SUFDeEMsT0FBTyxJQUFJLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLENBQUM7Ozs7O0FBVUQsTUFBTSxPQUFnQixZQUFZOzs7WUFMakMsVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixVQUFVLEVBQUUscUJBQXFCO2dCQUNqQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7YUFDcEI7Ozs7Ozs7Ozs7SUFPRyw2REFBNkM7Ozs7OztJQUc3Qyw2REFBeUM7Ozs7OztJQUd6QywrREFBMkM7Ozs7OztJQUczQyw4REFBMEM7Ozs7O0FBTzlDLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxZQUFZOzs7OztJQXFCakQsWUFBbUQsTUFBYztRQUM3RCxLQUFLLEVBQUUsQ0FBQztRQUR1QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBZnpELHFCQUFnQixHQUFhO1lBQ2pDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVU7U0FDL0UsQ0FBQztRQUVNLHVCQUFrQixHQUFhO1lBQ25DLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUQsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVU7U0FDM0QsQ0FBQztRQUVNLHdCQUFtQixHQUFhO1lBQ3BDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7WUFDL0MsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7U0FDcEMsQ0FBQztRQUtFLElBQUksTUFBTSxFQUFFOztrQkFDRixtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7WUFDbkcsSUFBSSxDQUFDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHOzs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsbUJBQW1CLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFDN0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRyxJQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlGO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7OztJQU9ELGVBQWUsQ0FBQyxJQUFVO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUYsQ0FBQzs7Ozs7SUFHRCxvQkFBb0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBR0QscUJBQXFCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDOzs7OztJQUdELG1CQUFtQjtRQUNmLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDOzs7Ozs7SUFHTyxnQkFBZ0I7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1NBQzlDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1NBQy9DO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1NBQzdDO0lBQ0wsQ0FBQzs7O1lBdkVKLFVBQVU7Ozs7eUNBc0JNLFFBQVEsWUFBSSxNQUFNLFNBQUMsU0FBUzs7Ozs7OztJQW5CekMsNENBQWdDOzs7OztJQUNoQywwQ0FBOEI7Ozs7O0lBQzlCLHlDQUE2Qjs7Ozs7SUFFN0IsK0NBRUU7Ozs7O0lBRUYsaURBR0U7Ozs7O0lBRUYsa0RBR0U7Ozs7O0lBR1UscUNBQXFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBMT0NBTEVfSUQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtU3R5bGUsIGdldExvY2FsZURheU5hbWVzLCBnZXRMb2NhbGVNb250aE5hbWVzLCBUcmFuc2xhdGlvbldpZHRoIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIENBTEVOREFSX0kxOE5fRkFDVE9SWShsb2NhbGUpIHtcbiAgICByZXR1cm4gbmV3IENhbGVuZGFySTE4bkRlZmF1bHQobG9jYWxlKTtcbn1cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyB3aGljaCBkZWZpbmVzIHRoZSBiZWhhdmlvdXIgY2FsZW5kYXIgaW50ZXJuYXRpb25hbGl6YXRpb24uIFNlZSBjYWxlbmRhciBleGFtcGxlcyBmb3IgdXNhZ2UgZGV0YWlscy5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICB1c2VGYWN0b3J5OiBDQUxFTkRBUl9JMThOX0ZBQ1RPUlksXG4gICAgZGVwczogW0xPQ0FMRV9JRF1cbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2FsZW5kYXJJMThuIHtcblxuICAgIC8qKlxuICAgICAqIEFyaWEgbGFiZWwgZm9yIGEgc3BlY2lmaWMgZGF0ZS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBOYXRpdmUgZGF0ZSBvYmplY3QgdG8gdXNlIGZvciB0aGUgbGFiZWwuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0RGF5QXJpYUxhYmVsKGRhdGU6IERhdGUpOiBzdHJpbmc7XG5cbiAgICAvKiogR2V0IGFsbCBzaG9ydCB3ZWVrIGRheSBuYW1lcywgc3VjaCBhcyBNbyBmb3IgTW9uZGF5LiAqL1xuICAgIGFic3RyYWN0IGdldEFsbFNob3J0V2Vla2RheXMoKTogc3RyaW5nW107XG5cbiAgICAvKiogR2V0IGFsbCBzaG9ydCBtb250aCBuYW1lcywgc3VjaCBhcyBOb3YgZm9yIE5vdmVtYmVyLiAqL1xuICAgIGFic3RyYWN0IGdldEFsbFNob3J0TW9udGhOYW1lcygpOiBzdHJpbmdbXTtcblxuICAgIC8qKiBHZXQgYWxsIGZ1bGwgbW9udGggbmFtZXMuICovXG4gICAgYWJzdHJhY3QgZ2V0QWxsRnVsbE1vbnRoTmFtZXMoKTogc3RyaW5nW107XG59XG5cbi8qKlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgQ2FsZW5kYXJJMThuIHNlcnZpY2UuIEl0IHdpbGwgZ2V0IGRhdGVzIGZyb20gdGhlIGFwcGxpY2F0aW9uIGxvY2FsZSBpZiBpdCBpcyBwcmVzZW50LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJJMThuRGVmYXVsdCBleHRlbmRzIENhbGVuZGFySTE4biB7XG5cbiAgICBwcml2YXRlIHdlZWtkYXlzU2hvcnQ6IHN0cmluZ1tdO1xuICAgIHByaXZhdGUgbW9udGhzU2hvcnQ6IHN0cmluZ1tdO1xuICAgIHByaXZhdGUgbW9udGhzRnVsbDogc3RyaW5nW107XG5cbiAgICBwcml2YXRlIHdlZWtkYXlzRmFsbGJhY2s6IHN0cmluZ1tdID0gW1xuICAgICAgICAnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXG4gICAgXTtcblxuICAgIHByaXZhdGUgbW9udGhzRnVsbEZhbGxiYWNrOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsXG4gICAgICAgICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXG4gICAgXTtcblxuICAgIHByaXZhdGUgbW9udGhzU2hvcnRGYWxsYmFjazogc3RyaW5nW10gPSBbXG4gICAgICAgICdKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLFxuICAgICAgICAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYydcbiAgICBdO1xuXG4gICAgLyoqIENvbnN0cnVjdG9yIHRha2VzIGluIGEgbG9jYWxlX2lkIGFuZCBnZXRzIHRoZSBhcHByb3ByaWF0ZSBkYXRhIGZyb20gQW5ndWxhci4gKi9cbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICBjb25zdCBzdW5kYXlTdGFydFdlZWtkYXlzID0gZ2V0TG9jYWxlRGF5TmFtZXMobG9jYWxlLCBGb3JtU3R5bGUuU3RhbmRhbG9uZSwgVHJhbnNsYXRpb25XaWR0aC5TaG9ydCk7XG4gICAgICAgICAgICB0aGlzLndlZWtkYXlzU2hvcnQgPSBzdW5kYXlTdGFydFdlZWtkYXlzLm1hcCgoZGF5LCBpbmRleCkgPT4gc3VuZGF5U3RhcnRXZWVrZGF5c1tpbmRleCAlIDddKTtcbiAgICAgICAgICAgIHRoaXMubW9udGhzU2hvcnQgPSBnZXRMb2NhbGVNb250aE5hbWVzKGxvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguQWJicmV2aWF0ZWQpO1xuICAgICAgICAgICAgdGhpcy5tb250aHNGdWxsID0gZ2V0TG9jYWxlTW9udGhOYW1lcyhsb2NhbGUsIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLldpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGVja0ZvckZhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXJpYSBsYWJlbCBmb3IgYSBzcGVjaWZpYyBkYXRlLiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIHByb2R1Y2VzIHRoZSBsYWJlbDoge0RhdGV9IHtNb250aH0ge1llYXJ9LlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGUgTmF0aXZlIGRhdGUgb2JqZWN0IHRvIHVzZSBmb3IgdGhlIGxhYmVsLlxuICAgICAqL1xuICAgIGdldERheUFyaWFMYWJlbChkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpICsgJyAnICsgdGhpcy5tb250aHNGdWxsW2RhdGUuZ2V0TW9udGgoKV0gKyAnICcgKyBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgfVxuXG4gICAgLyoqIEdldCBhbGwgZnVsbCBtb250aCBuYW1lcy4gKi9cbiAgICBnZXRBbGxGdWxsTW9udGhOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoc0Z1bGw7XG4gICAgfVxuXG4gICAgLyoqIEdldCBhbGwgc2hvcnQgbW9udGggbmFtZXMsIHN1Y2ggYXMgTm92IGZvciBOb3ZlbWJlci4gKi9cbiAgICBnZXRBbGxTaG9ydE1vbnRoTmFtZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5tb250aHNTaG9ydDtcbiAgICB9XG5cbiAgICAvKiogR2V0IGFsbCBzaG9ydCB3ZWVrIGRheSBuYW1lcywgc3VjaCBhcyBNbyBmb3IgTW9uZGF5LiAqL1xuICAgIGdldEFsbFNob3J0V2Vla2RheXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy53ZWVrZGF5c1Nob3J0O1xuICAgIH1cblxuICAgIC8qKiBDaGVja3MgaWYgYSBmYWxsYmFjayBpcyBuZWVkZWQuIE9sZGVyIHZlcnNpb25zIG9mIEFuZ3VsYXIgbWF5IG5lZWQgdGhpcy4gKi9cbiAgICBwcml2YXRlIGNoZWNrRm9yRmFsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy53ZWVrZGF5c1Nob3J0IHx8IHRoaXMud2Vla2RheXNTaG9ydC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMud2Vla2RheXNTaG9ydCA9IHRoaXMud2Vla2RheXNGYWxsYmFjaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5tb250aHNTaG9ydCB8fCB0aGlzLm1vbnRoc1Nob3J0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tb250aHNTaG9ydCA9IHRoaXMubW9udGhzU2hvcnRGYWxsYmFjaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5tb250aHNGdWxsIHx8IHRoaXMubW9udGhzRnVsbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubW9udGhzRnVsbCA9IHRoaXMubW9udGhzRnVsbEZhbGxiYWNrO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=