/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
export class CalendarService {
    constructor() {
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
     * @param {?} month which is number 1-12
     * @param {?} year which is number
     * @return {?}
     */
    static getDaysInMonth(month, year) {
        /** @type {?} */
        const isLeapYear = (/**
         * @param {?} _year
         * @return {?}
         */
        (_year) => {
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
    }
    /**
     * Method that check equality of 2 dates.
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    static datesEqual(date1, date2) {
        if (!date1 || !date2) {
            return false;
        }
        else {
            return date1.toDateString() === date2.toDateString();
        }
    }
    /**
     * Method that handles keydown events, dedicated for Month and Year views, which have a list with 12 elements.
     * Triggers the events, when the focus approaches start and end of list. Or when there is basic change of focus.
     * Triggers also event, when the element is selected by enter key, or space bar.
     * @param {?} event KeyboardEvent
     * @param {?} index which is number (0 - 11)
     * @return {?}
     */
    onKeydownHandler(event, index) {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9jYWxlbmRhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE1BQU0sT0FBTyxlQUFlO0lBQTVCOzs7O1FBR1csZ0JBQVcsR0FBb0IsSUFBSSxPQUFPLEVBQVUsQ0FBQzs7OztRQUdyRCxzQkFBaUIsR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQzs7OztRQUd2RCx3QkFBbUIsR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQzs7OztRQUd6RCxvQkFBZSxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO0lBMkdwRSxDQUFDOzs7Ozs7O0lBakdHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBYSxFQUFFLElBQVk7O2NBRXZDLFVBQVU7Ozs7UUFBRyxDQUFDLEtBQWEsRUFBVyxFQUFFO1lBQzFDLElBQUksS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO2lCQUFNLElBQUksS0FBSyxHQUFHLEdBQUcsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7aUJBQU07Z0JBQ0gsT0FBTyxLQUFLLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQzthQUM1QjtRQUNMLENBQUMsQ0FBQTtRQUVELElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtZQUNiLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNyQzthQUFNLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDekUsT0FBTyxFQUFFLENBQUM7U0FDYjthQUFNO1lBQ0gsT0FBTyxFQUFFLENBQUM7U0FDYjtJQUNMLENBQUM7Ozs7Ozs7SUFLRCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQWEsRUFBRSxLQUFhO1FBQzFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbEIsT0FBTyxLQUFLLENBQUM7U0FDaEI7YUFBTTtZQUNILE9BQU8sS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN4RDtJQUNMLENBQUM7Ozs7Ozs7OztJQVNNLGdCQUFnQixDQUFDLEtBQW9CLEVBQUUsS0FBYTtRQUN2RCxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDaEIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLE9BQU8sQ0FBQyxDQUFDO2dCQUNWLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdCLE1BQU07YUFDVDtZQUNELEtBQUssV0FBVyxDQUFDLENBQUM7Z0JBQ2QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO29CQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtpQkFDaEM7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFBO2lCQUN2QztnQkFDRCxNQUFNO2FBQ1Q7WUFDRCxLQUFLLFlBQVksQ0FBQyxDQUFDO2dCQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO29CQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQy9CO3FCQUFNO29CQUNILElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtpQkFDdkM7Z0JBQ0QsTUFBTTthQUNUO1lBQ0QsS0FBSyxTQUFTLENBQUMsQ0FBQztnQkFDWixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtvQkFDWixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDeEM7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUN4QztnQkFDRCxNQUFNO2FBQ1Q7WUFDRCxLQUFLLFdBQVcsQ0FBQyxDQUFDO2dCQUNkLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO29CQUNaLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUN4QztxQkFBTTtvQkFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3hDO2dCQUNELE1BQU07YUFDVDtZQUNELEtBQUssS0FBSyxDQUFDLENBQUM7Z0JBQ1IsSUFBSSxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO29CQUM3QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2lCQUM5QjtnQkFDRCxNQUFNO2FBQ1Q7U0FDSjtJQUNMLENBQUM7Q0FFSjs7Ozs7O0lBcEhHLHNDQUE0RDs7Ozs7SUFHNUQsNENBQThEOzs7OztJQUc5RCw4Q0FBZ0U7Ozs7O0lBR2hFLDBDQUFnRTs7Ozs7SUFHaEUsOENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmREYXRlIH0gZnJvbSAnLi9tb2RlbHMvZmQtZGF0ZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhclNlcnZpY2Uge1xuXG4gICAgLyoqIEV2ZW50IHRocm93biwgd2hlbiB0aGUgZWxlbWVudCBpcyBzZWxlY3RlZCBieSBzcGFjZSBvciBlbnRlciBrZXlzICovXG4gICAgcHVibGljIG9uS2V5U2VsZWN0OiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG5cbiAgICAvKiogRXZlbnQgdGhyb3duLCB3aGVuIHRoZSBmb2N1cyBnb2VzIGFmdGVyIGxpc3Qgb2YgZWxlbWVudHMgKi9cbiAgICBwdWJsaWMgb25MaXN0RW5kQXBwcm9hY2g6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqIEV2ZW50IHRocm93biwgd2hlbiB0aGUgZm9jdXMgZ29lcyBiZWZvcmUgbGlzdCBvZiBlbGVtZW50cyAqL1xuICAgIHB1YmxpYyBvbkxpc3RTdGFydEFwcHJvYWNoOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBFdmVudCB0aHJvd24sIHdoZW4gdGhlIGZvY3VzIGlzIGNoYW5nZWQuICovXG4gICAgcHVibGljIG9uRm9jdXNJZENoYW5nZTogU3ViamVjdDxudW1iZXI+ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGZvY3VzIHdvdWxkIGVzY2FwZSB0aGUgZWxlbWVudC4gKi9cbiAgICBmb2N1c0VzY2FwZUZ1bmN0aW9uOiBGdW5jdGlvbjtcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0aGF0IHByb3ZpZGVzLCBhbW91bnQgb2YgZGF5IGRlcGVuZGluZyBvbiBtb250aCBhbmQgeWVhciBwYXNzZWRcbiAgICAgKiBAcGFyYW0gbW9udGggd2hpY2ggaXMgbnVtYmVyIDEtMTJcbiAgICAgKiBAcGFyYW0geWVhciB3aGljaCBpcyBudW1iZXJcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0RGF5c0luTW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCBpc0xlYXBZZWFyID0gKF95ZWFyOiBudW1iZXIpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgIGlmIChfeWVhciAlIDQgIT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKF95ZWFyICUgNDAwID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBfeWVhciAlIDEwMCAhPT0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobW9udGggPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBpc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyODtcbiAgICAgICAgfSBlbHNlIGlmICgobW9udGggJSAyID09PSAwICYmIG1vbnRoIDwgOCkgfHwgKG1vbnRoICUgMiA9PT0gMSAmJiBtb250aCA+IDgpKSB7XG4gICAgICAgICAgICByZXR1cm4gMzA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMzE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCBjaGVjayBlcXVhbGl0eSBvZiAyIGRhdGVzLlxuICAgICAqL1xuICAgIHN0YXRpYyBkYXRlc0VxdWFsKGRhdGUxOiBGZERhdGUsIGRhdGUyOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFkYXRlMSB8fCAhZGF0ZTIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlMS50b0RhdGVTdHJpbmcoKSA9PT0gZGF0ZTIudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCBoYW5kbGVzIGtleWRvd24gZXZlbnRzLCBkZWRpY2F0ZWQgZm9yIE1vbnRoIGFuZCBZZWFyIHZpZXdzLCB3aGljaCBoYXZlIGEgbGlzdCB3aXRoIDEyIGVsZW1lbnRzLlxuICAgICAqIFRyaWdnZXJzIHRoZSBldmVudHMsIHdoZW4gdGhlIGZvY3VzIGFwcHJvYWNoZXMgc3RhcnQgYW5kIGVuZCBvZiBsaXN0LiBPciB3aGVuIHRoZXJlIGlzIGJhc2ljIGNoYW5nZSBvZiBmb2N1cy5cbiAgICAgKiBUcmlnZ2VycyBhbHNvIGV2ZW50LCB3aGVuIHRoZSBlbGVtZW50IGlzIHNlbGVjdGVkIGJ5IGVudGVyIGtleSwgb3Igc3BhY2UgYmFyLlxuICAgICAqIEBwYXJhbSBldmVudCBLZXlib2FyZEV2ZW50XG4gICAgICogQHBhcmFtIGluZGV4IHdoaWNoIGlzIG51bWJlciAoMCAtIDExKVxuICAgICAqL1xuICAgIHB1YmxpYyBvbktleWRvd25IYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uS2V5U2VsZWN0Lm5leHQoaW5kZXgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0Jzoge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25MaXN0U3RhcnRBcHByb2FjaC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Gb2N1c0lkQ2hhbmdlLm5leHQoMTEpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkZvY3VzSWRDaGFuZ2UubmV4dChpbmRleCAtIDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxpc3RFbmRBcHByb2FjaC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Gb2N1c0lkQ2hhbmdlLm5leHQoMClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRm9jdXNJZENoYW5nZS5uZXh0KGluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzoge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDw9IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxpc3RTdGFydEFwcHJvYWNoLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkZvY3VzSWRDaGFuZ2UubmV4dChpbmRleCArIDgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Gb2N1c0lkQ2hhbmdlLm5leHQoaW5kZXggLSA0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gOCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTGlzdEVuZEFwcHJvYWNoLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkZvY3VzSWRDaGFuZ2UubmV4dChpbmRleCAtIDgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Gb2N1c0lkQ2hhbmdlLm5leHQoaW5kZXggKyA0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdUYWInOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNFc2NhcGVGdW5jdGlvbiAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c0VzY2FwZUZ1bmN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=