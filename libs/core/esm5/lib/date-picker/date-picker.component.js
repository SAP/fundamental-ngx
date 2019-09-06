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
var DatePickerComponent = /** @class */ (function () {
    /** @hidden */
    function DatePickerComponent(dateAdapter) {
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
        function (selected) {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () {
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
     */
    /**
     * Method that handle calendar active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    DatePickerComponent.prototype.handleCalendarActiveViewChange = /**
     * Method that handle calendar active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    function (activeView) {
        this.activeViewChange.emit(activeView);
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    DatePickerComponent.prototype.closeFromCalendar = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.type === 'single') {
            this.closeCalendar();
        }
    };
    /** Opens the calendar */
    /**
     * Opens the calendar
     * @return {?}
     */
    DatePickerComponent.prototype.openCalendar = /**
     * Opens the calendar
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.onTouched();
            this.isOpen = true;
        }
    };
    /** Toggles the calendar open or closed */
    /**
     * Toggles the calendar open or closed
     * @return {?}
     */
    DatePickerComponent.prototype.toggleCalendar = /**
     * Toggles the calendar open or closed
     * @return {?}
     */
    function () {
        this.onTouched();
        this.isOpen = !this.isOpen;
    };
    /** Closes the calendar if it is open */
    /**
     * Closes the calendar if it is open
     * @return {?}
     */
    DatePickerComponent.prototype.closeCalendar = /**
     * Closes the calendar if it is open
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.isOpen = false;
        }
    };
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected single date changed
     */
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected single date changed
     * @param {?} date
     * @return {?}
     */
    DatePickerComponent.prototype.handleSingleDateChange = /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected single date changed
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date) {
            this.inputFieldDate = this.dateAdapter.format(date);
            this.selectedDate = date;
            this.selectedDateChange.emit(date);
            this.onChange(date);
        }
    };
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected range date changed
     */
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected range date changed
     * @param {?} dates
     * @return {?}
     */
    DatePickerComponent.prototype.handleRangeDateChange = /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected range date changed
     * @param {?} dates
     * @return {?}
     */
    function (dates) {
        if (dates &&
            (!CalendarService.datesEqual(this.selectedRangeDate.start, dates.start) ||
                !CalendarService.datesEqual(this.selectedRangeDate.end, dates.end))) {
            this.inputFieldDate = this.dateAdapter.format(dates.start) + this.dateAdapter.rangeDelimiter
                + this.dateAdapter.format(dates.end);
            this.selectedRangeDate = { start: dates.start, end: dates.end };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
        }
    };
    /**
     * @hidden
     * Method that is triggered when the text input is confirmed to ba changed, by clicking enter, or blur
     */
    /**
     * @hidden
     * Method that is triggered when the text input is confirmed to ba changed, by clicking enter, or blur
     * @param {?} strDate
     * @return {?}
     */
    DatePickerComponent.prototype.handleInputChange = /**
     * @hidden
     * Method that is triggered when the text input is confirmed to ba changed, by clicking enter, or blur
     * @param {?} strDate
     * @return {?}
     */
    function (strDate) {
        this.dateStringUpdate(strDate);
    };
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    DatePickerComponent.prototype.validate = /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return this.isModelValid() ? null : {
            dateValidation: {
                valid: false
            }
        };
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    DatePickerComponent.prototype.registerOnChange = /**
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
    DatePickerComponent.prototype.registerOnTouched = /**
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
    DatePickerComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     */
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     * @param {?} selected
     * @return {?}
     */
    DatePickerComponent.prototype.writeValue = /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
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
    };
    /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput
     */
    /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput
     * @param {?} date
     * @return {?}
     */
    DatePickerComponent.prototype.dateStringUpdate = /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** Case when there is single mode */
        if (this.type === 'single') {
            /** @type {?} */
            var fdDate = this.dateAdapter.parse(date);
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
            var currentDates = date.split(this.dateAdapter.rangeDelimiter);
            /** @type {?} */
            var firstDate = this.dateAdapter.parse(currentDates[0]);
            /** @type {?} */
            var secondDate = this.dateAdapter.parse(currentDates[1]);
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
    };
    /** Method that provides information if model selected date/dates have properly types and are valid */
    /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    DatePickerComponent.prototype.isModelValid = /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    function () {
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
    };
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
                            function () { return DatePickerComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DatePickerComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-date-picker-custom{display:inline-block}.fd-date-picker-custom fd-popover{display:block}"]
                }] }
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return [
        { type: DateFormatParser }
    ]; };
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
    return DatePickerComponent;
}());
export { DatePickerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQUUsU0FBUyxFQUNqQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUF5QyxhQUFhLEVBQUUsaUJBQWlCLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwSCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7Ozs7O0FBV3hEO0lBZ1BJLGNBQWM7SUFDZCw2QkFDVyxXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7Ozs7UUF4TnhDLG1CQUFjLEdBQUcsSUFBSSxDQUFDOzs7O1FBR3RCLHVCQUFrQixHQUFZLEtBQUssQ0FBQzs7OztRQUdwQyxXQUFNLEdBQVksS0FBSyxDQUFDOzs7O1FBT3hCLFNBQUksR0FBaUIsUUFBUSxDQUFDOzs7O1FBSTlCLGdCQUFXLEdBQVcsWUFBWSxDQUFDOzs7O1FBSW5DLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUFRbEIsc0JBQWlCLEdBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUM7Ozs7UUFJbkUsc0JBQWlCLEdBQWUsQ0FBQyxDQUFDOzs7O1FBSWxDLGtCQUFhLEdBQVksSUFBSSxDQUFDOzs7O1FBSTlC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O0lBR3RCLGlEQUFvQzs7Ozs7SUFHcEMscUNBQXdCOzs7OztJQUd4QixnREFBbUU7Ozs7O0lBR25FLG1DQUM4Qjs7Ozs7SUFHOUIsMENBQ21DOzs7OztJQUduQyxzQ0FDeUI7Ozs7O0lBR3pCLDJDQUNxQjs7Ozs7SUFHckIsZ0RBQ21FOzs7OztJQUduRSxnREFDa0M7Ozs7O0lBR2xDLDRDQUM4Qjs7Ozs7SUFHOUIsNkNBQ3NDOzs7OztJQUd0Qyx5REFDK0Q7Ozs7O0lBRy9ELHdDQUMwQjs7Ozs7SUFHMUIseUNBQzBDOzs7Ozs7SUFNMUMsd0NBQ3NDOzs7OztJQUd0Qyx1Q0FDa0I7Ozs7O0lBR2xCLGlEQUNzRjs7Ozs7SUFHdEYsc0RBQ3FHOzs7OztJQUdyRywrQ0FDb0c7Ozs7O0lBR3BHLHVDQUNFOzs7OztJQUdGLHdDQUNFOzs7Ozs7SUFNRiw4Q0FHRTs7Ozs7O0lBTUYsd0RBR0U7Ozs7OztJQU1GLHNEQUdFOzs7Ozs7SUFNRixzREFHRTs7Ozs7O0lBTUYsb0RBR0U7Ozs7OztJQU1GLDRDQUdFOztJQThFRSwwQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyVHlwZSwgRGF5c09mV2VlaywgRmRDYWxlbmRhclZpZXcgfSBmcm9tICcuLi9jYWxlbmRhci9jYWxlbmRhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBsYWNlbWVudCB9IGZyb20gJ3BvcHBlci5qcyc7XG5pbXBvcnQgeyBGZERhdGUgfSBmcm9tICcuLi9jYWxlbmRhci9tb2RlbHMvZmQtZGF0ZSc7XG5pbXBvcnQgeyBDYWxlbmRhclNlcnZpY2UgfSBmcm9tICcuLi9jYWxlbmRhci9jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCB7IENhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSAnLi4vY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZkUmFuZ2VEYXRlIH0gZnJvbSAnLi4vY2FsZW5kYXIvbW9kZWxzL2ZkLXJhbmdlLWRhdGUnO1xuaW1wb3J0IHsgRGF0ZUZvcm1hdFBhcnNlciB9IGZyb20gJy4vZm9ybWF0L2RhdGUtcGFyc2VyJztcblxuLyoqXG4gKiBUaGUgZGF0ZXRpbWUgcGlja2VyIGNvbXBvbmVudCBpcyBhbiBvcGluaW9uYXRlZCBjb21wb3NpdGlvbiBvZiB0aGUgZmQtcG9wb3ZlciBhbmRcbiAqIGZkLWNhbGVuZGFyIGNvbXBvbmVudHMgdG8gYWNjb21wbGlzaCB0aGUgVUkgcGF0dGVybiBmb3IgcGlja2luZyBhIGRhdGUuXG4gKlxuICogU3VwcG9ydHMgQW5ndWxhciBGb3Jtcy5cbiAqIGBgYGh0bWxcbiAqIDxmZC1kYXRlLXBpY2tlciBbKG5nTW9kZWwpXT1cImRhdGVcIj48L2ZkLWRhdGUtcGlja2VyPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtZGF0ZS1waWNrZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICcoYmx1ciknOiAnb25Ub3VjaGVkKCknLFxuICAgICAgICAnW2NsYXNzLmZkLWRhdGUtcGlja2VyXSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy5mZC1kYXRlLXBpY2tlci1jdXN0b21dJzogJ3RydWUnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRlUGlja2VyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRlUGlja2VyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuXG4gICAgLyoqIEBoaWRkZW4gVGhlIHZhbHVlIG9mIHRoZSBpbnB1dCAqL1xuICAgIGlucHV0RmllbGREYXRlID0gbnVsbDtcblxuICAgIC8qKiBAaGlkZGVuIFdoZXRoZXIgdGhlIGRhdGUgaW5wdXQgaXMgaW52YWxpZCAqL1xuICAgIGlzSW52YWxpZERhdGVJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gV2hldGhlciB0aGUgZGF0ZSBwaWNrZXIgaXMgb3BlbiAqL1xuICAgIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAVmlld0NoaWxkKENhbGVuZGFyQ29tcG9uZW50KSBjYWxlbmRhckNvbXBvbmVudDogQ2FsZW5kYXJDb21wb25lbnQ7XG5cbiAgICAvKiogVGhlIHR5cGUgb2YgY2FsZW5kYXIsICdzaW5nbGUnIGZvciBzaW5nbGUgZGF0ZSBzZWxlY3Rpb24gb3IgJ3JhbmdlJyBmb3IgYSByYW5nZSBvZiBkYXRlcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIHR5cGU6IENhbGVuZGFyVHlwZSA9ICdzaW5nbGUnO1xuXG4gICAgLyoqIERhdGUgcGlja2VyIGlucHV0IHBsYWNlaG9sZGVyIHN0cmluZyAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdtbS9kZC95eXl5JztcblxuICAgIC8qKiBXaGV0aGVyIHRoaXMgaXMgdGhlIGNvbXBhY3QgaW5wdXQgZGF0ZSBwaWNrZXIgKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbXBhY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIENhbGVuZGFyRGF5IG1vZGVsICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RlZERhdGU6IEZkRGF0ZTtcblxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIEZkRGF0ZXMgbW9kZWwgc3RhcnQgYW5kIGVuZCBpbiByYW5nZSBtb2RlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlbGVjdGVkUmFuZ2VEYXRlOiBGZFJhbmdlRGF0ZSA9IHsgc3RhcnQ6IG51bGwsIGVuZDogbnVsbCB9O1xuXG4gICAgLyoqIFRoZSBkYXkgb2YgdGhlIHdlZWsgdGhlIGNhbGVuZGFyIHNob3VsZCBzdGFydCBvbi4gMSByZXByZXNlbnRzIFN1bmRheSwgMiBpcyBNb25kYXksIDMgaXMgVHVlc2RheSwgYW5kIHNvIG9uLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RhcnRpbmdEYXlPZldlZWs6IERheXNPZldlZWsgPSAxO1xuXG4gICAgLyoqIFdoZXRoZXIgdG8gdmFsaWRhdGUgdGhlIGRhdGUgcGlja2VyIGlucHV0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdXNlVmFsaWRhdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlIGRhdGVwaWNrZXIgaW5wdXQuICovXG4gICAgQElucHV0KClcbiAgICBkYXRlSW5wdXRMYWJlbDogc3RyaW5nID0gJ0RhdGUgaW5wdXQnO1xuXG4gICAgLyoqIEFyaWEgbGFiZWwgZm9yIHRoZSBidXR0b24gdG8gc2hvdy9oaWRlIHRoZSBjYWxlbmRhci4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc3BsYXlDYWxlbmRhclRvZ2dsZUxhYmVsOiBzdHJpbmcgPSAnRGlzcGxheSBjYWxlbmRhciB0b2dnbGUnO1xuXG4gICAgLyoqIFdoZXRoZXIgYSBudWxsIGlucHV0IGlzIGNvbnNpZGVyZWQgdmFsaWQuICovXG4gICAgQElucHV0KClcbiAgICBhbGxvd051bGw6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEFjdHVhbGx5IHNob3duIGFjdGl2ZSB2aWV3IG9uZSBvZiAnZGF5JyB8ICdtb250aCcgfCAneWVhcicgaW4gY2FsZW5kYXIgY29tcG9uZW50Ki9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBhY3RpdmVWaWV3OiBGZENhbGVuZGFyVmlldyA9ICdkYXknO1xuXG4gICAgLyoqXG4gICAgICogIFRoZSBwbGFjZW1lbnQgb2YgdGhlIHBvcG92ZXIuIEl0IGNhbiBiZSBvbmUgb2Y6IHRvcCwgdG9wLXN0YXJ0LCB0b3AtZW5kLCBib3R0b20sXG4gICAgICogIGJvdHRvbS1zdGFydCwgYm90dG9tLWVuZCwgcmlnaHQsIHJpZ2h0LXN0YXJ0LCByaWdodC1lbmQsIGxlZnQsIGxlZnQtc3RhcnQsIGxlZnQtZW5kLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2VtZW50OiBQbGFjZW1lbnQgPSAnYm90dG9tLXN0YXJ0JztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkYXRlIHBpY2tlciBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqIEZpcmVkIHdoZW4gYSBuZXcgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0ZWREYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmREYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmREYXRlPigpO1xuXG4gICAgLyoqIEV2ZW50IHRocm93biBldmVyeSB0aW1lIHNlbGVjdGVkIGZpcnN0IG9yIGxhc3QgZGF0ZSBpbiByYW5nZSBtb2RlIGlzIGNoYW5nZWQgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0ZWRSYW5nZURhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGZFJhbmdlRGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZkUmFuZ2VEYXRlPigpO1xuXG4gICAgLyoqIEV2ZW50IHRocm93biBldmVyeSB0aW1lIGNhbGVuZGFyIGFjdGl2ZSB2aWV3IGlzIGNoYW5nZWQgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgYWN0aXZlVmlld0NoYW5nZTogRXZlbnRFbWl0dGVyPEZkQ2FsZW5kYXJWaWV3PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmRDYWxlbmRhclZpZXc+KCk7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uQ2hhbmdlOiBhbnkgPSAoc2VsZWN0ZWQ6IGFueSkgPT4ge1xuICAgIH07XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uVG91Y2hlZDogYW55ID0gKCkgPT4ge1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGRpc2FibGUgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIuXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVGdW5jdGlvbiA9IGZ1bmN0aW9uKGZkRGF0ZTogRmREYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBkaXNhYmxlIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyIGZvciB0aGUgcmFuZ2Ugc3RhcnQgc2VsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlUmFuZ2VTdGFydEZ1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGRpc2FibGUgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIgZm9yIHRoZSByYW5nZSBlbmQgc2VsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlUmFuZ2VFbmRGdW5jdGlvbiA9IGZ1bmN0aW9uKGZkRGF0ZTogRmREYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBibG9jayBjZXJ0YWluIGRhdGVzIGluIHRoZSBjYWxlbmRhciBmb3IgdGhlIHJhbmdlIHN0YXJ0IHNlbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYmxvY2tSYW5nZVN0YXJ0RnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gYmxvY2sgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIgZm9yIHRoZSByYW5nZSBlbmQgc2VsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBibG9ja1JhbmdlRW5kRnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gYmxvY2sgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIuXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJsb2NrRnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0aGF0IGhhbmRsZSBjYWxlbmRhciBhY3RpdmUgdmlldyBjaGFuZ2UgYW5kIHRocm93cyBldmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlQ2FsZW5kYXJBY3RpdmVWaWV3Q2hhbmdlKGFjdGl2ZVZpZXc6IEZkQ2FsZW5kYXJWaWV3KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWN0aXZlVmlld0NoYW5nZS5lbWl0KGFjdGl2ZVZpZXcpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcHVibGljIGNsb3NlRnJvbUNhbGVuZGFyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUNhbGVuZGFyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogT3BlbnMgdGhlIGNhbGVuZGFyICovXG4gICAgb3BlbkNhbGVuZGFyKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVG9nZ2xlcyB0aGUgY2FsZW5kYXIgb3BlbiBvciBjbG9zZWQgKi9cbiAgICBwdWJsaWMgdG9nZ2xlQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gIXRoaXMuaXNPcGVuO1xuICAgIH1cblxuICAgIC8qKiBDbG9zZXMgdGhlIGNhbGVuZGFyIGlmIGl0IGlzIG9wZW4gKi9cbiAgICBwdWJsaWMgY2xvc2VDYWxlbmRhcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIE1ldGhvZCB0aGF0IGlzIHRyaWdnZXJlZCBieSBldmVudHMgZnJvbSBjYWxlbmRhciBjb21wb25lbnQsIHdoZW4gdGhlcmUgaXMgc2VsZWN0ZWQgc2luZ2xlIGRhdGUgY2hhbmdlZFxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVTaW5nbGVEYXRlQ2hhbmdlKGRhdGU6IEZkRGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEZpZWxkRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuZm9ybWF0KGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXRlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogTWV0aG9kIHRoYXQgaXMgdHJpZ2dlcmVkIGJ5IGV2ZW50cyBmcm9tIGNhbGVuZGFyIGNvbXBvbmVudCwgd2hlbiB0aGVyZSBpcyBzZWxlY3RlZCByYW5nZSBkYXRlIGNoYW5nZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlUmFuZ2VEYXRlQ2hhbmdlKGRhdGVzOiBGZFJhbmdlRGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0ZXMgJiZcbiAgICAgICAgICAgICghQ2FsZW5kYXJTZXJ2aWNlLmRhdGVzRXF1YWwodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5zdGFydCwgZGF0ZXMuc3RhcnQpIHx8XG4gICAgICAgICAgICAgICAgIUNhbGVuZGFyU2VydmljZS5kYXRlc0VxdWFsKHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kLCBkYXRlcy5lbmQpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGaWVsZERhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdChkYXRlcy5zdGFydCkgKyB0aGlzLmRhdGVBZGFwdGVyLnJhbmdlRGVsaW1pdGVyXG4gICAgICAgICAgICAgICAgKyB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdChkYXRlcy5lbmQpXG4gICAgICAgICAgICA7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlID0geyBzdGFydDogZGF0ZXMuc3RhcnQsIGVuZDogZGF0ZXMuZW5kIH07XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIE1ldGhvZCB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIHRoZSB0ZXh0IGlucHV0IGlzIGNvbmZpcm1lZCB0byBiYSBjaGFuZ2VkLCBieSBjbGlja2luZyBlbnRlciwgb3IgYmx1clxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVJbnB1dENoYW5nZShzdHJEYXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRlU3RyaW5nVXBkYXRlKHN0ckRhdGUpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBkYXRlQWRhcHRlcjogRGF0ZUZvcm1hdFBhcnNlclxuICAgICkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBGdW5jdGlvbiB0aGF0IGltcGxlbWVudHMgVmFsaWRhdG9yIEludGVyZmFjZSwgYWRkcyB2YWxpZGF0aW9uIHN1cHBvcnQgZm9yIGZvcm1zXG4gICAgICovXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1xuICAgICAgICBba2V5OiBzdHJpbmddOiBhbnlcbiAgICB9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNNb2RlbFZhbGlkKCkgPyBudWxsIDoge1xuICAgICAgICAgICAgZGF0ZVZhbGlkYXRpb246IHtcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHNlbGVjdGVkOiBhbnkpID0+IHsgdm9pZCB9KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogRnVuY3Rpb24gdGhhdCBwcm92aWRlcyBzdXBwb3J0IGZvciBDb250cm9sVmFsdWVBY2Nlc3NvciB0aGF0IGFsbG93cyB0byB1c2UgWyhuZ01vZGVsKV0gb3IgZm9ybXNcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHNlbGVjdGVkOiBGZFJhbmdlRGF0ZSB8IEZkRGF0ZSk6IHZvaWQge1xuICAgICAgICAvKiogSWYgd3JpdHRlbiB2YWx1ZSBpcyBub3QgZGVmaW5lZCwgbnVsbCwgZW1wdHkgc3RyaW5nICovXG4gICAgICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGaWVsZERhdGUgPSAnJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBGb3Igc2luZ2xlIG1vZGUsIGlmIHRoZSBkYXRlIGlzIGludmFsaWQsIG1vZGVsIGlzIGNoYW5nZWQsIGl0IHJlZnJlc2ggY3VycmVudGx5XG4gICAgICAgICAgICAgKiBpbnB1dCBmaWVsZCB0ZXh0LCBidXQgaXQgZG9lcyBub3QgcmVmcmVzaCBjdXJyZW50bHkgZGlzcGxheWVkIGRheVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzZWxlY3RlZCA9IDxGZERhdGU+c2VsZWN0ZWQ7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHNlbGVjdGVkO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2RlbFZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0RmllbGREYXRlID0gdGhpcy5kYXRlQWRhcHRlci5mb3JtYXQoc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJDb21wb25lbnQuc2V0Q3VycmVudGx5RGlzcGxheWVkKHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dEZpZWxkRGF0ZSA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEZvciByYW5nZSBtb2RlLCBpZiB0aGUgZGF0ZSBpcyBpbnZhbGlkLCBtb2RlbCBpcyBjaGFuZ2VkLCBidXQgaXQgZG9lcyBub3QgcmVmcmVzaCBjdXJyZW50bHlcbiAgICAgICAgICAgICAqIGRpc3BsYXllZCBkYXkgdmlldywgb3IgaW5wdXQgZmllbGQgdGV4dFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzZWxlY3RlZCA9IDxGZFJhbmdlRGF0ZT5zZWxlY3RlZDtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSA9IHsgc3RhcnQ6IHNlbGVjdGVkLnN0YXJ0LCBlbmQ6IHNlbGVjdGVkLmVuZCB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2RlbFZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhckNvbXBvbmVudC5zZXRDdXJyZW50bHlEaXNwbGF5ZWQodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5zdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRGaWVsZERhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmZvcm1hdChzZWxlY3RlZC5zdGFydCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5yYW5nZURlbGltaXRlciArIHRoaXMuZGF0ZUFkYXB0ZXIuZm9ybWF0KHNlbGVjdGVkLmVuZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dEZpZWxkRGF0ZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dEZpZWxkRGF0ZSA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNJbnZhbGlkRGF0ZUlucHV0ID0gIXRoaXMuaXNNb2RlbFZhbGlkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIE1ldGhvZCwgd2hpY2ggaXMgcmVzcG9uc2libGUgZm9yIHRyYW5zZm9ybWluZyBzdHJpbmcgdG8gZGF0ZSwgZGVwZW5kaW5nIG9uIHR5cGUgb3JcbiAgICAgKiB2YWxpZGF0aW9uIHRoZSByZXN1bHRzIGFyZSBkaWZmZXJlbnQuIEl0IGFsc28gY2hhbmdlcyB0byBzdGF0ZSBvZiBpc0ludmFsaWREYXRlSW5wdXRcbiAgICAgKi9cbiAgICBkYXRlU3RyaW5nVXBkYXRlKGRhdGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAvKiogQ2FzZSB3aGVuIHRoZXJlIGlzIHNpbmdsZSBtb2RlICovXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdzaW5nbGUnKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGZkRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIucGFyc2UoZGF0ZSk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ2hlY2sgaWYgZGF0ZXMgYXJlIGVxdWFsLCBpZiBkYXRlcyBhcmUgdGhlIHNhbWUgdGhlcmUgaXMgbm8gbmVlZCB0byBtYWtlIGFueSBjaGFuZ2VzXG4gICAgICAgICAgICAgKiBEYXRlIGluIG1vZGVsIGlzIGNoYW5nZWQgbm8gbWF0dGVyIGlmIHRoZSBwYXJzZWQgZGF0ZSBmcm8gc3RyaW5nIGlzIHZhbGlkIG9yIG5vdC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKCFDYWxlbmRhclNlcnZpY2UuZGF0ZXNFcXVhbChmZERhdGUsIHRoaXMuc2VsZWN0ZWREYXRlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNJbnZhbGlkRGF0ZUlucHV0ID0gIWZkRGF0ZS5pc0RhdGVWYWxpZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZmREYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5zZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZERhdGUpO1xuXG4gICAgICAgICAgICAgICAgLyoqIENoZWNrIGlmIGRhdGUgaXMgdmFsaWQsIGlmIGl0J3Mgbm90LCB0aGVyZSBpcyBubyBuZWVkIHRvIHJlZnJlc2ggY2FsZW5kYXIgKi9cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNJbnZhbGlkRGF0ZUlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJDb21wb25lbnQuc2V0Q3VycmVudGx5RGlzcGxheWVkKGZkRGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8qKiBDYXNlIHdoZW4gdGhlcmUgaXMgcmFuZ2UgbW9kZSAqL1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGVzID0gZGF0ZS5zcGxpdCh0aGlzLmRhdGVBZGFwdGVyLnJhbmdlRGVsaW1pdGVyKTtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0RGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIucGFyc2UoY3VycmVudERhdGVzWzBdKTtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZERhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLnBhcnNlKGN1cnJlbnREYXRlc1sxXSk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ2hlY2sgaWYgZGF0ZXMgYXJlIGVxdWFsLCBpZiBkYXRlcyBhcmUgdGhlIHNhbWUgdGhlcmUgaXMgbm8gbmVlZCB0byBtYWtlIGFueSBjaGFuZ2VzXG4gICAgICAgICAgICAgKiBEYXRlIGluIG1vZGVsIGlzIGNoYW5nZWQgbm8gbWF0dGVyIGlmIHRoZSBwYXJzZWQgZGF0ZXMgZnJvbSBzdHJpbmcgYXJlIHZhbGlkIG9yIG5vdC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKCFDYWxlbmRhclNlcnZpY2UuZGF0ZXNFcXVhbChmaXJzdERhdGUsIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQpIHx8XG4gICAgICAgICAgICAgICAgIUNhbGVuZGFyU2VydmljZS5kYXRlc0VxdWFsKHNlY29uZERhdGUsIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kKSkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pc0ludmFsaWREYXRlSW5wdXQgPSAhZmlyc3REYXRlLmlzRGF0ZVZhbGlkKCkgfHwgIXNlY29uZERhdGUuaXNEYXRlVmFsaWQoKTtcblxuICAgICAgICAgICAgICAgIC8qKiBJZiB0aGUgZW5kIGRhdGUgaXMgYmVmb3JlIHRoZSBzdGFydCBkYXRlLCB0aGVyZSBpcyBuZWVkIHRvIHJlcGxhY2UgdGhlbSAgKi9cbiAgICAgICAgICAgICAgICBpZiAoKGZpcnN0RGF0ZS5nZXRUaW1lU3RhbXAoKSA+IHNlY29uZERhdGUuZ2V0VGltZVN0YW1wKCkpICYmIHNlY29uZERhdGUuaXNEYXRlVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlID0geyBzdGFydDogc2Vjb25kRGF0ZSwgZW5kOiBmaXJzdERhdGUgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlID0geyBzdGFydDogZmlyc3REYXRlLCBlbmQ6IHNlY29uZERhdGUgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh7IHN0YXJ0OiB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0LCBlbmQ6IHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kIH0pO1xuXG4gICAgICAgICAgICAgICAgLyoqIENoZWNrIGlmIGRhdGVzIGFyZSB2YWxpZCwgaWYgaXQncyBub3QsIHRoZXJlIGlzIG5vIG5lZWQgbyByZWZyZXNoIGNhbGVuZGFyICovXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzSW52YWxpZERhdGVJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyQ29tcG9uZW50LnNldEN1cnJlbnRseURpc3BsYXllZCh0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRhdGUgJiYgdGhpcy5hbGxvd051bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNJbnZhbGlkRGF0ZUlucHV0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogTWV0aG9kIHRoYXQgcHJvdmlkZXMgaW5mb3JtYXRpb24gaWYgbW9kZWwgc2VsZWN0ZWQgZGF0ZS9kYXRlcyBoYXZlIHByb3Blcmx5IHR5cGVzIGFuZCBhcmUgdmFsaWQgKi9cbiAgICBwdWJsaWMgaXNNb2RlbFZhbGlkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWREYXRlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgaW5zdGFuY2VvZiBGZERhdGUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZS5pc0RhdGVWYWxpZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUgJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5zdGFydCBpbnN0YW5jZW9mIEZkRGF0ZSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0LmlzRGF0ZVZhbGlkKClcbiAgICAgICAgICAgICAgICApICYmIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5lbmQgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5lbmQgaW5zdGFuY2VvZiBGZERhdGUgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5lbmQuaXNEYXRlVmFsaWQoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==