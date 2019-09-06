/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FdDatetime } from '../models/fd-datetime';
import { FdDate } from '../../calendar/models/fd-date';
import * as i0 from "@angular/core";
/**
 * @return {?}
 */
export function DATE_TIME_FORMAT_FACTORY() {
    return new DateTimeFormatParserDefault();
}
/**
 * Abstract class which defines the behaviour of the datetime format and parser.
 * @abstract
 */
var DateTimeFormatParser = /** @class */ (function () {
    function DateTimeFormatParser() {
    }
    DateTimeFormatParser.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                    useFactory: DATE_TIME_FORMAT_FACTORY
                },] }
    ];
    /** @nocollapse */ DateTimeFormatParser.ngInjectableDef = i0.defineInjectable({ factory: DATE_TIME_FORMAT_FACTORY, token: DateTimeFormatParser, providedIn: "root" });
    return DateTimeFormatParser;
}());
export { DateTimeFormatParser };
if (false) {
    /**
     * Should take in a string value and return a FdDatetime model object.
     * @abstract
     * @param {?} value String to concert to a FdDatetime model object.
     * @return {?}
     */
    DateTimeFormatParser.prototype.parse = function (value) { };
    /**
     * Should take in a FdDatetime model object and return a string representation.
     * @abstract
     * @param {?} date FdDatetime object to concert to a date string.
     * @return {?}
     */
    DateTimeFormatParser.prototype.format = function (date) { };
}
/**
 * Default implementation of the DateFormatParser service.
 */
var DateTimeFormatParserDefault = /** @class */ (function (_super) {
    tslib_1.__extends(DateTimeFormatParserDefault, _super);
    function DateTimeFormatParserDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Takes in a string representation of a date and returns a FdDatetime object.
     * @param value String to convert to a FdDatetime model object.
     */
    /**
     * Takes in a string representation of a date and returns a FdDatetime object.
     * @param {?} value String to convert to a FdDatetime model object.
     * @return {?}
     */
    DateTimeFormatParserDefault.prototype.parse = /**
     * Takes in a string representation of a date and returns a FdDatetime object.
     * @param {?} value String to convert to a FdDatetime model object.
     * @return {?}
     */
    function (value) {
        if (!value) {
            return FdDatetime.getToday();
        }
        else {
            /** @type {?} */
            var time = void 0;
            /** @type {?} */
            var date = void 0;
            /** @type {?} */
            var dateStr = value.split(',')[0];
            if (dateStr) {
                /** @type {?} */
                var dateSplitStr = dateStr.split('.').map(Number);
                date = new FdDate(dateSplitStr[2], dateSplitStr[1], dateSplitStr[0]);
            }
            /** @type {?} */
            var timeStr = value.split(',')[1];
            if (timeStr) {
                /** @type {?} */
                var timeSplitStr = timeStr.split(':').map(Number);
                time = { hour: timeSplitStr[0], minute: timeSplitStr[1], second: timeSplitStr[2] };
            }
            if (date) {
                return new FdDatetime(date, time);
            }
        }
    };
    /**
     * Takes in a FdDatetime object and returns the string representation.
     * @param date FdDatetime model object to convert to a string.
     */
    /**
     * Takes in a FdDatetime object and returns the string representation.
     * @param {?} date FdDatetime model object to convert to a string.
     * @return {?}
     */
    DateTimeFormatParserDefault.prototype.format = /**
     * Takes in a FdDatetime object and returns the string representation.
     * @param {?} date FdDatetime model object to convert to a string.
     * @return {?}
     */
    function (date) {
        return date.day + '.' +
            date.month + '.' +
            date.year + ', ' +
            date.hour + ':' +
            date.minute + ':' +
            date.second;
    };
    DateTimeFormatParserDefault.decorators = [
        { type: Injectable }
    ];
    return DateTimeFormatParserDefault;
}(DateTimeFormatParser));
export { DateTimeFormatParserDefault };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWUtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RhdGV0aW1lLXBpY2tlci9mb3JtYXQvZGF0ZXRpbWUtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7OztBQUd2RCxNQUFNLFVBQVUsd0JBQXdCO0lBQ3BDLE9BQU8sSUFBSSwyQkFBMkIsRUFBRSxDQUFDO0FBQzdDLENBQUM7Ozs7O0FBS0Q7SUFBQTtLQWlCQzs7Z0JBakJBLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLHdCQUF3QjtpQkFDdkM7OzsrQkFmRDtDQTZCQyxBQWpCRCxJQWlCQztTQWJxQixvQkFBb0I7Ozs7Ozs7O0lBTXRDLDREQUEwQzs7Ozs7OztJQU0xQyw0REFBMEM7Ozs7O0FBTTlDO0lBQ2lELHVEQUFvQjtJQURyRTs7SUEwQ0EsQ0FBQztJQXZDRzs7O09BR0c7Ozs7OztJQUNJLDJDQUFLOzs7OztJQUFaLFVBQWEsS0FBYTtRQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsT0FBTyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDaEM7YUFBTTs7Z0JBQ0MsSUFBSSxTQUFZOztnQkFDaEIsSUFBSSxTQUFROztnQkFDVixPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxPQUFPLEVBQUU7O29CQUNILFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ25ELElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hFOztnQkFDSyxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxPQUFPLEVBQUU7O29CQUNILFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ25ELElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDdEY7WUFDRCxJQUFJLElBQUksRUFBRTtnQkFDTixPQUFPLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyQztTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0ksNENBQU07Ozs7O0lBQWIsVUFBYyxJQUFnQjtRQUMxQixPQUFPLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRztZQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUc7WUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJO1lBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRztZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRztZQUNqQixJQUFJLENBQUMsTUFBTSxDQUNkO0lBQ0wsQ0FBQzs7Z0JBekNKLFVBQVU7O0lBMENYLGtDQUFDO0NBQUEsQUExQ0QsQ0FDaUQsb0JBQW9CLEdBeUNwRTtTQXpDWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGZERhdGV0aW1lIH0gZnJvbSAnLi4vbW9kZWxzL2ZkLWRhdGV0aW1lJztcbmltcG9ydCB7IEZkRGF0ZSB9IGZyb20gJy4uLy4uL2NhbGVuZGFyL21vZGVscy9mZC1kYXRlJztcbmltcG9ydCB7IFRpbWVPYmplY3QgfSBmcm9tICcuLi8uLi90aW1lL3RpbWUtb2JqZWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIERBVEVfVElNRV9GT1JNQVRfRkFDVE9SWSgpIHtcbiAgICByZXR1cm4gbmV3IERhdGVUaW1lRm9ybWF0UGFyc2VyRGVmYXVsdCgpO1xufVxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHdoaWNoIGRlZmluZXMgdGhlIGJlaGF2aW91ciBvZiB0aGUgZGF0ZXRpbWUgZm9ybWF0IGFuZCBwYXJzZXIuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgdXNlRmFjdG9yeTogREFURV9USU1FX0ZPUk1BVF9GQUNUT1JZXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGVUaW1lRm9ybWF0UGFyc2VyIHtcblxuICAgIC8qKlxuICAgICAqIFNob3VsZCB0YWtlIGluIGEgc3RyaW5nIHZhbHVlIGFuZCByZXR1cm4gYSBGZERhdGV0aW1lIG1vZGVsIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdmFsdWUgU3RyaW5nIHRvIGNvbmNlcnQgdG8gYSBGZERhdGV0aW1lIG1vZGVsIG9iamVjdC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBwYXJzZSh2YWx1ZTogc3RyaW5nKTogRmREYXRldGltZTtcblxuICAgIC8qKlxuICAgICAqIFNob3VsZCB0YWtlIGluIGEgRmREYXRldGltZSBtb2RlbCBvYmplY3QgYW5kIHJldHVybiBhIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKiBAcGFyYW0gZGF0ZSBGZERhdGV0aW1lIG9iamVjdCB0byBjb25jZXJ0IHRvIGEgZGF0ZSBzdHJpbmcuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZm9ybWF0KGRhdGU6IEZkRGF0ZXRpbWUpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgRGF0ZUZvcm1hdFBhcnNlciBzZXJ2aWNlLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVGb3JtYXRQYXJzZXJEZWZhdWx0IGV4dGVuZHMgRGF0ZVRpbWVGb3JtYXRQYXJzZXIge1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgaW4gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBkYXRlIGFuZCByZXR1cm5zIGEgRmREYXRldGltZSBvYmplY3QuXG4gICAgICogQHBhcmFtIHZhbHVlIFN0cmluZyB0byBjb252ZXJ0IHRvIGEgRmREYXRldGltZSBtb2RlbCBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIHBhcnNlKHZhbHVlOiBzdHJpbmcpOiBGZERhdGV0aW1lIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIEZkRGF0ZXRpbWUuZ2V0VG9kYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0aW1lOiBUaW1lT2JqZWN0O1xuICAgICAgICAgICAgbGV0IGRhdGU6IEZkRGF0ZTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVTdHIgPSB2YWx1ZS5zcGxpdCgnLCcpWzBdO1xuICAgICAgICAgICAgaWYgKGRhdGVTdHIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3BsaXRTdHIgPSBkYXRlU3RyLnNwbGl0KCcuJykubWFwKE51bWJlcik7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBGZERhdGUoZGF0ZVNwbGl0U3RyWzJdLCBkYXRlU3BsaXRTdHJbMV0sIGRhdGVTcGxpdFN0clswXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0aW1lU3RyID0gdmFsdWUuc3BsaXQoJywnKVsxXTtcbiAgICAgICAgICAgIGlmICh0aW1lU3RyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZVNwbGl0U3RyID0gdGltZVN0ci5zcGxpdCgnOicpLm1hcChOdW1iZXIpO1xuICAgICAgICAgICAgICAgIHRpbWUgPSB7IGhvdXI6IHRpbWVTcGxpdFN0clswXSwgbWludXRlOiB0aW1lU3BsaXRTdHJbMV0sIHNlY29uZDogdGltZVNwbGl0U3RyWzJdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRmREYXRldGltZShkYXRlLCB0aW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRha2VzIGluIGEgRmREYXRldGltZSBvYmplY3QgYW5kIHJldHVybnMgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKiBAcGFyYW0gZGF0ZSBGZERhdGV0aW1lIG1vZGVsIG9iamVjdCB0byBjb252ZXJ0IHRvIGEgc3RyaW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBmb3JtYXQoZGF0ZTogRmREYXRldGltZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkYXRlLmRheSArICcuJyArXG4gICAgICAgICAgICBkYXRlLm1vbnRoICsgJy4nICtcbiAgICAgICAgICAgIGRhdGUueWVhciArICcsICcgK1xuICAgICAgICAgICAgZGF0ZS5ob3VyICsgJzonICtcbiAgICAgICAgICAgIGRhdGUubWludXRlICsgJzonICtcbiAgICAgICAgICAgIGRhdGUuc2Vjb25kXG4gICAgICAgIDtcbiAgICB9XG59XG4iXX0=