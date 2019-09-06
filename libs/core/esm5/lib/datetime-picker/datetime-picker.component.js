/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeComponent } from '../time/time.component';
import { DateTimeFormatParser } from './format/datetime-parser';
import { FdDate } from '../calendar/models/fd-date';
import { CalendarComponent } from '../calendar/calendar.component';
import { FdDatetime } from './models/fd-datetime';
/**
 * The datetime picker component is an opinionated composition of the fd-popover,
 * fd-calendar and fd-time components to accomplish the UI pattern for picking a date and time.
 * Supports Angular Forms.
 * ```html
 * <fd-date-time-picker [(ngModel)]="dateTime"></fd-date-time-picker>
 * ```
 */
var DatetimePickerComponent = /** @class */ (function () {
    /** @hidden */
    function DatetimePickerComponent(elRef, changeDetRef, dateTimeAdapter) {
        this.elRef = elRef;
        this.changeDetRef = changeDetRef;
        this.dateTimeAdapter = dateTimeAdapter;
        /**
         * @hidden Date of the input field. Internal use.
         * For programmatic selection, use two-way binding on the date input.
         */
        this.inputFieldDate = null;
        /**
         * @hidden The Time object which interacts with the inner Time component. Internal use.
         */
        this.isInvalidDateInput = false;
        /**
         * @hidden The Time object which interacts with the inner Time component. Internal use.
         */
        this.time = { hour: 0, minute: 0, second: 0 };
        /**
         * Placeholder for the inner input element.
         */
        this.placeholder = 'mm/dd/yyyy, hh:mm:ss am';
        /**
         * Whether the component should be in compact mode.
         */
        this.compact = false;
        /**
         *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
         *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
         */
        this.placement = 'bottom-start';
        /**
         * Whether the time component should be meridian (am/pm).
         */
        this.meridian = true;
        /**
         * Whether the time component shows spinners for changing the time.
         */
        this.spinners = true;
        /**
         * Whether the time component shows seconds.
         */
        this.displaySeconds = true;
        /**
         * Whether the time component shows minutes.
         */
        this.displayMinutes = true;
        /**
         * Whether the time component shows hours.
         */
        this.displayHours = true;
        /**
         * Whether to perform visual validation on the picker input.
         */
        this.useValidation = true;
        /**
         * Current selected date. Two-way binding is supported.
         */
        this.date = FdDatetime.getToday();
        /**
         * Whether the popover is open. Two-way binding is supported.
         */
        this.isOpen = false;
        /**
         * The disableFunction for the calendar.
         */
        this.startingDayOfWeek = 1;
        /**
         * Actually shown active view one of 'day' | 'month' | 'year' in calendar component
         */
        this.activeView = 'day';
        /**
         * Aria label for the datetime picker input.
         */
        this.datetimeInputLabel = 'Datetime input';
        /**
         * Aria label for the button to show/hide the calendar.
         */
        this.displayDatetimeToggleLabel = 'Display calendar toggle';
        /**
         * Whether a null input is considered valid.
         */
        this.allowNull = true;
        /**
         * Event thrown every time calendar active view is changed
         */
        this.activeViewChange = new EventEmitter();
        /**
         * Event emitted when the date changes. This can be a time or day change.
         */
        this.dateChange = new EventEmitter();
        /**
         * Event emitted when the day changes from the calendar.
         */
        this.calendarChange = new EventEmitter();
        /**
         * Event emitted when the time changes from the time component.
         */
        this.timeChange = new EventEmitter();
        /**
         * Event emitted when popover closes.
         */
        this.onClose = new EventEmitter();
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
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    DatetimePickerComponent.prototype.validate = /**
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
    /** Toggles the popover. */
    /**
     * Toggles the popover.
     * @return {?}
     */
    DatetimePickerComponent.prototype.togglePopover = /**
     * Toggles the popover.
     * @return {?}
     */
    function () {
        this.onTouched();
        if (this.isOpen) {
            this.closePopover();
        }
        else {
            this.openPopover();
        }
    };
    /**
     * Method that handle calendar active view change and throws event.
     */
    /**
     * Method that handle calendar active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    DatetimePickerComponent.prototype.handleCalendarActiveViewChange = /**
     * Method that handle calendar active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    function (activeView) {
        this.activeViewChange.emit(activeView);
    };
    /** Opens the popover. */
    /**
     * Opens the popover.
     * @return {?}
     */
    DatetimePickerComponent.prototype.openPopover = /**
     * Opens the popover.
     * @return {?}
     */
    function () {
        if (!this.isOpen && !this.disabled) {
            this.onTouched();
            this.isOpen = true;
        }
    };
    /** Closes the popover and refresh model */
    /**
     * Closes the popover and refresh model
     * @return {?}
     */
    DatetimePickerComponent.prototype.closePopover = /**
     * Closes the popover and refresh model
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.handleInputChange(this.inputFieldDate);
            this.onClose.emit();
            this.isOpen = false;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} e
     * @return {?}
     */
    DatetimePickerComponent.prototype.isInvalidDateInputHandler = /**
     * @hidden
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.isInvalidDateInput = e;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    DatetimePickerComponent.prototype.onEscapeKeydownHandler = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.closePopover();
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    DatetimePickerComponent.prototype.onGlobalClick = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.closePopover();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    DatetimePickerComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.date && this.inputFieldDate !== null) {
            this.selectedDate = this.date.date;
            this.time = this.date.time;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    DatetimePickerComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.dateFromInputSubscription) {
            this.dateFromInputSubscription.unsubscribe();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    DatetimePickerComponent.prototype.registerOnChange = /**
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
    DatetimePickerComponent.prototype.registerOnTouched = /**
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
    DatetimePickerComponent.prototype.setDisabledState = /**
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
    DatetimePickerComponent.prototype.writeValue = /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (!selected || !(selected instanceof FdDatetime)) {
            return;
        }
        this.selectedDate = selected.date;
        this.time = selected.time;
        this.date = new FdDatetime(this.selectedDate, this.time);
        if (this.isModelValid()) {
            this.calendarComponent.setCurrentlyDisplayed(this.date.date);
            this.setInput(this.date);
        }
    };
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected date changed.
     * If invalid time model is detected, it takes time model data from TimeComponent.
     */
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected date changed.
     * If invalid time model is detected, it takes time model data from TimeComponent.
     * @param {?} date
     * @return {?}
     */
    DatetimePickerComponent.prototype.handleDateChange = /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected date changed.
     * If invalid time model is detected, it takes time model data from TimeComponent.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.selectedDate = date;
        if (!this.date.isTimeValid()) {
            this.time = this.timeComponent.time;
        }
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isModelValid();
        this.setInput(this.date);
        this.onChange(this.date);
    };
    /**
     * @hidden
     * Method that is triggered by events from time component, when there is selected time changed
     */
    /**
     * @hidden
     * Method that is triggered by events from time component, when there is selected time changed
     * @param {?} time
     * @return {?}
     */
    DatetimePickerComponent.prototype.handleTimeChange = /**
     * @hidden
     * Method that is triggered by events from time component, when there is selected time changed
     * @param {?} time
     * @return {?}
     */
    function (time) {
        this.time = time;
        if (!this.selectedDate || !this.selectedDate.isDateValid()) {
            this.selectedDate = FdDate.getToday();
        }
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isModelValid();
        this.setInput(this.date);
        this.onChange(this.date);
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    DatetimePickerComponent.prototype.focusArrowLeft = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.elRef.nativeElement.querySelector('#' + this.calendarComponent.id + '-left-arrow')) {
            this.elRef.nativeElement.querySelector('#' + this.calendarComponent.id + '-left-arrow').focus();
        }
    };
    /**
     * @hidden
     * Method, which is responsible for transforming string to datetime, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput.
     */
    /**
     * @hidden
     * Method, which is responsible for transforming string to datetime, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput.
     * @param {?} date
     * @return {?}
     */
    DatetimePickerComponent.prototype.handleInputChange = /**
     * @hidden
     * Method, which is responsible for transforming string to datetime, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var fdTimeDate = this.dateTimeAdapter.parse(date);
        this.selectedDate = fdTimeDate.date;
        this.time = fdTimeDate.time;
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isModelValid();
        this.onChange(fdTimeDate);
        if (!this.isInvalidDateInput) {
            this.calendarComponent.setCurrentlyDisplayed(fdTimeDate.date);
        }
        if (!date && this.allowNull) {
            this.isInvalidDateInput = false;
            this.date = FdDatetime.getToday();
            this.selectedDate = this.date.date;
            this.time = this.date.time;
            this.calendarComponent.setCurrentlyDisplayed(this.date.date);
            this.onChange(null);
        }
        else if (!this.allowNull) {
            this.isInvalidDateInput = true;
        }
    };
    /** Method that provides information if model selected date/dates have properly types and are valid */
    /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    DatetimePickerComponent.prototype.isModelValid = /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    function () {
        return this.date &&
            this.date instanceof FdDatetime &&
            this.date.isDateValid() && this.date.isTimeValid();
    };
    /**
     * @private
     * @param {?} fdDateTime
     * @return {?}
     */
    DatetimePickerComponent.prototype.setInput = /**
     * @private
     * @param {?} fdDateTime
     * @return {?}
     */
    function (fdDateTime) {
        this.inputFieldDate = this.dateTimeAdapter.format(fdDateTime);
        this.changeDetRef.detectChanges();
    };
    DatetimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-datetime-picker',
                    template: "<div class=\"fd-datetime\">\n    <fd-popover [(isOpen)]=\"isOpen\"\n                (isOpenChange)=\"handleInputChange(dateTimePicker.value)\"\n                [closeOnOutsideClick]=\"false\"\n                [closeOnEscapeKey]=\"false\"\n                [triggers]=\"[]\"\n                [disabled]=\"disabled\"\n                [placement]=\"placement\">\n        <fd-popover-control>\n            <div class=\"fd-input-group fd-input-group--after\"\n                 [ngClass]=\"{'fd-input-group--compact' : compact}\">\n                <input type=\"text\"\n                       #dateTimePicker\n                       [attr.aria-label]=\"datetimeInputLabel\"\n                       [(ngModel)]=\"inputFieldDate\"\n                       [placeholder]=\"placeholder\"\n                       (keyup.enter)=\"handleInputChange(dateTimePicker.value)\"\n                       (click)=\"openPopover()\"\n                       [ngClass]=\"{ 'fd-input--compact': compact, 'is-invalid': isInvalidDateInput && useValidation }\"\n                       [disabled]=\"disabled\">\n                <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\">\n                    <button class=\"fd-popover__control fd-button--icon fd-button--light sap-icon--date-time\"\n                            (click)=\"togglePopover()\" [attr.aria-label]=\"displayDatetimeToggleLabel\"\n                            [attr.aria-expanded]=\"isOpen\" type=\"button\" [disabled]=\"disabled\"></button>\n                </span>\n            </div>\n        </fd-popover-control>\n        <fd-popover-body\n            [attr.aria-expanded]=\"isOpen\"\n            [attr.aria-hidden]=\"!isOpen\"\n            [style.display]=\"'block'\">\n            <div class=\"fd-datetime__container\">\n                <fd-calendar calType=\"single\"\n                             [activeView]=\"activeView\"\n                             (activeViewChange)=\"handleCalendarActiveViewChange($event)\"\n                             [disableFunction]=\"disableFunction ? disableFunction : null\"\n                             [blockFunction]=\"blockFunction ? blockFunction : null\"\n                             [disableRangeStartFunction]=\"disableRangeStartFunction ? disableRangeStartFunction : null\"\n                             [disableRangeEndFunction]=\"disableRangeEndFunction ? disableRangeEndFunction : null\"\n                             [blockRangeStartFunction]=\"blockRangeStartFunction ? blockRangeStartFunction : null\"\n                             [blockRangeEndFunction]=\"blockRangeEndFunction ? blockRangeEndFunction : null\"\n                             [selectedDate]=\"selectedDate\"\n                             (selectedDateChange)=\"handleDateChange($event)\"\n                             (isValidDateChange)=\"isInvalidDateInputHandler($event)\"\n                             [escapeFocusFunction]=\"null\"\n                             [startingDayOfWeek]=\"startingDayOfWeek\"></fd-calendar>\n                <div class=\"fd-datetime__separator\"></div>\n                <fd-time [disabled]=\"disabled\"\n                         [meridian]=\"meridian\"\n                         [ngModel]=\"time\"\n                         (ngModelChange)=\"handleTimeChange($event)\"\n                         [spinners]=\"spinners\"\n                         [displaySeconds]=\"displaySeconds\"\n                         [displayMinutes]=\"displayMinutes\"\n                         [displayHours]=\"displayHours\"\n                         (focusArrowLeft)=\"focusArrowLeft()\"></fd-time>\n            </div>\n        </fd-popover-body>\n    </fd-popover>\n</div>\n",
                    host: {
                        '(blur)': 'onTouched()',
                        '[class.fd-datetime-host]': 'true'
                    },
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DatetimePickerComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DatetimePickerComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-datetime-host{display:inline-block;width:230px}.fd-datetime-host .fd-datetime{display:block}.fd-datetime-host .fd-datetime__container{display:flex;align-items:center;margin:0 16px}.fd-datetime-host .fd-datetime__separator{background-color:#d3d3d3;width:1px;margin:42px 28px;-ms-grid-row-align:stretch;align-self:stretch}.fd-datetime-host .fd-datetime fd-popover{display:block}.fd-datetime-host .fd-datetime fd-time{width:auto}"]
                }] }
    ];
    /** @nocollapse */
    DatetimePickerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: DateTimeFormatParser }
    ]; };
    DatetimePickerComponent.propDecorators = {
        timeComponent: [{ type: ViewChild, args: [TimeComponent,] }],
        calendarComponent: [{ type: ViewChild, args: [CalendarComponent,] }],
        placeholder: [{ type: Input }],
        compact: [{ type: Input }],
        placement: [{ type: Input }],
        meridian: [{ type: Input }],
        disabled: [{ type: Input }],
        spinners: [{ type: Input }],
        displaySeconds: [{ type: Input }],
        displayMinutes: [{ type: Input }],
        displayHours: [{ type: Input }],
        useValidation: [{ type: Input }],
        date: [{ type: Input }],
        isOpen: [{ type: Input }],
        startingDayOfWeek: [{ type: Input }],
        activeView: [{ type: Input }],
        datetimeInputLabel: [{ type: Input }],
        displayDatetimeToggleLabel: [{ type: Input }],
        allowNull: [{ type: Input }],
        activeViewChange: [{ type: Output }],
        dateChange: [{ type: Output }],
        calendarChange: [{ type: Output }],
        timeChange: [{ type: Output }],
        onClose: [{ type: Output }],
        disableFunction: [{ type: Input }],
        disableRangeStartFunction: [{ type: Input }],
        disableRangeEndFunction: [{ type: Input }],
        blockRangeStartFunction: [{ type: Input }],
        blockRangeEndFunction: [{ type: Input }],
        blockFunction: [{ type: Input }],
        onEscapeKeydownHandler: [{ type: HostListener, args: ['document:keydown.escape', [],] }],
        onGlobalClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
    };
    return DatetimePickerComponent;
}());
export { DatetimePickerComponent };
if (false) {
    /**
     * @hidden Reference to the inner time component.
     * @type {?}
     */
    DatetimePickerComponent.prototype.timeComponent;
    /**
     * @hidden Reference to the inner calendar component.
     * @type {?}
     */
    DatetimePickerComponent.prototype.calendarComponent;
    /**
     * @hidden Date of the input field. Internal use.
     * For programmatic selection, use two-way binding on the date input.
     * @type {?}
     */
    DatetimePickerComponent.prototype.inputFieldDate;
    /**
     * @hidden The Time object which interacts with the inner Time component. Internal use.
     * @type {?}
     */
    DatetimePickerComponent.prototype.isInvalidDateInput;
    /**
     * @hidden The Time object which interacts with the inner Time component. Internal use.
     * @type {?}
     */
    DatetimePickerComponent.prototype.time;
    /**
     * @hidden The CalendarDay object which interacts with the inner Calendar component. Internal use.
     * @type {?}
     */
    DatetimePickerComponent.prototype.selectedDate;
    /**
     * Subscription of the dateFromInput.
     * @type {?}
     * @private
     */
    DatetimePickerComponent.prototype.dateFromInputSubscription;
    /**
     * Placeholder for the inner input element.
     * @type {?}
     */
    DatetimePickerComponent.prototype.placeholder;
    /**
     * Whether the component should be in compact mode.
     * @type {?}
     */
    DatetimePickerComponent.prototype.compact;
    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     * @type {?}
     */
    DatetimePickerComponent.prototype.placement;
    /**
     * Whether the time component should be meridian (am/pm).
     * @type {?}
     */
    DatetimePickerComponent.prototype.meridian;
    /**
     * Whether the component is disabled.
     * @type {?}
     */
    DatetimePickerComponent.prototype.disabled;
    /**
     * Whether the time component shows spinners for changing the time.
     * @type {?}
     */
    DatetimePickerComponent.prototype.spinners;
    /**
     * Whether the time component shows seconds.
     * @type {?}
     */
    DatetimePickerComponent.prototype.displaySeconds;
    /**
     * Whether the time component shows minutes.
     * @type {?}
     */
    DatetimePickerComponent.prototype.displayMinutes;
    /**
     * Whether the time component shows hours.
     * @type {?}
     */
    DatetimePickerComponent.prototype.displayHours;
    /**
     * Whether to perform visual validation on the picker input.
     * @type {?}
     */
    DatetimePickerComponent.prototype.useValidation;
    /**
     * Current selected date. Two-way binding is supported.
     * @type {?}
     */
    DatetimePickerComponent.prototype.date;
    /**
     * Whether the popover is open. Two-way binding is supported.
     * @type {?}
     */
    DatetimePickerComponent.prototype.isOpen;
    /**
     * The disableFunction for the calendar.
     * @type {?}
     */
    DatetimePickerComponent.prototype.startingDayOfWeek;
    /**
     * Actually shown active view one of 'day' | 'month' | 'year' in calendar component
     * @type {?}
     */
    DatetimePickerComponent.prototype.activeView;
    /**
     * Aria label for the datetime picker input.
     * @type {?}
     */
    DatetimePickerComponent.prototype.datetimeInputLabel;
    /**
     * Aria label for the button to show/hide the calendar.
     * @type {?}
     */
    DatetimePickerComponent.prototype.displayDatetimeToggleLabel;
    /**
     * Whether a null input is considered valid.
     * @type {?}
     */
    DatetimePickerComponent.prototype.allowNull;
    /**
     * Event thrown every time calendar active view is changed
     * @type {?}
     */
    DatetimePickerComponent.prototype.activeViewChange;
    /**
     * Event emitted when the date changes. This can be a time or day change.
     * @type {?}
     */
    DatetimePickerComponent.prototype.dateChange;
    /**
     * Event emitted when the day changes from the calendar.
     * @type {?}
     */
    DatetimePickerComponent.prototype.calendarChange;
    /**
     * Event emitted when the time changes from the time component.
     * @type {?}
     */
    DatetimePickerComponent.prototype.timeChange;
    /**
     * Event emitted when popover closes.
     * @type {?}
     */
    DatetimePickerComponent.prototype.onClose;
    /**
     * @hidden
     * @type {?}
     */
    DatetimePickerComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    DatetimePickerComponent.prototype.onTouched;
    /**
     * Function used to disable certain dates in the calendar.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatetimePickerComponent.prototype.disableFunction;
    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatetimePickerComponent.prototype.disableRangeStartFunction;
    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatetimePickerComponent.prototype.disableRangeEndFunction;
    /**
     * Function used to block certain dates in the calendar for the range start selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatetimePickerComponent.prototype.blockRangeStartFunction;
    /**
     * Function used to block certain dates in the calendar for the range end selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatetimePickerComponent.prototype.blockRangeEndFunction;
    /**
     * Function used to block certain dates in the calendar.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatetimePickerComponent.prototype.blockFunction;
    /**
     * @type {?}
     * @private
     */
    DatetimePickerComponent.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    DatetimePickerComponent.prototype.changeDetRef;
    /** @type {?} */
    DatetimePickerComponent.prototype.dateTimeAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRldGltZS1waWNrZXIvZGF0ZXRpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXlDLGFBQWEsRUFBRSxpQkFBaUIsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBR3BILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUE4QixNQUFNLGdDQUFnQyxDQUFDO0FBQy9GLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7Ozs7O0FBVWxEO0lBNlJJLGNBQWM7SUFDZCxpQ0FBb0IsS0FBaUIsRUFDakIsWUFBK0IsRUFDaEMsZUFBcUM7UUFGcEMsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBbUI7UUFDaEMsb0JBQWUsR0FBZixlQUFlLENBQXNCOzs7OztRQTVQeEQsbUJBQWMsR0FBVyxJQUFJLENBQUM7Ozs7UUFHOUIsdUJBQWtCLEdBQVksS0FBSyxDQUFDOzs7O1FBR3BDLFNBQUksR0FBZSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Ozs7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SUFHekIsMkNBQ2tCOzs7OztJQUdsQiwyQ0FDeUI7Ozs7O0lBR3pCLGlEQUMrQjs7Ozs7SUFHL0IsaURBQytCOzs7OztJQUcvQiwrQ0FDNkI7Ozs7O0lBRzdCLGdEQUM4Qjs7Ozs7SUFHOUIsdUNBQ3lDOzs7OztJQUd6Qyx5Q0FDd0I7Ozs7O0lBR3hCLG9EQUNrQzs7Ozs7SUFHbEMsNkNBQzBDOzs7OztJQUcxQyxxREFDOEM7Ozs7O0lBRzlDLDZEQUMrRDs7Ozs7SUFHL0QsNENBQzBCOzs7OztJQUcxQixtREFDb0c7Ozs7O0lBR3BHLDZDQUMrRTs7Ozs7SUFHL0UsaURBQ21GOzs7OztJQUduRiw2Q0FDK0U7Ozs7O0lBRy9FLDBDQUNnRTs7Ozs7SUFHaEUsMkNBQ0U7Ozs7O0lBR0YsNENBQ0U7Ozs7OztJQU1GLGtEQUdFOzs7Ozs7SUFNRiw0REFHRTs7Ozs7O0lBTUYsMERBR0U7Ozs7OztJQU1GLDBEQUdFOzs7Ozs7SUFNRix3REFHRTs7Ozs7O0lBTUYsZ0RBR0U7Ozs7O0lBcUZVLHdDQUF5Qjs7Ozs7SUFDekIsK0NBQXVDOztJQUN2QyxrREFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdG9yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUaW1lT2JqZWN0IH0gZnJvbSAnLi4vdGltZS90aW1lLW9iamVjdCc7XG5pbXBvcnQgeyBUaW1lQ29tcG9uZW50IH0gZnJvbSAnLi4vdGltZS90aW1lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQbGFjZW1lbnQgfSBmcm9tICdwb3BwZXIuanMnO1xuaW1wb3J0IHsgRGF0ZVRpbWVGb3JtYXRQYXJzZXIgfSBmcm9tICcuL2Zvcm1hdC9kYXRldGltZS1wYXJzZXInO1xuaW1wb3J0IHsgRmREYXRlIH0gZnJvbSAnLi4vY2FsZW5kYXIvbW9kZWxzL2ZkLWRhdGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21wb25lbnQsIERheXNPZldlZWssIEZkQ2FsZW5kYXJWaWV3IH0gZnJvbSAnLi4vY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZkRGF0ZXRpbWUgfSBmcm9tICcuL21vZGVscy9mZC1kYXRldGltZSc7XG5cbi8qKlxuICogVGhlIGRhdGV0aW1lIHBpY2tlciBjb21wb25lbnQgaXMgYW4gb3BpbmlvbmF0ZWQgY29tcG9zaXRpb24gb2YgdGhlIGZkLXBvcG92ZXIsXG4gKiBmZC1jYWxlbmRhciBhbmQgZmQtdGltZSBjb21wb25lbnRzIHRvIGFjY29tcGxpc2ggdGhlIFVJIHBhdHRlcm4gZm9yIHBpY2tpbmcgYSBkYXRlIGFuZCB0aW1lLlxuICogU3VwcG9ydHMgQW5ndWxhciBGb3Jtcy5cbiAqIGBgYGh0bWxcbiAqIDxmZC1kYXRlLXRpbWUtcGlja2VyIFsobmdNb2RlbCldPVwiZGF0ZVRpbWVcIj48L2ZkLWRhdGUtdGltZS1waWNrZXI+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1kYXRldGltZS1waWNrZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRldGltZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2RhdGV0aW1lLXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhibHVyKSc6ICdvblRvdWNoZWQoKScsXG4gICAgICAgICdbY2xhc3MuZmQtZGF0ZXRpbWUtaG9zdF0nOiAndHJ1ZSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGV0aW1lUGlja2VyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRldGltZVBpY2tlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIERhdGV0aW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuXG4gICAgLyoqIEBoaWRkZW4gUmVmZXJlbmNlIHRvIHRoZSBpbm5lciB0aW1lIGNvbXBvbmVudC4gKi9cbiAgICBAVmlld0NoaWxkKFRpbWVDb21wb25lbnQpXG4gICAgdGltZUNvbXBvbmVudDogVGltZUNvbXBvbmVudDtcblxuICAgIC8qKiBAaGlkZGVuIFJlZmVyZW5jZSB0byB0aGUgaW5uZXIgY2FsZW5kYXIgY29tcG9uZW50LiAqL1xuICAgIEBWaWV3Q2hpbGQoQ2FsZW5kYXJDb21wb25lbnQpXG4gICAgY2FsZW5kYXJDb21wb25lbnQ6IENhbGVuZGFyQ29tcG9uZW50O1xuXG4gICAgLyoqXG4gICAgICogQGhpZGRlbiBEYXRlIG9mIHRoZSBpbnB1dCBmaWVsZC4gSW50ZXJuYWwgdXNlLlxuICAgICAqIEZvciBwcm9ncmFtbWF0aWMgc2VsZWN0aW9uLCB1c2UgdHdvLXdheSBiaW5kaW5nIG9uIHRoZSBkYXRlIGlucHV0LlxuICAgICAqL1xuICAgIGlucHV0RmllbGREYXRlOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgLyoqIEBoaWRkZW4gVGhlIFRpbWUgb2JqZWN0IHdoaWNoIGludGVyYWN0cyB3aXRoIHRoZSBpbm5lciBUaW1lIGNvbXBvbmVudC4gSW50ZXJuYWwgdXNlLiAqL1xuICAgIGlzSW52YWxpZERhdGVJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gVGhlIFRpbWUgb2JqZWN0IHdoaWNoIGludGVyYWN0cyB3aXRoIHRoZSBpbm5lciBUaW1lIGNvbXBvbmVudC4gSW50ZXJuYWwgdXNlLiAqL1xuICAgIHRpbWU6IFRpbWVPYmplY3QgPSB7IGhvdXI6IDAsIG1pbnV0ZTogMCwgc2Vjb25kOiAwIH07XG5cbiAgICAvKiogQGhpZGRlbiBUaGUgQ2FsZW5kYXJEYXkgb2JqZWN0IHdoaWNoIGludGVyYWN0cyB3aXRoIHRoZSBpbm5lciBDYWxlbmRhciBjb21wb25lbnQuIEludGVybmFsIHVzZS4gKi9cbiAgICBzZWxlY3RlZERhdGU6IEZkRGF0ZTtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gb2YgdGhlIGRhdGVGcm9tSW5wdXQuICovXG4gICAgcHJpdmF0ZSBkYXRlRnJvbUlucHV0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICAvKiogUGxhY2Vob2xkZXIgZm9yIHRoZSBpbm5lciBpbnB1dCBlbGVtZW50LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdtbS9kZC95eXl5LCBoaDptbTpzcyBhbSc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBpbiBjb21wYWN0IG1vZGUuICovXG4gICAgQElucHV0KClcbiAgICBjb21wYWN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiAgVGhlIHBsYWNlbWVudCBvZiB0aGUgcG9wb3Zlci4gSXQgY2FuIGJlIG9uZSBvZjogdG9wLCB0b3Atc3RhcnQsIHRvcC1lbmQsIGJvdHRvbSxcbiAgICAgKiAgYm90dG9tLXN0YXJ0LCBib3R0b20tZW5kLCByaWdodCwgcmlnaHQtc3RhcnQsIHJpZ2h0LWVuZCwgbGVmdCwgbGVmdC1zdGFydCwgbGVmdC1lbmQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwbGFjZW1lbnQ6IFBsYWNlbWVudCA9ICdib3R0b20tc3RhcnQnO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRpbWUgY29tcG9uZW50IHNob3VsZCBiZSBtZXJpZGlhbiAoYW0vcG0pLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWVyaWRpYW46IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRpbWUgY29tcG9uZW50IHNob3dzIHNwaW5uZXJzIGZvciBjaGFuZ2luZyB0aGUgdGltZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNwaW5uZXJzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0aW1lIGNvbXBvbmVudCBzaG93cyBzZWNvbmRzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheVNlY29uZHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRpbWUgY29tcG9uZW50IHNob3dzIG1pbnV0ZXMuICovXG4gICAgQElucHV0KClcbiAgICBkaXNwbGF5TWludXRlczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGltZSBjb21wb25lbnQgc2hvd3MgaG91cnMuICovXG4gICAgQElucHV0KClcbiAgICBkaXNwbGF5SG91cnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdG8gcGVyZm9ybSB2aXN1YWwgdmFsaWRhdGlvbiBvbiB0aGUgcGlja2VyIGlucHV0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdXNlVmFsaWRhdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQ3VycmVudCBzZWxlY3RlZCBkYXRlLiBUd28td2F5IGJpbmRpbmcgaXMgc3VwcG9ydGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGF0ZTogRmREYXRldGltZSA9IEZkRGF0ZXRpbWUuZ2V0VG9kYXkoKTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIGlzIG9wZW4uIFR3by13YXkgYmluZGluZyBpcyBzdXBwb3J0ZWQuICovXG4gICAgQElucHV0KClcbiAgICBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBUaGUgZGlzYWJsZUZ1bmN0aW9uIGZvciB0aGUgY2FsZW5kYXIuICovXG4gICAgQElucHV0KClcbiAgICBzdGFydGluZ0RheU9mV2VlazogRGF5c09mV2VlayA9IDE7XG5cbiAgICAvKiogQWN0dWFsbHkgc2hvd24gYWN0aXZlIHZpZXcgb25lIG9mICdkYXknIHwgJ21vbnRoJyB8ICd5ZWFyJyBpbiBjYWxlbmRhciBjb21wb25lbnQqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGFjdGl2ZVZpZXc6IEZkQ2FsZW5kYXJWaWV3ID0gJ2RheSc7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlIGRhdGV0aW1lIHBpY2tlciBpbnB1dC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRhdGV0aW1lSW5wdXRMYWJlbDogc3RyaW5nID0gJ0RhdGV0aW1lIGlucHV0JztcblxuICAgIC8qKiBBcmlhIGxhYmVsIGZvciB0aGUgYnV0dG9uIHRvIHNob3cvaGlkZSB0aGUgY2FsZW5kYXIuICovXG4gICAgQElucHV0KClcbiAgICBkaXNwbGF5RGF0ZXRpbWVUb2dnbGVMYWJlbDogc3RyaW5nID0gJ0Rpc3BsYXkgY2FsZW5kYXIgdG9nZ2xlJztcblxuICAgIC8qKiBXaGV0aGVyIGEgbnVsbCBpbnB1dCBpcyBjb25zaWRlcmVkIHZhbGlkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWxsb3dOdWxsOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBFdmVudCB0aHJvd24gZXZlcnkgdGltZSBjYWxlbmRhciBhY3RpdmUgdmlldyBpcyBjaGFuZ2VkICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGFjdGl2ZVZpZXdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGZENhbGVuZGFyVmlldz4gPSBuZXcgRXZlbnRFbWl0dGVyPEZkQ2FsZW5kYXJWaWV3PigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZGF0ZSBjaGFuZ2VzLiBUaGlzIGNhbiBiZSBhIHRpbWUgb3IgZGF5IGNoYW5nZS4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBkYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmREYXRldGltZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZkRGF0ZXRpbWU+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkYXkgY2hhbmdlcyBmcm9tIHRoZSBjYWxlbmRhci4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBjYWxlbmRhckNoYW5nZTogRXZlbnRFbWl0dGVyPEZkRGF0ZXRpbWU+ID0gbmV3IEV2ZW50RW1pdHRlcjxGZERhdGV0aW1lPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdGltZSBjaGFuZ2VzIGZyb20gdGhlIHRpbWUgY29tcG9uZW50LiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHRpbWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGZERhdGV0aW1lPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmREYXRldGltZT4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gcG9wb3ZlciBjbG9zZXMuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgb25DbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbkNoYW5nZTogYW55ID0gKHNlbGVjdGVkOiBhbnkpID0+IHtcbiAgICB9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBkaXNhYmxlIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlRnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gZGlzYWJsZSBjZXJ0YWluIGRhdGVzIGluIHRoZSBjYWxlbmRhciBmb3IgdGhlIHJhbmdlIHN0YXJ0IHNlbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZVJhbmdlU3RhcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGZkRGF0ZTogRmREYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBkaXNhYmxlIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyIGZvciB0aGUgcmFuZ2UgZW5kIHNlbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZVJhbmdlRW5kRnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gYmxvY2sgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIgZm9yIHRoZSByYW5nZSBzdGFydCBzZWxlY3Rpb24uXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJsb2NrUmFuZ2VTdGFydEZ1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGJsb2NrIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyIGZvciB0aGUgcmFuZ2UgZW5kIHNlbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYmxvY2tSYW5nZUVuZEZ1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGJsb2NrIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBibG9ja0Z1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogRnVuY3Rpb24gdGhhdCBpbXBsZW1lbnRzIFZhbGlkYXRvciBJbnRlcmZhY2UsIGFkZHMgdmFsaWRhdGlvbiBzdXBwb3J0IGZvciBmb3Jtc1xuICAgICAqL1xuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogYW55XG4gICAgfSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzTW9kZWxWYWxpZCgpID8gbnVsbCA6IHtcbiAgICAgICAgICAgIGRhdGVWYWxpZGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqIFRvZ2dsZXMgdGhlIHBvcG92ZXIuICovXG4gICAgdG9nZ2xlUG9wb3ZlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlUG9wb3ZlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuUG9wb3ZlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRoYXQgaGFuZGxlIGNhbGVuZGFyIGFjdGl2ZSB2aWV3IGNoYW5nZSBhbmQgdGhyb3dzIGV2ZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVDYWxlbmRhckFjdGl2ZVZpZXdDaGFuZ2UoYWN0aXZlVmlldzogRmRDYWxlbmRhclZpZXcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hY3RpdmVWaWV3Q2hhbmdlLmVtaXQoYWN0aXZlVmlldyk7XG4gICAgfVxuXG4gICAgLyoqIE9wZW5zIHRoZSBwb3BvdmVyLiAqL1xuICAgIG9wZW5Qb3BvdmVyKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENsb3NlcyB0aGUgcG9wb3ZlciBhbmQgcmVmcmVzaCBtb2RlbCAqL1xuICAgIGNsb3NlUG9wb3ZlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlKHRoaXMuaW5wdXRGaWVsZERhdGUpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoKTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGlzSW52YWxpZERhdGVJbnB1dEhhbmRsZXIoZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzSW52YWxpZERhdGVJbnB1dCA9IGU7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLmVzY2FwZScsIFtdKVxuICAgIG9uRXNjYXBlS2V5ZG93bkhhbmRsZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xvc2VQb3BvdmVyKCk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gICAgcHVibGljIG9uR2xvYmFsQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVBvcG92ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRhdGUgJiYgdGhpcy5pbnB1dEZpZWxkRGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB0aGlzLmRhdGUuZGF0ZTtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRoaXMuZGF0ZS50aW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZUZyb21JbnB1dFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5kYXRlRnJvbUlucHV0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lRm9ybWF0UGFyc2VyXG4gICAgKSB7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoc2VsZWN0ZWQ6IGFueSkgPT4geyB2b2lkIH0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBGdW5jdGlvbiB0aGF0IHByb3ZpZGVzIHN1cHBvcnQgZm9yIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHRoYXQgYWxsb3dzIHRvIHVzZSBbKG5nTW9kZWwpXSBvciBmb3Jtc1xuICAgICAqL1xuICAgIHdyaXRlVmFsdWUoc2VsZWN0ZWQ6IEZkRGF0ZXRpbWUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFzZWxlY3RlZCB8fCAhKHNlbGVjdGVkIGluc3RhbmNlb2YgRmREYXRldGltZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHNlbGVjdGVkLmRhdGU7XG4gICAgICAgIHRoaXMudGltZSA9IHNlbGVjdGVkLnRpbWU7XG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBGZERhdGV0aW1lKHRoaXMuc2VsZWN0ZWREYXRlLCB0aGlzLnRpbWUpO1xuICAgICAgICBpZiAodGhpcy5pc01vZGVsVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhckNvbXBvbmVudC5zZXRDdXJyZW50bHlEaXNwbGF5ZWQodGhpcy5kYXRlLmRhdGUpO1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dCh0aGlzLmRhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIE1ldGhvZCB0aGF0IGlzIHRyaWdnZXJlZCBieSBldmVudHMgZnJvbSBjYWxlbmRhciBjb21wb25lbnQsIHdoZW4gdGhlcmUgaXMgc2VsZWN0ZWQgZGF0ZSBjaGFuZ2VkLlxuICAgICAqIElmIGludmFsaWQgdGltZSBtb2RlbCBpcyBkZXRlY3RlZCwgaXQgdGFrZXMgdGltZSBtb2RlbCBkYXRhIGZyb20gVGltZUNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBoYW5kbGVEYXRlQ2hhbmdlKGRhdGU6IEZkRGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGU7XG4gICAgICAgIGlmICghdGhpcy5kYXRlLmlzVGltZVZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZUNvbXBvbmVudC50aW1lO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBGZERhdGV0aW1lKHRoaXMuc2VsZWN0ZWREYXRlLCB0aGlzLnRpbWUpO1xuICAgICAgICB0aGlzLmlzSW52YWxpZERhdGVJbnB1dCA9ICF0aGlzLmlzTW9kZWxWYWxpZCgpO1xuICAgICAgICB0aGlzLnNldElucHV0KHRoaXMuZGF0ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5kYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogTWV0aG9kIHRoYXQgaXMgdHJpZ2dlcmVkIGJ5IGV2ZW50cyBmcm9tIHRpbWUgY29tcG9uZW50LCB3aGVuIHRoZXJlIGlzIHNlbGVjdGVkIHRpbWUgY2hhbmdlZFxuICAgICAqL1xuICAgIGhhbmRsZVRpbWVDaGFuZ2UodGltZTogVGltZU9iamVjdCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWREYXRlIHx8ICF0aGlzLnNlbGVjdGVkRGF0ZS5pc0RhdGVWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IEZkRGF0ZS5nZXRUb2RheSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBGZERhdGV0aW1lKHRoaXMuc2VsZWN0ZWREYXRlLCB0aGlzLnRpbWUpO1xuICAgICAgICB0aGlzLmlzSW52YWxpZERhdGVJbnB1dCA9ICF0aGlzLmlzTW9kZWxWYWxpZCgpO1xuICAgICAgICB0aGlzLnNldElucHV0KHRoaXMuZGF0ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5kYXRlKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGZvY3VzQXJyb3dMZWZ0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgdGhpcy5jYWxlbmRhckNvbXBvbmVudC5pZCArICctbGVmdC1hcnJvdycpKSB7XG4gICAgICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignIycgKyB0aGlzLmNhbGVuZGFyQ29tcG9uZW50LmlkICsgJy1sZWZ0LWFycm93JykuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBNZXRob2QsIHdoaWNoIGlzIHJlc3BvbnNpYmxlIGZvciB0cmFuc2Zvcm1pbmcgc3RyaW5nIHRvIGRhdGV0aW1lLCBkZXBlbmRpbmcgb24gdHlwZSBvclxuICAgICAqIHZhbGlkYXRpb24gdGhlIHJlc3VsdHMgYXJlIGRpZmZlcmVudC4gSXQgYWxzbyBjaGFuZ2VzIHRvIHN0YXRlIG9mIGlzSW52YWxpZERhdGVJbnB1dC5cbiAgICAgKi9cbiAgICBoYW5kbGVJbnB1dENoYW5nZShkYXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmRUaW1lRGF0ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKGRhdGUpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGZkVGltZURhdGUuZGF0ZTtcbiAgICAgICAgdGhpcy50aW1lID0gZmRUaW1lRGF0ZS50aW1lO1xuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRmREYXRldGltZSh0aGlzLnNlbGVjdGVkRGF0ZSwgdGhpcy50aW1lKTtcbiAgICAgICAgdGhpcy5pc0ludmFsaWREYXRlSW5wdXQgPSAhdGhpcy5pc01vZGVsVmFsaWQoKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZShmZFRpbWVEYXRlKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW52YWxpZERhdGVJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhckNvbXBvbmVudC5zZXRDdXJyZW50bHlEaXNwbGF5ZWQoZmRUaW1lRGF0ZS5kYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRhdGUgJiYgdGhpcy5hbGxvd051bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNJbnZhbGlkRGF0ZUlucHV0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBGZERhdGV0aW1lLmdldFRvZGF5KCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHRoaXMuZGF0ZS5kYXRlO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gdGhpcy5kYXRlLnRpbWU7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyQ29tcG9uZW50LnNldEN1cnJlbnRseURpc3BsYXllZCh0aGlzLmRhdGUuZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKG51bGwpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmFsbG93TnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pc0ludmFsaWREYXRlSW5wdXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE1ldGhvZCB0aGF0IHByb3ZpZGVzIGluZm9ybWF0aW9uIGlmIG1vZGVsIHNlbGVjdGVkIGRhdGUvZGF0ZXMgaGF2ZSBwcm9wZXJseSB0eXBlcyBhbmQgYXJlIHZhbGlkICovXG4gICAgcHVibGljIGlzTW9kZWxWYWxpZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlIGluc3RhbmNlb2YgRmREYXRldGltZSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlLmlzRGF0ZVZhbGlkKCkgJiYgdGhpcy5kYXRlLmlzVGltZVZhbGlkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJbnB1dChmZERhdGVUaW1lOiBGZERhdGV0aW1lKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRGaWVsZERhdGUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoZmREYXRlVGltZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0UmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbn1cbiJdfQ==