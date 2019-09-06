/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Default date model used by the fundamental components.
 */
import { CalendarService } from '../calendar.service';
var FdDate = /** @class */ (function () {
    /**
     * Constructor to build a FdDate object from a year, month and day.
     * @param year The year of the date.
     * @param month The month of the date (1-12).
     * @param day The day of the date (1-31, generally).
     */
    function FdDate(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
    /**
     * Static function to get the current date in FdDate form.
     */
    /**
     * Static function to get the current date in FdDate form.
     * @return {?}
     */
    FdDate.getToday = /**
     * Static function to get the current date in FdDate form.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tempDate = new Date();
        return new FdDate(tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate());
    };
    /**
     *  Static function allowing convert js date object to FdDate model
     */
    /**
     *  Static function allowing convert js date object to FdDate model
     * @param {?} date
     * @return {?}
     */
    FdDate.getModelFromDate = /**
     *  Static function allowing convert js date object to FdDate model
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date) {
            return new FdDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
    };
    /**
     * Get Luxon date object converted to string from FdDate.
     */
    /**
     * Get Luxon date object converted to string from FdDate.
     * @return {?}
     */
    FdDate.prototype.toDateString = /**
     * Get Luxon date object converted to string from FdDate.
     * @return {?}
     */
    function () {
        if (this.year && this.month && this.day && this.isDateValid()) {
            return this.toDate().toDateString();
        }
        else {
            return '';
        }
    };
    /**
     * Get amount of milliseconds from 01.01.1970
     * -1 is thrown when some some of properties (day,month,year) are not defined
     */
    /**
     * Get amount of milliseconds from 01.01.1970
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * @return {?}
     */
    FdDate.prototype.getTimeStamp = /**
     * Get amount of milliseconds from 01.01.1970
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * @return {?}
     */
    function () {
        if (this.year && this.month && this.day) {
            return this.toDate().getTime();
        }
        else {
            return -1;
        }
    };
    /**
     * Get number of weekday ex. Sunday = 1, Monday = 2, Tuesday = 3 etc.
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * Native javascript date getDay() function returns Sunday as 0, Monday as 1, etc, to it's needed to increment value
     *
     */
    /**
     * Get number of weekday ex. Sunday = 1, Monday = 2, Tuesday = 3 etc.
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * Native javascript date getDay() function returns Sunday as 0, Monday as 1, etc, to it's needed to increment value
     *
     * @return {?}
     */
    FdDate.prototype.getDay = /**
     * Get number of weekday ex. Sunday = 1, Monday = 2, Tuesday = 3 etc.
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * Native javascript date getDay() function returns Sunday as 0, Monday as 1, etc, to it's needed to increment value
     *
     * @return {?}
     */
    function () {
        if (this.year && this.month && this.day) {
            return this.toDate().getDay() + 1;
        }
        else {
            return -1;
        }
    };
    /** Get next day */
    /**
     * Get next day
     * @return {?}
     */
    FdDate.prototype.nextDay = /**
     * Get next day
     * @return {?}
     */
    function () {
        /** @type {?} */
        var maxDays = CalendarService.getDaysInMonth(this.month, this.year);
        /** @type {?} */
        var day = this.day >= maxDays ? 1 : this.day + 1;
        /** @type {?} */
        var month = day !== 1 ? this.month : (this.month > 11 ? 1 : this.month + 1);
        /** @type {?} */
        var year = month !== 1 ? this.year : this.year + 1;
        return new FdDate(year, month, day);
    };
    /** Get previous day  */
    /**
     * Get previous day
     * @return {?}
     */
    FdDate.prototype.previousDay = /**
     * Get previous day
     * @return {?}
     */
    function () {
        /** @type {?} */
        var maxDays = CalendarService.getDaysInMonth(this.month, this.year);
        /** @type {?} */
        var day = this.day === 1 ? maxDays : this.day - 1;
        /** @type {?} */
        var month = day !== maxDays ? this.month : (this.month === 1 ? 12 : this.month - 1);
        /** @type {?} */
        var year = month !== 12 ? this.year : this.year - 1;
        return new FdDate(year, month, day);
    };
    /**
     * Get native date object from FdDate.
     */
    /**
     * Get native date object from FdDate.
     * @return {?}
     */
    FdDate.prototype.toDate = /**
     * Get native date object from FdDate.
     * @return {?}
     */
    function () {
        return new Date(this.year, this.month - 1, this.day);
    };
    /**
     * Method that checks validity of current FdDate object.
     */
    /**
     * Method that checks validity of current FdDate object.
     * @return {?}
     */
    FdDate.prototype.isDateValid = /**
     * Method that checks validity of current FdDate object.
     * @return {?}
     */
    function () {
        if (!this) {
            return false;
        }
        if (!this.year || !this.month || !this.day) {
            return false;
        }
        if (this.year <= 0 || this.month < 1 || this.month > 12) {
            return false;
        }
        if (this.day < 1 || this.day > CalendarService.getDaysInMonth(this.month, this.year)) {
            return false;
        }
        return true;
    };
    return FdDate;
}());
export { FdDate };
if (false) {
    /**
     * The year of the date.
     * @type {?}
     */
    FdDate.prototype.year;
    /**
     * The month of the date. 1 = January, 12 = December.
     * @type {?}
     */
    FdDate.prototype.month;
    /**
     * Day of the date. Starts at 1.
     * @type {?}
     */
    FdDate.prototype.day;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmQtZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9tb2RlbHMvZmQtZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXREO0lBa0NJOzs7OztPQUtHO0lBQ0gsZ0JBQVksSUFBWSxFQUFFLEtBQWEsRUFBRSxHQUFXO1FBQ2hELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUEzQkQ7O09BRUc7Ozs7O0lBQ0ksZUFBUTs7OztJQUFmOztZQUNVLFFBQVEsR0FBUyxJQUFJLElBQUksRUFBRTtRQUNqQyxPQUFPLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ksdUJBQWdCOzs7OztJQUF2QixVQUF3QixJQUFVO1FBQzlCLElBQUksSUFBSSxFQUFFO1lBQ04sT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUM5RTtJQUNMLENBQUM7SUFjRDs7T0FFRzs7Ozs7SUFDSSw2QkFBWTs7OztJQUFuQjtRQUNJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQzNELE9B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Ozs7O0lBQ0ksNEJBQVc7Ozs7SUFBbEI7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3hDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRTtZQUNyRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xGLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVMLGFBQUM7QUFBRCxDQUFDLEFBbklELElBbUlDOzs7Ozs7O0lBOUhHLHNCQUFvQjs7Ozs7SUFLcEIsdUJBQXFCOzs7OztJQUtyQixxQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERlZmF1bHQgZGF0ZSBtb2RlbCB1c2VkIGJ5IHRoZSBmdW5kYW1lbnRhbCBjb21wb25lbnRzLlxuICovXG5pbXBvcnQgeyBDYWxlbmRhclNlcnZpY2UgfSBmcm9tICcuLi9jYWxlbmRhci5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIEZkRGF0ZSB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgeWVhciBvZiB0aGUgZGF0ZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgeWVhcjogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG1vbnRoIG9mIHRoZSBkYXRlLiAxID0gSmFudWFyeSwgMTIgPSBEZWNlbWJlci5cbiAgICAgKi9cbiAgICBwdWJsaWMgbW9udGg6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIERheSBvZiB0aGUgZGF0ZS4gU3RhcnRzIGF0IDEuXG4gICAgICovXG4gICAgcHVibGljIGRheTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogU3RhdGljIGZ1bmN0aW9uIHRvIGdldCB0aGUgY3VycmVudCBkYXRlIGluIEZkRGF0ZSBmb3JtLlxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRUb2RheSgpOiBGZERhdGUge1xuICAgICAgICBjb25zdCB0ZW1wRGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHJldHVybiBuZXcgRmREYXRlKHRlbXBEYXRlLmdldEZ1bGxZZWFyKCksIHRlbXBEYXRlLmdldE1vbnRoKCkgKyAxLCB0ZW1wRGF0ZS5nZXREYXRlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBTdGF0aWMgZnVuY3Rpb24gYWxsb3dpbmcgY29udmVydCBqcyBkYXRlIG9iamVjdCB0byBGZERhdGUgbW9kZWxcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0TW9kZWxGcm9tRGF0ZShkYXRlOiBEYXRlKTogRmREYXRlIHtcbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmREYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpICsgMSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IgdG8gYnVpbGQgYSBGZERhdGUgb2JqZWN0IGZyb20gYSB5ZWFyLCBtb250aCBhbmQgZGF5LlxuICAgICAqIEBwYXJhbSB5ZWFyIFRoZSB5ZWFyIG9mIHRoZSBkYXRlLlxuICAgICAqIEBwYXJhbSBtb250aCBUaGUgbW9udGggb2YgdGhlIGRhdGUgKDEtMTIpLlxuICAgICAqIEBwYXJhbSBkYXkgVGhlIGRheSBvZiB0aGUgZGF0ZSAoMS0zMSwgZ2VuZXJhbGx5KS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueWVhciA9IHllYXI7XG4gICAgICAgIHRoaXMubW9udGggPSBtb250aDtcbiAgICAgICAgdGhpcy5kYXkgPSBkYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IEx1eG9uIGRhdGUgb2JqZWN0IGNvbnZlcnRlZCB0byBzdHJpbmcgZnJvbSBGZERhdGUuXG4gICAgICovXG4gICAgcHVibGljIHRvRGF0ZVN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy55ZWFyICYmIHRoaXMubW9udGggJiYgdGhpcy5kYXkgJiYgdGhpcy5pc0RhdGVWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0RhdGUoKS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIGZyb20gMDEuMDEuMTk3MFxuICAgICAqIC0xIGlzIHRocm93biB3aGVuIHNvbWUgc29tZSBvZiBwcm9wZXJ0aWVzIChkYXksbW9udGgseWVhcikgYXJlIG5vdCBkZWZpbmVkXG4gICAgICovXG4gICAgcHVibGljIGdldFRpbWVTdGFtcCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy55ZWFyICYmIHRoaXMubW9udGggJiYgdGhpcy5kYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBudW1iZXIgb2Ygd2Vla2RheSBleC4gU3VuZGF5ID0gMSwgTW9uZGF5ID0gMiwgVHVlc2RheSA9IDMgZXRjLlxuICAgICAqIC0xIGlzIHRocm93biB3aGVuIHNvbWUgc29tZSBvZiBwcm9wZXJ0aWVzIChkYXksbW9udGgseWVhcikgYXJlIG5vdCBkZWZpbmVkXG4gICAgICogTmF0aXZlIGphdmFzY3JpcHQgZGF0ZSBnZXREYXkoKSBmdW5jdGlvbiByZXR1cm5zIFN1bmRheSBhcyAwLCBNb25kYXkgYXMgMSwgZXRjLCB0byBpdCdzIG5lZWRlZCB0byBpbmNyZW1lbnQgdmFsdWVcbiAgICAgKlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXREYXkoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMueWVhciAmJiB0aGlzLm1vbnRoICYmIHRoaXMuZGF5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0RhdGUoKS5nZXREYXkoKSArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogR2V0IG5leHQgZGF5ICovXG4gICAgcHVibGljIG5leHREYXkoKTogRmREYXRlIHtcbiAgICAgICAgY29uc3QgbWF4RGF5cyA9IENhbGVuZGFyU2VydmljZS5nZXREYXlzSW5Nb250aCh0aGlzLm1vbnRoLCB0aGlzLnllYXIpO1xuICAgICAgICBjb25zdCBkYXkgPSB0aGlzLmRheSA+PSBtYXhEYXlzID8gMSA6IHRoaXMuZGF5ICsgMTtcbiAgICAgICAgY29uc3QgbW9udGggPSBkYXkgIT09IDEgPyB0aGlzLm1vbnRoIDogKHRoaXMubW9udGggPiAxMSA/IDEgOiB0aGlzLm1vbnRoICsgMSk7XG4gICAgICAgIGNvbnN0IHllYXIgPSBtb250aCAhPT0gMSA/IHRoaXMueWVhciA6IHRoaXMueWVhciArIDE7XG4gICAgICAgIHJldHVybiBuZXcgRmREYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIH1cblxuICAgIC8qKiBHZXQgcHJldmlvdXMgZGF5ICAqL1xuICAgIHB1YmxpYyBwcmV2aW91c0RheSgpOiBGZERhdGUge1xuICAgICAgICBjb25zdCBtYXhEYXlzID0gQ2FsZW5kYXJTZXJ2aWNlLmdldERheXNJbk1vbnRoKHRoaXMubW9udGgsIHRoaXMueWVhcik7XG4gICAgICAgIGNvbnN0IGRheSA9IHRoaXMuZGF5ID09PSAxID8gbWF4RGF5cyA6IHRoaXMuZGF5IC0gMTtcbiAgICAgICAgY29uc3QgbW9udGggPSBkYXkgIT09IG1heERheXMgPyB0aGlzLm1vbnRoIDogKHRoaXMubW9udGggPT09IDEgPyAxMiA6IHRoaXMubW9udGggLSAxKTtcbiAgICAgICAgY29uc3QgeWVhciA9IG1vbnRoICE9PSAxMiA/IHRoaXMueWVhciA6IHRoaXMueWVhciAtIDE7XG4gICAgICAgIHJldHVybiBuZXcgRmREYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBuYXRpdmUgZGF0ZSBvYmplY3QgZnJvbSBGZERhdGUuXG4gICAgICovXG4gICAgcHVibGljIHRvRGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCAtIDEsIHRoaXMuZGF5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCBjaGVja3MgdmFsaWRpdHkgb2YgY3VycmVudCBGZERhdGUgb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBpc0RhdGVWYWxpZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMueWVhciB8fCAhdGhpcy5tb250aCB8fCAhdGhpcy5kYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnllYXIgPD0gMCB8fCB0aGlzLm1vbnRoIDwgMSB8fCB0aGlzLm1vbnRoID4gMTIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRheSA8IDEgfHwgdGhpcy5kYXkgPiBDYWxlbmRhclNlcnZpY2UuZ2V0RGF5c0luTW9udGgodGhpcy5tb250aCwgdGhpcy55ZWFyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59XG4iXX0=