/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Provides i18n support for placeholders and meridian modifiers naming in the time component.
 */
var TimeI18n = /** @class */ (function () {
    function TimeI18n() {
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
    TimeI18n.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ TimeI18n.ngInjectableDef = i0.defineInjectable({ factory: function TimeI18n_Factory() { return new TimeI18n(); }, token: TimeI18n, providedIn: "root" });
    return TimeI18n;
}());
export { TimeI18n };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1pMThuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RpbWUvaTE4bi90aW1lLWkxOG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBSzNDO0lBQUE7Ozs7OztRQU9JLGVBQVUsR0FBVyxJQUFJLENBQUM7Ozs7OztRQU0xQixlQUFVLEdBQVcsSUFBSSxDQUFDOzs7OztRQUsxQix3QkFBbUIsR0FBVyxJQUFJLENBQUM7Ozs7O1FBS25DLHFCQUFnQixHQUFXLElBQUksQ0FBQzs7Ozs7UUFLaEMsdUJBQWtCLEdBQVcsSUFBSSxDQUFDOzs7OztRQUtsQyx1QkFBa0IsR0FBVyxJQUFJLENBQUM7Ozs7O1FBS2xDLDBCQUFxQixHQUFZLEtBQUssQ0FBQztLQUUxQzs7Z0JBeENBLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7OzttQkFMaEM7Q0E2Q0MsQUF4Q0QsSUF3Q0M7U0F2Q1ksUUFBUTs7Ozs7Ozs7SUFNakIsOEJBQTBCOzs7Ozs7O0lBTTFCLDhCQUEwQjs7Ozs7O0lBSzFCLHVDQUFtQzs7Ozs7O0lBS25DLG9DQUFnQzs7Ozs7O0lBS2hDLHNDQUFrQzs7Ozs7O0lBS2xDLHNDQUFrQzs7Ozs7O0lBS2xDLHlDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBQcm92aWRlcyBpMThuIHN1cHBvcnQgZm9yIHBsYWNlaG9sZGVycyBhbmQgbWVyaWRpYW4gbW9kaWZpZXJzIG5hbWluZyBpbiB0aGUgdGltZSBjb21wb25lbnQuXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIFRpbWVJMThuIHtcblxuICAgIC8qKlxuICAgICAqIEFudGUgTWVyaWRpYW4gbmFtaW5nIGxhYmVsLiBUaGUgdmFsdWUgd3JpdHRlbiBpbiB0aGUgaW5wdXQgc2hvdWxkIG1hdGNoIHRoaXMgb3IgUG9zdCBNZXJpZGlhbi4gT3RoZXJ3aXNlIGl0IHdvdWxkIGJlXG4gICAgICogdHJlYXRlZCBhcyBpbnZhbGlkXG4gICAgICogKi9cbiAgICBtZXJpZGlhbkFtOiBzdHJpbmcgPSAnYW0nO1xuXG4gICAgLyoqXG4gICAgICogUG9zdCBNZXJpZGlhbiBuYW1pbmcgbGFiZWwuIFRoZSB2YWx1ZSB3cml0dGVuIGluIHRoZSBpbnB1dCBzaG91bGQgbWF0Y2ggdGhpcyBvciBBbnRlIE1lcmlkaWFuLiBPdGhlcndpc2UgaXQgd291bGQgYmVcbiAgICAgKiB0cmVhdGVkIGFzIGludmFsaWRcbiAgICAgKiAqL1xuICAgIG1lcmlkaWFuUG06IHN0cmluZyA9ICdwbSc7XG5cbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciBvbiB0aGUgQW50ZSBNZXJpZGlhbiAvIFBvc3QgTWVyaWRpYW4gaW5wdXRcbiAgICAgKiAqL1xuICAgIG1lcmlkaWFuUGxhY2Vob2xkZXI6IHN0cmluZyA9ICdhbSc7XG5cbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciBmb3IgaG91cnMgaW5wdXRcbiAgICAgKiAqL1xuICAgIGhvdXJzUGxhY2Vob2xkZXI6IHN0cmluZyA9ICdoaCc7XG5cbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciBmb3IgbWludXRlcyBpbnB1dFxuICAgICAqICovXG4gICAgbWludXRlc1BsYWNlaG9sZGVyOiBzdHJpbmcgPSAnbW0nO1xuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgZm9yIHNlY29uZHMgaW5wdXRcbiAgICAgKiAqL1xuICAgIHNlY29uZHNQbGFjZWhvbGRlcjogc3RyaW5nID0gJ3NzJztcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgaWYgdGhlIG1lcmlkaWFuIHZhbGlkYXRpb24gc2hvdWxkIGJlIGNhc2Ugc2Vuc2l0aXZlLlxuICAgICAqICovXG4gICAgbWVyaWRpYW5DYXNlU2Vuc2l0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbn1cbiJdfQ==