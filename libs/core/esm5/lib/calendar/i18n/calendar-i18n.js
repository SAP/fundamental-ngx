/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var CalendarI18n = /** @class */ (function () {
    function CalendarI18n() {
    }
    CalendarI18n.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                    useFactory: CALENDAR_I18N_FACTORY,
                    deps: [LOCALE_ID]
                },] }
    ];
    /** @nocollapse */ CalendarI18n.ngInjectableDef = i0.defineInjectable({ factory: function CalendarI18n_Factory() { return CALENDAR_I18N_FACTORY(i0.inject(i0.LOCALE_ID)); }, token: CalendarI18n, providedIn: "root" });
    return CalendarI18n;
}());
export { CalendarI18n };
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
var CalendarI18nDefault = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarI18nDefault, _super);
    /** Constructor takes in a locale_id and gets the appropriate data from Angular. */
    function CalendarI18nDefault(locale) {
        var _this = _super.call(this) || this;
        _this.locale = locale;
        _this.weekdaysFallback = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];
        _this.monthsFullFallback = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        _this.monthsShortFallback = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
            'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        if (locale) {
            /** @type {?} */
            var sundayStartWeekdays_1 = getLocaleDayNames(locale, FormStyle.Standalone, TranslationWidth.Short);
            _this.weekdaysShort = sundayStartWeekdays_1.map((/**
             * @param {?} day
             * @param {?} index
             * @return {?}
             */
            function (day, index) { return sundayStartWeekdays_1[index % 7]; }));
            _this.monthsShort = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
            _this.monthsFull = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Wide);
        }
        _this.checkForFallback();
        return _this;
    }
    /**
     * Aria label for a specific date. Default implementation produces the label: {Date} {Month} {Year}.
     *
     * @param date Native date object to use for the label.
     */
    /**
     * Aria label for a specific date. Default implementation produces the label: {Date} {Month} {Year}.
     *
     * @param {?} date Native date object to use for the label.
     * @return {?}
     */
    CalendarI18nDefault.prototype.getDayAriaLabel = /**
     * Aria label for a specific date. Default implementation produces the label: {Date} {Month} {Year}.
     *
     * @param {?} date Native date object to use for the label.
     * @return {?}
     */
    function (date) {
        return date.getDate() + ' ' + this.monthsFull[date.getMonth()] + ' ' + date.getFullYear();
    };
    /** Get all full month names. */
    /**
     * Get all full month names.
     * @return {?}
     */
    CalendarI18nDefault.prototype.getAllFullMonthNames = /**
     * Get all full month names.
     * @return {?}
     */
    function () {
        return this.monthsFull;
    };
    /** Get all short month names, such as Nov for November. */
    /**
     * Get all short month names, such as Nov for November.
     * @return {?}
     */
    CalendarI18nDefault.prototype.getAllShortMonthNames = /**
     * Get all short month names, such as Nov for November.
     * @return {?}
     */
    function () {
        return this.monthsShort;
    };
    /** Get all short week day names, such as Mo for Monday. */
    /**
     * Get all short week day names, such as Mo for Monday.
     * @return {?}
     */
    CalendarI18nDefault.prototype.getAllShortWeekdays = /**
     * Get all short week day names, such as Mo for Monday.
     * @return {?}
     */
    function () {
        return this.weekdaysShort;
    };
    /** Checks if a fallback is needed. Older versions of Angular may need this. */
    /**
     * Checks if a fallback is needed. Older versions of Angular may need this.
     * @private
     * @return {?}
     */
    CalendarI18nDefault.prototype.checkForFallback = /**
     * Checks if a fallback is needed. Older versions of Angular may need this.
     * @private
     * @return {?}
     */
    function () {
        if (!this.weekdaysShort || this.weekdaysShort.length === 0) {
            this.weekdaysShort = this.weekdaysFallback;
        }
        if (!this.monthsShort || this.monthsShort.length === 0) {
            this.monthsShort = this.monthsShortFallback;
        }
        if (!this.monthsFull || this.monthsFull.length === 0) {
            this.monthsFull = this.monthsFullFallback;
        }
    };
    CalendarI18nDefault.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CalendarI18nDefault.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return CalendarI18nDefault;
}(CalendarI18n));
export { CalendarI18nDefault };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaTE4bi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9pMThuL2NhbGVuZGFyLWkxOG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7O0FBR3RHLE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxNQUFNO0lBQ3hDLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQyxDQUFDOzs7OztBQUtEO0lBQUE7S0FxQkM7O2dCQXJCQSxVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxxQkFBcUI7b0JBQ2pDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDcEI7Ozt1QkFmRDtDQWdDQyxBQXJCRCxJQXFCQztTQWhCcUIsWUFBWTs7Ozs7Ozs7SUFNOUIsNkRBQTZDOzs7Ozs7SUFHN0MsNkRBQXlDOzs7Ozs7SUFHekMsK0RBQTJDOzs7Ozs7SUFHM0MsOERBQTBDOzs7OztBQU05QztJQUN5QywrQ0FBWTtJQW9CakQsbUZBQW1GO0lBQ25GLDZCQUFtRCxNQUFjO1FBQWpFLFlBQ0ksaUJBQU8sU0FTVjtRQVZrRCxZQUFNLEdBQU4sTUFBTSxDQUFRO1FBZnpELHNCQUFnQixHQUFhO1lBQ2pDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVU7U0FDL0UsQ0FBQztRQUVNLHdCQUFrQixHQUFhO1lBQ25DLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxL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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIExPQ0FMRV9JRCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1TdHlsZSwgZ2V0TG9jYWxlRGF5TmFtZXMsIGdldExvY2FsZU1vbnRoTmFtZXMsIFRyYW5zbGF0aW9uV2lkdGggfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZnVuY3Rpb24gQ0FMRU5EQVJfSTE4Tl9GQUNUT1JZKGxvY2FsZSkge1xuICAgIHJldHVybiBuZXcgQ2FsZW5kYXJJMThuRGVmYXVsdChsb2NhbGUpO1xufVxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHdoaWNoIGRlZmluZXMgdGhlIGJlaGF2aW91ciBjYWxlbmRhciBpbnRlcm5hdGlvbmFsaXphdGlvbi4gU2VlIGNhbGVuZGFyIGV4YW1wbGVzIGZvciB1c2FnZSBkZXRhaWxzLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgIHVzZUZhY3Rvcnk6IENBTEVOREFSX0kxOE5fRkFDVE9SWSxcbiAgICBkZXBzOiBbTE9DQUxFX0lEXVxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDYWxlbmRhckkxOG4ge1xuXG4gICAgLyoqXG4gICAgICogQXJpYSBsYWJlbCBmb3IgYSBzcGVjaWZpYyBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIE5hdGl2ZSBkYXRlIG9iamVjdCB0byB1c2UgZm9yIHRoZSBsYWJlbC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXREYXlBcmlhTGFiZWwoZGF0ZTogRGF0ZSk6IHN0cmluZztcblxuICAgIC8qKiBHZXQgYWxsIHNob3J0IHdlZWsgZGF5IG5hbWVzLCBzdWNoIGFzIE1vIGZvciBNb25kYXkuICovXG4gICAgYWJzdHJhY3QgZ2V0QWxsU2hvcnRXZWVrZGF5cygpOiBzdHJpbmdbXTtcblxuICAgIC8qKiBHZXQgYWxsIHNob3J0IG1vbnRoIG5hbWVzLCBzdWNoIGFzIE5vdiBmb3IgTm92ZW1iZXIuICovXG4gICAgYWJzdHJhY3QgZ2V0QWxsU2hvcnRNb250aE5hbWVzKCk6IHN0cmluZ1tdO1xuXG4gICAgLyoqIEdldCBhbGwgZnVsbCBtb250aCBuYW1lcy4gKi9cbiAgICBhYnN0cmFjdCBnZXRBbGxGdWxsTW9udGhOYW1lcygpOiBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBDYWxlbmRhckkxOG4gc2VydmljZS4gSXQgd2lsbCBnZXQgZGF0ZXMgZnJvbSB0aGUgYXBwbGljYXRpb24gbG9jYWxlIGlmIGl0IGlzIHByZXNlbnQuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckkxOG5EZWZhdWx0IGV4dGVuZHMgQ2FsZW5kYXJJMThuIHtcblxuICAgIHByaXZhdGUgd2Vla2RheXNTaG9ydDogc3RyaW5nW107XG4gICAgcHJpdmF0ZSBtb250aHNTaG9ydDogc3RyaW5nW107XG4gICAgcHJpdmF0ZSBtb250aHNGdWxsOiBzdHJpbmdbXTtcblxuICAgIHByaXZhdGUgd2Vla2RheXNGYWxsYmFjazogc3RyaW5nW10gPSBbXG4gICAgICAgICdTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSdcbiAgICBdO1xuXG4gICAgcHJpdmF0ZSBtb250aHNGdWxsRmFsbGJhY2s6IHN0cmluZ1tdID0gW1xuICAgICAgICAnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JyxcbiAgICAgICAgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlcidcbiAgICBdO1xuXG4gICAgcHJpdmF0ZSBtb250aHNTaG9ydEZhbGxiYWNrOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsXG4gICAgICAgICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ1xuICAgIF07XG5cbiAgICAvKiogQ29uc3RydWN0b3IgdGFrZXMgaW4gYSBsb2NhbGVfaWQgYW5kIGdldHMgdGhlIGFwcHJvcHJpYXRlIGRhdGEgZnJvbSBBbmd1bGFyLiAqL1xuICAgIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIGxvY2FsZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1bmRheVN0YXJ0V2Vla2RheXMgPSBnZXRMb2NhbGVEYXlOYW1lcyhsb2NhbGUsIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLlNob3J0KTtcbiAgICAgICAgICAgIHRoaXMud2Vla2RheXNTaG9ydCA9IHN1bmRheVN0YXJ0V2Vla2RheXMubWFwKChkYXksIGluZGV4KSA9PiBzdW5kYXlTdGFydFdlZWtkYXlzW2luZGV4ICUgN10pO1xuICAgICAgICAgICAgdGhpcy5tb250aHNTaG9ydCA9IGdldExvY2FsZU1vbnRoTmFtZXMobG9jYWxlLCBGb3JtU3R5bGUuU3RhbmRhbG9uZSwgVHJhbnNsYXRpb25XaWR0aC5BYmJyZXZpYXRlZCk7XG4gICAgICAgICAgICB0aGlzLm1vbnRoc0Z1bGwgPSBnZXRMb2NhbGVNb250aE5hbWVzKGxvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguV2lkZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoZWNrRm9yRmFsbGJhY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcmlhIGxhYmVsIGZvciBhIHNwZWNpZmljIGRhdGUuIERlZmF1bHQgaW1wbGVtZW50YXRpb24gcHJvZHVjZXMgdGhlIGxhYmVsOiB7RGF0ZX0ge01vbnRofSB7WWVhcn0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0ZSBOYXRpdmUgZGF0ZSBvYmplY3QgdG8gdXNlIGZvciB0aGUgbGFiZWwuXG4gICAgICovXG4gICAgZ2V0RGF5QXJpYUxhYmVsKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCkgKyAnICcgKyB0aGlzLm1vbnRoc0Z1bGxbZGF0ZS5nZXRNb250aCgpXSArICcgJyArIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICB9XG5cbiAgICAvKiogR2V0IGFsbCBmdWxsIG1vbnRoIG5hbWVzLiAqL1xuICAgIGdldEFsbEZ1bGxNb250aE5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGhzRnVsbDtcbiAgICB9XG5cbiAgICAvKiogR2V0IGFsbCBzaG9ydCBtb250aCBuYW1lcywgc3VjaCBhcyBOb3YgZm9yIE5vdmVtYmVyLiAqL1xuICAgIGdldEFsbFNob3J0TW9udGhOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoc1Nob3J0O1xuICAgIH1cblxuICAgIC8qKiBHZXQgYWxsIHNob3J0IHdlZWsgZGF5IG5hbWVzLCBzdWNoIGFzIE1vIGZvciBNb25kYXkuICovXG4gICAgZ2V0QWxsU2hvcnRXZWVrZGF5cygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLndlZWtkYXlzU2hvcnQ7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyBpZiBhIGZhbGxiYWNrIGlzIG5lZWRlZC4gT2xkZXIgdmVyc2lvbnMgb2YgQW5ndWxhciBtYXkgbmVlZCB0aGlzLiAqL1xuICAgIHByaXZhdGUgY2hlY2tGb3JGYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLndlZWtkYXlzU2hvcnQgfHwgdGhpcy53ZWVrZGF5c1Nob3J0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy53ZWVrZGF5c1Nob3J0ID0gdGhpcy53ZWVrZGF5c0ZhbGxiYWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm1vbnRoc1Nob3J0IHx8IHRoaXMubW9udGhzU2hvcnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoc1Nob3J0ID0gdGhpcy5tb250aHNTaG9ydEZhbGxiYWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm1vbnRoc0Z1bGwgfHwgdGhpcy5tb250aHNGdWxsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tb250aHNGdWxsID0gdGhpcy5tb250aHNGdWxsRmFsbGJhY2s7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==