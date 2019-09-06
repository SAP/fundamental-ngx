/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Provides i18n support for placeholders and meridian modifiers naming in the time component.
 */
export class TimeI18n {
    constructor() {
        /**
         * Ante Meridian naming label. The value written in the input should match this or Post Meridian. Otherwise it would be
         * treated as invalid
         *
         */
        this.meridianAm = 'am';
        /**
         * Post Meridian naming label. The value written in the input should match this or Ante Meridian. Otherwise it would be
         * treated as invalid
         *
         */
        this.meridianPm = 'pm';
        /**
         * Placeholder on the Ante Meridian / Post Meridian input
         *
         */
        this.meridianPlaceholder = 'am';
        /**
         * Placeholder for hours input
         *
         */
        this.hoursPlaceholder = 'hh';
        /**
         * Placeholder for minutes input
         *
         */
        this.minutesPlaceholder = 'mm';
        /**
         * Placeholder for seconds input
         *
         */
        this.secondsPlaceholder = 'ss';
        /**
         * Defines if the meridian validation should be case sensitive.
         *
         */
        this.meridianCaseSensitive = false;
    }
}
TimeI18n.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ TimeI18n.ngInjectableDef = i0.defineInjectable({ factory: function TimeI18n_Factory() { return new TimeI18n(); }, token: TimeI18n, providedIn: "root" });
if (false) {
    /**
     * Ante Meridian naming label. The value written in the input should match this or Post Meridian. Otherwise it would be
     * treated as invalid
     *
     * @type {?}
     */
    TimeI18n.prototype.meridianAm;
    /**
     * Post Meridian naming label. The value written in the input should match this or Ante Meridian. Otherwise it would be
     * treated as invalid
     *
     * @type {?}
     */
    TimeI18n.prototype.meridianPm;
    /**
     * Placeholder on the Ante Meridian / Post Meridian input
     *
     * @type {?}
     */
    TimeI18n.prototype.meridianPlaceholder;
    /**
     * Placeholder for hours input
     *
     * @type {?}
     */
    TimeI18n.prototype.hoursPlaceholder;
    /**
     * Placeholder for minutes input
     *
     * @type {?}
     */
    TimeI18n.prototype.minutesPlaceholder;
    /**
     * Placeholder for seconds input
     *
     * @type {?}
     */
    TimeI18n.prototype.secondsPlaceholder;
    /**
     * Defines if the meridian validation should be case sensitive.
     *
     * @type {?}
     */
    TimeI18n.prototype.meridianCaseSensitive;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1pMThuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RpbWUvaTE4bi90aW1lLWkxOG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBTTNDLE1BQU0sT0FBTyxRQUFRO0lBRHJCOzs7Ozs7UUFPSSxlQUFVLEdBQVcsSUFBSSxDQUFDOzs7Ozs7UUFNMUIsZUFBVSxHQUFXLElBQUksQ0FBQzs7Ozs7UUFLMUIsd0JBQW1CLEdBQVcsSUFBSSxDQUFDOzs7OztRQUtuQyxxQkFBZ0IsR0FBVyxJQUFJLENBQUM7Ozs7O1FBS2hDLHVCQUFrQixHQUFXLElBQUksQ0FBQzs7Ozs7UUFLbEMsdUJBQWtCLEdBQVcsSUFBSSxDQUFDOzs7OztRQUtsQywwQkFBcUIsR0FBWSxLQUFLLENBQUM7S0FFMUM7OztZQXhDQSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7Ozs7Ozs7O0lBTzVCLDhCQUEwQjs7Ozs7OztJQU0xQiw4QkFBMEI7Ozs7OztJQUsxQix1Q0FBbUM7Ozs7OztJQUtuQyxvQ0FBZ0M7Ozs7OztJQUtoQyxzQ0FBa0M7Ozs7OztJQUtsQyxzQ0FBa0M7Ozs7OztJQUtsQyx5Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogUHJvdmlkZXMgaTE4biBzdXBwb3J0IGZvciBwbGFjZWhvbGRlcnMgYW5kIG1lcmlkaWFuIG1vZGlmaWVycyBuYW1pbmcgaW4gdGhlIHRpbWUgY29tcG9uZW50LlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBUaW1lSTE4biB7XG5cbiAgICAvKipcbiAgICAgKiBBbnRlIE1lcmlkaWFuIG5hbWluZyBsYWJlbC4gVGhlIHZhbHVlIHdyaXR0ZW4gaW4gdGhlIGlucHV0IHNob3VsZCBtYXRjaCB0aGlzIG9yIFBvc3QgTWVyaWRpYW4uIE90aGVyd2lzZSBpdCB3b3VsZCBiZVxuICAgICAqIHRyZWF0ZWQgYXMgaW52YWxpZFxuICAgICAqICovXG4gICAgbWVyaWRpYW5BbTogc3RyaW5nID0gJ2FtJztcblxuICAgIC8qKlxuICAgICAqIFBvc3QgTWVyaWRpYW4gbmFtaW5nIGxhYmVsLiBUaGUgdmFsdWUgd3JpdHRlbiBpbiB0aGUgaW5wdXQgc2hvdWxkIG1hdGNoIHRoaXMgb3IgQW50ZSBNZXJpZGlhbi4gT3RoZXJ3aXNlIGl0IHdvdWxkIGJlXG4gICAgICogdHJlYXRlZCBhcyBpbnZhbGlkXG4gICAgICogKi9cbiAgICBtZXJpZGlhblBtOiBzdHJpbmcgPSAncG0nO1xuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgb24gdGhlIEFudGUgTWVyaWRpYW4gLyBQb3N0IE1lcmlkaWFuIGlucHV0XG4gICAgICogKi9cbiAgICBtZXJpZGlhblBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnYW0nO1xuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgZm9yIGhvdXJzIGlucHV0XG4gICAgICogKi9cbiAgICBob3Vyc1BsYWNlaG9sZGVyOiBzdHJpbmcgPSAnaGgnO1xuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgZm9yIG1pbnV0ZXMgaW5wdXRcbiAgICAgKiAqL1xuICAgIG1pbnV0ZXNQbGFjZWhvbGRlcjogc3RyaW5nID0gJ21tJztcblxuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIGZvciBzZWNvbmRzIGlucHV0XG4gICAgICogKi9cbiAgICBzZWNvbmRzUGxhY2Vob2xkZXI6IHN0cmluZyA9ICdzcyc7XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIHRoZSBtZXJpZGlhbiB2YWxpZGF0aW9uIHNob3VsZCBiZSBjYXNlIHNlbnNpdGl2ZS5cbiAgICAgKiAqL1xuICAgIG1lcmlkaWFuQ2FzZVNlbnNpdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG59XG4iXX0=