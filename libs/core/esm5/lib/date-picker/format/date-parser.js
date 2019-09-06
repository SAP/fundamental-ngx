/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var DateFormatParser = /** @class */ (function () {
    function DateFormatParser() {
        /**
         * Delimiter for the range. This should not show up in the string representation of the dates.
         */
        this.rangeDelimiter = ' - ';
    }
    DateFormatParser.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                    useFactory: DATE_FORMAT_FACTORY
                },] }
    ];
    /** @nocollapse */ DateFormatParser.ngInjectableDef = i0.defineInjectable({ factory: DATE_FORMAT_FACTORY, token: DateFormatParser, providedIn: "root" });
    return DateFormatParser;
}());
export { DateFormatParser };
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
var DateFormatParserDefault = /** @class */ (function (_super) {
    tslib_1.__extends(DateFormatParserDefault, _super);
    function DateFormatParserDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Takes in a string value and return a FdDate model object.
     * @param value String to concert to a FdDate model object.
     */
    /**
     * Takes in a string value and return a FdDate model object.
     * @param {?} value String to concert to a FdDate model object.
     * @return {?}
     */
    DateFormatParserDefault.prototype.parse = /**
     * Takes in a string value and return a FdDate model object.
     * @param {?} value String to concert to a FdDate model object.
     * @return {?}
     */
    function (value) {
        if (value) {
            /** @type {?} */
            var str = value.toString().split('/').map(Number);
            return new FdDate(str[2], str[0], str[1]);
        }
        else {
            return new FdDate(null, null, null);
        }
    };
    /**
     * Takes in a FdDate model object and return a string representation.
     * @param date FdDate to format to string value.
     */
    /**
     * Takes in a FdDate model object and return a string representation.
     * @param {?} date FdDate to format to string value.
     * @return {?}
     */
    DateFormatParserDefault.prototype.format = /**
     * Takes in a FdDate model object and return a string representation.
     * @param {?} date FdDate to format to string value.
     * @return {?}
     */
    function (date) {
        return date.month + '/' + date.day + '/' + date.year;
    };
    DateFormatParserDefault.decorators = [
        { type: Injectable }
    ];
    return DateFormatParserDefault;
}(DateFormatParser));
export { DateFormatParserDefault };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1wYXJzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS1waWNrZXIvZm9ybWF0L2RhdGUtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7O0FBRXZELE1BQU0sVUFBVSxtQkFBbUI7SUFDL0IsT0FBTyxJQUFJLHVCQUF1QixFQUFFLENBQUM7QUFDekMsQ0FBQzs7Ozs7QUFLRDtJQUFBOzs7O1FBU0ksbUJBQWMsR0FBVyxLQUFLLENBQUM7S0FhbEM7O2dCQXRCQSxVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxtQkFBbUI7aUJBQ2xDOzs7MkJBYkQ7Q0FnQ0MsQUF0QkQsSUFzQkM7U0FsQnFCLGdCQUFnQjs7Ozs7O0lBS2xDLDBDQUErQjs7Ozs7OztJQU0vQix3REFBc0M7Ozs7Ozs7SUFNdEMsd0RBQXNDOzs7OztBQU0xQztJQUM2QyxtREFBZ0I7SUFEN0Q7O0lBdUJBLENBQUM7SUFwQkc7OztPQUdHOzs7Ozs7SUFDSSx1Q0FBSzs7Ozs7SUFBWixVQUFhLEtBQWE7UUFDdEIsSUFBSSxLQUFLLEVBQUU7O2dCQUNELEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDbkQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO2FBQU07WUFDSCxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSSx3Q0FBTTs7Ozs7SUFBYixVQUFjLElBQVk7UUFDdEIsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3pELENBQUM7O2dCQXRCSixVQUFVOztJQXVCWCw4QkFBQztDQUFBLEFBdkJELENBQzZDLGdCQUFnQixHQXNCNUQ7U0F0QlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmREYXRlIH0gZnJvbSAnLi4vLi4vY2FsZW5kYXIvbW9kZWxzL2ZkLWRhdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gREFURV9GT1JNQVRfRkFDVE9SWSgpIHtcbiAgICByZXR1cm4gbmV3IERhdGVGb3JtYXRQYXJzZXJEZWZhdWx0KCk7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3Mgd2hpY2ggZGVmaW5lcyB0aGUgYmVoYXZpb3VyIG9mIHRoZSBkYXRlIGZvcm1hdCBhbmQgcGFyc2VyLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgIHVzZUZhY3Rvcnk6IERBVEVfRk9STUFUX0ZBQ1RPUllcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0ZUZvcm1hdFBhcnNlciB7XG5cbiAgICAvKipcbiAgICAgKiBEZWxpbWl0ZXIgZm9yIHRoZSByYW5nZS4gVGhpcyBzaG91bGQgbm90IHNob3cgdXAgaW4gdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0ZXMuXG4gICAgICovXG4gICAgcmFuZ2VEZWxpbWl0ZXI6IHN0cmluZyA9ICcgLSAnO1xuXG4gICAgLyoqXG4gICAgICogU2hvdWxkIHRha2UgaW4gYSBzdHJpbmcgdmFsdWUgYW5kIHJldHVybiBhIEZkRGF0ZSBtb2RlbCBvYmplY3QuXG4gICAgICogQHBhcmFtIHZhbHVlIFN0cmluZyB0byBjb25jZXJ0IHRvIGEgRmREYXRlIG1vZGVsIG9iamVjdC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBwYXJzZSh2YWx1ZTogc3RyaW5nKTogRmREYXRlO1xuXG4gICAgLyoqXG4gICAgICogU2hvdWxkIHRha2UgaW4gYSBGZERhdGUgbW9kZWwgb2JqZWN0IGFuZCByZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICogQHBhcmFtIGRhdGUgRmREYXRlIHRvIGZvcm1hdCB0byBzdHJpbmcgdmFsdWUuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZm9ybWF0KGRhdGU6IEZkRGF0ZSk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBEYXRlRm9ybWF0UGFyc2VyIHNlcnZpY2UuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlRm9ybWF0UGFyc2VyRGVmYXVsdCBleHRlbmRzIERhdGVGb3JtYXRQYXJzZXIge1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgaW4gYSBzdHJpbmcgdmFsdWUgYW5kIHJldHVybiBhIEZkRGF0ZSBtb2RlbCBvYmplY3QuXG4gICAgICogQHBhcmFtIHZhbHVlIFN0cmluZyB0byBjb25jZXJ0IHRvIGEgRmREYXRlIG1vZGVsIG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgcGFyc2UodmFsdWU6IHN0cmluZyk6IEZkRGF0ZSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RyID0gdmFsdWUudG9TdHJpbmcoKS5zcGxpdCgnLycpLm1hcChOdW1iZXIpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGZERhdGUoc3RyWzJdLCBzdHJbMF0sIHN0clsxXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZkRGF0ZShudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRha2VzIGluIGEgRmREYXRlIG1vZGVsIG9iamVjdCBhbmQgcmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqIEBwYXJhbSBkYXRlIEZkRGF0ZSB0byBmb3JtYXQgdG8gc3RyaW5nIHZhbHVlLlxuICAgICAqL1xuICAgIHB1YmxpYyBmb3JtYXQoZGF0ZTogRmREYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRhdGUubW9udGggKyAnLycgKyBkYXRlLmRheSArICcvJyArIGRhdGUueWVhcjtcbiAgICB9XG59XG4iXX0=