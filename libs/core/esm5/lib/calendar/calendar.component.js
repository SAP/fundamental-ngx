/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarI18n } from './i18n/calendar-i18n';
import { FdDate } from './models/fd-date';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarDayViewComponent } from './calendar-views/calendar-day-view/calendar-day-view.component';
import { CalendarYearViewComponent } from './calendar-views/calendar-year-view/calendar-year-view.component';
/** @type {?} */
var calendarUniqueId = 0;
/**
 * Months: 1 = January, 12 = december.
 * Days: 1 = Sunday, 7 = Saturday
 *
 * Calendar component used for selecting dates, typically used by the DatePicker and DateTimePicker components.
 * Supports the Angular forms module, enabling form validity, ngModel, etc.
 * ```html
 * <fd-calendar></fd-calendar>
 * ```
 */
var CalendarComponent = /** @class */ (function () {
    /** @hidden */
    function CalendarComponent(calendarI18n, changeDetectorRef) {
        var _this = this;
        this.calendarI18n = calendarI18n;
        this.changeDetectorRef = changeDetectorRef;
        /**
         * @hidden
         */
        this.fdCalendarClass = true;
        /**
         * @hidden
         */
        this.fdHasDisplayBlockClass = true;
        /**
         * The currently selected FdDate model in single mode.
         */
        this.selectedDate = FdDate.getToday();
        /**
         * Actually shown active view one of 'day' | 'month' | 'year'
         */
        this.activeView = 'day';
        /**
         * The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on.
         */
        this.startingDayOfWeek = 1;
        /**
         * The type of calendar, 'single' for single date selection or 'range' for a range of dates.
         */
        this.calType = 'single';
        /**
         * Id of the calendar. If none is provided, one will be generated.
         */
        this.id = 'fd-calendar-' + calendarUniqueId++;
        /**
         * Event thrown every time active view is changed
         */
        this.activeViewChange = new EventEmitter();
        /**
         * Event thrown every time selected date in single mode is changed
         */
        this.selectedDateChange = new EventEmitter();
        /**
         * Event thrown every time selected first or last date in range mode is changed
         */
        this.selectedRangeDateChange = new EventEmitter();
        /**
         * Event thrown every time when value is overwritten from outside and throw back isValid
         */
        this.isValidDateChange = new EventEmitter();
        /**
         * Event thrown every time when calendar should be closed
         */
        this.closeCalendar = new EventEmitter();
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () {
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
        /**
         * That allows to define function that should happen, when focus should normally escape of component
         */
        this.escapeFocusFunction = (/**
         * @return {?}
         */
        function () {
            if (document.getElementById(_this.id + '-left-arrow')) {
                document.getElementById(_this.id + '-left-arrow').focus();
            }
        });
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.prepareDisplayedView();
    };
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms.
     */
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms.
     * @param {?} selected
     * @return {?}
     */
    CalendarComponent.prototype.writeValue = /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms.
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        /** @type {?} */
        var valid = true;
        if (selected) {
            if (this.calType === 'single') {
                selected = (/** @type {?} */ (selected));
                valid = selected.isDateValid();
                this.selectedDate = selected;
                if (selected.isDateValid()) {
                    this.prepareDisplayedView();
                }
            }
            else if (this.calType === 'range') {
                selected = (/** @type {?} */ (selected));
                if (!selected.start || !selected.end) {
                    valid = false;
                }
                if (selected.start && !selected.start.isDateValid()) {
                    valid = false;
                }
                if (selected.end && !selected.end.isDateValid()) {
                    valid = false;
                }
                this.selectedRangeDate = { start: selected.start, end: selected.end };
                if (valid) {
                    this.prepareDisplayedView();
                }
            }
        }
        this.isValidDateChange.emit(valid);
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
    CalendarComponent.prototype.validate = /**
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
    CalendarComponent.prototype.registerOnChange = /**
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
    CalendarComponent.prototype.registerOnTouched = /**
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
    CalendarComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        // Not needed
    };
    /**
     * Method that handle active view change and throws event.
     */
    /**
     * Method that handle active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    CalendarComponent.prototype.handleActiveViewChange = /**
     * Method that handle active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    function (activeView) {
        this.activeView = activeView;
        this.activeViewChange.emit(activeView);
    };
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected single date changed
     */
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected single date changed
     * @param {?} date
     * @return {?}
     */
    CalendarComponent.prototype.selectedDateChanged = /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected single date changed
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.selectedDate = date;
        this.onChange(date);
        this.onTouched();
        this.selectedDateChange.emit(date);
        this.closeCalendar.emit();
    };
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     */
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     * @param {?} dates
     * @return {?}
     */
    CalendarComponent.prototype.selectedRangeDateChanged = /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     * @param {?} dates
     * @return {?}
     */
    function (dates) {
        if (dates) {
            this.selectedRangeDate = { start: dates.start, end: dates.end ? dates.end : dates.start };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
            this.onTouched();
            this.closeCalendar.emit();
        }
    };
    /** Function that handles next arrow icon click, depending on current view it changes month, year or list of years */
    /**
     * Function that handles next arrow icon click, depending on current view it changes month, year or list of years
     * @return {?}
     */
    CalendarComponent.prototype.handleNextArrowClick = /**
     * Function that handles next arrow icon click, depending on current view it changes month, year or list of years
     * @return {?}
     */
    function () {
        switch (this.activeView) {
            case 'day':
                this.displayNextMonth();
                break;
            case 'month':
                this.displayNextYear();
                break;
            case 'year':
                this.displayNextYearList();
                break;
        }
        this.onTouched();
    };
    /** Function that handles previous arrow icon click, depending on current view it changes month, year or list of years */
    /**
     * Function that handles previous arrow icon click, depending on current view it changes month, year or list of years
     * @return {?}
     */
    CalendarComponent.prototype.handlePreviousArrowClick = /**
     * Function that handles previous arrow icon click, depending on current view it changes month, year or list of years
     * @return {?}
     */
    function () {
        switch (this.activeView) {
            case 'day':
                this.displayPreviousMonth();
                break;
            case 'month':
                this.displayPreviousYear();
                break;
            case 'year':
                this.displayPreviousYearList();
                break;
        }
        this.onTouched();
    };
    /** Function that allows to switch actual view to next month */
    /**
     * Function that allows to switch actual view to next month
     * @return {?}
     */
    CalendarComponent.prototype.displayNextMonth = /**
     * Function that allows to switch actual view to next month
     * @return {?}
     */
    function () {
        if (this.currentlyDisplayed.month === 12) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month + 1 };
        }
    };
    /** Function that allows to switch actual view to previous month */
    /**
     * Function that allows to switch actual view to previous month
     * @return {?}
     */
    CalendarComponent.prototype.displayPreviousMonth = /**
     * Function that allows to switch actual view to previous month
     * @return {?}
     */
    function () {
        if (this.currentlyDisplayed.month <= 1) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month - 1 };
        }
    };
    /** Function that allows to switch actual view to next year */
    /**
     * Function that allows to switch actual view to next year
     * @return {?}
     */
    CalendarComponent.prototype.displayNextYear = /**
     * Function that allows to switch actual view to next year
     * @return {?}
     */
    function () {
        this.currentlyDisplayed = { month: this.currentlyDisplayed.month, year: this.currentlyDisplayed.year + 1 };
    };
    /** Function that allows to switch actual view to previous year */
    /**
     * Function that allows to switch actual view to previous year
     * @return {?}
     */
    CalendarComponent.prototype.displayPreviousYear = /**
     * Function that allows to switch actual view to previous year
     * @return {?}
     */
    function () {
        this.currentlyDisplayed = { month: this.currentlyDisplayed.month, year: this.currentlyDisplayed.year - 1 };
    };
    /** Function that allows to switch actually displayed list of year to next year list*/
    /**
     * Function that allows to switch actually displayed list of year to next year list
     * @return {?}
     */
    CalendarComponent.prototype.displayNextYearList = /**
     * Function that allows to switch actually displayed list of year to next year list
     * @return {?}
     */
    function () {
        this.yearViewComponent.loadNextYearList();
    };
    /** Function that allows to switch actually displayed list of year to previous year list*/
    /**
     * Function that allows to switch actually displayed list of year to previous year list
     * @return {?}
     */
    CalendarComponent.prototype.displayPreviousYearList = /**
     * Function that allows to switch actually displayed list of year to previous year list
     * @return {?}
     */
    function () {
        this.yearViewComponent.loadPreviousYearList();
    };
    /** Function that allows to change currently displayed month/year configuration,
     * which are connected to days displayed
     */
    /**
     * Function that allows to change currently displayed month/year configuration,
     * which are connected to days displayed
     * @param {?} fdDate
     * @return {?}
     */
    CalendarComponent.prototype.setCurrentlyDisplayed = /**
     * Function that allows to change currently displayed month/year configuration,
     * which are connected to days displayed
     * @param {?} fdDate
     * @return {?}
     */
    function (fdDate) {
        this.currentlyDisplayed = { month: fdDate.month, year: fdDate.year };
    };
    /**
     * @hidden
     * Function that handles changes from month view child component, changes actual view and changes currently displayed month
     */
    /**
     * @hidden
     * Function that handles changes from month view child component, changes actual view and changes currently displayed month
     * @param {?} month
     * @return {?}
     */
    CalendarComponent.prototype.handleMonthViewChange = /**
     * @hidden
     * Function that handles changes from month view child component, changes actual view and changes currently displayed month
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.currentlyDisplayed = { month: month, year: this.currentlyDisplayed.year };
        this.activeView = 'day';
        this.activeViewChange.emit(this.activeView);
        this.changeDetectorRef.detectChanges();
        this.dayViewComponent.focusActiveDay();
    };
    /**
     * @param {?} yearSelected
     * @return {?}
     */
    CalendarComponent.prototype.selectedYear = /**
     * @param {?} yearSelected
     * @return {?}
     */
    function (yearSelected) {
        this.activeView = 'day';
        this.currentlyDisplayed.year = yearSelected;
        this.changeDetectorRef.detectChanges();
        this.dayViewComponent.focusActiveDay();
    };
    /** Method that provides information if model selected date/dates have properly types and are valid */
    /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    CalendarComponent.prototype.isModelValid = /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    function () {
        if (this.calType === 'single') {
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
                this.selectedRangeDate.start.isDateValid());
        }
    };
    /**
     * @hidden
     * Method that sets up the currently displayed variables, like shown month and year.
     * Day grid is based on currently displayed month and year
     */
    /**
     * @hidden
     * Method that sets up the currently displayed variables, like shown month and year.
     * Day grid is based on currently displayed month and year
     * @private
     * @return {?}
     */
    CalendarComponent.prototype.prepareDisplayedView = /**
     * @hidden
     * Method that sets up the currently displayed variables, like shown month and year.
     * Day grid is based on currently displayed month and year
     * @private
     * @return {?}
     */
    function () {
        if (this.calType === 'single' && this.selectedDate && this.selectedDate.month && this.selectedDate.year) {
            this.currentlyDisplayed = { month: this.selectedDate.month, year: this.selectedDate.year };
        }
        else if (this.selectedRangeDate && this.selectedRangeDate.start) {
            this.currentlyDisplayed = {
                month: this.selectedRangeDate.start.month,
                year: this.selectedRangeDate.start.year
            };
        }
        else if (this.selectedRangeDate && this.selectedRangeDate.end) {
            this.currentlyDisplayed = {
                month: this.selectedRangeDate.end.month,
                year: this.selectedRangeDate.end.year
            };
        }
        else {
            /** @type {?} */
            var tempDate = FdDate.getToday();
            this.currentlyDisplayed = { month: tempDate.month, year: tempDate.year };
        }
    };
    CalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-calendar',
                    template: "<fd-calendar-header [currentlyDisplayed]=\"currentlyDisplayed\"\n                    [activeView]=\"activeView\"\n                    (activeViewChange)=\"handleActiveViewChange($event)\"\n                    [id]=\"id\"\n                    (nextClicked)=\"handleNextArrowClick()\"\n                    (previousClicked)=\"handlePreviousArrowClick()\"\n></fd-calendar-header>\n<ng-container [ngSwitch]=\"activeView\">\n    <div class=\"fd-calendar__content\">\n        <fd-calendar-day-view *ngSwitchCase=\"'day'\"\n                              [selectedDate]=\"selectedDate\"\n                              (selectedDateChange)=\"selectedDateChanged($event)\"\n                              [selectedRangeDate]=\"selectedRangeDate\"\n                              (selectedRangeDateChange)=\"selectedRangeDateChanged($event)\"\n                              [currentlyDisplayed]=\"currentlyDisplayed\"\n                              [startingDayOfWeek]=\"startingDayOfWeek\"\n                              [blockFunction]=\"blockFunction\"\n                              [disableFunction]=\"disableFunction\"\n                              [disableRangeEndFunction]=\"disableRangeEndFunction\"\n                              [blockRangeEndFunction]=\"blockRangeEndFunction\"\n                              [disableRangeStartFunction]=\"disableRangeStartFunction\"\n                              [blockRangeStartFunction]=\"blockRangeStartFunction\"\n                              [calType]=\"calType\"\n                              [id]=\"id\"\n                              [focusEscapeFunction]=\"escapeFocusFunction\"\n                              (nextMonthSelect)=\"displayNextMonth()\"\n                              (previousMonthSelect)=\"displayPreviousMonth()\"\n        ></fd-calendar-day-view>\n        <fd-calendar-month-view *ngSwitchCase=\"'month'\"\n                                [monthSelected]=\"currentlyDisplayed?.month\"\n                                [id]=\"id\"\n                                [focusEscapeFunction]=\"escapeFocusFunction\"\n                                (monthClicked)=\"handleMonthViewChange($event)\"\n        ></fd-calendar-month-view>\n        <fd-calendar-year-view *ngSwitchCase=\"'year'\"\n                               (yearClicked)=\"selectedYear($event)\"\n                               [yearSelected]=\"currentlyDisplayed.year\"\n                               [id]=\"id\"\n                               [focusEscapeFunction]=\"escapeFocusFunction\">\n        </fd-calendar-year-view>\n    </div>\n</ng-container>\n\n",
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return CalendarComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return CalendarComponent; })),
                            multi: true
                        }
                    ],
                    host: {
                        '(blur)': 'onTouched()',
                        '[attr.id]': 'id'
                    },
                    styles: [".fd-calendar__content{min-height:276px;background:#fff}.fd-calendar__content li:focus,.fd-calendar__content td:focus{outline:0;box-shadow:inset 0 0 2px 2px var(--fd-color-neutral-3)}.fd-calendar__content li:focus:after,.fd-calendar__content td:focus:after{display:none}"]
                }] }
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return [
        { type: CalendarI18n },
        { type: ChangeDetectorRef }
    ]; };
    CalendarComponent.propDecorators = {
        dayViewComponent: [{ type: ViewChild, args: [CalendarDayViewComponent,] }],
        yearViewComponent: [{ type: ViewChild, args: [CalendarYearViewComponent,] }],
        fdCalendarClass: [{ type: HostBinding, args: ['class.fd-calendar',] }],
        fdHasDisplayBlockClass: [{ type: HostBinding, args: ['class.fd-has-display-block',] }],
        selectedDate: [{ type: Input }],
        selectedRangeDate: [{ type: Input }],
        activeView: [{ type: Input }],
        startingDayOfWeek: [{ type: Input }],
        calType: [{ type: Input }],
        id: [{ type: Input }],
        activeViewChange: [{ type: Output }],
        selectedDateChange: [{ type: Output }],
        selectedRangeDateChange: [{ type: Output }],
        isValidDateChange: [{ type: Output }],
        closeCalendar: [{ type: Output }],
        disableFunction: [{ type: Input }],
        disableRangeStartFunction: [{ type: Input }],
        disableRangeEndFunction: [{ type: Input }],
        blockRangeStartFunction: [{ type: Input }],
        blockRangeEndFunction: [{ type: Input }],
        blockFunction: [{ type: Input }],
        escapeFocusFunction: [{ type: Input }]
    };
    return CalendarComponent;
}());
export { CalendarComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    CalendarComponent.prototype.dayViewComponent;
    /**
     * @hidden
     * @type {?}
     */
    CalendarComponent.prototype.yearViewComponent;
    /**
     * @hidden
     * @type {?}
     */
    CalendarComponent.prototype.fdCalendarClass;
    /**
     * @hidden
     * @type {?}
     */
    CalendarComponent.prototype.fdHasDisplayBlockClass;
    /**
     * Currently displayed days depending on month and year
     * @type {?}
     */
    CalendarComponent.prototype.currentlyDisplayed;
    /**
     * The currently selected FdDate model in single mode.
     * @type {?}
     */
    CalendarComponent.prototype.selectedDate;
    /**
     * The currently selected FdDates model start and end in range mode.
     * @type {?}
     */
    CalendarComponent.prototype.selectedRangeDate;
    /**
     * Actually shown active view one of 'day' | 'month' | 'year'
     * @type {?}
     */
    CalendarComponent.prototype.activeView;
    /**
     * The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on.
     * @type {?}
     */
    CalendarComponent.prototype.startingDayOfWeek;
    /**
     * The type of calendar, 'single' for single date selection or 'range' for a range of dates.
     * @type {?}
     */
    CalendarComponent.prototype.calType;
    /**
     * Id of the calendar. If none is provided, one will be generated.
     * @type {?}
     */
    CalendarComponent.prototype.id;
    /**
     * Event thrown every time active view is changed
     * @type {?}
     */
    CalendarComponent.prototype.activeViewChange;
    /**
     * Event thrown every time selected date in single mode is changed
     * @type {?}
     */
    CalendarComponent.prototype.selectedDateChange;
    /**
     * Event thrown every time selected first or last date in range mode is changed
     * @type {?}
     */
    CalendarComponent.prototype.selectedRangeDateChange;
    /**
     * Event thrown every time when value is overwritten from outside and throw back isValid
     * @type {?}
     */
    CalendarComponent.prototype.isValidDateChange;
    /**
     * Event thrown every time when calendar should be closed
     * @type {?}
     */
    CalendarComponent.prototype.closeCalendar;
    /**
     * @hidden
     * @type {?}
     */
    CalendarComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    CalendarComponent.prototype.onTouched;
    /**
     * Function used to disable certain dates in the calendar.
     * \@param fdDate FdDate
     * @type {?}
     */
    CalendarComponent.prototype.disableFunction;
    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    CalendarComponent.prototype.disableRangeStartFunction;
    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    CalendarComponent.prototype.disableRangeEndFunction;
    /**
     * Function used to block certain dates in the calendar for the range start selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    CalendarComponent.prototype.blockRangeStartFunction;
    /**
     * Function used to block certain dates in the calendar for the range end selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    CalendarComponent.prototype.blockRangeEndFunction;
    /**
     * Function used to block certain dates in the calendar.
     * \@param fdDate FdDate
     * @type {?}
     */
    CalendarComponent.prototype.blockFunction;
    /**
     * That allows to define function that should happen, when focus should normally escape of component
     * @type {?}
     */
    CalendarComponent.prototype.escapeFocusFunction;
    /** @type {?} */
    CalendarComponent.prototype.calendarI18n;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFMUMsT0FBTyxFQUF5QyxhQUFhLEVBQUUsaUJBQWlCLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwSCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUUxRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQzs7SUFFekcsZ0JBQWdCLEdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7QUFxQmhDO0lBMkpJLGNBQWM7SUFDZCwyQkFDVyxZQUEwQixFQUN6QixpQkFBb0M7UUFGaEQsaUJBR0k7UUFGTyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUN6QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1COzs7O1FBOUhoRCxvQkFBZSxHQUFZLElBQUksQ0FBQzs7OztRQUloQywyQkFBc0IsR0FBWSxJQUFJLENBQUM7Ozs7UUFPaEMsaUJBQVksR0FBVyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7Ozs7UUFRekMsZUFBVSxHQUFtQixLQUFLLENBQUM7Ozs7UUFJbkMsc0JBQWlCLEdBQWUsQ0FBQyxDQUFDOzs7O1FBSWxDLFlBQU8sR0FBaUIsUUFBUSxDQUFDOzs7O1FBSXhDLE9BQUUsR0FBRyxjQUFjLEdBQUcs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R2hELDhDQUNzQzs7Ozs7SUFHdEMsdUNBQzBDOzs7OztJQUcxQyw4Q0FDeUM7Ozs7O0lBR3pDLG9DQUN3Qzs7Ozs7SUFHeEMsK0JBQ3lDOzs7OztJQUd6Qyw2Q0FDb0c7Ozs7O0lBR3BHLCtDQUNzRjs7Ozs7SUFHdEYsb0RBQ3FHOzs7OztJQUdyRyw4Q0FDdUY7Ozs7O0lBR3ZGLDBDQUM2RTs7Ozs7SUFHN0UscUNBQ0U7Ozs7O0lBR0Ysc0NBQ0U7Ozs7OztJQU1GLDRDQUdFOzs7Ozs7SUFNRixzREFHRTs7Ozs7O0lBTUYsb0RBR0U7Ozs7OztJQU1GLG9EQUdFOzs7Ozs7SUFNRixrREFHRTs7Ozs7O0lBTUYsMENBR0U7Ozs7O0lBR0YsZ0RBS0U7O0lBSUUseUNBQWlDOzs7OztJQUNqQyw4Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBIb3N0QmluZGluZyxcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFySTE4biB9IGZyb20gJy4vaTE4bi9jYWxlbmRhci1pMThuJztcbmltcG9ydCB7IEZkRGF0ZSB9IGZyb20gJy4vbW9kZWxzL2ZkLWRhdGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDdXJyZW50IH0gZnJvbSAnLi9tb2RlbHMvY2FsZW5kYXItY3VycmVudCc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdG9yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci12aWV3cy9jYWxlbmRhci1kYXktdmlldy9jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmRSYW5nZURhdGUgfSBmcm9tICcuL21vZGVscy9mZC1yYW5nZS1kYXRlJztcbmltcG9ydCB7IENhbGVuZGFyWWVhclZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXZpZXdzL2NhbGVuZGFyLXllYXItdmlldy9jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50JztcblxubGV0IGNhbGVuZGFyVW5pcXVlSWQ6IG51bWJlciA9IDA7XG5cbi8qKiBUeXBlIG9mIGNhbGVuZGFyICovXG5leHBvcnQgdHlwZSBDYWxlbmRhclR5cGUgPSAnc2luZ2xlJyB8ICdyYW5nZSc7XG5cbi8qKiBUeXBlIGZvciB0aGUgY2FsZW5kYXIgdmlldyAqL1xuZXhwb3J0IHR5cGUgRmRDYWxlbmRhclZpZXcgPSAnZGF5JyB8ICdtb250aCcgfCAneWVhcic7XG5cbi8qKiBUeXBlIGZvciB0aGUgZGF5cyBvZiB0aGUgd2Vlay4gKi9cbmV4cG9ydCB0eXBlIERheXNPZldlZWsgPSAxIHwgMiB8IDMgfCA0IHwgNSB8IDYgfCA3O1xuXG4vKipcbiAqIE1vbnRoczogMSA9IEphbnVhcnksIDEyID0gZGVjZW1iZXIuXG4gKiBEYXlzOiAxID0gU3VuZGF5LCA3ID0gU2F0dXJkYXlcbiAqXG4gKiBDYWxlbmRhciBjb21wb25lbnQgdXNlZCBmb3Igc2VsZWN0aW5nIGRhdGVzLCB0eXBpY2FsbHkgdXNlZCBieSB0aGUgRGF0ZVBpY2tlciBhbmQgRGF0ZVRpbWVQaWNrZXIgY29tcG9uZW50cy5cbiAqIFN1cHBvcnRzIHRoZSBBbmd1bGFyIGZvcm1zIG1vZHVsZSwgZW5hYmxpbmcgZm9ybSB2YWxpZGl0eSwgbmdNb2RlbCwgZXRjLlxuICogYGBgaHRtbFxuICogPGZkLWNhbGVuZGFyPjwvZmQtY2FsZW5kYXI+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1jYWxlbmRhcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2FsZW5kYXJDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENhbGVuZGFyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhibHVyKSc6ICdvblRvdWNoZWQoKScsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBWaWV3Q2hpbGQoQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50KSBkYXlWaWV3Q29tcG9uZW50OiBDYWxlbmRhckRheVZpZXdDb21wb25lbnQ7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBWaWV3Q2hpbGQoQ2FsZW5kYXJZZWFyVmlld0NvbXBvbmVudCkgeWVhclZpZXdDb21wb25lbnQ6IENhbGVuZGFyWWVhclZpZXdDb21wb25lbnQ7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtY2FsZW5kYXInKVxuICAgIGZkQ2FsZW5kYXJDbGFzczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtaGFzLWRpc3BsYXktYmxvY2snKVxuICAgIGZkSGFzRGlzcGxheUJsb2NrQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEN1cnJlbnRseSBkaXNwbGF5ZWQgZGF5cyBkZXBlbmRpbmcgb24gbW9udGggYW5kIHllYXIgKi9cbiAgICBjdXJyZW50bHlEaXNwbGF5ZWQ6IENhbGVuZGFyQ3VycmVudDtcblxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIEZkRGF0ZSBtb2RlbCBpbiBzaW5nbGUgbW9kZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWxlY3RlZERhdGU6IEZkRGF0ZSA9IEZkRGF0ZS5nZXRUb2RheSgpO1xuXG4gICAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgRmREYXRlcyBtb2RlbCBzdGFydCBhbmQgZW5kIGluIHJhbmdlIG1vZGUuICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0ZWRSYW5nZURhdGU6IEZkUmFuZ2VEYXRlO1xuXG4gICAgLyoqIEFjdHVhbGx5IHNob3duIGFjdGl2ZSB2aWV3IG9uZSBvZiAnZGF5JyB8ICdtb250aCcgfCAneWVhcicgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBhY3RpdmVWaWV3OiBGZENhbGVuZGFyVmlldyA9ICdkYXknO1xuXG4gICAgLyoqIFRoZSBkYXkgb2YgdGhlIHdlZWsgdGhlIGNhbGVuZGFyIHNob3VsZCBzdGFydCBvbi4gMSByZXByZXNlbnRzIFN1bmRheSwgMiBpcyBNb25kYXksIDMgaXMgVHVlc2RheSwgYW5kIHNvIG9uLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHN0YXJ0aW5nRGF5T2ZXZWVrOiBEYXlzT2ZXZWVrID0gMTtcblxuICAgIC8qKiBUaGUgdHlwZSBvZiBjYWxlbmRhciwgJ3NpbmdsZScgZm9yIHNpbmdsZSBkYXRlIHNlbGVjdGlvbiBvciAncmFuZ2UnIGZvciBhIHJhbmdlIG9mIGRhdGVzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNhbFR5cGU6IENhbGVuZGFyVHlwZSA9ICdzaW5nbGUnO1xuXG4gICAgLyoqIElkIG9mIHRoZSBjYWxlbmRhci4gSWYgbm9uZSBpcyBwcm92aWRlZCwgb25lIHdpbGwgYmUgZ2VuZXJhdGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaWQgPSAnZmQtY2FsZW5kYXItJyArIGNhbGVuZGFyVW5pcXVlSWQrKztcblxuICAgIC8qKiBFdmVudCB0aHJvd24gZXZlcnkgdGltZSBhY3RpdmUgdmlldyBpcyBjaGFuZ2VkICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGFjdGl2ZVZpZXdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGZENhbGVuZGFyVmlldz4gPSBuZXcgRXZlbnRFbWl0dGVyPEZkQ2FsZW5kYXJWaWV3PigpO1xuXG4gICAgLyoqIEV2ZW50IHRocm93biBldmVyeSB0aW1lIHNlbGVjdGVkIGRhdGUgaW4gc2luZ2xlIG1vZGUgaXMgY2hhbmdlZCAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBzZWxlY3RlZERhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGZERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxGZERhdGU+KCk7XG5cbiAgICAvKiogRXZlbnQgdGhyb3duIGV2ZXJ5IHRpbWUgc2VsZWN0ZWQgZmlyc3Qgb3IgbGFzdCBkYXRlIGluIHJhbmdlIG1vZGUgaXMgY2hhbmdlZCAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBzZWxlY3RlZFJhbmdlRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPEZkUmFuZ2VEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmRSYW5nZURhdGU+KCk7XG5cbiAgICAvKiogRXZlbnQgdGhyb3duIGV2ZXJ5IHRpbWUgd2hlbiB2YWx1ZSBpcyBvdmVyd3JpdHRlbiBmcm9tIG91dHNpZGUgYW5kIHRocm93IGJhY2sgaXNWYWxpZCAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBpc1ZhbGlkRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqIEV2ZW50IHRocm93biBldmVyeSB0aW1lIHdoZW4gY2FsZW5kYXIgc2hvdWxkIGJlIGNsb3NlZCAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBjbG9zZUNhbGVuZGFyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgICB9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGRpc2FibGUgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIuXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVGdW5jdGlvbiA9IGZ1bmN0aW9uKGZkRGF0ZTogRmREYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBkaXNhYmxlIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyIGZvciB0aGUgcmFuZ2Ugc3RhcnQgc2VsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlUmFuZ2VTdGFydEZ1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGRpc2FibGUgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIgZm9yIHRoZSByYW5nZSBlbmQgc2VsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlUmFuZ2VFbmRGdW5jdGlvbiA9IGZ1bmN0aW9uKGZkRGF0ZTogRmREYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBibG9jayBjZXJ0YWluIGRhdGVzIGluIHRoZSBjYWxlbmRhciBmb3IgdGhlIHJhbmdlIHN0YXJ0IHNlbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYmxvY2tSYW5nZVN0YXJ0RnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gYmxvY2sgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIgZm9yIHRoZSByYW5nZSBlbmQgc2VsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBibG9ja1JhbmdlRW5kRnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gYmxvY2sgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIuXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJsb2NrRnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKiBUaGF0IGFsbG93cyB0byBkZWZpbmUgZnVuY3Rpb24gdGhhdCBzaG91bGQgaGFwcGVuLCB3aGVuIGZvY3VzIHNob3VsZCBub3JtYWxseSBlc2NhcGUgb2YgY29tcG9uZW50ICovXG4gICAgQElucHV0KClcbiAgICBlc2NhcGVGb2N1c0Z1bmN0aW9uOiBGdW5jdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQgKyAnLWxlZnQtYXJyb3cnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCArICctbGVmdC1hcnJvdycpLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNhbGVuZGFySTE4bjogQ2FsZW5kYXJJMThuLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge31cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJlcGFyZURpc3BsYXllZFZpZXcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogRnVuY3Rpb24gdGhhdCBwcm92aWRlcyBzdXBwb3J0IGZvciBDb250cm9sVmFsdWVBY2Nlc3NvciB0aGF0IGFsbG93cyB0byB1c2UgWyhuZ01vZGVsKV0gb3IgZm9ybXMuXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZShzZWxlY3RlZDogRmRSYW5nZURhdGUgfCBGZERhdGUpOiB2b2lkIHtcbiAgICAgICAgbGV0IHZhbGlkOiBib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYWxUeXBlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gPEZkRGF0ZT5zZWxlY3RlZDtcblxuICAgICAgICAgICAgICAgIHZhbGlkID0gc2VsZWN0ZWQuaXNEYXRlVmFsaWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHNlbGVjdGVkO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLmlzRGF0ZVZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlRGlzcGxheWVkVmlldygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYWxUeXBlID09PSAncmFuZ2UnKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSA8RmRSYW5nZURhdGU+c2VsZWN0ZWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkLnN0YXJ0IHx8ICFzZWxlY3RlZC5lbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLnN0YXJ0ICYmICFzZWxlY3RlZC5zdGFydC5pc0RhdGVWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZC5lbmQgJiYgIXNlbGVjdGVkLmVuZC5pc0RhdGVWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUgPSB7IHN0YXJ0OiBzZWxlY3RlZC5zdGFydCwgZW5kOiBzZWxlY3RlZC5lbmQgfTtcbiAgICAgICAgICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlRGlzcGxheWVkVmlldygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVmFsaWREYXRlQ2hhbmdlLmVtaXQodmFsaWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBGdW5jdGlvbiB0aGF0IGltcGxlbWVudHMgVmFsaWRhdG9yIEludGVyZmFjZSwgYWRkcyB2YWxpZGF0aW9uIHN1cHBvcnQgZm9yIGZvcm1zXG4gICAgICovXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1xuICAgICAgICBba2V5OiBzdHJpbmddOiBhbnlcbiAgICB9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNNb2RlbFZhbGlkKCkgPyBudWxsIDoge1xuICAgICAgICAgICAgZGF0ZVZhbGlkYXRpb246IHtcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIC8vIE5vdCBuZWVkZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCBoYW5kbGUgYWN0aXZlIHZpZXcgY2hhbmdlIGFuZCB0aHJvd3MgZXZlbnQuXG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZUFjdGl2ZVZpZXdDaGFuZ2UoYWN0aXZlVmlldzogRmRDYWxlbmRhclZpZXcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hY3RpdmVWaWV3ID0gYWN0aXZlVmlldztcbiAgICAgICAgdGhpcy5hY3RpdmVWaWV3Q2hhbmdlLmVtaXQoYWN0aXZlVmlldyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIE1ldGhvZCB0aGF0IGlzIHRyaWdnZXJlZCBieSBldmVudHMgZnJvbSBkYXkgdmlldyBjb21wb25lbnQsIHdoZW4gdGhlcmUgaXMgc2VsZWN0ZWQgc2luZ2xlIGRhdGUgY2hhbmdlZFxuICAgICAqL1xuICAgIHNlbGVjdGVkRGF0ZUNoYW5nZWQoZGF0ZTogRmREYXRlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZShkYXRlKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICAgICAgdGhpcy5jbG9zZUNhbGVuZGFyLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogTWV0aG9kIHRoYXQgaXMgdHJpZ2dlcmVkIGJ5IGV2ZW50cyBmcm9tIGRheSB2aWV3IGNvbXBvbmVudCwgd2hlbiB0aGVyZSBpcyBzZWxlY3RlZCByYW5nZSBkYXRlIGNoYW5nZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0ZWRSYW5nZURhdGVDaGFuZ2VkKGRhdGVzOiBGZFJhbmdlRGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUgPSB7IHN0YXJ0OiBkYXRlcy5zdGFydCwgZW5kOiBkYXRlcy5lbmQgPyBkYXRlcy5lbmQgOiBkYXRlcy5zdGFydCB9O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlKTtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlQ2FsZW5kYXIuZW1pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgaGFuZGxlcyBuZXh0IGFycm93IGljb24gY2xpY2ssIGRlcGVuZGluZyBvbiBjdXJyZW50IHZpZXcgaXQgY2hhbmdlcyBtb250aCwgeWVhciBvciBsaXN0IG9mIHllYXJzICovXG4gICAgcHVibGljIGhhbmRsZU5leHRBcnJvd0NsaWNrKCk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuYWN0aXZlVmlldykge1xuICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlOZXh0TW9udGgoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlOZXh0WWVhcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TmV4dFllYXJMaXN0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBoYW5kbGVzIHByZXZpb3VzIGFycm93IGljb24gY2xpY2ssIGRlcGVuZGluZyBvbiBjdXJyZW50IHZpZXcgaXQgY2hhbmdlcyBtb250aCwgeWVhciBvciBsaXN0IG9mIHllYXJzICovXG4gICAgcHVibGljIGhhbmRsZVByZXZpb3VzQXJyb3dDbGljaygpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmFjdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5UHJldmlvdXNNb250aCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheVByZXZpb3VzWWVhcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5UHJldmlvdXNZZWFyTGlzdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgYWxsb3dzIHRvIHN3aXRjaCBhY3R1YWwgdmlldyB0byBuZXh0IG1vbnRoICovXG4gICAgcHVibGljIGRpc3BsYXlOZXh0TW9udGgoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRseURpc3BsYXllZC5tb250aCA9PT0gMTIpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudGx5RGlzcGxheWVkID0geyB5ZWFyOiB0aGlzLmN1cnJlbnRseURpc3BsYXllZC55ZWFyICsgMSwgbW9udGg6IDEgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudGx5RGlzcGxheWVkID0geyB5ZWFyOiB0aGlzLmN1cnJlbnRseURpc3BsYXllZC55ZWFyLCBtb250aDogdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQubW9udGggKyAxIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBhbGxvd3MgdG8gc3dpdGNoIGFjdHVhbCB2aWV3IHRvIHByZXZpb3VzIG1vbnRoICovXG4gICAgcHVibGljIGRpc3BsYXlQcmV2aW91c01vbnRoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQubW9udGggPD0gMSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQgPSB7IHllYXI6IHRoaXMuY3VycmVudGx5RGlzcGxheWVkLnllYXIgLSAxLCBtb250aDogMTIgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudGx5RGlzcGxheWVkID0geyB5ZWFyOiB0aGlzLmN1cnJlbnRseURpc3BsYXllZC55ZWFyLCBtb250aDogdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQubW9udGggLSAxIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBhbGxvd3MgdG8gc3dpdGNoIGFjdHVhbCB2aWV3IHRvIG5leHQgeWVhciAqL1xuICAgIHB1YmxpYyBkaXNwbGF5TmV4dFllYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudGx5RGlzcGxheWVkID0geyBtb250aDogdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQubW9udGgsIHllYXI6IHRoaXMuY3VycmVudGx5RGlzcGxheWVkLnllYXIgKyAxIH07XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgYWxsb3dzIHRvIHN3aXRjaCBhY3R1YWwgdmlldyB0byBwcmV2aW91cyB5ZWFyICovXG4gICAgcHVibGljIGRpc3BsYXlQcmV2aW91c1llYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudGx5RGlzcGxheWVkID0geyBtb250aDogdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQubW9udGgsIHllYXI6IHRoaXMuY3VycmVudGx5RGlzcGxheWVkLnllYXIgLSAxIH07XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgYWxsb3dzIHRvIHN3aXRjaCBhY3R1YWxseSBkaXNwbGF5ZWQgbGlzdCBvZiB5ZWFyIHRvIG5leHQgeWVhciBsaXN0Ki9cbiAgICBwdWJsaWMgZGlzcGxheU5leHRZZWFyTGlzdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy55ZWFyVmlld0NvbXBvbmVudC5sb2FkTmV4dFllYXJMaXN0KCk7XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgYWxsb3dzIHRvIHN3aXRjaCBhY3R1YWxseSBkaXNwbGF5ZWQgbGlzdCBvZiB5ZWFyIHRvIHByZXZpb3VzIHllYXIgbGlzdCovXG4gICAgcHVibGljIGRpc3BsYXlQcmV2aW91c1llYXJMaXN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnllYXJWaWV3Q29tcG9uZW50LmxvYWRQcmV2aW91c1llYXJMaXN0KCk7XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgYWxsb3dzIHRvIGNoYW5nZSBjdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoL3llYXIgY29uZmlndXJhdGlvbixcbiAgICAgKiB3aGljaCBhcmUgY29ubmVjdGVkIHRvIGRheXMgZGlzcGxheWVkXG4gICAgICovXG4gICAgcHVibGljIHNldEN1cnJlbnRseURpc3BsYXllZChmZERhdGU6IEZkRGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHsgbW9udGg6IGZkRGF0ZS5tb250aCwgeWVhcjogZmREYXRlLnllYXIgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogRnVuY3Rpb24gdGhhdCBoYW5kbGVzIGNoYW5nZXMgZnJvbSBtb250aCB2aWV3IGNoaWxkIGNvbXBvbmVudCwgY2hhbmdlcyBhY3R1YWwgdmlldyBhbmQgY2hhbmdlcyBjdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoXG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZU1vbnRoVmlld0NoYW5nZShtb250aDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudGx5RGlzcGxheWVkID0geyBtb250aDogbW9udGgsIHllYXI6IHRoaXMuY3VycmVudGx5RGlzcGxheWVkLnllYXIgfTtcbiAgICAgICAgdGhpcy5hY3RpdmVWaWV3ID0gJ2RheSc7XG4gICAgICAgIHRoaXMuYWN0aXZlVmlld0NoYW5nZS5lbWl0KHRoaXMuYWN0aXZlVmlldyk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB0aGlzLmRheVZpZXdDb21wb25lbnQuZm9jdXNBY3RpdmVEYXkoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0ZWRZZWFyKHllYXJTZWxlY3RlZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlVmlldyA9ICdkYXknO1xuICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZC55ZWFyID0geWVhclNlbGVjdGVkO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgdGhpcy5kYXlWaWV3Q29tcG9uZW50LmZvY3VzQWN0aXZlRGF5KCk7XG4gICAgfVxuXG4gICAgLyoqIE1ldGhvZCB0aGF0IHByb3ZpZGVzIGluZm9ybWF0aW9uIGlmIG1vZGVsIHNlbGVjdGVkIGRhdGUvZGF0ZXMgaGF2ZSBwcm9wZXJseSB0eXBlcyBhbmQgYXJlIHZhbGlkICovXG4gICAgcHVibGljIGlzTW9kZWxWYWxpZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuY2FsVHlwZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRGF0ZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlIGluc3RhbmNlb2YgRmREYXRlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUuaXNEYXRlVmFsaWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0ICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQgaW5zdGFuY2VvZiBGZERhdGUgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5zdGFydC5pc0RhdGVWYWxpZCgpXG4gICAgICAgICAgICAgICAgKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kIGluc3RhbmNlb2YgRmREYXRlICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQuaXNEYXRlVmFsaWQoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogTWV0aG9kIHRoYXQgc2V0cyB1cCB0aGUgY3VycmVudGx5IGRpc3BsYXllZCB2YXJpYWJsZXMsIGxpa2Ugc2hvd24gbW9udGggYW5kIHllYXIuXG4gICAgICogRGF5IGdyaWQgaXMgYmFzZWQgb24gY3VycmVudGx5IGRpc3BsYXllZCBtb250aCBhbmQgeWVhclxuICAgICAqL1xuICAgIHByaXZhdGUgcHJlcGFyZURpc3BsYXllZFZpZXcoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNhbFR5cGUgPT09ICdzaW5nbGUnICYmIHRoaXMuc2VsZWN0ZWREYXRlICYmIHRoaXMuc2VsZWN0ZWREYXRlLm1vbnRoICYmIHRoaXMuc2VsZWN0ZWREYXRlLnllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudGx5RGlzcGxheWVkID0geyBtb250aDogdGhpcy5zZWxlY3RlZERhdGUubW9udGgsIHllYXI6IHRoaXMuc2VsZWN0ZWREYXRlLnllYXIgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlICYmIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudGx5RGlzcGxheWVkID0ge1xuICAgICAgICAgICAgICAgIG1vbnRoOiB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0Lm1vbnRoLFxuICAgICAgICAgICAgICAgIHllYXI6IHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQueWVhclxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlICYmIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHtcbiAgICAgICAgICAgICAgICBtb250aDogdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5lbmQubW9udGgsXG4gICAgICAgICAgICAgICAgeWVhcjogdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5lbmQueWVhclxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBEYXRlID0gRmREYXRlLmdldFRvZGF5KCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHsgbW9udGg6IHRlbXBEYXRlLm1vbnRoLCB5ZWFyOiB0ZW1wRGF0ZS55ZWFyIH07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==