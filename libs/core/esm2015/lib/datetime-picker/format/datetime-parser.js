/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class DateTimeFormatParser {
}
DateTimeFormatParser.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
                useFactory: DATE_TIME_FORMAT_FACTORY
            },] }
];
/** @nocollapse */ DateTimeFormatParser.ngInjectableDef = i0.defineInjectable({ factory: DATE_TIME_FORMAT_FACTORY, token: DateTimeFormatParser, providedIn: "root" });
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
export class DateTimeFormatParserDefault extends DateTimeFormatParser {
    /**
     * Takes in a string representation of a date and returns a FdDatetime object.
     * @param {?} value String to convert to a FdDatetime model object.
     * @return {?}
     */
    parse(value) {
        if (!value) {
            return FdDatetime.getToday();
        }
        else {
            /** @type {?} */
            let time;
            /** @type {?} */
            let date;
            /** @type {?} */
            const dateStr = value.split(',')[0];
            if (dateStr) {
                /** @type {?} */
                const dateSplitStr = dateStr.split('.').map(Number);
                date = new FdDate(dateSplitStr[2], dateSplitStr[1], dateSplitStr[0]);
            }
            /** @type {?} */
            const timeStr = value.split(',')[1];
            if (timeStr) {
                /** @type {?} */
                const timeSplitStr = timeStr.split(':').map(Number);
                time = { hour: timeSplitStr[0], minute: timeSplitStr[1], second: timeSplitStr[2] };
            }
            if (date) {
                return new FdDatetime(date, time);
            }
        }
    }
    /**
     * Takes in a FdDatetime object and returns the string representation.
     * @param {?} date FdDatetime model object to convert to a string.
     * @return {?}
     */
    format(date) {
        return date.day + '.' +
            date.month + '.' +
            date.year + ', ' +
            date.hour + ':' +
            date.minute + ':' +
            date.second;
    }
}
DateTimeFormatParserDefault.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWUtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RhdGV0aW1lLXBpY2tlci9mb3JtYXQvZGF0ZXRpbWUtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7O0FBR3ZELE1BQU0sVUFBVSx3QkFBd0I7SUFDcEMsT0FBTyxJQUFJLDJCQUEyQixFQUFFLENBQUM7QUFDN0MsQ0FBQzs7Ozs7QUFTRCxNQUFNLE9BQWdCLG9CQUFvQjs7O1lBSnpDLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsVUFBVSxFQUFFLHdCQUF3QjthQUN2Qzs7Ozs7Ozs7OztJQU9HLDREQUEwQzs7Ozs7OztJQU0xQyw0REFBMEM7Ozs7O0FBTzlDLE1BQU0sT0FBTywyQkFBNEIsU0FBUSxvQkFBb0I7Ozs7OztJQU0xRCxLQUFLLENBQUMsS0FBYTtRQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsT0FBTyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDaEM7YUFBTTs7Z0JBQ0MsSUFBZ0I7O2dCQUNoQixJQUFZOztrQkFDVixPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxPQUFPLEVBQUU7O3NCQUNILFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ25ELElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hFOztrQkFDSyxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxPQUFPLEVBQUU7O3NCQUNILFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ25ELElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDdEY7WUFDRCxJQUFJLElBQUksRUFBRTtnQkFDTixPQUFPLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyQztTQUNKO0lBQ0wsQ0FBQzs7Ozs7O0lBTU0sTUFBTSxDQUFDLElBQWdCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRztZQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUk7WUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHO1lBQ2pCLElBQUksQ0FBQyxNQUFNLENBQ2Q7SUFDTCxDQUFDOzs7WUF6Q0osVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZkRGF0ZXRpbWUgfSBmcm9tICcuLi9tb2RlbHMvZmQtZGF0ZXRpbWUnO1xuaW1wb3J0IHsgRmREYXRlIH0gZnJvbSAnLi4vLi4vY2FsZW5kYXIvbW9kZWxzL2ZkLWRhdGUnO1xuaW1wb3J0IHsgVGltZU9iamVjdCB9IGZyb20gJy4uLy4uL3RpbWUvdGltZS1vYmplY3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gREFURV9USU1FX0ZPUk1BVF9GQUNUT1JZKCkge1xuICAgIHJldHVybiBuZXcgRGF0ZVRpbWVGb3JtYXRQYXJzZXJEZWZhdWx0KCk7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3Mgd2hpY2ggZGVmaW5lcyB0aGUgYmVoYXZpb3VyIG9mIHRoZSBkYXRldGltZSBmb3JtYXQgYW5kIHBhcnNlci5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICB1c2VGYWN0b3J5OiBEQVRFX1RJTUVfRk9STUFUX0ZBQ1RPUllcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0ZVRpbWVGb3JtYXRQYXJzZXIge1xuXG4gICAgLyoqXG4gICAgICogU2hvdWxkIHRha2UgaW4gYSBzdHJpbmcgdmFsdWUgYW5kIHJldHVybiBhIEZkRGF0ZXRpbWUgbW9kZWwgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB2YWx1ZSBTdHJpbmcgdG8gY29uY2VydCB0byBhIEZkRGF0ZXRpbWUgbW9kZWwgb2JqZWN0LlxuICAgICAqL1xuICAgIGFic3RyYWN0IHBhcnNlKHZhbHVlOiBzdHJpbmcpOiBGZERhdGV0aW1lO1xuXG4gICAgLyoqXG4gICAgICogU2hvdWxkIHRha2UgaW4gYSBGZERhdGV0aW1lIG1vZGVsIG9iamVjdCBhbmQgcmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqIEBwYXJhbSBkYXRlIEZkRGF0ZXRpbWUgb2JqZWN0IHRvIGNvbmNlcnQgdG8gYSBkYXRlIHN0cmluZy5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBmb3JtYXQoZGF0ZTogRmREYXRldGltZSk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBEYXRlRm9ybWF0UGFyc2VyIHNlcnZpY2UuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlVGltZUZvcm1hdFBhcnNlckRlZmF1bHQgZXh0ZW5kcyBEYXRlVGltZUZvcm1hdFBhcnNlciB7XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBpbiBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIGRhdGUgYW5kIHJldHVybnMgYSBGZERhdGV0aW1lIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdmFsdWUgU3RyaW5nIHRvIGNvbnZlcnQgdG8gYSBGZERhdGV0aW1lIG1vZGVsIG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgcGFyc2UodmFsdWU6IHN0cmluZyk6IEZkRGF0ZXRpbWUge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gRmREYXRldGltZS5nZXRUb2RheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRpbWU6IFRpbWVPYmplY3Q7XG4gICAgICAgICAgICBsZXQgZGF0ZTogRmREYXRlO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVN0ciA9IHZhbHVlLnNwbGl0KCcsJylbMF07XG4gICAgICAgICAgICBpZiAoZGF0ZVN0cikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTcGxpdFN0ciA9IGRhdGVTdHIuc3BsaXQoJy4nKS5tYXAoTnVtYmVyKTtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IEZkRGF0ZShkYXRlU3BsaXRTdHJbMl0sIGRhdGVTcGxpdFN0clsxXSwgZGF0ZVNwbGl0U3RyWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdHIgPSB2YWx1ZS5zcGxpdCgnLCcpWzFdO1xuICAgICAgICAgICAgaWYgKHRpbWVTdHIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lU3BsaXRTdHIgPSB0aW1lU3RyLnNwbGl0KCc6JykubWFwKE51bWJlcik7XG4gICAgICAgICAgICAgICAgdGltZSA9IHsgaG91cjogdGltZVNwbGl0U3RyWzBdLCBtaW51dGU6IHRpbWVTcGxpdFN0clsxXSwgc2Vjb25kOiB0aW1lU3BsaXRTdHJbMl0gfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGZERhdGV0aW1lKGRhdGUsIHRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZXMgaW4gYSBGZERhdGV0aW1lIG9iamVjdCBhbmQgcmV0dXJucyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqIEBwYXJhbSBkYXRlIEZkRGF0ZXRpbWUgbW9kZWwgb2JqZWN0IHRvIGNvbnZlcnQgdG8gYSBzdHJpbmcuXG4gICAgICovXG4gICAgcHVibGljIGZvcm1hdChkYXRlOiBGZERhdGV0aW1lKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZGF5ICsgJy4nICtcbiAgICAgICAgICAgIGRhdGUubW9udGggKyAnLicgK1xuICAgICAgICAgICAgZGF0ZS55ZWFyICsgJywgJyArXG4gICAgICAgICAgICBkYXRlLmhvdXIgKyAnOicgK1xuICAgICAgICAgICAgZGF0ZS5taW51dGUgKyAnOicgK1xuICAgICAgICAgICAgZGF0ZS5zZWNvbmRcbiAgICAgICAgO1xuICAgIH1cbn1cbiJdfQ==