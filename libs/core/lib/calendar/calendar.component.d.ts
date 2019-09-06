import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { CalendarI18n } from './i18n/calendar-i18n';
import { FdDate } from './models/fd-date';
import { CalendarCurrent } from './models/calendar-current';
import { AbstractControl, ControlValueAccessor, Validator } from '@angular/forms';
import { CalendarDayViewComponent } from './calendar-views/calendar-day-view/calendar-day-view.component';
import { FdRangeDate } from './models/fd-range-date';
import { CalendarYearViewComponent } from './calendar-views/calendar-year-view/calendar-year-view.component';
/** Type of calendar */
export declare type CalendarType = 'single' | 'range';
/** Type for the calendar view */
export declare type FdCalendarView = 'day' | 'month' | 'year';
/** Type for the days of the week. */
export declare type DaysOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;
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
export declare class CalendarComponent implements OnInit, ControlValueAccessor, Validator {
    calendarI18n: CalendarI18n;
    private changeDetectorRef;
    /** @hidden */
    dayViewComponent: CalendarDayViewComponent;
    /** @hidden */
    yearViewComponent: CalendarYearViewComponent;
    /** @hidden */
    fdCalendarClass: boolean;
    /** @hidden */
    fdHasDisplayBlockClass: boolean;
    /** Currently displayed days depending on month and year */
    currentlyDisplayed: CalendarCurrent;
    /** The currently selected FdDate model in single mode. */
    selectedDate: FdDate;
    /** The currently selected FdDates model start and end in range mode. */
    selectedRangeDate: FdRangeDate;
    /** Actually shown active view one of 'day' | 'month' | 'year' */
    activeView: FdCalendarView;
    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    startingDayOfWeek: DaysOfWeek;
    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    calType: CalendarType;
    /** Id of the calendar. If none is provided, one will be generated. */
    id: string;
    /** Event thrown every time active view is changed */
    readonly activeViewChange: EventEmitter<FdCalendarView>;
    /** Event thrown every time selected date in single mode is changed */
    readonly selectedDateChange: EventEmitter<FdDate>;
    /** Event thrown every time selected first or last date in range mode is changed */
    readonly selectedRangeDateChange: EventEmitter<FdRangeDate>;
    /** Event thrown every time when value is overwritten from outside and throw back isValid */
    readonly isValidDateChange: EventEmitter<boolean>;
    /** Event thrown every time when calendar should be closed */
    readonly closeCalendar: EventEmitter<void>;
    /** @hidden */
    onChange: Function;
    /** @hidden */
    onTouched: Function;
    /**
     * Function used to disable certain dates in the calendar.
     * @param fdDate FdDate
     */
    disableFunction: (fdDate: FdDate) => boolean;
    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param fdDate FdDate
     */
    disableRangeStartFunction: (fdDate: FdDate) => boolean;
    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param fdDate FdDate
     */
    disableRangeEndFunction: (fdDate: FdDate) => boolean;
    /**
     * Function used to block certain dates in the calendar for the range start selection.
     * @param fdDate FdDate
     */
    blockRangeStartFunction: (fdDate: FdDate) => boolean;
    /**
     * Function used to block certain dates in the calendar for the range end selection.
     * @param fdDate FdDate
     */
    blockRangeEndFunction: (fdDate: FdDate) => boolean;
    /**
     * Function used to block certain dates in the calendar.
     * @param fdDate FdDate
     */
    blockFunction: (fdDate: FdDate) => boolean;
    /** That allows to define function that should happen, when focus should normally escape of component */
    escapeFocusFunction: Function;
    /** @hidden */
    constructor(calendarI18n: CalendarI18n, changeDetectorRef: ChangeDetectorRef);
    /** @hidden */
    ngOnInit(): void;
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms.
     */
    writeValue(selected: FdRangeDate | FdDate): void;
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    validate(control: AbstractControl): {
        [key: string]: any;
    };
    /** @hidden */
    registerOnChange(fn: any): void;
    /** @hidden */
    registerOnTouched(fn: any): void;
    /** @hidden */
    setDisabledState?(isDisabled: boolean): void;
    /**
     * Method that handle active view change and throws event.
     */
    handleActiveViewChange(activeView: FdCalendarView): void;
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected single date changed
     */
    selectedDateChanged(date: FdDate): void;
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     */
    selectedRangeDateChanged(dates: FdRangeDate): void;
    /** Function that handles next arrow icon click, depending on current view it changes month, year or list of years */
    handleNextArrowClick(): void;
    /** Function that handles previous arrow icon click, depending on current view it changes month, year or list of years */
    handlePreviousArrowClick(): void;
    /** Function that allows to switch actual view to next month */
    displayNextMonth(): void;
    /** Function that allows to switch actual view to previous month */
    displayPreviousMonth(): void;
    /** Function that allows to switch actual view to next year */
    displayNextYear(): void;
    /** Function that allows to switch actual view to previous year */
    displayPreviousYear(): void;
    /** Function that allows to switch actually displayed list of year to next year list*/
    displayNextYearList(): void;
    /** Function that allows to switch actually displayed list of year to previous year list*/
    displayPreviousYearList(): void;
    /** Function that allows to change currently displayed month/year configuration,
     * which are connected to days displayed
     */
    setCurrentlyDisplayed(fdDate: FdDate): void;
    /**
     * @hidden
     * Function that handles changes from month view child component, changes actual view and changes currently displayed month
     */
    handleMonthViewChange(month: number): void;
    selectedYear(yearSelected: number): void;
    /** Method that provides information if model selected date/dates have properly types and are valid */
    isModelValid(): boolean;
    /**
     * @hidden
     * Method that sets up the currently displayed variables, like shown month and year.
     * Day grid is based on currently displayed month and year
     */
    private prepareDisplayedView;
}
