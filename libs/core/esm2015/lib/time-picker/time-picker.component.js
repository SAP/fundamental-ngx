/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, forwardRef, HostBinding, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { TimeObject } from '../time/time-object';
import { TimeComponent } from '../time/time.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeFormatParser } from './format/time-parser';
export class TimePickerComponent {
    /**
     * @hidden
     * @param {?} cd
     * @param {?} timeAdapter
     */
    constructor(cd, timeAdapter) {
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
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.placeholder = this.getPlaceholder();
    }
    /**
     * Returns the current value of the time input.
     * @return {?}
     */
    getTime() {
        return this.time;
    }
    /**
     * @hidden
     * @return {?}
     */
    getFormattedTime() {
        /** @type {?} */
        const formattedTime = this.timeAdapter.format(this.time, this.meridian);
        return formattedTime !== undefined ? formattedTime : '';
    }
    /**
     * @hidden
     * @param {?} timeFromInput
     * @return {?}
     */
    timeInputChanged(timeFromInput) {
        /** @type {?} */
        const time = this.timeAdapter.parse(timeFromInput, this.displaySeconds, this.meridian);
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
    }
    /**
     * @hidden
     * @param {?} $event
     * @return {?}
     */
    inputGroupClicked($event) {
        if (!this.isOpen && !this.disabled) {
            $event.stopPropagation();
            this.isOpen = true;
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    onFocusHandler() {
        if (!this.isOpen) {
            this.isOpen = true;
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    addOnButtonClicked() {
        if (!this.disabled) {
            this.isOpen = !this.isOpen;
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    popoverClosed() {
        this.isOpen = false;
    }
    /**
     * @hidden
     * @return {?}
     */
    getPlaceholder() {
        /** @type {?} */
        let retVal;
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
    }
    /**
     * @hidden
     * @return {?}
     */
    timeFromTimeComponentChanged() {
        this.cd.detectChanges();
        this.onChange(this.time);
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     * @param {?} time
     * @return {?}
     */
    writeValue(time) {
        if (!time) {
            return;
        }
        this.time = time;
    }
}
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
                        () => TimePickerComponent)),
                        multi: true
                    }
                ],
                encapsulation: ViewEncapsulation.None,
                styles: [".fd-timepicker-custom{display:inline-block}.fd-timepicker-custom fd-popover{display:block}.fd-timepicker-custom fd-time{width:auto}"]
            }] }
];
/** @nocollapse */
TimePickerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: TimeFormatParser }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkksT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFtQnhELE1BQU0sT0FBTyxtQkFBbUI7Ozs7OztJQWlNNUIsWUFBb0IsRUFBcUIsRUFDdEIsV0FBNkI7UUFENUIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWtCOzs7O1FBOUxoRCxvQkFBZSxHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7O1FBV3ZCLFNBQUksR0FBZSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Ozs7UUFJckQsWUFBTyxHQUFZLEtBQUssQ0FBQzs7Ozs7UUFLekIsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQVExQixhQUFRLEdBQVksSUFBSSxDQUFDOzs7O1FBSXpCLG1CQUFjLEdBQVksSUFBSSxDQUFDOzs7O1FBSS9CLG1CQUFjLEdBQVksSUFBSSxDQUFDOzs7O1FBSS9CLGlCQUFZLEdBQVksSUFBSSxDQUFDOzs7O1FBSTdCLGFBQVEsR0FBWSxJQUFJLENBQUM7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RSxVQUFVOzs7d0JBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLEVBQUM7d0JBQ2xELEtBQUssRUFBRSxJQUFJO3FCQUNkO2lCQUNKO2dCQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN4Qzs7OztZQXRCUSxpQkFBaUI7WUFJakIsZ0JBQWdCOzs7OEJBc0JwQixXQUFXLFNBQUMsc0JBQXNCO21CQVdsQyxLQUFLO3NCQUlMLEtBQUs7dUJBS0wsS0FBSzt1QkFJTCxLQUFLO3VCQUlMLEtBQUs7NkJBSUwsS0FBSzs2QkFJTCxLQUFLOzJCQUlMLEtBQUs7dUJBSUwsS0FBSzttQ0FJTCxLQUFLO3dCQUlMLEtBQUs7b0JBT0wsU0FBUyxTQUFDLGFBQWE7Ozs7Ozs7SUEzRHhCLDhDQUN1Qjs7Ozs7Ozs7OztJQVV2QixtQ0FDcUQ7Ozs7O0lBR3JELHNDQUN5Qjs7Ozs7O0lBSXpCLHVDQUMwQjs7Ozs7SUFHMUIsdUNBQ2tCOzs7OztJQUdsQix1Q0FDeUI7Ozs7O0lBR3pCLDZDQUMrQjs7Ozs7SUFHL0IsNkNBQytCOzs7OztJQUcvQiwyQ0FDNkI7Ozs7O0lBRzdCLHVDQUN5Qjs7Ozs7SUFHekIsbURBQ21EOzs7OztJQUduRCx3Q0FDMEI7Ozs7O0lBRzFCLGlEQUFvQzs7Ozs7SUFHcEMsb0NBQ3FCOzs7OztJQUdyQixxQ0FBZTs7Ozs7SUFHZixxQ0FBZ0I7Ozs7O0lBR2hCLDBDQUFvQjs7Ozs7SUFHcEIsdUNBQThCOzs7OztJQUU5Qix3Q0FBK0I7Ozs7O0lBb0huQixpQ0FBNkI7O0lBQzdCLDBDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIGZvcndhcmRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lT2JqZWN0IH0gZnJvbSAnLi4vdGltZS90aW1lLW9iamVjdCc7XG5pbXBvcnQgeyBUaW1lQ29tcG9uZW50IH0gZnJvbSAnLi4vdGltZS90aW1lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUaW1lRm9ybWF0UGFyc2VyIH0gZnJvbSAnLi9mb3JtYXQvdGltZS1wYXJzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXRpbWUtcGlja2VyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGltZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhibHVyKSc6ICdvblRvdWNoZWQoKScsXG4gICAgICAgIGNsYXNzOiAnZmQtdGltZXBpY2tlci1jdXN0b20nXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUaW1lUGlja2VyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdLFxuICAgIHN0eWxlVXJsczogWycuL3RpbWUtcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBUaW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtdGltZS1waWNrZXInKVxuICAgIHRpbWVwaWNrZXJjbGFzcyA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBASW5wdXQgQW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhyZWUgaW50ZWdlciBwcm9wZXJ0aWVzOiAnaG91cicgKHJhbmdpbmcgZnJvbSAwIHRvIDIzKSxcbiAgICAgKiAnbWludXRlJyAocmFuZ2luZyBmcm9tIDAgdG8gNTkpLCBhbmQgJ3NlY29uZCcgKHJhbmdpbmcgZnJvbSAwIHRvIDU5KS4gVGhpcyBpcyB0aGUgbW9kZWwgdGhlIGNvbXBvbmVudCBjb25zdW1lcy4gRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzb25cbiAgICAgKiB7IGhvdXI6IDEyLCBtaW51dGU6IDAsIHNlY29uZDogMCB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0aW1lOiBUaW1lT2JqZWN0ID0geyBob3VyOiAwLCBtaW51dGU6IDAsIHNlY29uZDogMCB9O1xuXG4gICAgLyoqIEBJbnB1dCBVc2VzIGNvbXBhY3QgdGltZSBwaWNrZXIuICovXG4gICAgQElucHV0KClcbiAgICBjb21wYWN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQElucHV0IFdoZW4gc2V0IHRvIHRydWUsIHVzZXMgdGhlIDI0IGhvdXIgY2xvY2sgKGhvdXJzIHJhbmdpbmcgZnJvbSAwIHRvIDIzKVxuICAgICAqIGFuZCBkb2VzIG5vdCBkaXNwbGF5IGEgcGVyaW9kIGNvbnRyb2wuICovXG4gICAgQElucHV0KClcbiAgICBtZXJpZGlhbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBJbnB1dCBEaXNhYmxlcyB0aGUgY29tcG9uZW50LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogQElucHV0IFdoZW4gc2V0IHRvIGZhbHNlLCBoaWRlcyB0aGUgYnV0dG9ucyB0aGF0IGluY3JlbWVudCBhbmQgZGVjcmVtZW50IHRoZSBjb3JyZXNwb25kaW5nIGlucHV0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3Bpbm5lcnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBJbnB1dCBXaGVuIHNldCB0byBmYWxzZSwgaGlkZXMgdGhlIGlucHV0IGZvciBzZWNvbmRzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheVNlY29uZHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBJbnB1dCBXaGVuIHNldCB0byBmYWxzZSwgaGlkZXMgdGhlIGlucHV0IGZvciBtaW51dGVzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheU1pbnV0ZXM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBJbnB1dCBXaGVuIHNldCB0byBmYWxzZSwgaGlkZXMgdGhlIGlucHV0IGZvciBob3Vycy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc3BsYXlIb3VyczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0byBwZXJmb3JtIHZpc3VhbCB2YWxpZGF0aW9uIG9uIHRoZSBwaWNrZXIgaW5wdXQuICovXG4gICAgQElucHV0KClcbiAgICB2YWxpZGF0ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlIHRpbWUgcGlja2VyIGlucHV0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGltZVBpY2tlcklucHV0TGFiZWw6IHN0cmluZyA9ICdUaW1lIHBpY2tlciBpbnB1dCc7XG5cbiAgICAvKiogV2hldGhlciBhIG51bGwgaW5wdXQgaXMgY29uc2lkZXJlZCB2YWxpZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGFsbG93TnVsbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQGhpZGRlbiBXaGV0aGVyIHRoZSBpbnB1dCB0aW1lIGlzIHZhbGlkLiBJbnRlcm5hbCB1c2UuICovXG4gICAgaXNJbnZhbGlkVGltZUlucHV0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBWaWV3Q2hpbGQoVGltZUNvbXBvbmVudClcbiAgICBjaGlsZDogVGltZUNvbXBvbmVudDtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcGVyaW9kOiBzdHJpbmc7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGlzT3BlbjogYm9vbGVhbjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5nZXRQbGFjZWhvbGRlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIHRpbWUgaW5wdXQuXG4gICAgICovXG4gICAgZ2V0VGltZSgpOiBUaW1lT2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGdldEZvcm1hdHRlZFRpbWUoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkVGltZSA9IHRoaXMudGltZUFkYXB0ZXIuZm9ybWF0KHRoaXMudGltZSwgdGhpcy5tZXJpZGlhbik7XG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRUaW1lICE9PSB1bmRlZmluZWQgPyBmb3JtYXR0ZWRUaW1lIDogJyc7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICB0aW1lSW5wdXRDaGFuZ2VkKHRpbWVGcm9tSW5wdXQpIHtcbiAgICAgICAgY29uc3QgdGltZSA9IHRoaXMudGltZUFkYXB0ZXIucGFyc2UodGltZUZyb21JbnB1dCwgdGhpcy5kaXNwbGF5U2Vjb25kcywgdGhpcy5tZXJpZGlhbik7XG4gICAgICAgIGlmICh0aW1lKSB7XG4gICAgICAgICAgICB0aGlzLmlzSW52YWxpZFRpbWVJbnB1dCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jaGlsZC5zZXREaXNwbGF5ZWRIb3VyKCk7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSBPYmplY3QuYXNzaWduKHRoaXMudGltZSwgdGltZSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRpbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxsb3dOdWxsICYmIHRpbWVGcm9tSW5wdXQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0ludmFsaWRUaW1lSW5wdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkLnNldERpc3BsYXllZEhvdXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHtob3VyOiBudWxsLCBtaW51dGVzOiBudWxsLCBzZWNvbmRzOiBudWxsfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNJbnZhbGlkVGltZUlucHV0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgaW5wdXRHcm91cENsaWNrZWQoJGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW4gJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25Gb2N1c0hhbmRsZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgYWRkT25CdXR0b25DbGlja2VkKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gIXRoaXMuaXNPcGVuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwb3BvdmVyQ2xvc2VkKCkge1xuICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgZ2V0UGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHJldFZhbDtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheVNlY29uZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1lcmlkaWFuKSB7XG4gICAgICAgICAgICAgICAgcmV0VmFsID0gJ2hoJyArICc6JyArICdtbScgKyAnOicgKyAnc3MgYW0vcG0nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRWYWwgPSAnaGgnICsgJzonICsgJ21tJyArICc6JyArICdzcyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZXJpZGlhbikge1xuICAgICAgICAgICAgICAgIHJldFZhbCA9ICdoaCcgKyAnOicgKyAnbW0nICsgJyBhbS9wbSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFZhbCA9ICdoaCcgKyAnOicgKyAnbW0nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHRpbWVGcm9tVGltZUNvbXBvbmVudENoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudGltZSk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodGltZTogVGltZU9iamVjdCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICB3cml0ZVZhbHVlKHRpbWU6IFRpbWVPYmplY3QpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aW1lID0gdGltZTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHB1YmxpYyB0aW1lQWRhcHRlcjogVGltZUZvcm1hdFBhcnNlcikge31cbn1cbiJdfQ==