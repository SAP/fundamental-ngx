/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Default date model used by the fundamental components.
 */
import { CalendarService } from '../calendar.service';
export class FdDate {
    /**
     * Static function to get the current date in FdDate form.
     * @return {?}
     */
    static getToday() {
        /** @type {?} */
        const tempDate = new Date();
        return new FdDate(tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate());
    }
    /**
     *  Static function allowing convert js date object to FdDate model
     * @param {?} date
     * @return {?}
     */
    static getModelFromDate(date) {
        if (date) {
            return new FdDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
    }
    /**
     * Constructor to build a FdDate object from a year, month and day.
     * @param {?} year The year of the date.
     * @param {?} month The month of the date (1-12).
     * @param {?} day The day of the date (1-31, generally).
     */
    constructor(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
    /**
     * Get Luxon date object converted to string from FdDate.
     * @return {?}
     */
    toDateString() {
        if (this.year && this.month && this.day && this.isDateValid()) {
            return this.toDate().toDateString();
        }
        else {
            return '';
        }
    }
    /**
     * Get amount of milliseconds from 01.01.1970
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * @return {?}
     */
    getTimeStamp() {
        if (this.year && this.month && this.day) {
            return this.toDate().getTime();
        }
        else {
            return -1;
        }
    }
    /**
     * Get number of weekday ex. Sunday = 1, Monday = 2, Tuesday = 3 etc.
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * Native javascript date getDay() function returns Sunday as 0, Monday as 1, etc, to it's needed to increment value
     *
     * @return {?}
     */
    getDay() {
        if (this.year && this.month && this.day) {
            return this.toDate().getDay() + 1;
        }
        else {
            return -1;
        }
    }
    /**
     * Get next day
     * @return {?}
     */
    nextDay() {
        /** @type {?} */
        const maxDays = CalendarService.getDaysInMonth(this.month, this.year);
        /** @type {?} */
        const day = this.day >= maxDays ? 1 : this.day + 1;
        /** @type {?} */
        const month = day !== 1 ? this.month : (this.month > 11 ? 1 : this.month + 1);
        /** @type {?} */
        const year = month !== 1 ? this.year : this.year + 1;
        return new FdDate(year, month, day);
    }
    /**
     * Get previous day
     * @return {?}
     */
    previousDay() {
        /** @type {?} */
        const maxDays = CalendarService.getDaysInMonth(this.month, this.year);
        /** @type {?} */
        const day = this.day === 1 ? maxDays : this.day - 1;
        /** @type {?} */
        const month = day !== maxDays ? this.month : (this.month === 1 ? 12 : this.month - 1);
        /** @type {?} */
        const year = month !== 12 ? this.year : this.year - 1;
        return new FdDate(year, month, day);
    }
    /**
     * Get native date object from FdDate.
     * @return {?}
     */
    toDate() {
        return new Date(this.year, this.month - 1, this.day);
    }
    /**
     * Method that checks validity of current FdDate object.
     * @return {?}
     */
    isDateValid() {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmQtZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9tb2RlbHMvZmQtZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELE1BQU0sT0FBTyxNQUFNOzs7OztJQW9CZixNQUFNLENBQUMsUUFBUTs7Y0FDTCxRQUFRLEdBQVMsSUFBSSxJQUFJLEVBQUU7UUFDakMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMzRixDQUFDOzs7Ozs7SUFLRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBVTtRQUM5QixJQUFJLElBQUksRUFBRTtZQUNOLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDOUU7SUFDTCxDQUFDOzs7Ozs7O0lBUUQsWUFBWSxJQUFZLEVBQUUsS0FBYSxFQUFFLEdBQVc7UUFDaEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFLTSxZQUFZO1FBQ2YsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDM0QsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsWUFBWSxFQUFF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S0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRTtZQUNyRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xGLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUVKOzs7Ozs7SUE5SEcsc0JBQW9COzs7OztJQUtwQix1QkFBcUI7Ozs7O0lBS3JCLHFCQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGVmYXVsdCBkYXRlIG1vZGVsIHVzZWQgYnkgdGhlIGZ1bmRhbWVudGFsIGNvbXBvbmVudHMuXG4gKi9cbmltcG9ydCB7IENhbGVuZGFyU2VydmljZSB9IGZyb20gJy4uL2NhbGVuZGFyLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgRmREYXRlIHtcblxuICAgIC8qKlxuICAgICAqIFRoZSB5ZWFyIG9mIHRoZSBkYXRlLlxuICAgICAqL1xuICAgIHB1YmxpYyB5ZWFyOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbW9udGggb2YgdGhlIGRhdGUuIDEgPSBKYW51YXJ5LCAxMiA9IERlY2VtYmVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBtb250aDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogRGF5IG9mIHRoZSBkYXRlLiBTdGFydHMgYXQgMS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGF5OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0aWMgZnVuY3Rpb24gdG8gZ2V0IHRoZSBjdXJyZW50IGRhdGUgaW4gRmREYXRlIGZvcm0uXG4gICAgICovXG4gICAgc3RhdGljIGdldFRvZGF5KCk6IEZkRGF0ZSB7XG4gICAgICAgIGNvbnN0IHRlbXBEYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGZERhdGUodGVtcERhdGUuZ2V0RnVsbFllYXIoKSwgdGVtcERhdGUuZ2V0TW9udGgoKSArIDEsIHRlbXBEYXRlLmdldERhdGUoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIFN0YXRpYyBmdW5jdGlvbiBhbGxvd2luZyBjb252ZXJ0IGpzIGRhdGUgb2JqZWN0IHRvIEZkRGF0ZSBtb2RlbFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRNb2RlbEZyb21EYXRlKGRhdGU6IERhdGUpOiBGZERhdGUge1xuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGZERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAxLCBkYXRlLmdldERhdGUoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvciB0byBidWlsZCBhIEZkRGF0ZSBvYmplY3QgZnJvbSBhIHllYXIsIG1vbnRoIGFuZCBkYXkuXG4gICAgICogQHBhcmFtIHllYXIgVGhlIHllYXIgb2YgdGhlIGRhdGUuXG4gICAgICogQHBhcmFtIG1vbnRoIFRoZSBtb250aCBvZiB0aGUgZGF0ZSAoMS0xMikuXG4gICAgICogQHBhcmFtIGRheSBUaGUgZGF5IG9mIHRoZSBkYXRlICgxLTMxLCBnZW5lcmFsbHkpLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy55ZWFyID0geWVhcjtcbiAgICAgICAgdGhpcy5tb250aCA9IG1vbnRoO1xuICAgICAgICB0aGlzLmRheSA9IGRheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgTHV4b24gZGF0ZSBvYmplY3QgY29udmVydGVkIHRvIHN0cmluZyBmcm9tIEZkRGF0ZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9EYXRlU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnllYXIgJiYgdGhpcy5tb250aCAmJiB0aGlzLmRheSAmJiB0aGlzLmlzRGF0ZVZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvRGF0ZSgpLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFtb3VudCBvZiBtaWxsaXNlY29uZHMgZnJvbSAwMS4wMS4xOTcwXG4gICAgICogLTEgaXMgdGhyb3duIHdoZW4gc29tZSBzb21lIG9mIHByb3BlcnRpZXMgKGRheSxtb250aCx5ZWFyKSBhcmUgbm90IGRlZmluZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0VGltZVN0YW1wKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLnllYXIgJiYgdGhpcy5tb250aCAmJiB0aGlzLmRheSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG51bWJlciBvZiB3ZWVrZGF5IGV4LiBTdW5kYXkgPSAxLCBNb25kYXkgPSAyLCBUdWVzZGF5ID0gMyBldGMuXG4gICAgICogLTEgaXMgdGhyb3duIHdoZW4gc29tZSBzb21lIG9mIHByb3BlcnRpZXMgKGRheSxtb250aCx5ZWFyKSBhcmUgbm90IGRlZmluZWRcbiAgICAgKiBOYXRpdmUgamF2YXNjcmlwdCBkYXRlIGdldERheSgpIGZ1bmN0aW9uIHJldHVybnMgU3VuZGF5IGFzIDAsIE1vbmRheSBhcyAxLCBldGMsIHRvIGl0J3MgbmVlZGVkIHRvIGluY3JlbWVudCB2YWx1ZVxuICAgICAqXG4gICAgICovXG4gICAgcHVibGljIGdldERheSgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy55ZWFyICYmIHRoaXMubW9udGggJiYgdGhpcy5kYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvRGF0ZSgpLmdldERheSgpICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBHZXQgbmV4dCBkYXkgKi9cbiAgICBwdWJsaWMgbmV4dERheSgpOiBGZERhdGUge1xuICAgICAgICBjb25zdCBtYXhEYXlzID0gQ2FsZW5kYXJTZXJ2aWNlLmdldERheXNJbk1vbnRoKHRoaXMubW9udGgsIHRoaXMueWVhcik7XG4gICAgICAgIGNvbnN0IGRheSA9IHRoaXMuZGF5ID49IG1heERheXMgPyAxIDogdGhpcy5kYXkgKyAxO1xuICAgICAgICBjb25zdCBtb250aCA9IGRheSAhPT0gMSA/IHRoaXMubW9udGggOiAodGhpcy5tb250aCA+IDExID8gMSA6IHRoaXMubW9udGggKyAxKTtcbiAgICAgICAgY29uc3QgeWVhciA9IG1vbnRoICE9PSAxID8gdGhpcy55ZWFyIDogdGhpcy55ZWFyICsgMTtcbiAgICAgICAgcmV0dXJuIG5ldyBGZERhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgfVxuXG4gICAgLyoqIEdldCBwcmV2aW91cyBkYXkgICovXG4gICAgcHVibGljIHByZXZpb3VzRGF5KCk6IEZkRGF0ZSB7XG4gICAgICAgIGNvbnN0IG1heERheXMgPSBDYWxlbmRhclNlcnZpY2UuZ2V0RGF5c0luTW9udGgodGhpcy5tb250aCwgdGhpcy55ZWFyKTtcbiAgICAgICAgY29uc3QgZGF5ID0gdGhpcy5kYXkgPT09IDEgPyBtYXhEYXlzIDogdGhpcy5kYXkgLSAxO1xuICAgICAgICBjb25zdCBtb250aCA9IGRheSAhPT0gbWF4RGF5cyA/IHRoaXMubW9udGggOiAodGhpcy5tb250aCA9PT0gMSA/IDEyIDogdGhpcy5tb250aCAtIDEpO1xuICAgICAgICBjb25zdCB5ZWFyID0gbW9udGggIT09IDEyID8gdGhpcy55ZWFyIDogdGhpcy55ZWFyIC0gMTtcbiAgICAgICAgcmV0dXJuIG5ldyBGZERhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG5hdGl2ZSBkYXRlIG9iamVjdCBmcm9tIEZkRGF0ZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9EYXRlKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoIC0gMSwgdGhpcy5kYXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0aGF0IGNoZWNrcyB2YWxpZGl0eSBvZiBjdXJyZW50IEZkRGF0ZSBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGlzRGF0ZVZhbGlkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy55ZWFyIHx8ICF0aGlzLm1vbnRoIHx8ICF0aGlzLmRheSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueWVhciA8PSAwIHx8IHRoaXMubW9udGggPCAxIHx8IHRoaXMubW9udGggPiAxMikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF5IDwgMSB8fCB0aGlzLmRheSA+IENhbGVuZGFyU2VydmljZS5nZXREYXlzSW5Nb250aCh0aGlzLm1vbnRoLCB0aGlzLnllYXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cbiJdfQ==