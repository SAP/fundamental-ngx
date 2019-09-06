/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class TimeFormatParser {
}
TimeFormatParser.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
                useFactory: TIME_FORMAT_FACTORY
            },] }
];
/** @nocollapse */ TimeFormatParser.ngInjectableDef = i0.defineInjectable({ factory: TIME_FORMAT_FACTORY, token: TimeFormatParser, providedIn: "root" });
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
export class TimeFormatParserDefault extends TimeFormatParser {
    /**
     * Takes in a string representation of a date and returns a Time object.
     * @param {?} value String to convert to a time object.
     * @param {?=} displaySeconds boolean to define if string should display seconds.
     * @param {?=} meridian boolean to define if string should be treated as a meridian.
     * @return {?}
     */
    parse(value, displaySeconds = true, meridian) {
        /** @type {?} */
        const time = new TimeObject();
        /** @type {?} */
        let regexp;
        if (!meridian) {
            if (displaySeconds) {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])$/;
            }
            else {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
            }
            if (regexp.test(value)) {
                /** @type {?} */
                const splitString = value.split(':');
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
                const period = value.split(' ')[1];
                /** @type {?} */
                const splitString = value.split(':');
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
    }
    /**
     * Takes in a time object and returns the string representation.
     * @param {?} time TimeObject to convert to a string.
     * @param {?=} meridian boolean to define if TimeObject should be treated as a meridian.
     * @return {?}
     */
    format(time, meridian) {
        /** @type {?} */
        let formattedHour;
        /** @type {?} */
        let formattedMinute;
        /** @type {?} */
        let formattedSecond;
        /** @type {?} */
        let formattedTime;
        /** @type {?} */
        let formattedMeridian;
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
    }
}
TimeFormatParserDefault.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wYXJzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGltZS1waWNrZXIvZm9ybWF0L3RpbWUtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7QUFFcEQsTUFBTSxVQUFVLG1CQUFtQjtJQUMvQixPQUFPLElBQUksdUJBQXVCLEVBQUUsQ0FBQztBQUN6QyxDQUFDOzs7OztBQVNELE1BQU0sT0FBZ0IsZ0JBQWdCOzs7WUFKckMsVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixVQUFVLEVBQUUsbUJBQW1CO2FBQ2xDOzs7Ozs7Ozs7Ozs7SUFTRyxrRkFBdUY7Ozs7Ozs7O0lBT3ZGLGtFQUE4RDs7Ozs7QUFPbEUsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGdCQUFnQjs7Ozs7Ozs7SUFRbEQsS0FBSyxDQUFDLEtBQWEsRUFBRSxpQkFBMEIsSUFBSSxFQUFFLFFBQWtCOztjQUNwRSxJQUFJLEdBQUcsSUFBSSxVQUFVLEVBQUU7O1lBQ3pCLE1BQU07UUFDVixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsSUFBSSxjQUFjLEVBQUU7Z0JBQ2hCLE1BQU0sR0FBRyxrREFBa0QsQ0FBQzthQUMvRDtpQkFBTTtnQkFDSCxNQUFNLEdBQUcscUNBQXFDLENBQUM7YUFDbEQ7WUFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7O3NCQUNkLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsTUFB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QUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3hFO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN0QixlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3hFO1FBQ0QsSUFBSSxhQUFhLElBQUksYUFBYSxLQUFLLENBQUMsRUFBRTtZQUN0QyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQzlCLElBQUksZUFBZSxJQUFJLGVBQWUsS0FBSyxJQUFJLEVBQUU7Z0JBQzdDLGFBQWEsR0FBRyxhQUFhLEdBQUcsR0FBRyxHQUFHLGVBQWUsQ0FBQztnQkFDdEQsSUFBSSxlQUFlLElBQUksZUFBZSxLQUFLLElBQUksRUFBRTtvQkFDN0MsYUFBYSxHQUFHLGFBQWEsR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFDO2lCQUN6RDthQUNKO1NBQ0o7UUFDRCxJQUFJLGlCQUFpQixJQUFJLGFBQWEsRUFBRTtZQUNwQyxhQUFhLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFBO1NBQzNDO1FBRUQsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQzs7O1lBekdKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lT2JqZWN0IH0gZnJvbSAnLi4vLi4vdGltZS90aW1lLW9iamVjdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBUSU1FX0ZPUk1BVF9GQUNUT1JZKCkge1xuICAgIHJldHVybiBuZXcgVGltZUZvcm1hdFBhcnNlckRlZmF1bHQoKTtcbn1cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyB3aGljaCBkZWZpbmVzIHRoZSBiZWhhdmlvdXIgb2YgdGhlIHRpbWUgZm9ybWF0IGFuZCBwYXJzZXIuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgdXNlRmFjdG9yeTogVElNRV9GT1JNQVRfRkFDVE9SWVxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUaW1lRm9ybWF0UGFyc2VyIHtcblxuICAgIC8qKlxuICAgICAqIFNob3VsZCB0YWtlIGluIGEgc3RyaW5nIHZhbHVlIGFuZCByZXR1cm4gYSBUaW1lIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdmFsdWUgU3RyaW5nIHRvIGNvbnZlcnQgdG8gYSB0aW1lIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gbWVyaWRpYW4gYm9vbGVhbiB0byBkZWZpbmUgaWYgc3RyaW5nIHNob3VsZCBiZSB0cmVhdGVkIGFzIGEgbWVyaWRpYW4uXG4gICAgICogQHBhcmFtIGRpc3BsYXlTZWNvbmRzIGJvb2xlYW4gdG8gZGVmaW5lIGlmIHN0cmluZyBzaG91bGQgZGlzcGxheSBzZWNvbmRzLlxuICAgICAqL1xuICAgIGFic3RyYWN0IHBhcnNlKHZhbHVlOiBzdHJpbmcsIGRpc3BsYXlTZWNvbmRzOiBib29sZWFuLCBtZXJpZGlhbj86IGJvb2xlYW4pOiBUaW1lT2JqZWN0O1xuXG4gICAgLyoqXG4gICAgICogU2hvdWxkIHRha2UgaW4gYSB0aW1lIG9iamVjdCBhbmQgcmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqIEBwYXJhbSB0aW1lIFRpbWVPYmplY3QgdG8gY29udmVydCB0byBhIHN0cmluZy5cbiAgICAgKiBAcGFyYW0gbWVyaWRpYW4gYm9vbGVhbiB0byBkZWZpbmUgaWYgVGltZU9iamVjdCBzaG91bGQgYmUgdHJlYXRlZCBhcyBhIG1lcmlkaWFuLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGZvcm1hdCh0aW1lOiBUaW1lT2JqZWN0LCBtZXJpZGlhbj86IGJvb2xlYW4pOiBzdHJpbmc7XG59XG5cbi8qKlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgRGF0ZUZvcm1hdFBhcnNlciBzZXJ2aWNlLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGltZUZvcm1hdFBhcnNlckRlZmF1bHQgZXh0ZW5kcyBUaW1lRm9ybWF0UGFyc2VyIHtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIGluIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgZGF0ZSBhbmQgcmV0dXJucyBhIFRpbWUgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB2YWx1ZSBTdHJpbmcgdG8gY29udmVydCB0byBhIHRpbWUgb2JqZWN0LlxuICAgICAqIEBwYXJhbSBtZXJpZGlhbiBib29sZWFuIHRvIGRlZmluZSBpZiBzdHJpbmcgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgYSBtZXJpZGlhbi5cbiAgICAgKiBAcGFyYW0gZGlzcGxheVNlY29uZHMgYm9vbGVhbiB0byBkZWZpbmUgaWYgc3RyaW5nIHNob3VsZCBkaXNwbGF5IHNlY29uZHMuXG4gICAgICovXG4gICAgcHVibGljIHBhcnNlKHZhbHVlOiBzdHJpbmcsIGRpc3BsYXlTZWNvbmRzOiBib29sZWFuID0gdHJ1ZSwgbWVyaWRpYW4/OiBib29sZWFuKTogVGltZU9iamVjdCB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgVGltZU9iamVjdCgpO1xuICAgICAgICBsZXQgcmVnZXhwO1xuICAgICAgICBpZiAoIW1lcmlkaWFuKSB7XG4gICAgICAgICAgICBpZiAoZGlzcGxheVNlY29uZHMpIHtcbiAgICAgICAgICAgICAgICByZWdleHAgPSAvXihbMC0xXT9bMC05XXwyWzAtM10pOihbMC01XVswLTldKSg6WzAtNV1bMC05XSkkLztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVnZXhwID0gL14oWzAtMV0/WzAtOV18MlswLTNdKTooWzAtNV1bMC05XSkkLztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWdleHAudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGxpdFN0cmluZyA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICAgICAgdGltZS5ob3VyID0gcGFyc2VJbnQoc3BsaXRTdHJpbmdbMF0sIDEwKTtcbiAgICAgICAgICAgICAgICB0aW1lLm1pbnV0ZSA9IHBhcnNlSW50KHNwbGl0U3RyaW5nWzFdLCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3BsYXlTZWNvbmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWUuc2Vjb25kID0gcGFyc2VJbnQoc3BsaXRTdHJpbmdbMl0sIDEwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1lcmlkaWFuKSB7XG4gICAgICAgICAgICBpZiAoZGlzcGxheVNlY29uZHMpIHtcbiAgICAgICAgICAgICAgICByZWdleHAgPSAvXihbMC0xXT9bMC05XXwyWzAtM10pOihbMC01XVswLTldKSg6WzAtNV1bMC05XSkgW0FQYXBdW21NXSQvO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWdleHAgPSAvXihbMC0xXT9bMC05XXwyWzAtM10pOihbMC01XVswLTldKSBbQVBhcF1bbU1dJC87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVnZXhwLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVyaW9kID0gdmFsdWUuc3BsaXQoJyAnKVsxXTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNwbGl0U3RyaW5nID0gdmFsdWUuc3BsaXQoJzonKTtcbiAgICAgICAgICAgICAgICB0aW1lLmhvdXIgPSBwYXJzZUludChzcGxpdFN0cmluZ1swXSwgMTApO1xuICAgICAgICAgICAgICAgIGlmICgoIHBlcmlvZCA9PT0gJ3BtJyB8fCBwZXJpb2QgPT09ICdQTScgKSAmJiB0aW1lLmhvdXIgPCAxMikge1xuICAgICAgICAgICAgICAgICAgICB0aW1lLmhvdXIgPSB0aW1lLmhvdXIgKyAxMjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCAocGVyaW9kID09PSAnYW0nIHx8IHBlcmlvZCA9PT0gJ0FNJykgJiYgdGltZS5ob3VyID09PSAxMiApIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZS5ob3VyID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGltZS5taW51dGUgPSBwYXJzZUludChzcGxpdFN0cmluZ1sxXSwgMTApO1xuICAgICAgICAgICAgICAgIGlmIChkaXNwbGF5U2Vjb25kcykge1xuICAgICAgICAgICAgICAgICAgICB0aW1lLnNlY29uZCA9IHBhcnNlSW50KHNwbGl0U3RyaW5nWzJdLCAxMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRha2VzIGluIGEgdGltZSBvYmplY3QgYW5kIHJldHVybnMgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKiBAcGFyYW0gdGltZSBUaW1lT2JqZWN0IHRvIGNvbnZlcnQgdG8gYSBzdHJpbmcuXG4gICAgICogQHBhcmFtIG1lcmlkaWFuIGJvb2xlYW4gdG8gZGVmaW5lIGlmIFRpbWVPYmplY3Qgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgYSBtZXJpZGlhbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZm9ybWF0KHRpbWU6IFRpbWVPYmplY3QsIG1lcmlkaWFuPzogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIGxldCBmb3JtYXR0ZWRIb3VyLCBmb3JtYXR0ZWRNaW51dGUsIGZvcm1hdHRlZFNlY29uZDtcbiAgICAgICAgbGV0IGZvcm1hdHRlZFRpbWU7XG4gICAgICAgIGxldCBmb3JtYXR0ZWRNZXJpZGlhbjtcbiAgICAgICAgaWYgKHRpbWUuaG91ciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG1lcmlkaWFuKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRpbWUuaG91ciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRIb3VyID0gMTI7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZE1lcmlkaWFuID0gJ2FtJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWUuaG91ciA+IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZEhvdXIgPSB0aW1lLmhvdXIgLSAxMjtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkTWVyaWRpYW4gPSAncG0nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZS5ob3VyID09PSAxMikge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRIb3VyID0gMTI7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZE1lcmlkaWFuID0gJ3BtJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRIb3VyID0gdGltZS5ob3VyO1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRNZXJpZGlhbiA9ICdhbSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRIb3VyID0gdGltZS5ob3VyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aW1lLm1pbnV0ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybWF0dGVkTWludXRlID0gdGltZS5taW51dGUgPCAxMCA/ICcwJyArIHRpbWUubWludXRlIDogdGltZS5taW51dGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZS5zZWNvbmQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFNlY29uZCA9IHRpbWUuc2Vjb25kIDwgMTAgPyAnMCcgKyB0aW1lLnNlY29uZCA6IHRpbWUuc2Vjb25kO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JtYXR0ZWRIb3VyIHx8IGZvcm1hdHRlZEhvdXIgPT09IDApIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFRpbWUgPSBmb3JtYXR0ZWRIb3VyO1xuICAgICAgICAgICAgaWYgKGZvcm1hdHRlZE1pbnV0ZSB8fCBmb3JtYXR0ZWRNaW51dGUgPT09ICcwMCcpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRUaW1lID0gZm9ybWF0dGVkVGltZSArICc6JyArIGZvcm1hdHRlZE1pbnV0ZTtcbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0dGVkU2Vjb25kIHx8IGZvcm1hdHRlZFNlY29uZCA9PT0gJzAwJykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRUaW1lID0gZm9ybWF0dGVkVGltZSArICc6JyArIGZvcm1hdHRlZFNlY29uZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcm1hdHRlZE1lcmlkaWFuICYmIGZvcm1hdHRlZFRpbWUpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFRpbWUgKz0gJyAnICsgZm9ybWF0dGVkTWVyaWRpYW5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRUaW1lO1xuICAgIH1cbn1cbiJdfQ==