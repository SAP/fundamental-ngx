/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TimeObject } from '../../time/time-object';
import * as i0 from "@angular/core";
/**
 * @return {?}
 */
export function TIME_FORMAT_FACTORY() {
    return new TimeFormatParserDefault();
}
/**
 * Abstract class which defines the behaviour of the time format and parser.
 * @abstract
 */
var TimeFormatParser = /** @class */ (function () {
    function TimeFormatParser() {
    }
    TimeFormatParser.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                    useFactory: TIME_FORMAT_FACTORY
                },] }
    ];
    /** @nocollapse */ TimeFormatParser.ngInjectableDef = i0.defineInjectable({ factory: TIME_FORMAT_FACTORY, token: TimeFormatParser, providedIn: "root" });
    return TimeFormatParser;
}());
export { TimeFormatParser };
if (false) {
    /**
     * Should take in a string value and return a Time object.
     * @abstract
     * @param {?} value String to convert to a time object.
     * @param {?} displaySeconds boolean to define if string should display seconds.
     * @param {?=} meridian boolean to define if string should be treated as a meridian.
     * @return {?}
     */
    TimeFormatParser.prototype.parse = function (value, displaySeconds, meridian) { };
    /**
     * Should take in a time object and return a string representation.
     * @abstract
     * @param {?} time TimeObject to convert to a string.
     * @param {?=} meridian boolean to define if TimeObject should be treated as a meridian.
     * @return {?}
     */
    TimeFormatParser.prototype.format = function (time, meridian) { };
}
/**
 * Default implementation of the DateFormatParser service.
 */
var TimeFormatParserDefault = /** @class */ (function (_super) {
    tslib_1.__extends(TimeFormatParserDefault, _super);
    function TimeFormatParserDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Takes in a string representation of a date and returns a Time object.
     * @param value String to convert to a time object.
     * @param meridian boolean to define if string should be treated as a meridian.
     * @param displaySeconds boolean to define if string should display seconds.
     */
    /**
     * Takes in a string representation of a date and returns a Time object.
     * @param {?} value String to convert to a time object.
     * @param {?=} displaySeconds boolean to define if string should display seconds.
     * @param {?=} meridian boolean to define if string should be treated as a meridian.
     * @return {?}
     */
    TimeFormatParserDefault.prototype.parse = /**
     * Takes in a string representation of a date and returns a Time object.
     * @param {?} value String to convert to a time object.
     * @param {?=} displaySeconds boolean to define if string should display seconds.
     * @param {?=} meridian boolean to define if string should be treated as a meridian.
     * @return {?}
     */
    function (value, displaySeconds, meridian) {
        if (displaySeconds === void 0) { displaySeconds = true; }
        /** @type {?} */
        var time = new TimeObject();
        /** @type {?} */
        var regexp;
        if (!meridian) {
            if (displaySeconds) {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])$/;
            }
            else {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
            }
            if (regexp.test(value)) {
                /** @type {?} */
                var splitString = value.split(':');
                time.hour = parseInt(splitString[0], 10);
                time.minute = parseInt(splitString[1], 10);
                if (displaySeconds) {
                    time.second = parseInt(splitString[2], 10);
                }
                return time;
            }
            else {
                return null;
            }
        }
        else if (meridian) {
            if (displaySeconds) {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9]) [APap][mM]$/;
            }
            else {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]) [APap][mM]$/;
            }
            if (regexp.test(value)) {
                /** @type {?} */
                var period = value.split(' ')[1];
                /** @type {?} */
                var splitString = value.split(':');
                time.hour = parseInt(splitString[0], 10);
                if ((period === 'pm' || period === 'PM') && time.hour < 12) {
                    time.hour = time.hour + 12;
                }
                else if ((period === 'am' || period === 'AM') && time.hour === 12) {
                    time.hour = 0;
                }
                time.minute = parseInt(splitString[1], 10);
                if (displaySeconds) {
                    time.second = parseInt(splitString[2], 10);
                }
                return time;
            }
            else {
                return null;
            }
        }
    };
    /**
     * Takes in a time object and returns the string representation.
     * @param time TimeObject to convert to a string.
     * @param meridian boolean to define if TimeObject should be treated as a meridian.
     */
    /**
     * Takes in a time object and returns the string representation.
     * @param {?} time TimeObject to convert to a string.
     * @param {?=} meridian boolean to define if TimeObject should be treated as a meridian.
     * @return {?}
     */
    TimeFormatParserDefault.prototype.format = /**
     * Takes in a time object and returns the string representation.
     * @param {?} time TimeObject to convert to a string.
     * @param {?=} meridian boolean to define if TimeObject should be treated as a meridian.
     * @return {?}
     */
    function (time, meridian) {
        /** @type {?} */
        var formattedHour;
        /** @type {?} */
        var formattedMinute;
        /** @type {?} */
        var formattedSecond;
        /** @type {?} */
        var formattedTime;
        /** @type {?} */
        var formattedMeridian;
        if (time.hour !== null) {
            if (meridian) {
                if (time.hour === 0) {
                    formattedHour = 12;
                    formattedMeridian = 'am';
                }
                else if (time.hour > 12) {
                    formattedHour = time.hour - 12;
                    formattedMeridian = 'pm';
                }
                else if (time.hour === 12) {
                    formattedHour = 12;
                    formattedMeridian = 'pm';
                }
                else {
                    formattedHour = time.hour;
                    formattedMeridian = 'am';
                }
            }
            else {
                formattedHour = time.hour;
            }
        }
        if (time.minute !== null) {
            formattedMinute = time.minute < 10 ? '0' + time.minute : time.minute;
        }
        if (time.second !== null) {
            formattedSecond = time.second < 10 ? '0' + time.second : time.second;
        }
        if (formattedHour || formattedHour === 0) {
            formattedTime = formattedHour;
            if (formattedMinute || formattedMinute === '00') {
                formattedTime = formattedTime + ':' + formattedMinute;
                if (formattedSecond || formattedSecond === '00') {
                    formattedTime = formattedTime + ':' + formattedSecond;
                }
            }
        }
        if (formattedMeridian && formattedTime) {
            formattedTime += ' ' + formattedMeridian;
        }
        return formattedTime;
    };
    TimeFormatParserDefault.decorators = [
        { type: Injectable }
    ];
    return TimeFormatParserDefault;
}(TimeFormatParser));
export { TimeFormatParserDefault };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wYXJzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGltZS1waWNrZXIvZm9ybWF0L3RpbWUtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBRXBELE1BQU0sVUFBVSxtQkFBbUI7SUFDL0IsT0FBTyxJQUFJLHVCQUF1QixFQUFFLENBQUM7QUFDekMsQ0FBQzs7Ozs7QUFLRDtJQUFBO0tBb0JDOztnQkFwQkEsVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsbUJBQW1CO2lCQUNsQzs7OzJCQWJEO0NBOEJDLEFBcEJELElBb0JDO1NBaEJxQixnQkFBZ0I7Ozs7Ozs7Ozs7SUFRbEMsa0ZBQXVGOzs7Ozs7OztJQU92RixrRUFBOEQ7Ozs7O0FBTWxFO0lBQzZDLG1EQUFnQjtJQUQ3RDs7SUEwR0EsQ0FBQztJQXZHRzs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSSx1Q0FBSzs7Ozs7OztJQUFaLFVBQWEsS0FBYSxFQUFFLGNBQThCLEVBQUUsUUFBa0I7UUFBbEQsK0JBQUEsRUFBQSxxQkFBOEI7O1lBQ2hELElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRTs7WUFDekIsTUFBTTtRQUNWLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxJQUFJLGNBQWMsRUFBRTtnQkFDaEIsTUFBTSxHQUFHLGtEQUFrRCxDQUFDO2FBQy9EO2lCQUFNO2dCQUNILE1BQU0sR0FBRyxxQ0FBcUMsQ0FBQzthQUNsRDtZQUNELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs7b0JBQ2QsV0FBVyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNwQyxJQUFJLENBQUMs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QUFNO2dCQUNILGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzdCO1NBQ0o7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3RCLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDeEU7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3RCLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDeEU7UUFDRCxJQUFJLGFBQWEsSUFBSSxhQUFhLEtBQUssQ0FBQyxFQUFFO1lBQ3RDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDOUIsSUFBSSxlQUFlLElBQUksZUFBZSxLQUFLLElBQUksRUFBRTtnQkFDN0MsYUFBYSxHQUFHLGFBQWEsR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFDO2dCQUN0RCxJQUFJLGVBQWUsSUFBSSxlQUFlLEtBQUssSUFBSSxFQUFFO29CQUM3QyxhQUFhLEdBQUcsYUFBYSxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUM7aUJBQ3pEO2FBQ0o7U0FDSjtRQUNELElBQUksaUJBQWlCLElBQUksYUFBYSxFQUFFO1lBQ3BDLGFBQWEsSUFBSSxHQUFHLEdBQUcsaUJBQWlCLENBQUE7U0FDM0M7UUFFRCxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDOztnQkF6R0osVUFBVTs7SUEwR1gsOEJBQUM7Q0FBQSxBQTFHRCxDQUM2QyxnQkFBZ0IsR0F5RzVEO1NBekdZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVPYmplY3QgfSBmcm9tICcuLi8uLi90aW1lL3RpbWUtb2JqZWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIFRJTUVfRk9STUFUX0ZBQ1RPUlkoKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lRm9ybWF0UGFyc2VyRGVmYXVsdCgpO1xufVxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHdoaWNoIGRlZmluZXMgdGhlIGJlaGF2aW91ciBvZiB0aGUgdGltZSBmb3JtYXQgYW5kIHBhcnNlci5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICB1c2VGYWN0b3J5OiBUSU1FX0ZPUk1BVF9GQUNUT1JZXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRpbWVGb3JtYXRQYXJzZXIge1xuXG4gICAgLyoqXG4gICAgICogU2hvdWxkIHRha2UgaW4gYSBzdHJpbmcgdmFsdWUgYW5kIHJldHVybiBhIFRpbWUgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB2YWx1ZSBTdHJpbmcgdG8gY29udmVydCB0byBhIHRpbWUgb2JqZWN0LlxuICAgICAqIEBwYXJhbSBtZXJpZGlhbiBib29sZWFuIHRvIGRlZmluZSBpZiBzdHJpbmcgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgYSBtZXJpZGlhbi5cbiAgICAgKiBAcGFyYW0gZGlzcGxheVNlY29uZHMgYm9vbGVhbiB0byBkZWZpbmUgaWYgc3RyaW5nIHNob3VsZCBkaXNwbGF5IHNlY29uZHMuXG4gICAgICovXG4gICAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IHN0cmluZywgZGlzcGxheVNlY29uZHM6IGJvb2xlYW4sIG1lcmlkaWFuPzogYm9vbGVhbik6IFRpbWVPYmplY3Q7XG5cbiAgICAvKipcbiAgICAgKiBTaG91bGQgdGFrZSBpbiBhIHRpbWUgb2JqZWN0IGFuZCByZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICogQHBhcmFtIHRpbWUgVGltZU9iamVjdCB0byBjb252ZXJ0IHRvIGEgc3RyaW5nLlxuICAgICAqIEBwYXJhbSBtZXJpZGlhbiBib29sZWFuIHRvIGRlZmluZSBpZiBUaW1lT2JqZWN0IHNob3VsZCBiZSB0cmVhdGVkIGFzIGEgbWVyaWRpYW4uXG4gICAgICovXG4gICAgYWJzdHJhY3QgZm9ybWF0KHRpbWU6IFRpbWVPYmplY3QsIG1lcmlkaWFuPzogYm9vbGVhbik6IHN0cmluZztcbn1cblxuLyoqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBEYXRlRm9ybWF0UGFyc2VyIHNlcnZpY2UuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUaW1lRm9ybWF0UGFyc2VyRGVmYXVsdCBleHRlbmRzIFRpbWVGb3JtYXRQYXJzZXIge1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgaW4gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBkYXRlIGFuZCByZXR1cm5zIGEgVGltZSBvYmplY3QuXG4gICAgICogQHBhcmFtIHZhbHVlIFN0cmluZyB0byBjb252ZXJ0IHRvIGEgdGltZSBvYmplY3QuXG4gICAgICogQHBhcmFtIG1lcmlkaWFuIGJvb2xlYW4gdG8gZGVmaW5lIGlmIHN0cmluZyBzaG91bGQgYmUgdHJlYXRlZCBhcyBhIG1lcmlkaWFuLlxuICAgICAqIEBwYXJhbSBkaXNwbGF5U2Vjb25kcyBib29sZWFuIHRvIGRlZmluZSBpZiBzdHJpbmcgc2hvdWxkIGRpc3BsYXkgc2Vjb25kcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgcGFyc2UodmFsdWU6IHN0cmluZywgZGlzcGxheVNlY29uZHM6IGJvb2xlYW4gPSB0cnVlLCBtZXJpZGlhbj86IGJvb2xlYW4pOiBUaW1lT2JqZWN0IHtcbiAgICAgICAgY29uc3QgdGltZSA9IG5ldyBUaW1lT2JqZWN0KCk7XG4gICAgICAgIGxldCByZWdleHA7XG4gICAgICAgIGlmICghbWVyaWRpYW4pIHtcbiAgICAgICAgICAgIGlmIChkaXNwbGF5U2Vjb25kcykge1xuICAgICAgICAgICAgICAgIHJlZ2V4cCA9IC9eKFswLTFdP1swLTldfDJbMC0zXSk6KFswLTVdWzAtOV0pKDpbMC01XVswLTldKSQvO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWdleHAgPSAvXihbMC0xXT9bMC05XXwyWzAtM10pOihbMC01XVswLTldKSQvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlZ2V4cC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwbGl0U3RyaW5nID0gdmFsdWUuc3BsaXQoJzonKTtcbiAgICAgICAgICAgICAgICB0aW1lLmhvdXIgPSBwYXJzZUludChzcGxpdFN0cmluZ1swXSwgMTApO1xuICAgICAgICAgICAgICAgIHRpbWUubWludXRlID0gcGFyc2VJbnQoc3BsaXRTdHJpbmdbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlzcGxheVNlY29uZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZS5zZWNvbmQgPSBwYXJzZUludChzcGxpdFN0cmluZ1syXSwgMTApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWVyaWRpYW4pIHtcbiAgICAgICAgICAgIGlmIChkaXNwbGF5U2Vjb25kcykge1xuICAgICAgICAgICAgICAgIHJlZ2V4cCA9IC9eKFswLTFdP1swLTldfDJbMC0zXSk6KFswLTVdWzAtOV0pKDpbMC01XVswLTldKSBbQVBhcF1bbU1dJC87XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlZ2V4cCA9IC9eKFswLTFdP1swLTldfDJbMC0zXSk6KFswLTVdWzAtOV0pIFtBUGFwXVttTV0kLztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWdleHAudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJpb2QgPSB2YWx1ZS5zcGxpdCgnICcpWzFdO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BsaXRTdHJpbmcgPSB2YWx1ZS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgICAgIHRpbWUuaG91ciA9IHBhcnNlSW50KHNwbGl0U3RyaW5nWzBdLCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKCggcGVyaW9kID09PSAncG0nIHx8IHBlcmlvZCA9PT0gJ1BNJyApICYmIHRpbWUuaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWUuaG91ciA9IHRpbWUuaG91ciArIDEyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIChwZXJpb2QgPT09ICdhbScgfHwgcGVyaW9kID09PSAnQU0nKSAmJiB0aW1lLmhvdXIgPT09IDEyICkge1xuICAgICAgICAgICAgICAgICAgICB0aW1lLmhvdXIgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aW1lLm1pbnV0ZSA9IHBhcnNlSW50KHNwbGl0U3RyaW5nWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3BsYXlTZWNvbmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWUuc2Vjb25kID0gcGFyc2VJbnQoc3BsaXRTdHJpbmdbMl0sIDEwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZXMgaW4gYSB0aW1lIG9iamVjdCBhbmQgcmV0dXJucyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqIEBwYXJhbSB0aW1lIFRpbWVPYmplY3QgdG8gY29udmVydCB0byBhIHN0cmluZy5cbiAgICAgKiBAcGFyYW0gbWVyaWRpYW4gYm9vbGVhbiB0byBkZWZpbmUgaWYgVGltZU9iamVjdCBzaG91bGQgYmUgdHJlYXRlZCBhcyBhIG1lcmlkaWFuLlxuICAgICAqL1xuICAgIHB1YmxpYyBmb3JtYXQodGltZTogVGltZU9iamVjdCwgbWVyaWRpYW4/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGZvcm1hdHRlZEhvdXIsIGZvcm1hdHRlZE1pbnV0ZSwgZm9ybWF0dGVkU2Vjb25kO1xuICAgICAgICBsZXQgZm9ybWF0dGVkVGltZTtcbiAgICAgICAgbGV0IGZvcm1hdHRlZE1lcmlkaWFuO1xuICAgICAgICBpZiAodGltZS5ob3VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobWVyaWRpYW4pIHtcbiAgICAgICAgICAgICAgICBpZiAodGltZS5ob3VyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZEhvdXIgPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkTWVyaWRpYW4gPSAnYW0nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZS5ob3VyID4gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkSG91ciA9IHRpbWUuaG91ciAtIDEyO1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRNZXJpZGlhbiA9ICdwbSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lLmhvdXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZEhvdXIgPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkTWVyaWRpYW4gPSAncG0nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZEhvdXIgPSB0aW1lLmhvdXI7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZE1lcmlkaWFuID0gJ2FtJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZEhvdXIgPSB0aW1lLmhvdXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpbWUubWludXRlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3JtYXR0ZWRNaW51dGUgPSB0aW1lLm1pbnV0ZSA8IDEwID8gJzAnICsgdGltZS5taW51dGUgOiB0aW1lLm1pbnV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lLnNlY29uZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybWF0dGVkU2Vjb25kID0gdGltZS5zZWNvbmQgPCAxMCA/ICcwJyArIHRpbWUuc2Vjb25kIDogdGltZS5zZWNvbmQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcm1hdHRlZEhvdXIgfHwgZm9ybWF0dGVkSG91ciA9PT0gMCkge1xuICAgICAgICAgICAgZm9ybWF0dGVkVGltZSA9IGZvcm1hdHRlZEhvdXI7XG4gICAgICAgICAgICBpZiAoZm9ybWF0dGVkTWludXRlIHx8IGZvcm1hdHRlZE1pbnV0ZSA9PT0gJzAwJykge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFRpbWUgPSBmb3JtYXR0ZWRUaW1lICsgJzonICsgZm9ybWF0dGVkTWludXRlO1xuICAgICAgICAgICAgICAgIGlmIChmb3JtYXR0ZWRTZWNvbmQgfHwgZm9ybWF0dGVkU2Vjb25kID09PSAnMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFRpbWUgPSBmb3JtYXR0ZWRUaW1lICsgJzonICsgZm9ybWF0dGVkU2Vjb25kO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybWF0dGVkTWVyaWRpYW4gJiYgZm9ybWF0dGVkVGltZSkge1xuICAgICAgICAgICAgZm9ybWF0dGVkVGltZSArPSAnICcgKyBmb3JtYXR0ZWRNZXJpZGlhblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFRpbWU7XG4gICAgfVxufVxuIl19