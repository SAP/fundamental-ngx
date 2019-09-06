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
let calendarUniqueId = 0;
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
export class CalendarComponent {
    /**
     * @hidden
     * @param {?} calendarI18n
     * @param {?} changeDetectorRef
     */
    constructor(calendarI18n, changeDetectorRef) {
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
        () => {
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
        /**
         * That allows to define function that should happen, when focus should normally escape of component
         */
        this.escapeFocusFunction = (/**
         * @return {?}
         */
        () => {
            if (document.getElementById(this.id + '-left-arrow')) {
                document.getElementById(this.id + '-left-arrow').focus();
            }
        });
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.prepareDisplayedView();
    }
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms.
     * @param {?} selected
     * @return {?}
     */
    writeValue(selected) {
        /** @type {?} */
        let valid = true;
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
        // Not needed
    }
    /**
     * Method that handle active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    handleActiveViewChange(activeView) {
        this.activeView = activeView;
        this.activeViewChange.emit(activeView);
    }
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected single date changed
     * @param {?} date
     * @return {?}
     */
    selectedDateChanged(date) {
        this.selectedDate = date;
        this.onChange(date);
        this.onTouched();
        this.selectedDateChange.emit(date);
        this.closeCalendar.emit();
    }
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     * @param {?} dates
     * @return {?}
     */
    selectedRangeDateChanged(dates) {
        if (dates) {
            this.selectedRangeDate = { start: dates.start, end: dates.end ? dates.end : dates.start };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
            this.onTouched();
            this.closeCalendar.emit();
        }
    }
    /**
     * Function that handles next arrow icon click, depending on current view it changes month, year or list of years
     * @return {?}
     */
    handleNextArrowClick() {
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
    }
    /**
     * Function that handles previous arrow icon click, depending on current view it changes month, year or list of years
     * @return {?}
     */
    handlePreviousArrowClick() {
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
    }
    /**
     * Function that allows to switch actual view to next month
     * @return {?}
     */
    displayNextMonth() {
        if (this.currentlyDisplayed.month === 12) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month + 1 };
        }
    }
    /**
     * Function that allows to switch actual view to previous month
     * @return {?}
     */
    displayPreviousMonth() {
        if (this.currentlyDisplayed.month <= 1) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month - 1 };
        }
    }
    /**
     * Function that allows to switch actual view to next year
     * @return {?}
     */
    displayNextYear() {
        this.currentlyDisplayed = { month: this.currentlyDisplayed.month, year: this.currentlyDisplayed.year + 1 };
    }
    /**
     * Function that allows to switch actual view to previous year
     * @return {?}
     */
    displayPreviousYear() {
        this.currentlyDisplayed = { month: this.currentlyDisplayed.month, year: this.currentlyDisplayed.year - 1 };
    }
    /**
     * Function that allows to switch actually displayed list of year to next year list
     * @return {?}
     */
    displayNextYearList() {
        this.yearViewComponent.loadNextYearList();
    }
    /**
     * Function that allows to switch actually displayed list of year to previous year list
     * @return {?}
     */
    displayPreviousYearList() {
        this.yearViewComponent.loadPreviousYearList();
    }
    /**
     * Function that allows to change currently displayed month/year configuration,
     * which are connected to days displayed
     * @param {?} fdDate
     * @return {?}
     */
    setCurrentlyDisplayed(fdDate) {
        this.currentlyDisplayed = { month: fdDate.month, year: fdDate.year };
    }
    /**
     * @hidden
     * Function that handles changes from month view child component, changes actual view and changes currently displayed month
     * @param {?} month
     * @return {?}
     */
    handleMonthViewChange(month) {
        this.currentlyDisplayed = { month: month, year: this.currentlyDisplayed.year };
        this.activeView = 'day';
        this.activeViewChange.emit(this.activeView);
        this.changeDetectorRef.detectChanges();
        this.dayViewComponent.focusActiveDay();
    }
    /**
     * @param {?} yearSelected
     * @return {?}
     */
    selectedYear(yearSelected) {
        this.activeView = 'day';
        this.currentlyDisplayed.year = yearSelected;
        this.changeDetectorRef.detectChanges();
        this.dayViewComponent.focusActiveDay();
    }
    /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    isModelValid() {
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
    }
    /**
     * @hidden
     * Method that sets up the currently displayed variables, like shown month and year.
     * Day grid is based on currently displayed month and year
     * @private
     * @return {?}
     */
    prepareDisplayedView() {
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
            const tempDate = FdDate.getToday();
            this.currentlyDisplayed = { month: tempDate.month, year: tempDate.year };
        }
    }
}
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
                        () => CalendarComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => CalendarComponent)),
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
CalendarComponent.ctorParameters = () => [
    { type: CalendarI18n },
    { type: ChangeDetectorRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFMUMsT0FBTyxFQUF5QyxhQUFhLEVBQUUsaUJBQWlCLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwSCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUUxRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQzs7SUFFekcsZ0JBQWdCLEdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7QUEyQ2hDLE1BQU0sT0FBTyxpQkFBaUI7Ozs7OztJQXNJMUIsWUFDVyxZQUEwQixFQUN6QixpQkFBb0M7UUFEckMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjs7OztRQTlIaEQsb0JBQWUsR0FBWSxJQUFJLENBQUM7Ozs7UUFJaEMsMkJBQXNCLEdBQVksSUFBSSxDQUFDOzs7O1FBT2hDLGlCQUFZLEdBQVcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7O1FBUXpDLGVBQVUsR0FBbUIsS0FBSyxDQUFDOzs7O1FBSW5DLHNCQUFpQixHQUFlLENBQUMsQ0FBQzs7OztRQUlsQyxZQUFPLEdBQWlCLFFBQVEsQ0FBQzs7OztRQUl4QyxPQUFFLEdBQUcsY0FBYyxHQUFH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QixTQUFTLFNBQUMsd0JBQXdCO2dDQUdsQyxTQUFTLFNBQUMseUJBQXlCOzhCQUduQyxXQUFXLFNBQUMsbUJBQW1CO3FDQUkvQixXQUFXLFNBQUMsNEJBQTRCOzJCQU94QyxLQUFLO2dDQUlMLEtBQUs7eUJBSUwsS0FBSztnQ0FJTCxLQUFLO3NCQUlMLEtBQUs7aUJBSUwsS0FBSzsrQkFJTCxNQUFNO2lDQUlOLE1BQU07c0NBSU4sTUFBTTtnQ0FJTixNQUFNOzRCQUlOLE1BQU07OEJBZU4sS0FBSzt3Q0FTTCxLQUFLO3NDQVNMLEtBQUs7c0NBU0wsS0FBSztvQ0FTTCxLQUFLOzRCQVNMLEtBQUs7a0NBTUwsS0FBSzs7Ozs7OztJQTNITiw2Q0FBZ0Y7Ozs7O0lBR2hGLDhDQUFtRjs7Ozs7SUFHbkYsNENBQ2dDOzs7OztJQUdoQyxtREFDdUM7Ozs7O0lBR3ZDLCtDQUFvQzs7Ozs7SUFHcEMseUNBQ2dEOzs7OztJQUdoRCw4Q0FDc0M7Ozs7O0lBR3RDLHVDQUMwQzs7Ozs7SUFHMUMsOENBQ3lDOzs7OztJQUd6QyxvQ0FDd0M7Ozs7O0lBR3hDLCtCQUN5Qzs7Ozs7SUFHekMsNkNBQ29HOzs7OztJQUdwRywrQ0FDc0Y7Ozs7O0lBR3RGLG9EQUNxRzs7Ozs7SUFHckcsOENBQ3VGOzs7OztJQUd2RiwwQ0FDNkU7Ozs7O0lBRzdFLHFDQUNFOzs7OztJQUdGLHNDQUNFOzs7Ozs7SUFNRiw0Q0FHRTs7Ozs7O0lBTUYsc0RBR0U7Ozs7OztJQU1GLG9EQUdFOzs7Ozs7SUFNRixvREFHRTs7Ozs7O0lBTUYsa0RBR0U7Ozs7OztJQU1GLDBDQUdFOzs7OztJQUdGLGdEQUtFOztJQUlFLHlDQUFpQzs7Ozs7SUFDakMsOENBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckkxOG4gfSBmcm9tICcuL2kxOG4vY2FsZW5kYXItaTE4bic7XG5pbXBvcnQgeyBGZERhdGUgfSBmcm9tICcuL21vZGVscy9mZC1kYXRlJztcbmltcG9ydCB7IENhbGVuZGFyQ3VycmVudCB9IGZyb20gJy4vbW9kZWxzL2NhbGVuZGFyLWN1cnJlbnQnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItdmlld3MvY2FsZW5kYXItZGF5LXZpZXcvY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IEZkUmFuZ2VEYXRlIH0gZnJvbSAnLi9tb2RlbHMvZmQtcmFuZ2UtZGF0ZSc7XG5pbXBvcnQgeyBDYWxlbmRhclllYXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci12aWV3cy9jYWxlbmRhci15ZWFyLXZpZXcvY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudCc7XG5cbmxldCBjYWxlbmRhclVuaXF1ZUlkOiBudW1iZXIgPSAwO1xuXG4vKiogVHlwZSBvZiBjYWxlbmRhciAqL1xuZXhwb3J0IHR5cGUgQ2FsZW5kYXJUeXBlID0gJ3NpbmdsZScgfCAncmFuZ2UnO1xuXG4vKiogVHlwZSBmb3IgdGhlIGNhbGVuZGFyIHZpZXcgKi9cbmV4cG9ydCB0eXBlIEZkQ2FsZW5kYXJWaWV3ID0gJ2RheScgfCAnbW9udGgnIHwgJ3llYXInO1xuXG4vKiogVHlwZSBmb3IgdGhlIGRheXMgb2YgdGhlIHdlZWsuICovXG5leHBvcnQgdHlwZSBEYXlzT2ZXZWVrID0gMSB8IDIgfCAzIHwgNCB8IDUgfCA2IHwgNztcblxuLyoqXG4gKiBNb250aHM6IDEgPSBKYW51YXJ5LCAxMiA9IGRlY2VtYmVyLlxuICogRGF5czogMSA9IFN1bmRheSwgNyA9IFNhdHVyZGF5XG4gKlxuICogQ2FsZW5kYXIgY29tcG9uZW50IHVzZWQgZm9yIHNlbGVjdGluZyBkYXRlcywgdHlwaWNhbGx5IHVzZWQgYnkgdGhlIERhdGVQaWNrZXIgYW5kIERhdGVUaW1lUGlja2VyIGNvbXBvbmVudHMuXG4gKiBTdXBwb3J0cyB0aGUgQW5ndWxhciBmb3JtcyBtb2R1bGUsIGVuYWJsaW5nIGZvcm0gdmFsaWRpdHksIG5nTW9kZWwsIGV0Yy5cbiAqIGBgYGh0bWxcbiAqIDxmZC1jYWxlbmRhcj48L2ZkLWNhbGVuZGFyPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtY2FsZW5kYXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENhbGVuZGFyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDYWxlbmRhckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgICcoYmx1ciknOiAnb25Ub3VjaGVkKCknLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAVmlld0NoaWxkKENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCkgZGF5Vmlld0NvbXBvbmVudDogQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAVmlld0NoaWxkKENhbGVuZGFyWWVhclZpZXdDb21wb25lbnQpIHllYXJWaWV3Q29tcG9uZW50OiBDYWxlbmRhclllYXJWaWV3Q29tcG9uZW50O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLWNhbGVuZGFyJylcbiAgICBmZENhbGVuZGFyQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLWhhcy1kaXNwbGF5LWJsb2NrJylcbiAgICBmZEhhc0Rpc3BsYXlCbG9ja0NsYXNzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBDdXJyZW50bHkgZGlzcGxheWVkIGRheXMgZGVwZW5kaW5nIG9uIG1vbnRoIGFuZCB5ZWFyICovXG4gICAgY3VycmVudGx5RGlzcGxheWVkOiBDYWxlbmRhckN1cnJlbnQ7XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBGZERhdGUgbW9kZWwgaW4gc2luZ2xlIG1vZGUuICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0ZWREYXRlOiBGZERhdGUgPSBGZERhdGUuZ2V0VG9kYXkoKTtcblxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIEZkRGF0ZXMgbW9kZWwgc3RhcnQgYW5kIGVuZCBpbiByYW5nZSBtb2RlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlbGVjdGVkUmFuZ2VEYXRlOiBGZFJhbmdlRGF0ZTtcblxuICAgIC8qKiBBY3R1YWxseSBzaG93biBhY3RpdmUgdmlldyBvbmUgb2YgJ2RheScgfCAnbW9udGgnIHwgJ3llYXInICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgYWN0aXZlVmlldzogRmRDYWxlbmRhclZpZXcgPSAnZGF5JztcblxuICAgIC8qKiBUaGUgZGF5IG9mIHRoZSB3ZWVrIHRoZSBjYWxlbmRhciBzaG91bGQgc3RhcnQgb24uIDEgcmVwcmVzZW50cyBTdW5kYXksIDIgaXMgTW9uZGF5LCAzIGlzIFR1ZXNkYXksIGFuZCBzbyBvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzdGFydGluZ0RheU9mV2VlazogRGF5c09mV2VlayA9IDE7XG5cbiAgICAvKiogVGhlIHR5cGUgb2YgY2FsZW5kYXIsICdzaW5nbGUnIGZvciBzaW5nbGUgZGF0ZSBzZWxlY3Rpb24gb3IgJ3JhbmdlJyBmb3IgYSByYW5nZSBvZiBkYXRlcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjYWxUeXBlOiBDYWxlbmRhclR5cGUgPSAnc2luZ2xlJztcblxuICAgIC8qKiBJZCBvZiB0aGUgY2FsZW5kYXIuIElmIG5vbmUgaXMgcHJvdmlkZWQsIG9uZSB3aWxsIGJlIGdlbmVyYXRlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGlkID0gJ2ZkLWNhbGVuZGFyLScgKyBjYWxlbmRhclVuaXF1ZUlkKys7XG5cbiAgICAvKiogRXZlbnQgdGhyb3duIGV2ZXJ5IHRpbWUgYWN0aXZlIHZpZXcgaXMgY2hhbmdlZCAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBhY3RpdmVWaWV3Q2hhbmdlOiBFdmVudEVtaXR0ZXI8RmRDYWxlbmRhclZpZXc+ID0gbmV3IEV2ZW50RW1pdHRlcjxGZENhbGVuZGFyVmlldz4oKTtcblxuICAgIC8qKiBFdmVudCB0aHJvd24gZXZlcnkgdGltZSBzZWxlY3RlZCBkYXRlIGluIHNpbmdsZSBtb2RlIGlzIGNoYW5nZWQgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0ZWREYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmREYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmREYXRlPigpO1xuXG4gICAgLyoqIEV2ZW50IHRocm93biBldmVyeSB0aW1lIHNlbGVjdGVkIGZpcnN0IG9yIGxhc3QgZGF0ZSBpbiByYW5nZSBtb2RlIGlzIGNoYW5nZWQgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0ZWRSYW5nZURhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGZFJhbmdlRGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZkUmFuZ2VEYXRlPigpO1xuXG4gICAgLyoqIEV2ZW50IHRocm93biBldmVyeSB0aW1lIHdoZW4gdmFsdWUgaXMgb3ZlcndyaXR0ZW4gZnJvbSBvdXRzaWRlIGFuZCB0aHJvdyBiYWNrIGlzVmFsaWQgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgaXNWYWxpZERhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBFdmVudCB0aHJvd24gZXZlcnkgdGltZSB3aGVuIGNhbGVuZGFyIHNob3VsZCBiZSBjbG9zZWQgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgY2xvc2VDYWxlbmRhcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbkNoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7XG4gICAgfTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25Ub3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBkaXNhYmxlIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlRnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gZGlzYWJsZSBjZXJ0YWluIGRhdGVzIGluIHRoZSBjYWxlbmRhciBmb3IgdGhlIHJhbmdlIHN0YXJ0IHNlbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZVJhbmdlU3RhcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGZkRGF0ZTogRmREYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBkaXNhYmxlIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyIGZvciB0aGUgcmFuZ2UgZW5kIHNlbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZVJhbmdlRW5kRnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gYmxvY2sgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIgZm9yIHRoZSByYW5nZSBzdGFydCBzZWxlY3Rpb24uXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJsb2NrUmFuZ2VTdGFydEZ1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGJsb2NrIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyIGZvciB0aGUgcmFuZ2UgZW5kIHNlbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYmxvY2tSYW5nZUVuZEZ1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGJsb2NrIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBibG9ja0Z1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKiogVGhhdCBhbGxvd3MgdG8gZGVmaW5lIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGhhcHBlbiwgd2hlbiBmb2N1cyBzaG91bGQgbm9ybWFsbHkgZXNjYXBlIG9mIGNvbXBvbmVudCAqL1xuICAgIEBJbnB1dCgpXG4gICAgZXNjYXBlRm9jdXNGdW5jdGlvbjogRnVuY3Rpb24gPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkICsgJy1sZWZ0LWFycm93JykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQgKyAnLWxlZnQtYXJyb3cnKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBjYWxlbmRhckkxOG46IENhbGVuZGFySTE4bixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHt9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByZXBhcmVEaXNwbGF5ZWRWaWV3KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcHJvdmlkZXMgc3VwcG9ydCBmb3IgQ29udHJvbFZhbHVlQWNjZXNzb3IgdGhhdCBhbGxvd3MgdG8gdXNlIFsobmdNb2RlbCldIG9yIGZvcm1zLlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUoc2VsZWN0ZWQ6IEZkUmFuZ2VEYXRlIHwgRmREYXRlKTogdm9pZCB7XG4gICAgICAgIGxldCB2YWxpZDogYm9vbGVhbiA9IHRydWU7XG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FsVHlwZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IDxGZERhdGU+c2VsZWN0ZWQ7XG5cbiAgICAgICAgICAgICAgICB2YWxpZCA9IHNlbGVjdGVkLmlzRGF0ZVZhbGlkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBzZWxlY3RlZDtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZC5pc0RhdGVWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZURpc3BsYXllZFZpZXcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FsVHlwZSA9PT0gJ3JhbmdlJykge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gPEZkUmFuZ2VEYXRlPnNlbGVjdGVkO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RlZC5zdGFydCB8fCAhc2VsZWN0ZWQuZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZC5zdGFydCAmJiAhc2VsZWN0ZWQuc3RhcnQuaXNEYXRlVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQuZW5kICYmICFzZWxlY3RlZC5lbmQuaXNEYXRlVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlID0geyBzdGFydDogc2VsZWN0ZWQuc3RhcnQsIGVuZDogc2VsZWN0ZWQuZW5kIH07XG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZURpc3BsYXllZFZpZXcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc1ZhbGlkRGF0ZUNoYW5nZS5lbWl0KHZhbGlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogRnVuY3Rpb24gdGhhdCBpbXBsZW1lbnRzIFZhbGlkYXRvciBJbnRlcmZhY2UsIGFkZHMgdmFsaWRhdGlvbiBzdXBwb3J0IGZvciBmb3Jtc1xuICAgICAqL1xuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogYW55XG4gICAgfSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzTW9kZWxWYWxpZCgpID8gbnVsbCA6IHtcbiAgICAgICAgICAgIGRhdGVWYWxpZGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICAvLyBOb3QgbmVlZGVkXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRoYXQgaGFuZGxlIGFjdGl2ZSB2aWV3IGNoYW5nZSBhbmQgdGhyb3dzIGV2ZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVBY3RpdmVWaWV3Q2hhbmdlKGFjdGl2ZVZpZXc6IEZkQ2FsZW5kYXJWaWV3KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWN0aXZlVmlldyA9IGFjdGl2ZVZpZXc7XG4gICAgICAgIHRoaXMuYWN0aXZlVmlld0NoYW5nZS5lbWl0KGFjdGl2ZVZpZXcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBNZXRob2QgdGhhdCBpcyB0cmlnZ2VyZWQgYnkgZXZlbnRzIGZyb20gZGF5IHZpZXcgY29tcG9uZW50LCB3aGVuIHRoZXJlIGlzIHNlbGVjdGVkIHNpbmdsZSBkYXRlIGNoYW5nZWRcbiAgICAgKi9cbiAgICBzZWxlY3RlZERhdGVDaGFuZ2VkKGRhdGU6IEZkRGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGU7XG4gICAgICAgIHRoaXMub25DaGFuZ2UoZGF0ZSk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgICAgIHRoaXMuY2xvc2VDYWxlbmRhci5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIE1ldGhvZCB0aGF0IGlzIHRyaWdnZXJlZCBieSBldmVudHMgZnJvbSBkYXkgdmlldyBjb21wb25lbnQsIHdoZW4gdGhlcmUgaXMgc2VsZWN0ZWQgcmFuZ2UgZGF0ZSBjaGFuZ2VkXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdGVkUmFuZ2VEYXRlQ2hhbmdlZChkYXRlczogRmRSYW5nZURhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGVzKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlID0geyBzdGFydDogZGF0ZXMuc3RhcnQsIGVuZDogZGF0ZXMuZW5kID8gZGF0ZXMuZW5kIDogZGF0ZXMuc3RhcnQgfTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSk7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZUNhbGVuZGFyLmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGhhbmRsZXMgbmV4dCBhcnJvdyBpY29uIGNsaWNrLCBkZXBlbmRpbmcgb24gY3VycmVudCB2aWV3IGl0IGNoYW5nZXMgbW9udGgsIHllYXIgb3IgbGlzdCBvZiB5ZWFycyAqL1xuICAgIHB1YmxpYyBoYW5kbGVOZXh0QXJyb3dDbGljaygpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmFjdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TmV4dE1vbnRoKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TmV4dFllYXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU5leHRZZWFyTGlzdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgaGFuZGxlcyBwcmV2aW91cyBhcnJvdyBpY29uIGNsaWNrLCBkZXBlbmRpbmcgb24gY3VycmVudCB2aWV3IGl0IGNoYW5nZXMgbW9udGgsIHllYXIgb3IgbGlzdCBvZiB5ZWFycyAqL1xuICAgIHB1YmxpYyBoYW5kbGVQcmV2aW91c0Fycm93Q2xpY2soKTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5hY3RpdmVWaWV3KSB7XG4gICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheVByZXZpb3VzTW9udGgoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlQcmV2aW91c1llYXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheVByZXZpb3VzWWVhckxpc3QoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGFsbG93cyB0byBzd2l0Y2ggYWN0dWFsIHZpZXcgdG8gbmV4dCBtb250aCAqL1xuICAgIHB1YmxpYyBkaXNwbGF5TmV4dE1vbnRoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQubW9udGggPT09IDEyKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHsgeWVhcjogdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQueWVhciArIDEsIG1vbnRoOiAxIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHsgeWVhcjogdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQueWVhciwgbW9udGg6IHRoaXMuY3VycmVudGx5RGlzcGxheWVkLm1vbnRoICsgMSB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgYWxsb3dzIHRvIHN3aXRjaCBhY3R1YWwgdmlldyB0byBwcmV2aW91cyBtb250aCAqL1xuICAgIHB1YmxpYyBkaXNwbGF5UHJldmlvdXNNb250aCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudGx5RGlzcGxheWVkLm1vbnRoIDw9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudGx5RGlzcGxheWVkID0geyB5ZWFyOiB0aGlzLmN1cnJlbnRseURpc3BsYXllZC55ZWFyIC0gMSwgbW9udGg6IDEyIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHsgeWVhcjogdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQueWVhciwgbW9udGg6IHRoaXMuY3VycmVudGx5RGlzcGxheWVkLm1vbnRoIC0gMSB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgYWxsb3dzIHRvIHN3aXRjaCBhY3R1YWwgdmlldyB0byBuZXh0IHllYXIgKi9cbiAgICBwdWJsaWMgZGlzcGxheU5leHRZZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHsgbW9udGg6IHRoaXMuY3VycmVudGx5RGlzcGxheWVkLm1vbnRoLCB5ZWFyOiB0aGlzLmN1cnJlbnRseURpc3BsYXllZC55ZWFyICsgMSB9O1xuICAgIH1cblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGFsbG93cyB0byBzd2l0Y2ggYWN0dWFsIHZpZXcgdG8gcHJldmlvdXMgeWVhciAqL1xuICAgIHB1YmxpYyBkaXNwbGF5UHJldmlvdXNZZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHsgbW9udGg6IHRoaXMuY3VycmVudGx5RGlzcGxheWVkLm1vbnRoLCB5ZWFyOiB0aGlzLmN1cnJlbnRseURpc3BsYXllZC55ZWFyIC0gMSB9O1xuICAgIH1cblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGFsbG93cyB0byBzd2l0Y2ggYWN0dWFsbHkgZGlzcGxheWVkIGxpc3Qgb2YgeWVhciB0byBuZXh0IHllYXIgbGlzdCovXG4gICAgcHVibGljIGRpc3BsYXlOZXh0WWVhckxpc3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMueWVhclZpZXdDb21wb25lbnQubG9hZE5leHRZZWFyTGlzdCgpO1xuICAgIH1cblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGFsbG93cyB0byBzd2l0Y2ggYWN0dWFsbHkgZGlzcGxheWVkIGxpc3Qgb2YgeWVhciB0byBwcmV2aW91cyB5ZWFyIGxpc3QqL1xuICAgIHB1YmxpYyBkaXNwbGF5UHJldmlvdXNZZWFyTGlzdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy55ZWFyVmlld0NvbXBvbmVudC5sb2FkUHJldmlvdXNZZWFyTGlzdCgpO1xuICAgIH1cblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGFsbG93cyB0byBjaGFuZ2UgY3VycmVudGx5IGRpc3BsYXllZCBtb250aC95ZWFyIGNvbmZpZ3VyYXRpb24sXG4gICAgICogd2hpY2ggYXJlIGNvbm5lY3RlZCB0byBkYXlzIGRpc3BsYXllZFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRDdXJyZW50bHlEaXNwbGF5ZWQoZmREYXRlOiBGZERhdGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQgPSB7IG1vbnRoOiBmZERhdGUubW9udGgsIHllYXI6IGZkRGF0ZS55ZWFyIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIEZ1bmN0aW9uIHRoYXQgaGFuZGxlcyBjaGFuZ2VzIGZyb20gbW9udGggdmlldyBjaGlsZCBjb21wb25lbnQsIGNoYW5nZXMgYWN0dWFsIHZpZXcgYW5kIGNoYW5nZXMgY3VycmVudGx5IGRpc3BsYXllZCBtb250aFxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVNb250aFZpZXdDaGFuZ2UobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHsgbW9udGg6IG1vbnRoLCB5ZWFyOiB0aGlzLmN1cnJlbnRseURpc3BsYXllZC55ZWFyIH07XG4gICAgICAgIHRoaXMuYWN0aXZlVmlldyA9ICdkYXknO1xuICAgICAgICB0aGlzLmFjdGl2ZVZpZXdDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZVZpZXcpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgdGhpcy5kYXlWaWV3Q29tcG9uZW50LmZvY3VzQWN0aXZlRGF5KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdGVkWWVhcih5ZWFyU2VsZWN0ZWQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmFjdGl2ZVZpZXcgPSAnZGF5JztcbiAgICAgICAgdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQueWVhciA9IHllYXJTZWxlY3RlZDtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIHRoaXMuZGF5Vmlld0NvbXBvbmVudC5mb2N1c0FjdGl2ZURheSgpO1xuICAgIH1cblxuICAgIC8qKiBNZXRob2QgdGhhdCBwcm92aWRlcyBpbmZvcm1hdGlvbiBpZiBtb2RlbCBzZWxlY3RlZCBkYXRlL2RhdGVzIGhhdmUgcHJvcGVybHkgdHlwZXMgYW5kIGFyZSB2YWxpZCAqL1xuICAgIHB1YmxpYyBpc01vZGVsVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmNhbFR5cGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZERhdGUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSBpbnN0YW5jZW9mIEZkRGF0ZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlLmlzRGF0ZVZhbGlkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5zdGFydCAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0IGluc3RhbmNlb2YgRmREYXRlICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQuaXNEYXRlVmFsaWQoKVxuICAgICAgICAgICAgICAgICkgJiYgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLmVuZCAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLmVuZCBpbnN0YW5jZW9mIEZkRGF0ZSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0LmlzRGF0ZVZhbGlkKClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIE1ldGhvZCB0aGF0IHNldHMgdXAgdGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgdmFyaWFibGVzLCBsaWtlIHNob3duIG1vbnRoIGFuZCB5ZWFyLlxuICAgICAqIERheSBncmlkIGlzIGJhc2VkIG9uIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGggYW5kIHllYXJcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVEaXNwbGF5ZWRWaWV3KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jYWxUeXBlID09PSAnc2luZ2xlJyAmJiB0aGlzLnNlbGVjdGVkRGF0ZSAmJiB0aGlzLnNlbGVjdGVkRGF0ZS5tb250aCAmJiB0aGlzLnNlbGVjdGVkRGF0ZS55ZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHsgbW9udGg6IHRoaXMuc2VsZWN0ZWREYXRlLm1vbnRoLCB5ZWFyOiB0aGlzLnNlbGVjdGVkRGF0ZS55ZWFyIH07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSAmJiB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHtcbiAgICAgICAgICAgICAgICBtb250aDogdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5zdGFydC5tb250aCxcbiAgICAgICAgICAgICAgICB5ZWFyOiB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0LnllYXJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSAmJiB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLmVuZCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQgPSB7XG4gICAgICAgICAgICAgICAgbW9udGg6IHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kLm1vbnRoLFxuICAgICAgICAgICAgICAgIHllYXI6IHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kLnllYXJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wRGF0ZSA9IEZkRGF0ZS5nZXRUb2RheSgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQgPSB7IG1vbnRoOiB0ZW1wRGF0ZS5tb250aCwgeWVhcjogdGVtcERhdGUueWVhciB9O1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=