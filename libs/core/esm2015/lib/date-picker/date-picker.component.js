/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FdDate } from '../calendar/models/fd-date';
import { CalendarService } from '../calendar/calendar.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { DateFormatParser } from './format/date-parser';
/**
 * The datetime picker component is an opinionated composition of the fd-popover and
 * fd-calendar components to accomplish the UI pattern for picking a date.
 *
 * Supports Angular Forms.
 * ```html
 * <fd-date-picker [(ngModel)]="date"></fd-date-picker>
 * ```
 */
export class DatePickerComponent {
    /**
     * @hidden
     * @param {?} dateAdapter
     */
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
        /**
         * @hidden The value of the input
         */
        this.inputFieldDate = null;
        /**
         * @hidden Whether the date input is invalid
         */
        this.isInvalidDateInput = false;
        /**
         * @hidden Whether the date picker is open
         */
        this.isOpen = false;
        /**
         * The type of calendar, 'single' for single date selection or 'range' for a range of dates.
         */
        this.type = 'single';
        /**
         * Date picker input placeholder string
         */
        this.placeholder = 'mm/dd/yyyy';
        /**
         * Whether this is the compact input date picker
         */
        this.compact = false;
        /**
         * The currently selected FdDates model start and end in range mode.
         */
        this.selectedRangeDate = { start: null, end: null };
        /**
         * The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on.
         */
        this.startingDayOfWeek = 1;
        /**
         * Whether to validate the date picker input.
         */
        this.useValidation = true;
        /**
         * Aria label for the datepicker input.
         */
        this.dateInputLabel = 'Date input';
        /**
         * Aria label for the button to show/hide the calendar.
         */
        this.displayCalendarToggleLabel = 'Display calendar toggle';
        /**
         * Whether a null input is considered valid.
         */
        this.allowNull = true;
        /**
         * Actually shown active view one of 'day' | 'month' | 'year' in calendar component
         */
        this.activeView = 'day';
        /**
         *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
         *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
         */
        this.placement = 'bottom-start';
        /**
         * Fired when a new date is selected.
         */
        this.selectedDateChange = new EventEmitter();
        /**
         * Event thrown every time selected first or last date in range mode is changed
         */
        this.selectedRangeDateChange = new EventEmitter();
        /**
         * Event thrown every time calendar active view is changed
         */
        this.activeViewChange = new EventEmitter();
        /**
         * @hidden
         */
        this.onChange = (/**
         * @param {?} selected
         * @return {?}
         */
        (selected) => {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => {
        });
        /**
         * Function used to disable certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.disableFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.disableRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.disableRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.blockRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.blockRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.blockFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
    }
    /**
     * Method that handle calendar active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    handleCalendarActiveViewChange(activeView) {
        this.activeViewChange.emit(activeView);
    }
    /**
     * @hidden
     * @return {?}
     */
    closeFromCalendar() {
        if (this.type === 'single') {
            this.closeCalendar();
        }
    }
    /**
     * Opens the calendar
     * @return {?}
     */
    openCalendar() {
        if (!this.disabled) {
            this.onTouched();
            this.isOpen = true;
        }
    }
    /**
     * Toggles the calendar open or closed
     * @return {?}
     */
    toggleCalendar() {
        this.onTouched();
        this.isOpen = !this.isOpen;
    }
    /**
     * Closes the calendar if it is open
     * @return {?}
     */
    closeCalendar() {
        if (this.isOpen) {
            this.isOpen = false;
        }
    }
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected single date changed
     * @param {?} date
     * @return {?}
     */
    handleSingleDateChange(date) {
        if (date) {
            this.inputFieldDate = this.dateAdapter.format(date);
            this.selectedDate = date;
            this.selectedDateChange.emit(date);
            this.onChange(date);
        }
    }
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected range date changed
     * @param {?} dates
     * @return {?}
     */
    handleRangeDateChange(dates) {
        if (dates &&
            (!CalendarService.datesEqual(this.selectedRangeDate.start, dates.start) ||
                !CalendarService.datesEqual(this.selectedRangeDate.end, dates.end))) {
            this.inputFieldDate = this.dateAdapter.format(dates.start) + this.dateAdapter.rangeDelimiter
                + this.dateAdapter.format(dates.end);
            this.selectedRangeDate = { start: dates.start, end: dates.end };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
        }
    }
    /**
     * @hidden
     * Method that is triggered when the text input is confirmed to ba changed, by clicking enter, or blur
     * @param {?} strDate
     * @return {?}
     */
    handleInputChange(strDate) {
        this.dateStringUpdate(strDate);
    }
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        return this.isModelValid() ? null : {
            dateValidation: {
                valid: false
            }
        };
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
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     * @param {?} selected
     * @return {?}
     */
    writeValue(selected) {
        /** If written value is not defined, null, empty string */
        if (!selected) {
            this.inputFieldDate = '';
            return;
        }
        if (this.type === 'single') {
            /**
             * For single mode, if the date is invalid, model is changed, it refresh currently
             * input field text, but it does not refresh currently displayed day
             */
            selected = (/** @type {?} */ (selected));
            this.selectedDate = selected;
            if (this.isModelValid()) {
                this.inputFieldDate = this.dateAdapter.format(selected);
                this.calendarComponent.setCurrentlyDisplayed(this.selectedDate);
            }
            else {
                this.inputFieldDate = '';
            }
        }
        else {
            /**
             * For range mode, if the date is invalid, model is changed, but it does not refresh currently
             * displayed day view, or input field text
             */
            selected = (/** @type {?} */ (selected));
            if (selected.start) {
                this.selectedRangeDate = { start: selected.start, end: selected.end };
                if (this.isModelValid()) {
                    this.calendarComponent.setCurrentlyDisplayed(this.selectedRangeDate.start);
                    this.inputFieldDate = this.dateAdapter.format(selected.start) +
                        this.dateAdapter.rangeDelimiter + this.dateAdapter.format(selected.end);
                }
                else {
                    this.inputFieldDate = '';
                }
            }
            else {
                this.inputFieldDate = '';
            }
        }
        this.isInvalidDateInput = !this.isModelValid();
    }
    /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput
     * @param {?} date
     * @return {?}
     */
    dateStringUpdate(date) {
        /** Case when there is single mode */
        if (this.type === 'single') {
            /** @type {?} */
            const fdDate = this.dateAdapter.parse(date);
            /**
             * Check if dates are equal, if dates are the same there is no need to make any changes
             * Date in model is changed no matter if the parsed date fro string is valid or not.
             */
            if (!CalendarService.datesEqual(fdDate, this.selectedDate)) {
                this.isInvalidDateInput = !fdDate.isDateValid();
                this.selectedDate = fdDate;
                this.onChange(this.selectedDate);
                this.selectedDateChange.emit(this.selectedDate);
                /** Check if date is valid, if it's not, there is no need to refresh calendar */
                if (!this.isInvalidDateInput) {
                    this.calendarComponent.setCurrentlyDisplayed(fdDate);
                }
            }
            /** Case when there is range mode */
        }
        else {
            /** @type {?} */
            const currentDates = date.split(this.dateAdapter.rangeDelimiter);
            /** @type {?} */
            const firstDate = this.dateAdapter.parse(currentDates[0]);
            /** @type {?} */
            const secondDate = this.dateAdapter.parse(currentDates[1]);
            /**
             * Check if dates are equal, if dates are the same there is no need to make any changes
             * Date in model is changed no matter if the parsed dates from string are valid or not.
             */
            if (!CalendarService.datesEqual(firstDate, this.selectedRangeDate.start) ||
                !CalendarService.datesEqual(secondDate, this.selectedRangeDate.end)) {
                this.isInvalidDateInput = !firstDate.isDateValid() || !secondDate.isDateValid();
                /** If the end date is before the start date, there is need to replace them  */
                if ((firstDate.getTimeStamp() > secondDate.getTimeStamp()) && secondDate.isDateValid()) {
                    this.selectedRangeDate = { start: secondDate, end: firstDate };
                }
                else {
                    this.selectedRangeDate = { start: firstDate, end: secondDate };
                }
                this.selectedRangeDateChange.emit(this.selectedRangeDate);
                this.onChange({ start: this.selectedRangeDate.start, end: this.selectedRangeDate.end });
                /** Check if dates are valid, if it's not, there is no need o refresh calendar */
                if (!this.isInvalidDateInput) {
                    this.calendarComponent.setCurrentlyDisplayed(this.selectedRangeDate.start);
                }
            }
        }
        if (!date && this.allowNull) {
            this.isInvalidDateInput = false;
        }
    }
    /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    isModelValid() {
        if (this.type === 'single') {
            return this.selectedDate &&
                this.selectedDate instanceof FdDate &&
                this.selectedDate.isDateValid();
        }
        else {
            return this.selectedRangeDate &&
                (this.selectedRangeDate.start &&
                    this.selectedRangeDate.start instanceof FdDate &&
                    this.selectedRangeDate.start.isDateValid()) && (this.selectedRangeDate.end &&
                this.selectedRangeDate.end instanceof FdDate &&
                this.selectedRangeDate.end.isDateValid());
        }
    }
}
DatePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-date-picker',
                template: "<fd-popover [(isOpen)]=\"isOpen\"\n            (isOpenChange)=\"handleInputChange(datePicker.value)\"\n            [triggers]=\"[]\"\n            [placement]=\"placement\"\n            [closeOnEscapeKey]=\"true\"\n            [disabled]=\"disabled\">\n    <fd-popover-control>\n        <div class=\"fd-input-group fd-input-group--after\"\n             [ngClass]=\"{'fd-input-group--compact' : compact}\">\n            <input #datePicker\n                   type=\"text\"\n                   [attr.aria-label]=\"dateInputLabel\"\n                   [value]=\"inputFieldDate\"\n                   [placeholder]=\"placeholder\"\n                   (keyup.enter)=\"handleInputChange(datePicker.value)\"\n                   (click)=\"openCalendar()\"\n                   [disabled]=\"disabled\"\n                   [ngClass]=\"{ 'fd-input--compact': compact, 'is-invalid': isInvalidDateInput && useValidation }\">\n            <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\">\n                    <button [disabled]=\"disabled\" class=\"fd-popover__control fd-button--icon fd-button--light sap-icon--calendar\"\n                            (click)=\"toggleCalendar()\" [attr.aria-label]=\"displayCalendarToggleLabel\"\n                            [attr.aria-expanded]=\"isOpen\" type=\"button\"></button>\n            </span>\n        </div>\n    </fd-popover-control>\n    <fd-popover-body\n        [style.display]=\"'block'\"\n        [attr.aria-expanded]=\"isOpen\"\n        [attr.aria-hidden]=\"!isOpen\">\n        <fd-calendar (closeCalendar)=\"closeFromCalendar()\"\n                     [activeView]=\"activeView\"\n                     (activeViewChange)=\"handleCalendarActiveViewChange($event)\"\n                     [calType]=\"type\"\n                     [disableFunction]=\"disableFunction ? disableFunction : null\"\n                     [blockFunction]=\"blockFunction ? blockFunction : null\"\n                     [disableRangeStartFunction]=\"disableRangeStartFunction ? disableRangeStartFunction : null\"\n                     [disableRangeEndFunction]=\"disableRangeEndFunction ? disableRangeEndFunction : null\"\n                     [blockRangeStartFunction]=\"blockRangeStartFunction ? blockRangeStartFunction : null\"\n                     [blockRangeEndFunction]=\"blockRangeEndFunction ? blockRangeEndFunction : null\"\n                     [selectedDate]=\"selectedDate\"\n                     [selectedRangeDate]=\"selectedRangeDate\"\n                     (selectedRangeDateChange)=\"handleRangeDateChange($event)\"\n                     (selectedDateChange)=\"handleSingleDateChange($event)\"\n                     [startingDayOfWeek]=\"startingDayOfWeek\"></fd-calendar>\n    </fd-popover-body>\n</fd-popover>\n",
                host: {
                    '(blur)': 'onTouched()',
                    '[class.fd-date-picker]': 'true',
                    '[class.fd-date-picker-custom]': 'true'
                },
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DatePickerComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DatePickerComponent)),
                        multi: true
                    }
                ],
                encapsulation: ViewEncapsulation.None,
                styles: [".fd-date-picker-custom{display:inline-block}.fd-date-picker-custom fd-popover{display:block}"]
            }] }
];
/** @nocollapse */
DatePickerComponent.ctorParameters = () => [
    { type: DateFormatParser }
];
DatePickerComponent.propDecorators = {
    calendarComponent: [{ type: ViewChild, args: [CalendarComponent,] }],
    type: [{ type: Input }],
    placeholder: [{ type: Input }],
    compact: [{ type: Input }],
    selectedDate: [{ type: Input }],
    selectedRangeDate: [{ type: Input }],
    startingDayOfWeek: [{ type: Input }],
    useValidation: [{ type: Input }],
    dateInputLabel: [{ type: Input }],
    displayCalendarToggleLabel: [{ type: Input }],
    allowNull: [{ type: Input }],
    activeView: [{ type: Input }],
    placement: [{ type: Input }],
    disabled: [{ type: Input }],
    selectedDateChange: [{ type: Output }],
    selectedRangeDateChange: [{ type: Output }],
    activeViewChange: [{ type: Output }],
    disableFunction: [{ type: Input }],
    disableRangeStartFunction: [{ type: Input }],
    disableRangeEndFunction: [{ type: Input }],
    blockRangeStartFunction: [{ type: Input }],
    blockRangeEndFunction: [{ type: Input }],
    blockFunction: [{ type: Input }]
};
if (false) {
    /**
     * @hidden The value of the input
     * @type {?}
     */
    DatePickerComponent.prototype.inputFieldDate;
    /**
     * @hidden Whether the date input is invalid
     * @type {?}
     */
    DatePickerComponent.prototype.isInvalidDateInput;
    /**
     * @hidden Whether the date picker is open
     * @type {?}
     */
    DatePickerComponent.prototype.isOpen;
    /**
     * @hidden
     * @type {?}
     */
    DatePickerComponent.prototype.calendarComponent;
    /**
     * The type of calendar, 'single' for single date selection or 'range' for a range of dates.
     * @type {?}
     */
    DatePickerComponent.prototype.type;
    /**
     * Date picker input placeholder string
     * @type {?}
     */
    DatePickerComponent.prototype.placeholder;
    /**
     * Whether this is the compact input date picker
     * @type {?}
     */
    DatePickerComponent.prototype.compact;
    /**
     * The currently selected CalendarDay model
     * @type {?}
     */
    DatePickerComponent.prototype.selectedDate;
    /**
     * The currently selected FdDates model start and end in range mode.
     * @type {?}
     */
    DatePickerComponent.prototype.selectedRangeDate;
    /**
     * The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on.
     * @type {?}
     */
    DatePickerComponent.prototype.startingDayOfWeek;
    /**
     * Whether to validate the date picker input.
     * @type {?}
     */
    DatePickerComponent.prototype.useValidation;
    /**
     * Aria label for the datepicker input.
     * @type {?}
     */
    DatePickerComponent.prototype.dateInputLabel;
    /**
     * Aria label for the button to show/hide the calendar.
     * @type {?}
     */
    DatePickerComponent.prototype.displayCalendarToggleLabel;
    /**
     * Whether a null input is considered valid.
     * @type {?}
     */
    DatePickerComponent.prototype.allowNull;
    /**
     * Actually shown active view one of 'day' | 'month' | 'year' in calendar component
     * @type {?}
     */
    DatePickerComponent.prototype.activeView;
    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     * @type {?}
     */
    DatePickerComponent.prototype.placement;
    /**
     * Whether the date picker is disabled.
     * @type {?}
     */
    DatePickerComponent.prototype.disabled;
    /**
     * Fired when a new date is selected.
     * @type {?}
     */
    DatePickerComponent.prototype.selectedDateChange;
    /**
     * Event thrown every time selected first or last date in range mode is changed
     * @type {?}
     */
    DatePickerComponent.prototype.selectedRangeDateChange;
    /**
     * Event thrown every time calendar active view is changed
     * @type {?}
     */
    DatePickerComponent.prototype.activeViewChange;
    /**
     * @hidden
     * @type {?}
     */
    DatePickerComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    DatePickerComponent.prototype.onTouched;
    /**
     * Function used to disable certain dates in the calendar.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatePickerComponent.prototype.disableFunction;
    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatePickerComponent.prototype.disableRangeStartFunction;
    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatePickerComponent.prototype.disableRangeEndFunction;
    /**
     * Function used to block certain dates in the calendar for the range start selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatePickerComponent.prototype.blockRangeStartFunction;
    /**
     * Function used to block certain dates in the calendar for the range end selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatePickerComponent.prototype.blockRangeEndFunction;
    /**
     * Function used to block certain dates in the calendar.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatePickerComponent.prototype.blockFunction;
    /** @type {?} */
    DatePickerComponent.prototype.dateAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQUUsU0FBUyxFQUNqQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUF5QyxhQUFhLEVBQUUsaUJBQWlCLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwSCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7Ozs7O0FBa0N4RCxNQUFNLE9BQU8sbUJBQW1COzs7OztJQTBONUIsWUFDVyxXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7Ozs7UUF4TnhDLG1CQUFjLEdBQUcsSUFBSSxDQUFDOzs7O1FBR3RCLHVCQUFrQixHQUFZLEtBQUssQ0FBQzs7OztRQUdwQyxXQUFNLEdBQVksS0FBSyxDQUFDOzs7O1FBT3hCLFNBQUksR0FBaUIsUUFBUSxDQUFDOzs7O1FBSTlCLGdCQUFXLEdBQVcsWUFBWSxDQUFDOzs7O1FBSW5DLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUFRbEIsc0JBQWlCLEdBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUM7Ozs7UUFJbkUsc0JBQWlCLEdBQWUsQ0FBQyxDQUFDOzs7O1FBSWxDLGtCQUFhLEdBQVksSUFBSSxD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OENBR0U7Ozs7OztJQU1GLHdEQUdFOzs7Ozs7SUFNRixzREFHRTs7Ozs7O0lBTUYsc0RBR0U7Ozs7OztJQU1GLG9EQUdFOzs7Ozs7SUFNRiw0Q0FHRTs7SUE4RUUsMENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LCBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhclR5cGUsIERheXNPZldlZWssIEZkQ2FsZW5kYXJWaWV3IH0gZnJvbSAnLi4vY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTElEQVRPUlMsIE5HX1ZBTFVFX0FDQ0VTU09SLCBWYWxpZGF0b3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQbGFjZW1lbnQgfSBmcm9tICdwb3BwZXIuanMnO1xuaW1wb3J0IHsgRmREYXRlIH0gZnJvbSAnLi4vY2FsZW5kYXIvbW9kZWxzL2ZkLWRhdGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2FsZW5kYXIvY2FsZW5kYXIuc2VydmljZSc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbXBvbmVudCB9IGZyb20gJy4uL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZFJhbmdlRGF0ZSB9IGZyb20gJy4uL2NhbGVuZGFyL21vZGVscy9mZC1yYW5nZS1kYXRlJztcbmltcG9ydCB7IERhdGVGb3JtYXRQYXJzZXIgfSBmcm9tICcuL2Zvcm1hdC9kYXRlLXBhcnNlcic7XG5cbi8qKlxuICogVGhlIGRhdGV0aW1lIHBpY2tlciBjb21wb25lbnQgaXMgYW4gb3BpbmlvbmF0ZWQgY29tcG9zaXRpb24gb2YgdGhlIGZkLXBvcG92ZXIgYW5kXG4gKiBmZC1jYWxlbmRhciBjb21wb25lbnRzIHRvIGFjY29tcGxpc2ggdGhlIFVJIHBhdHRlcm4gZm9yIHBpY2tpbmcgYSBkYXRlLlxuICpcbiAqIFN1cHBvcnRzIEFuZ3VsYXIgRm9ybXMuXG4gKiBgYGBodG1sXG4gKiA8ZmQtZGF0ZS1waWNrZXIgWyhuZ01vZGVsKV09XCJkYXRlXCI+PC9mZC1kYXRlLXBpY2tlcj5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLWRhdGUtcGlja2VyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2RhdGUtcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJyxcbiAgICAgICAgJ1tjbGFzcy5mZC1kYXRlLXBpY2tlcl0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MuZmQtZGF0ZS1waWNrZXItY3VzdG9tXSc6ICd0cnVlJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZVBpY2tlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZVBpY2tlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcblxuICAgIC8qKiBAaGlkZGVuIFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgKi9cbiAgICBpbnB1dEZpZWxkRGF0ZSA9IG51bGw7XG5cbiAgICAvKiogQGhpZGRlbiBXaGV0aGVyIHRoZSBkYXRlIGlucHV0IGlzIGludmFsaWQgKi9cbiAgICBpc0ludmFsaWREYXRlSW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBAaGlkZGVuIFdoZXRoZXIgdGhlIGRhdGUgcGlja2VyIGlzIG9wZW4gKi9cbiAgICBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZChDYWxlbmRhckNvbXBvbmVudCkgY2FsZW5kYXJDb21wb25lbnQ6IENhbGVuZGFyQ29tcG9uZW50O1xuXG4gICAgLyoqIFRoZSB0eXBlIG9mIGNhbGVuZGFyLCAnc2luZ2xlJyBmb3Igc2luZ2xlIGRhdGUgc2VsZWN0aW9uIG9yICdyYW5nZScgZm9yIGEgcmFuZ2Ugb2YgZGF0ZXMuICovXG4gICAgQElucHV0KClcbiAgICB0eXBlOiBDYWxlbmRhclR5cGUgPSAnc2luZ2xlJztcblxuICAgIC8qKiBEYXRlIHBpY2tlciBpbnB1dCBwbGFjZWhvbGRlciBzdHJpbmcgKi9cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnbW0vZGQveXl5eSc7XG5cbiAgICAvKiogV2hldGhlciB0aGlzIGlzIHRoZSBjb21wYWN0IGlucHV0IGRhdGUgcGlja2VyICovXG4gICAgQElucHV0KClcbiAgICBjb21wYWN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBDYWxlbmRhckRheSBtb2RlbCAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0ZWREYXRlOiBGZERhdGU7XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBGZERhdGVzIG1vZGVsIHN0YXJ0IGFuZCBlbmQgaW4gcmFuZ2UgbW9kZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWxlY3RlZFJhbmdlRGF0ZTogRmRSYW5nZURhdGUgPSB7IHN0YXJ0OiBudWxsLCBlbmQ6IG51bGwgfTtcblxuICAgIC8qKiBUaGUgZGF5IG9mIHRoZSB3ZWVrIHRoZSBjYWxlbmRhciBzaG91bGQgc3RhcnQgb24uIDEgcmVwcmVzZW50cyBTdW5kYXksIDIgaXMgTW9uZGF5LCAzIGlzIFR1ZXNkYXksIGFuZCBzbyBvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIHN0YXJ0aW5nRGF5T2ZXZWVrOiBEYXlzT2ZXZWVrID0gMTtcblxuICAgIC8qKiBXaGV0aGVyIHRvIHZhbGlkYXRlIHRoZSBkYXRlIHBpY2tlciBpbnB1dC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHVzZVZhbGlkYXRpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEFyaWEgbGFiZWwgZm9yIHRoZSBkYXRlcGlja2VyIGlucHV0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGF0ZUlucHV0TGFiZWw6IHN0cmluZyA9ICdEYXRlIGlucHV0JztcblxuICAgIC8qKiBBcmlhIGxhYmVsIGZvciB0aGUgYnV0dG9uIHRvIHNob3cvaGlkZSB0aGUgY2FsZW5kYXIuICovXG4gICAgQElucHV0KClcbiAgICBkaXNwbGF5Q2FsZW5kYXJUb2dnbGVMYWJlbDogc3RyaW5nID0gJ0Rpc3BsYXkgY2FsZW5kYXIgdG9nZ2xlJztcblxuICAgIC8qKiBXaGV0aGVyIGEgbnVsbCBpbnB1dCBpcyBjb25zaWRlcmVkIHZhbGlkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWxsb3dOdWxsOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBBY3R1YWxseSBzaG93biBhY3RpdmUgdmlldyBvbmUgb2YgJ2RheScgfCAnbW9udGgnIHwgJ3llYXInIGluIGNhbGVuZGFyIGNvbXBvbmVudCovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgYWN0aXZlVmlldzogRmRDYWxlbmRhclZpZXcgPSAnZGF5JztcblxuICAgIC8qKlxuICAgICAqICBUaGUgcGxhY2VtZW50IG9mIHRoZSBwb3BvdmVyLiBJdCBjYW4gYmUgb25lIG9mOiB0b3AsIHRvcC1zdGFydCwgdG9wLWVuZCwgYm90dG9tLFxuICAgICAqICBib3R0b20tc3RhcnQsIGJvdHRvbS1lbmQsIHJpZ2h0LCByaWdodC1zdGFydCwgcmlnaHQtZW5kLCBsZWZ0LCBsZWZ0LXN0YXJ0LCBsZWZ0LWVuZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlbWVudDogUGxhY2VtZW50ID0gJ2JvdHRvbS1zdGFydCc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZGF0ZSBwaWNrZXIgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBGaXJlZCB3aGVuIGEgbmV3IGRhdGUgaXMgc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHNlbGVjdGVkRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPEZkRGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZkRGF0ZT4oKTtcblxuICAgIC8qKiBFdmVudCB0aHJvd24gZXZlcnkgdGltZSBzZWxlY3RlZCBmaXJzdCBvciBsYXN0IGRhdGUgaW4gcmFuZ2UgbW9kZSBpcyBjaGFuZ2VkICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHNlbGVjdGVkUmFuZ2VEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmRSYW5nZURhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxGZFJhbmdlRGF0ZT4oKTtcblxuICAgIC8qKiBFdmVudCB0aHJvd24gZXZlcnkgdGltZSBjYWxlbmRhciBhY3RpdmUgdmlldyBpcyBjaGFuZ2VkICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGFjdGl2ZVZpZXdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGZENhbGVuZGFyVmlldz4gPSBuZXcgRXZlbnRFbWl0dGVyPEZkQ2FsZW5kYXJWaWV3PigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbkNoYW5nZTogYW55ID0gKHNlbGVjdGVkOiBhbnkpID0+IHtcbiAgICB9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBkaXNhYmxlIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlRnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gZGlzYWJsZSBjZXJ0YWluIGRhdGVzIGluIHRoZSBjYWxlbmRhciBmb3IgdGhlIHJhbmdlIHN0YXJ0IHNlbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZVJhbmdlU3RhcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGZkRGF0ZTogRmREYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBkaXNhYmxlIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyIGZvciB0aGUgcmFuZ2UgZW5kIHNlbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZVJhbmdlRW5kRnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gYmxvY2sgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIgZm9yIHRoZSByYW5nZSBzdGFydCBzZWxlY3Rpb24uXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJsb2NrUmFuZ2VTdGFydEZ1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGJsb2NrIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyIGZvciB0aGUgcmFuZ2UgZW5kIHNlbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYmxvY2tSYW5nZUVuZEZ1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGJsb2NrIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBibG9ja0Z1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCBoYW5kbGUgY2FsZW5kYXIgYWN0aXZlIHZpZXcgY2hhbmdlIGFuZCB0aHJvd3MgZXZlbnQuXG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZUNhbGVuZGFyQWN0aXZlVmlld0NoYW5nZShhY3RpdmVWaWV3OiBGZENhbGVuZGFyVmlldyk6IHZvaWQge1xuICAgICAgICB0aGlzLmFjdGl2ZVZpZXdDaGFuZ2UuZW1pdChhY3RpdmVWaWV3KTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHB1YmxpYyBjbG9zZUZyb21DYWxlbmRhcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VDYWxlbmRhcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE9wZW5zIHRoZSBjYWxlbmRhciAqL1xuICAgIG9wZW5DYWxlbmRhcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRvZ2dsZXMgdGhlIGNhbGVuZGFyIG9wZW4gb3IgY2xvc2VkICovXG4gICAgcHVibGljIHRvZ2dsZUNhbGVuZGFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLmlzT3BlbiA9ICF0aGlzLmlzT3BlbjtcbiAgICB9XG5cbiAgICAvKiogQ2xvc2VzIHRoZSBjYWxlbmRhciBpZiBpdCBpcyBvcGVuICovXG4gICAgcHVibGljIGNsb3NlQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBNZXRob2QgdGhhdCBpcyB0cmlnZ2VyZWQgYnkgZXZlbnRzIGZyb20gY2FsZW5kYXIgY29tcG9uZW50LCB3aGVuIHRoZXJlIGlzIHNlbGVjdGVkIHNpbmdsZSBkYXRlIGNoYW5nZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlU2luZ2xlRGF0ZUNoYW5nZShkYXRlOiBGZERhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGaWVsZERhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdChkYXRlKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKGRhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIE1ldGhvZCB0aGF0IGlzIHRyaWdnZXJlZCBieSBldmVudHMgZnJvbSBjYWxlbmRhciBjb21wb25lbnQsIHdoZW4gdGhlcmUgaXMgc2VsZWN0ZWQgcmFuZ2UgZGF0ZSBjaGFuZ2VkXG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZVJhbmdlRGF0ZUNoYW5nZShkYXRlczogRmRSYW5nZURhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGVzICYmXG4gICAgICAgICAgICAoIUNhbGVuZGFyU2VydmljZS5kYXRlc0VxdWFsKHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQsIGRhdGVzLnN0YXJ0KSB8fFxuICAgICAgICAgICAgICAgICFDYWxlbmRhclNlcnZpY2UuZGF0ZXNFcXVhbCh0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLmVuZCwgZGF0ZXMuZW5kKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0RmllbGREYXRlID0gdGhpcy5kYXRlQWRhcHRlci5mb3JtYXQoZGF0ZXMuc3RhcnQpICsgdGhpcy5kYXRlQWRhcHRlci5yYW5nZURlbGltaXRlclxuICAgICAgICAgICAgICAgICsgdGhpcy5kYXRlQWRhcHRlci5mb3JtYXQoZGF0ZXMuZW5kKVxuICAgICAgICAgICAgO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSA9IHsgc3RhcnQ6IGRhdGVzLnN0YXJ0LCBlbmQ6IGRhdGVzLmVuZCB9O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBNZXRob2QgdGhhdCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgdGV4dCBpbnB1dCBpcyBjb25maXJtZWQgdG8gYmEgY2hhbmdlZCwgYnkgY2xpY2tpbmcgZW50ZXIsIG9yIGJsdXJcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlSW5wdXRDaGFuZ2Uoc3RyRGF0ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0ZVN0cmluZ1VwZGF0ZShzdHJEYXRlKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGF0ZUFkYXB0ZXI6IERhdGVGb3JtYXRQYXJzZXJcbiAgICApIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogRnVuY3Rpb24gdGhhdCBpbXBsZW1lbnRzIFZhbGlkYXRvciBJbnRlcmZhY2UsIGFkZHMgdmFsaWRhdGlvbiBzdXBwb3J0IGZvciBmb3Jtc1xuICAgICAqL1xuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogYW55XG4gICAgfSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzTW9kZWxWYWxpZCgpID8gbnVsbCA6IHtcbiAgICAgICAgICAgIGRhdGVWYWxpZGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChzZWxlY3RlZDogYW55KSA9PiB7IHZvaWQgfSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcHJvdmlkZXMgc3VwcG9ydCBmb3IgQ29udHJvbFZhbHVlQWNjZXNzb3IgdGhhdCBhbGxvd3MgdG8gdXNlIFsobmdNb2RlbCldIG9yIGZvcm1zXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZShzZWxlY3RlZDogRmRSYW5nZURhdGUgfCBGZERhdGUpOiB2b2lkIHtcbiAgICAgICAgLyoqIElmIHdyaXR0ZW4gdmFsdWUgaXMgbm90IGRlZmluZWQsIG51bGwsIGVtcHR5IHN0cmluZyAqL1xuICAgICAgICBpZiAoIXNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0RmllbGREYXRlID0gJyc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRm9yIHNpbmdsZSBtb2RlLCBpZiB0aGUgZGF0ZSBpcyBpbnZhbGlkLCBtb2RlbCBpcyBjaGFuZ2VkLCBpdCByZWZyZXNoIGN1cnJlbnRseVxuICAgICAgICAgICAgICogaW5wdXQgZmllbGQgdGV4dCwgYnV0IGl0IGRvZXMgbm90IHJlZnJlc2ggY3VycmVudGx5IGRpc3BsYXllZCBkYXlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSA8RmREYXRlPnNlbGVjdGVkO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBzZWxlY3RlZDtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW9kZWxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dEZpZWxkRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuZm9ybWF0KHNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyQ29tcG9uZW50LnNldEN1cnJlbnRseURpc3BsYXllZCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRGaWVsZERhdGUgPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBGb3IgcmFuZ2UgbW9kZSwgaWYgdGhlIGRhdGUgaXMgaW52YWxpZCwgbW9kZWwgaXMgY2hhbmdlZCwgYnV0IGl0IGRvZXMgbm90IHJlZnJlc2ggY3VycmVudGx5XG4gICAgICAgICAgICAgKiBkaXNwbGF5ZWQgZGF5IHZpZXcsIG9yIGlucHV0IGZpZWxkIHRleHRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSA8RmRSYW5nZURhdGU+c2VsZWN0ZWQ7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZC5zdGFydCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUgPSB7IHN0YXJ0OiBzZWxlY3RlZC5zdGFydCwgZW5kOiBzZWxlY3RlZC5lbmQgfTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTW9kZWxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJDb21wb25lbnQuc2V0Q3VycmVudGx5RGlzcGxheWVkKHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0RmllbGREYXRlID0gdGhpcy5kYXRlQWRhcHRlci5mb3JtYXQoc2VsZWN0ZWQuc3RhcnQpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIucmFuZ2VEZWxpbWl0ZXIgKyB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdChzZWxlY3RlZC5lbmQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRGaWVsZERhdGUgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRGaWVsZERhdGUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzSW52YWxpZERhdGVJbnB1dCA9ICF0aGlzLmlzTW9kZWxWYWxpZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBNZXRob2QsIHdoaWNoIGlzIHJlc3BvbnNpYmxlIGZvciB0cmFuc2Zvcm1pbmcgc3RyaW5nIHRvIGRhdGUsIGRlcGVuZGluZyBvbiB0eXBlIG9yXG4gICAgICogdmFsaWRhdGlvbiB0aGUgcmVzdWx0cyBhcmUgZGlmZmVyZW50LiBJdCBhbHNvIGNoYW5nZXMgdG8gc3RhdGUgb2YgaXNJbnZhbGlkRGF0ZUlucHV0XG4gICAgICovXG4gICAgZGF0ZVN0cmluZ1VwZGF0ZShkYXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgLyoqIENhc2Ugd2hlbiB0aGVyZSBpcyBzaW5nbGUgbW9kZSAqL1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnc2luZ2xlJykge1xuXG4gICAgICAgICAgICBjb25zdCBmZERhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLnBhcnNlKGRhdGUpO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENoZWNrIGlmIGRhdGVzIGFyZSBlcXVhbCwgaWYgZGF0ZXMgYXJlIHRoZSBzYW1lIHRoZXJlIGlzIG5vIG5lZWQgdG8gbWFrZSBhbnkgY2hhbmdlc1xuICAgICAgICAgICAgICogRGF0ZSBpbiBtb2RlbCBpcyBjaGFuZ2VkIG5vIG1hdHRlciBpZiB0aGUgcGFyc2VkIGRhdGUgZnJvIHN0cmluZyBpcyB2YWxpZCBvciBub3QuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICghQ2FsZW5kYXJTZXJ2aWNlLmRhdGVzRXF1YWwoZmREYXRlLCB0aGlzLnNlbGVjdGVkRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzSW52YWxpZERhdGVJbnB1dCA9ICFmZERhdGUuaXNEYXRlVmFsaWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGZkRGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWREYXRlKTtcblxuICAgICAgICAgICAgICAgIC8qKiBDaGVjayBpZiBkYXRlIGlzIHZhbGlkLCBpZiBpdCdzIG5vdCwgdGhlcmUgaXMgbm8gbmVlZCB0byByZWZyZXNoIGNhbGVuZGFyICovXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzSW52YWxpZERhdGVJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyQ29tcG9uZW50LnNldEN1cnJlbnRseURpc3BsYXllZChmZERhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvKiogQ2FzZSB3aGVuIHRoZXJlIGlzIHJhbmdlIG1vZGUgKi9cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlcyA9IGRhdGUuc3BsaXQodGhpcy5kYXRlQWRhcHRlci5yYW5nZURlbGltaXRlcik7XG4gICAgICAgICAgICBjb25zdCBmaXJzdERhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLnBhcnNlKGN1cnJlbnREYXRlc1swXSk7XG4gICAgICAgICAgICBjb25zdCBzZWNvbmREYXRlID0gdGhpcy5kYXRlQWRhcHRlci5wYXJzZShjdXJyZW50RGF0ZXNbMV0pO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENoZWNrIGlmIGRhdGVzIGFyZSBlcXVhbCwgaWYgZGF0ZXMgYXJlIHRoZSBzYW1lIHRoZXJlIGlzIG5vIG5lZWQgdG8gbWFrZSBhbnkgY2hhbmdlc1xuICAgICAgICAgICAgICogRGF0ZSBpbiBtb2RlbCBpcyBjaGFuZ2VkIG5vIG1hdHRlciBpZiB0aGUgcGFyc2VkIGRhdGVzIGZyb20gc3RyaW5nIGFyZSB2YWxpZCBvciBub3QuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICghQ2FsZW5kYXJTZXJ2aWNlLmRhdGVzRXF1YWwoZmlyc3REYXRlLCB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0KSB8fFxuICAgICAgICAgICAgICAgICFDYWxlbmRhclNlcnZpY2UuZGF0ZXNFcXVhbChzZWNvbmREYXRlLCB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLmVuZCkpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuaXNJbnZhbGlkRGF0ZUlucHV0ID0gIWZpcnN0RGF0ZS5pc0RhdGVWYWxpZCgpIHx8ICFzZWNvbmREYXRlLmlzRGF0ZVZhbGlkKCk7XG5cbiAgICAgICAgICAgICAgICAvKiogSWYgdGhlIGVuZCBkYXRlIGlzIGJlZm9yZSB0aGUgc3RhcnQgZGF0ZSwgdGhlcmUgaXMgbmVlZCB0byByZXBsYWNlIHRoZW0gICovXG4gICAgICAgICAgICAgICAgaWYgKChmaXJzdERhdGUuZ2V0VGltZVN0YW1wKCkgPiBzZWNvbmREYXRlLmdldFRpbWVTdGFtcCgpKSAmJiBzZWNvbmREYXRlLmlzRGF0ZVZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSA9IHsgc3RhcnQ6IHNlY29uZERhdGUsIGVuZDogZmlyc3REYXRlIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSA9IHsgc3RhcnQ6IGZpcnN0RGF0ZSwgZW5kOiBzZWNvbmREYXRlIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoeyBzdGFydDogdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5zdGFydCwgZW5kOiB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLmVuZCB9KTtcblxuICAgICAgICAgICAgICAgIC8qKiBDaGVjayBpZiBkYXRlcyBhcmUgdmFsaWQsIGlmIGl0J3Mgbm90LCB0aGVyZSBpcyBubyBuZWVkIG8gcmVmcmVzaCBjYWxlbmRhciAqL1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0ludmFsaWREYXRlSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhckNvbXBvbmVudC5zZXRDdXJyZW50bHlEaXNwbGF5ZWQodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5zdGFydCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkYXRlICYmIHRoaXMuYWxsb3dOdWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlzSW52YWxpZERhdGVJbnB1dCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE1ldGhvZCB0aGF0IHByb3ZpZGVzIGluZm9ybWF0aW9uIGlmIG1vZGVsIHNlbGVjdGVkIGRhdGUvZGF0ZXMgaGF2ZSBwcm9wZXJseSB0eXBlcyBhbmQgYXJlIHZhbGlkICovXG4gICAgcHVibGljIGlzTW9kZWxWYWxpZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRGF0ZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlIGluc3RhbmNlb2YgRmREYXRlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUuaXNEYXRlVmFsaWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0ICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQgaW5zdGFuY2VvZiBGZERhdGUgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5zdGFydC5pc0RhdGVWYWxpZCgpXG4gICAgICAgICAgICAgICAgKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kIGluc3RhbmNlb2YgRmREYXRlICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kLmlzRGF0ZVZhbGlkKClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=