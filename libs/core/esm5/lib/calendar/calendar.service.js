/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
var CalendarService = /** @class */ (function () {
    function CalendarService() {
        /**
         * Event thrown, when the element is selected by space or enter keys
         */
        this.onKeySelect = new Subject();
        /**
         * Event thrown, when the focus goes after list of elements
         */
        this.onListEndApproach = new Subject();
        /**
         * Event thrown, when the focus goes before list of elements
         */
        this.onListStartApproach = new Subject();
        /**
         * Event thrown, when the focus is changed.
         */
        this.onFocusIdChange = new Subject();
    }
    /**
     * Method that provides, amount of day depending on month and year passed
     * @param month which is number 1-12
     * @param year which is number
     */
    /**
     * Method that provides, amount of day depending on month and year passed
     * @param {?} month which is number 1-12
     * @param {?} year which is number
     * @return {?}
     */
    CalendarService.getDaysInMonth = /**
     * Method that provides, amount of day depending on month and year passed
     * @param {?} month which is number 1-12
     * @param {?} year which is number
     * @return {?}
     */
    function (month, year) {
        /** @type {?} */
        var isLeapYear = (/**
         * @param {?} _year
         * @return {?}
         */
        function (_year) {
            if (_year % 4 !== 0) {
                return false;
            }
            else if (_year % 400 === 0) {
                return true;
            }
            else {
                return _year % 100 !== 0;
            }
        });
        if (month === 2) {
            return isLeapYear(year) ? 29 : 28;
        }
        else if ((month % 2 === 0 && month < 8) || (month % 2 === 1 && month > 8)) {
            return 30;
        }
        else {
            return 31;
        }
    };
    /**
     * Method that check equality of 2 dates.
     */
    /**
     * Method that check equality of 2 dates.
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    CalendarService.datesEqual = /**
     * Method that check equality of 2 dates.
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    function (date1, date2) {
        if (!date1 || !date2) {
            return false;
        }
        else {
            return date1.toDateString() === date2.toDateString();
        }
    };
    /**
     * Method that handles keydown events, dedicated for Month and Year views, which have a list with 12 elements.
     * Triggers the events, when the focus approaches start and end of list. Or when there is basic change of focus.
     * Triggers also event, when the element is selected by enter key, or space bar.
     * @param event KeyboardEvent
     * @param index which is number (0 - 11)
     */
    /**
     * Method that handles keydown events, dedicated for Month and Year views, which have a list with 12 elements.
     * Triggers the events, when the focus approaches start and end of list. Or when there is basic change of focus.
     * Triggers also event, when the element is selected by enter key, or space bar.
     * @param {?} event KeyboardEvent
     * @param {?} index which is number (0 - 11)
     * @return {?}
     */
    CalendarService.prototype.onKeydownHandler = /**
     * Method that handles keydown events, dedicated for Month and Year views, which have a list with 12 elements.
     * Triggers the events, when the focus approaches start and end of list. Or when there is basic change of focus.
     * Triggers also event, when the element is selected by enter key, or space bar.
     * @param {?} event KeyboardEvent
     * @param {?} index which is number (0 - 11)
     * @return {?}
     */
    function (event, index) {
        switch (event.code) {
            case 'Enter':
            case 'Space': {
                event.preventDefault();
                this.onKeySelect.next(index);
                break;
            }
            case 'ArrowLeft': {
                event.preventDefault();
                if (index === 0) {
                    this.onListStartApproach.next();
                    this.onFocusIdChange.next(11);
                }
                else {
                    this.onFocusIdChange.next(index - 1);
                }
                break;
            }
            case 'ArrowRight': {
                event.preventDefault();
                if (index === 11) {
                    this.onListEndApproach.next();
                    this.onFocusIdChange.next(0);
                }
                else {
                    this.onFocusIdChange.next(index + 1);
                }
                break;
            }
            case 'ArrowUp': {
                event.preventDefault();
                if (index <= 3) {
                    this.onListStartApproach.next();
                    this.onFocusIdChange.next(index + 8);
                }
                else {
                    this.onFocusIdChange.next(index - 4);
                }
                break;
            }
            case 'ArrowDown': {
                event.preventDefault();
                if (index >= 8) {
                    this.onListEndApproach.next();
                    this.onFocusIdChange.next(index - 8);
                }
                else {
                    this.onFocusIdChange.next(index + 4);
                }
                break;
            }
            case 'Tab': {
                if (this.focusEscapeFunction && !event.shiftKey) {
                    event.preventDefault();
                    this.focusEscapeFunction();
                }
                break;
            }
        }
    };
    return CalendarService;
}());
export { CalendarService };
if (false) {
    /**
     * Event thrown, when the element is selected by space or enter keys
     * @type {?}
     */
    CalendarService.prototype.onKeySelect;
    /**
     * Event thrown, when the focus goes after list of elements
     * @type {?}
     */
    CalendarService.prototype.onListEndApproach;
    /**
     * Event thrown, when the focus goes before list of elements
     * @type {?}
     */
    CalendarService.prototype.onListStartApproach;
    /**
     * Event thrown, when the focus is changed.
     * @type {?}
     */
    CalendarService.prototype.onFocusIdChange;
    /**
     * Function that is called when the focus would escape the element.
     * @type {?}
     */
    CalendarService.prototype.focusEscapeFunction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9jYWxlbmRhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CO0lBQUE7Ozs7UUFHVyxnQkFBVyxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDOzs7O1FBR3JELHNCQUFpQixHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDOzs7O1FBR3ZELHdCQUFtQixHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDOzs7O1FBR3pELG9CQUFlLEdBQW9CLElBQUksT0FBTyxFQUFVLENBQUM7SUEyR3BFLENBQUM7SUF0R0c7Ozs7T0FJRzs7Ozs7OztJQUNJLDhCQUFjOzs7Ozs7SUFBckIsVUFBc0IsS0FBYSxFQUFFLElBQVk7O1lBRXZDLFVBQVU7Ozs7UUFBRyxVQUFDLEtBQWE7WUFDN0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDakIsT0FBTyxLQUFLLENBQUM7YUFDaEI7aUJBQU0sSUFBSSxLQUFLLEdBQUcsR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQUM7YUFDZjtpQkFBTTtnQkFDSCxPQUFPLEtBQUssR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO2FBQzVCO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2IsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3JDO2FBQU0sSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJ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QUM7b0JBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2lCQUM5QjtnQkFDRCxNQUFNO2FBQ1Q7U0FDSjtJQUNMLENBQUM7SUFFTCxzQkFBQztBQUFELENBQUMsQUF2SEQsSUF1SEM7Ozs7Ozs7SUFwSEcsc0NBQTREOzs7OztJQUc1RCw0Q0FBOEQ7Ozs7O0lBRzlELDhDQUFnRTs7Ozs7SUFHaEUsMENBQWdFOzs7OztJQUdoRSw4Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGZERhdGUgfSBmcm9tICcuL21vZGVscy9mZC1kYXRlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyU2VydmljZSB7XG5cbiAgICAvKiogRXZlbnQgdGhyb3duLCB3aGVuIHRoZSBlbGVtZW50IGlzIHNlbGVjdGVkIGJ5IHNwYWNlIG9yIGVudGVyIGtleXMgKi9cbiAgICBwdWJsaWMgb25LZXlTZWxlY3Q6IFN1YmplY3Q8bnVtYmVyPiA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICAgIC8qKiBFdmVudCB0aHJvd24sIHdoZW4gdGhlIGZvY3VzIGdvZXMgYWZ0ZXIgbGlzdCBvZiBlbGVtZW50cyAqL1xuICAgIHB1YmxpYyBvbkxpc3RFbmRBcHByb2FjaDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogRXZlbnQgdGhyb3duLCB3aGVuIHRoZSBmb2N1cyBnb2VzIGJlZm9yZSBsaXN0IG9mIGVsZW1lbnRzICovXG4gICAgcHVibGljIG9uTGlzdFN0YXJ0QXBwcm9hY2g6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqIEV2ZW50IHRocm93biwgd2hlbiB0aGUgZm9jdXMgaXMgY2hhbmdlZC4gKi9cbiAgICBwdWJsaWMgb25Gb2N1c0lkQ2hhbmdlOiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgZm9jdXMgd291bGQgZXNjYXBlIHRoZSBlbGVtZW50LiAqL1xuICAgIGZvY3VzRXNjYXBlRnVuY3Rpb246IEZ1bmN0aW9uO1xuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRoYXQgcHJvdmlkZXMsIGFtb3VudCBvZiBkYXkgZGVwZW5kaW5nIG9uIG1vbnRoIGFuZCB5ZWFyIHBhc3NlZFxuICAgICAqIEBwYXJhbSBtb250aCB3aGljaCBpcyBudW1iZXIgMS0xMlxuICAgICAqIEBwYXJhbSB5ZWFyIHdoaWNoIGlzIG51bWJlclxuICAgICAqL1xuICAgIHN0YXRpYyBnZXREYXlzSW5Nb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IGlzTGVhcFllYXIgPSAoX3llYXI6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgaWYgKF95ZWFyICUgNCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX3llYXIgJSA0MDAgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF95ZWFyICUgMTAwICE9PSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtb250aCA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIGlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4O1xuICAgICAgICB9IGVsc2UgaWYgKChtb250aCAlIDIgPT09IDAgJiYgbW9udGggPCA4KSB8fCAobW9udGggJSAyID09PSAxICYmIG1vbnRoID4gOCkpIHtcbiAgICAgICAgICAgIHJldHVybiAzMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAzMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0aGF0IGNoZWNrIGVxdWFsaXR5IG9mIDIgZGF0ZXMuXG4gICAgICovXG4gICAgc3RhdGljIGRhdGVzRXF1YWwoZGF0ZTE6IEZkRGF0ZSwgZGF0ZTI6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIWRhdGUxIHx8ICFkYXRlMikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGUxLnRvRGF0ZVN0cmluZygpID09PSBkYXRlMi50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0aGF0IGhhbmRsZXMga2V5ZG93biBldmVudHMsIGRlZGljYXRlZCBmb3IgTW9udGggYW5kIFllYXIgdmlld3MsIHdoaWNoIGhhdmUgYSBsaXN0IHdpdGggMTIgZWxlbWVudHMuXG4gICAgICogVHJpZ2dlcnMgdGhlIGV2ZW50cywgd2hlbiB0aGUgZm9jdXMgYXBwcm9hY2hlcyBzdGFydCBhbmQgZW5kIG9mIGxpc3QuIE9yIHdoZW4gdGhlcmUgaXMgYmFzaWMgY2hhbmdlIG9mIGZvY3VzLlxuICAgICAqIFRyaWdnZXJzIGFsc28gZXZlbnQsIHdoZW4gdGhlIGVsZW1lbnQgaXMgc2VsZWN0ZWQgYnkgZW50ZXIga2V5LCBvciBzcGFjZSBiYXIuXG4gICAgICogQHBhcmFtIGV2ZW50IEtleWJvYXJkRXZlbnRcbiAgICAgKiBAcGFyYW0gaW5kZXggd2hpY2ggaXMgbnVtYmVyICgwIC0gMTEpXG4gICAgICovXG4gICAgcHVibGljIG9uS2V5ZG93bkhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25LZXlTZWxlY3QubmV4dChpbmRleCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxpc3RTdGFydEFwcHJvYWNoLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkZvY3VzSWRDaGFuZ2UubmV4dCgxMSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRm9jdXNJZENoYW5nZS5uZXh0KGluZGV4IC0gMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0Jzoge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAxMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTGlzdEVuZEFwcHJvYWNoLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkZvY3VzSWRDaGFuZ2UubmV4dCgwKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Gb2N1c0lkQ2hhbmdlLm5leHQoaW5kZXggKyAxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPD0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTGlzdFN0YXJ0QXBwcm9hY2gubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRm9jdXNJZENoYW5nZS5uZXh0KGluZGV4ICsgOCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkZvY3VzSWRDaGFuZ2UubmV4dChpbmRleCAtIDQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25MaXN0RW5kQXBwcm9hY2gubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRm9jdXNJZENoYW5nZS5uZXh0KGluZGV4IC0gOCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkZvY3VzSWRDaGFuZ2UubmV4dChpbmRleCArIDQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ1RhYic6IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c0VzY2FwZUZ1bmN0aW9uICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzRXNjYXBlRnVuY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==