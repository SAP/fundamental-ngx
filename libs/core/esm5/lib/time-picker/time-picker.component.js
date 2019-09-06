/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, forwardRef, HostBinding, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { TimeObject } from '../time/time-object';
import { TimeComponent } from '../time/time.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeFormatParser } from './format/time-parser';
var TimePickerComponent = /** @class */ (function () {
    /** @hidden */
    function TimePickerComponent(cd, timeAdapter) {
        this.cd = cd;
        this.timeAdapter = timeAdapter;
        /**
         * @hidden
         */
        this.timepickerclass = true;
        /**
         * \@Input An object that contains three integer properties: 'hour' (ranging from 0 to 23),
         * 'minute' (ranging from 0 to 59), and 'second' (ranging from 0 to 59). This is the model the component consumes. Example:
         *
         * ```json
         * { hour: 12, minute: 0, second: 0 }
         * ```
         */
        this.time = { hour: 0, minute: 0, second: 0 };
        /**
         * \@Input Uses compact time picker.
         */
        this.compact = false;
        /**
         * \@Input When set to true, uses the 24 hour clock (hours ranging from 0 to 23)
         * and does not display a period control.
         */
        this.meridian = false;
        /**
         * \@Input When set to false, hides the buttons that increment and decrement the corresponding input.
         */
        this.spinners = true;
        /**
         * \@Input When set to false, hides the input for seconds.
         */
        this.displaySeconds = true;
        /**
         * \@Input When set to false, hides the input for minutes.
         */
        this.displayMinutes = true;
        /**
         * \@Input When set to false, hides the input for hours.
         */
        this.displayHours = true;
        /**
         * Whether to perform visual validation on the picker input.
         */
        this.validate = true;
        /**
         * Aria label for the time picker input.
         */
        this.timePickerInputLabel = 'Time picker input';
        /**
         * Whether a null input is considered valid.
         */
        this.allowNull = true;
        /**
         * @hidden Whether the input time is valid. Internal use.
         */
        this.isInvalidTimeInput = false;
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.placeholder = this.getPlaceholder();
    };
    /**
     * Returns the current value of the time input.
     */
    /**
     * Returns the current value of the time input.
     * @return {?}
     */
    TimePickerComponent.prototype.getTime = /**
     * Returns the current value of the time input.
     * @return {?}
     */
    function () {
        return this.time;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.getFormattedTime = /**
     * @hidden
     * @return {?}
     */
    function () {
        /** @type {?} */
        var formattedTime = this.timeAdapter.format(this.time, this.meridian);
        return formattedTime !== undefined ? formattedTime : '';
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} timeFromInput
     * @return {?}
     */
    TimePickerComponent.prototype.timeInputChanged = /**
     * @hidden
     * @param {?} timeFromInput
     * @return {?}
     */
    function (timeFromInput) {
        /** @type {?} */
        var time = this.timeAdapter.parse(timeFromInput, this.displaySeconds, this.meridian);
        if (time) {
            this.isInvalidTimeInput = false;
            this.child.setDisplayedHour();
            this.time = Object.assign(this.time, time);
            this.onChange(time);
        }
        else {
            if (this.allowNull && timeFromInput === '') {
                this.isInvalidTimeInput = false;
                this.child.setDisplayedHour();
                this.onChange({ hour: null, minutes: null, seconds: null });
            }
            else {
                this.isInvalidTimeInput = true;
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} $event
     * @return {?}
     */
    TimePickerComponent.prototype.inputGroupClicked = /**
     * @hidden
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (!this.isOpen && !this.disabled) {
            $event.stopPropagation();
            this.isOpen = true;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.onFocusHandler = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (!this.isOpen) {
            this.isOpen = true;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.addOnButtonClicked = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.isOpen = !this.isOpen;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.popoverClosed = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.isOpen = false;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.getPlaceholder = /**
     * @hidden
     * @return {?}
     */
    function () {
        /** @type {?} */
        var retVal;
        if (this.displaySeconds) {
            if (this.meridian) {
                retVal = 'hh' + ':' + 'mm' + ':' + 'ss am/pm';
            }
            else {
                retVal = 'hh' + ':' + 'mm' + ':' + 'ss';
            }
        }
        else {
            if (this.meridian) {
                retVal = 'hh' + ':' + 'mm' + ' am/pm';
            }
            else {
                retVal = 'hh' + ':' + 'mm';
            }
        }
        return retVal;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.timeFromTimeComponentChanged = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.cd.detectChanges();
        this.onChange(this.time);
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    TimePickerComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    TimePickerComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    TimePickerComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} time
     * @return {?}
     */
    TimePickerComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} time
     * @return {?}
     */
    function (time) {
        if (!time) {
            return;
        }
        this.time = time;
    };
    TimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-time-picker',
                    template: "<fd-popover [(isOpen)]=\"isOpen\"\n            [triggers]=\"[]\">\n    <fd-popover-control>\n        <!--fd-input-group *ngIf=\"!meridian\" (timeInputChanged)=\"timeInputChanged($event)\" [type]=\"'time'\"\n                        [placement]=\"'after'\" [button]=\"true\" (click)=\"inputGroupClicked($event)\" [glyph]=\"'fob-watch'\"\n                        [placeholder]=\"getPlaceholder()\" [inputText]=\"getFormattedTime()\" [disabled]=\"disabled\"\n                        (addOnButtonClicked)=\"addOnButtonClicked($event)\"></fd-input-group>\n        <fd-input-group *ngIf=\"meridian\" (timeInputChanged)=\"timeInputChanged($event)\" [type]=\"'time'\"\n                        [placement]=\"'after'\" [button]=\"true\" (click)=\"inputGroupClicked($event)\" [glyph]=\"'fob-watch'\"\n                        [placeholder]=\"getPlaceholder()\" [inputText]=\"getFormattedTime()\" [disabled]=\"disabled\"\n                        (addOnButtonClicked)=\"addOnButtonClicked($event)\"></fd-input-group-->\n        <div class=\"fd-input-group fd-input-group--after\"\n             [ngClass]=\"{'fd-input-group--compact' : compact}\">\n            <input [value]=\"getFormattedTime()\"\n                   (keyup)=\"timeInputChanged($event.currentTarget.value)\"\n                   (focus)=\"onFocusHandler()\"\n                   (click)=\"inputGroupClicked($event)\"\n                   [disabled]=\"disabled\"\n                   type=\"text\"\n                   [ngClass]=\"{ 'fd-input--compact': compact, 'is-invalid': isInvalidTimeInput && validate }\"\n                   [placeholder]=\"placeholder\"\n                   [attr.aria-label]=\"timePickerInputLabel\">\n            <span class=\"fd-input-group__addon fd-input-group__addon--button fd-input-group__addon--after\">\n          <button [disabled]=\"disabled\" type=\"button\"\n                  [ngClass]=\"{ 'fd-button--compact' : compact }\" (click)=\"addOnButtonClicked()\"\n                  class=\"fd-button--icon fd-button--light sap-icon--fob-watch\"></button>\n        </span>\n        </div>\n    </fd-popover-control>\n    <fd-popover-body *ngIf=\"displaySeconds || displayMinutes || displayHours\">\n        <fd-time [disabled]=\"disabled\"\n                 [meridian]=\"meridian\"\n                 [(ngModel)]=\"time\"\n                 (ngModelChange)=\"timeFromTimeComponentChanged()\"\n                 [spinners]=\"spinners\"\n                 [displayMinutes]=\"displayMinutes\"\n                 [displaySeconds]=\"displaySeconds\"\n                 [displayHours]=\"displayHours\"></fd-time>\n    </fd-popover-body>\n</fd-popover>\n",
                    host: {
                        '(blur)': 'onTouched()',
                        class: 'fd-timepicker-custom'
                    },
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return TimePickerComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-timepicker-custom{display:inline-block}.fd-timepicker-custom fd-popover{display:block}.fd-timepicker-custom fd-time{width:auto}"]
                }] }
    ];
    /** @nocollapse */
    TimePickerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: TimeFormatParser }
    ]; };
    TimePickerComponent.propDecorators = {
        timepickerclass: [{ type: HostBinding, args: ['class.fd-time-picker',] }],
        time: [{ type: Input }],
        compact: [{ type: Input }],
        meridian: [{ type: Input }],
        disabled: [{ type: Input }],
        spinners: [{ type: Input }],
        displaySeconds: [{ type: Input }],
        displayMinutes: [{ type: Input }],
        displayHours: [{ type: Input }],
        validate: [{ type: Input }],
        timePickerInputLabel: [{ type: Input }],
        allowNull: [{ type: Input }],
        child: [{ type: ViewChild, args: [TimeComponent,] }]
    };
    return TimePickerComponent;
}());
export { TimePickerComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    TimePickerComponent.prototype.timepickerclass;
    /**
     * \@Input An object that contains three integer properties: 'hour' (ranging from 0 to 23),
     * 'minute' (ranging from 0 to 59), and 'second' (ranging from 0 to 59). This is the model the component consumes. Example:
     *
     * ```json
     * { hour: 12, minute: 0, second: 0 }
     * ```
     * @type {?}
     */
    TimePickerComponent.prototype.time;
    /**
     * \@Input Uses compact time picker.
     * @type {?}
     */
    TimePickerComponent.prototype.compact;
    /**
     * \@Input When set to true, uses the 24 hour clock (hours ranging from 0 to 23)
     * and does not display a period control.
     * @type {?}
     */
    TimePickerComponent.prototype.meridian;
    /**
     * \@Input Disables the component.
     * @type {?}
     */
    TimePickerComponent.prototype.disabled;
    /**
     * \@Input When set to false, hides the buttons that increment and decrement the corresponding input.
     * @type {?}
     */
    TimePickerComponent.prototype.spinners;
    /**
     * \@Input When set to false, hides the input for seconds.
     * @type {?}
     */
    TimePickerComponent.prototype.displaySeconds;
    /**
     * \@Input When set to false, hides the input for minutes.
     * @type {?}
     */
    TimePickerComponent.prototype.displayMinutes;
    /**
     * \@Input When set to false, hides the input for hours.
     * @type {?}
     */
    TimePickerComponent.prototype.displayHours;
    /**
     * Whether to perform visual validation on the picker input.
     * @type {?}
     */
    TimePickerComponent.prototype.validate;
    /**
     * Aria label for the time picker input.
     * @type {?}
     */
    TimePickerComponent.prototype.timePickerInputLabel;
    /**
     * Whether a null input is considered valid.
     * @type {?}
     */
    TimePickerComponent.prototype.allowNull;
    /**
     * @hidden Whether the input time is valid. Internal use.
     * @type {?}
     */
    TimePickerComponent.prototype.isInvalidTimeInput;
    /**
     * @hidden
     * @type {?}
     */
    TimePickerComponent.prototype.child;
    /**
     * @hidden
     * @type {?}
     */
    TimePickerComponent.prototype.period;
    /**
     * @hidden
     * @type {?}
     */
    TimePickerComponent.prototype.isOpen;
    /**
     * @hidden
     * @type {?}
     */
    TimePickerComponent.prototype.placeholder;
    /**
     * @hidden
     * @type {?}
     */
    TimePickerComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    TimePickerComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    TimePickerComponent.prototype.cd;
    /** @type {?} */
    TimePickerComponent.prototype.timeAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkksT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQ7SUFpTkksY0FBYztJQUNkLDZCQUFvQixFQUFxQixFQUN0QixXQUE2QjtRQUQ1QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUN0QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7Ozs7UUE5TGhELG9CQUFlLEdBQUcsSUFBSSxDQUFDOzs7Ozs7Ozs7UUFXdkIsU0FBSSxHQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7OztRQUlyRCxZQUFPLEdBQVksS0FBSyxDQUFDOzs7OztRQUt6QixhQUFRLEdBQVksS0FBSyxDQUFDOzs7O1FBUTFCLGFBQVEsR0FBWSxJQUFJLENBQUM7Ozs7UUFJekIsbUJBQWMsR0FBWSxJQUFJLENBQUM7Ozs7UUFJL0IsbUJBQWMsR0FBWSxJQUFJLENBQUM7Ozs7UUFJL0IsaUJBQVksR0FBWSxJQUFJLENBQUM7Ozs7UUFJN0IsYUFBUSxHQUFZLElBQUksQ0FBQzs7OztRQUl6Qix5QkFB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MENBQW9COzs7OztJQUdwQix1Q0FBOEI7Ozs7O0lBRTlCLHdDQUErQjs7Ozs7SUFvSG5CLGlDQUE2Qjs7SUFDN0IsMENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgZm9yd2FyZFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVPYmplY3QgfSBmcm9tICcuLi90aW1lL3RpbWUtb2JqZWN0JztcbmltcG9ydCB7IFRpbWVDb21wb25lbnQgfSBmcm9tICcuLi90aW1lL3RpbWUuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRpbWVGb3JtYXRQYXJzZXIgfSBmcm9tICcuL2Zvcm1hdC90aW1lLXBhcnNlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtdGltZS1waWNrZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90aW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJyxcbiAgICAgICAgY2xhc3M6ICdmZC10aW1lcGlja2VyLWN1c3RvbSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRpbWVQaWNrZXJDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF0sXG4gICAgc3R5bGVVcmxzOiBbJy4vdGltZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC10aW1lLXBpY2tlcicpXG4gICAgdGltZXBpY2tlcmNsYXNzID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEBJbnB1dCBBbiBvYmplY3QgdGhhdCBjb250YWlucyB0aHJlZSBpbnRlZ2VyIHByb3BlcnRpZXM6ICdob3VyJyAocmFuZ2luZyBmcm9tIDAgdG8gMjMpLFxuICAgICAqICdtaW51dGUnIChyYW5naW5nIGZyb20gMCB0byA1OSksIGFuZCAnc2Vjb25kJyAocmFuZ2luZyBmcm9tIDAgdG8gNTkpLiBUaGlzIGlzIHRoZSBtb2RlbCB0aGUgY29tcG9uZW50IGNvbnN1bWVzLiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganNvblxuICAgICAqIHsgaG91cjogMTIsIG1pbnV0ZTogMCwgc2Vjb25kOiAwIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRpbWU6IFRpbWVPYmplY3QgPSB7IGhvdXI6IDAsIG1pbnV0ZTogMCwgc2Vjb25kOiAwIH07XG5cbiAgICAvKiogQElucHV0IFVzZXMgY29tcGFjdCB0aW1lIHBpY2tlci4gKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbXBhY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBASW5wdXQgV2hlbiBzZXQgdG8gdHJ1ZSwgdXNlcyB0aGUgMjQgaG91ciBjbG9jayAoaG91cnMgcmFuZ2luZyBmcm9tIDAgdG8gMjMpXG4gICAgICogYW5kIGRvZXMgbm90IGRpc3BsYXkgYSBwZXJpb2QgY29udHJvbC4gKi9cbiAgICBASW5wdXQoKVxuICAgIG1lcmlkaWFuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQElucHV0IERpc2FibGVzIHRoZSBjb21wb25lbnQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBASW5wdXQgV2hlbiBzZXQgdG8gZmFsc2UsIGhpZGVzIHRoZSBidXR0b25zIHRoYXQgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgdGhlIGNvcnJlc3BvbmRpbmcgaW5wdXQuICovXG4gICAgQElucHV0KClcbiAgICBzcGlubmVyczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQElucHV0IFdoZW4gc2V0IHRvIGZhbHNlLCBoaWRlcyB0aGUgaW5wdXQgZm9yIHNlY29uZHMuICovXG4gICAgQElucHV0KClcbiAgICBkaXNwbGF5U2Vjb25kczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQElucHV0IFdoZW4gc2V0IHRvIGZhbHNlLCBoaWRlcyB0aGUgaW5wdXQgZm9yIG1pbnV0ZXMuICovXG4gICAgQElucHV0KClcbiAgICBkaXNwbGF5TWludXRlczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQElucHV0IFdoZW4gc2V0IHRvIGZhbHNlLCBoaWRlcyB0aGUgaW5wdXQgZm9yIGhvdXJzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheUhvdXJzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRvIHBlcmZvcm0gdmlzdWFsIHZhbGlkYXRpb24gb24gdGhlIHBpY2tlciBpbnB1dC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHZhbGlkYXRlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBBcmlhIGxhYmVsIGZvciB0aGUgdGltZSBwaWNrZXIgaW5wdXQuICovXG4gICAgQElucHV0KClcbiAgICB0aW1lUGlja2VySW5wdXRMYWJlbDogc3RyaW5nID0gJ1RpbWUgcGlja2VyIGlucHV0JztcblxuICAgIC8qKiBXaGV0aGVyIGEgbnVsbCBpbnB1dCBpcyBjb25zaWRlcmVkIHZhbGlkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWxsb3dOdWxsOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBAaGlkZGVuIFdoZXRoZXIgdGhlIGlucHV0IHRpbWUgaXMgdmFsaWQuIEludGVybmFsIHVzZS4gKi9cbiAgICBpc0ludmFsaWRUaW1lSW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZChUaW1lQ29tcG9uZW50KVxuICAgIGNoaWxkOiBUaW1lQ29tcG9uZW50O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwZXJpb2Q6IHN0cmluZztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgaXNPcGVuOiBib29sZWFuO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbkNoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLmdldFBsYWNlaG9sZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgdGltZSBpbnB1dC5cbiAgICAgKi9cbiAgICBnZXRUaW1lKCk6IFRpbWVPYmplY3Qge1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgZ2V0Rm9ybWF0dGVkVGltZSgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID0gdGhpcy50aW1lQWRhcHRlci5mb3JtYXQodGhpcy50aW1lLCB0aGlzLm1lcmlkaWFuKTtcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFRpbWUgIT09IHVuZGVmaW5lZCA/IGZvcm1hdHRlZFRpbWUgOiAnJztcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHRpbWVJbnB1dENoYW5nZWQodGltZUZyb21JbnB1dCkge1xuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy50aW1lQWRhcHRlci5wYXJzZSh0aW1lRnJvbUlucHV0LCB0aGlzLmRpc3BsYXlTZWNvbmRzLCB0aGlzLm1lcmlkaWFuKTtcbiAgICAgICAgaWYgKHRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNJbnZhbGlkVGltZUlucHV0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNoaWxkLnNldERpc3BsYXllZEhvdXIoKTtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IE9iamVjdC5hc3NpZ24odGhpcy50aW1lLCB0aW1lKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbGxvd051bGwgJiYgdGltZUZyb21JbnB1dCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzSW52YWxpZFRpbWVJbnB1dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGQuc2V0RGlzcGxheWVkSG91cigpO1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2Uoe2hvdXI6IG51bGwsIG1pbnV0ZXM6IG51bGwsIHNlY29uZHM6IG51bGx9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0ludmFsaWRUaW1lSW5wdXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBpbnB1dEdyb3VwQ2xpY2tlZCgkZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3BlbiAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbkZvY3VzSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBhZGRPbkJ1dHRvbkNsaWNrZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSAhdGhpcy5pc09wZW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHBvcG92ZXJDbG9zZWQoKSB7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBnZXRQbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgICAgICBsZXQgcmV0VmFsO1xuICAgICAgICBpZiAodGhpcy5kaXNwbGF5U2Vjb25kcykge1xuICAgICAgICAgICAgaWYgKHRoaXMubWVyaWRpYW4pIHtcbiAgICAgICAgICAgICAgICByZXRWYWwgPSAnaGgnICsgJzonICsgJ21tJyArICc6JyArICdzcyBhbS9wbSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFZhbCA9ICdoaCcgKyAnOicgKyAnbW0nICsgJzonICsgJ3NzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1lcmlkaWFuKSB7XG4gICAgICAgICAgICAgICAgcmV0VmFsID0gJ2hoJyArICc6JyArICdtbScgKyAnIGFtL3BtJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0VmFsID0gJ2hoJyArICc6JyArICdtbSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgdGltZUZyb21UaW1lQ29tcG9uZW50Q2hhbmdlZCgpIHtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy50aW1lKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh0aW1lOiBUaW1lT2JqZWN0KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHdyaXRlVmFsdWUodGltZTogVGltZU9iamVjdCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRpbWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHVibGljIHRpbWVBZGFwdGVyOiBUaW1lRm9ybWF0UGFyc2VyKSB7fVxufVxuIl19