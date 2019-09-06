/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FdDate } from '../../calendar/models/fd-date';
import * as i0 from "@angular/core";
/**
 * @return {?}
 */
export function DATE_FORMAT_FACTORY() {
    return new DateFormatParserDefault();
}
/**
 * Abstract class which defines the behaviour of the date format and parser.
 * @abstract
 */
export class DateFormatParser {
    constructor() {
        /**
         * Delimiter for the range. This should not show up in the string representation of the dates.
         */
        this.rangeDelimiter = ' - ';
    }
}
DateFormatParser.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
                useFactory: DATE_FORMAT_FACTORY
            },] }
];
/** @nocollapse */ DateFormatParser.ngInjectableDef = i0.defineInjectable({ factory: DATE_FORMAT_FACTORY, token: DateFormatParser, providedIn: "root" });
if (false) {
    /**
     * Delimiter for the range. This should not show up in the string representation of the dates.
     * @type {?}
     */
    DateFormatParser.prototype.rangeDelimiter;
    /**
     * Should take in a string value and return a FdDate model object.
     * @abstract
     * @param {?} value String to concert to a FdDate model object.
     * @return {?}
     */
    DateFormatParser.prototype.parse = function (value) { };
    /**
     * Should take in a FdDate model object and return a string representation.
     * @abstract
     * @param {?} date FdDate to format to string value.
     * @return {?}
     */
    DateFormatParser.prototype.format = function (date) { };
}
/**
 * Default implementation of the DateFormatParser service.
 */
export class DateFormatParserDefault extends DateFormatParser {
    /**
     * Takes in a string value and return a FdDate model object.
     * @param {?} value String to concert to a FdDate model object.
     * @return {?}
     */
    parse(value) {
        if (value) {
            /** @type {?} */
            const str = value.toString().split('/').map(Number);
            return new FdDate(str[2], str[0], str[1]);
        }
        else {
            return new FdDate(null, null, null);
        }
    }
    /**
     * Takes in a FdDate model object and return a string representation.
     * @param {?} date FdDate to format to string value.
     * @return {?}
     */
    format(date) {
        return date.month + '/' + date.day + '/' + date.year;
    }
}
DateFormatParserDefault.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1wYXJzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS1waWNrZXIvZm9ybWF0L2RhdGUtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7QUFFdkQsTUFBTSxVQUFVLG1CQUFtQjtJQUMvQixPQUFPLElBQUksdUJBQXVCLEVBQUUsQ0FBQztBQUN6QyxDQUFDOzs7OztBQVNELE1BQU0sT0FBZ0IsZ0JBQWdCO0lBSnRDOzs7O1FBU0ksbUJBQWMsR0FBVyxLQUFLLENBQUM7S0FhbEM7OztZQXRCQSxVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLFVBQVUsRUFBRSxtQkFBbUI7YUFDbEM7Ozs7Ozs7O0lBTUcsMENBQStCOzs7Ozs7O0lBTS9CLHdEQUFzQzs7Ozs7OztJQU10Qyx3REFBc0M7Ozs7O0FBTzFDLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxnQkFBZ0I7Ozs7OztJQU1sRCxLQUFLLENBQUMsS0FBYTtRQUN0QixJQUFJLEtBQUssRUFBRTs7a0JBQ0QsR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUNuRCxPQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7YUFBTTtZQUNILE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7Ozs7OztJQU1NLE1BQU0sQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN6RCxDQUFDOzs7WUF0QkosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZkRGF0ZSB9IGZyb20gJy4uLy4uL2NhbGVuZGFyL21vZGVscy9mZC1kYXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uIERBVEVfRk9STUFUX0ZBQ1RPUlkoKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlRm9ybWF0UGFyc2VyRGVmYXVsdCgpO1xufVxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHdoaWNoIGRlZmluZXMgdGhlIGJlaGF2aW91ciBvZiB0aGUgZGF0ZSBmb3JtYXQgYW5kIHBhcnNlci5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICB1c2VGYWN0b3J5OiBEQVRFX0ZPUk1BVF9GQUNUT1JZXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGVGb3JtYXRQYXJzZXIge1xuXG4gICAgLyoqXG4gICAgICogRGVsaW1pdGVyIGZvciB0aGUgcmFuZ2UuIFRoaXMgc2hvdWxkIG5vdCBzaG93IHVwIGluIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGVzLlxuICAgICAqL1xuICAgIHJhbmdlRGVsaW1pdGVyOiBzdHJpbmcgPSAnIC0gJztcblxuICAgIC8qKlxuICAgICAqIFNob3VsZCB0YWtlIGluIGEgc3RyaW5nIHZhbHVlIGFuZCByZXR1cm4gYSBGZERhdGUgbW9kZWwgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB2YWx1ZSBTdHJpbmcgdG8gY29uY2VydCB0byBhIEZkRGF0ZSBtb2RlbCBvYmplY3QuXG4gICAgICovXG4gICAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IHN0cmluZyk6IEZkRGF0ZTtcblxuICAgIC8qKlxuICAgICAqIFNob3VsZCB0YWtlIGluIGEgRmREYXRlIG1vZGVsIG9iamVjdCBhbmQgcmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqIEBwYXJhbSBkYXRlIEZkRGF0ZSB0byBmb3JtYXQgdG8gc3RyaW5nIHZhbHVlLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGZvcm1hdChkYXRlOiBGZERhdGUpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgRGF0ZUZvcm1hdFBhcnNlciBzZXJ2aWNlLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0ZUZvcm1hdFBhcnNlckRlZmF1bHQgZXh0ZW5kcyBEYXRlRm9ybWF0UGFyc2VyIHtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIGluIGEgc3RyaW5nIHZhbHVlIGFuZCByZXR1cm4gYSBGZERhdGUgbW9kZWwgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB2YWx1ZSBTdHJpbmcgdG8gY29uY2VydCB0byBhIEZkRGF0ZSBtb2RlbCBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIHBhcnNlKHZhbHVlOiBzdHJpbmcpOiBGZERhdGUge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0ciA9IHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJy8nKS5tYXAoTnVtYmVyKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmREYXRlKHN0clsyXSwgc3RyWzBdLCBzdHJbMV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGZERhdGUobnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBpbiBhIEZkRGF0ZSBtb2RlbCBvYmplY3QgYW5kIHJldHVybiBhIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKiBAcGFyYW0gZGF0ZSBGZERhdGUgdG8gZm9ybWF0IHRvIHN0cmluZyB2YWx1ZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZm9ybWF0KGRhdGU6IEZkRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkYXRlLm1vbnRoICsgJy8nICsgZGF0ZS5kYXkgKyAnLycgKyBkYXRlLnllYXI7XG4gICAgfVxufVxuIl19