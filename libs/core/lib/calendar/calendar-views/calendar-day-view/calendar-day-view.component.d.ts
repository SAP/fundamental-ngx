import { AfterViewChecked, ElementRef, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { CalendarI18n } from '../../i18n/calendar-i18n';
import { FdDate } from '../../models/fd-date';
import { CalendarCurrent } from '../../models/calendar-current';
import { CalendarType, DaysOfWeek } from '../../calendar.component';
import { CalendarDay } from '../../models/calendar-day';
import { FdRangeDate } from '../../models/fd-range-date';
/** Component representing the day view of the calendar. */
export declare class CalendarDayViewComponent implements OnInit, AfterViewChecked, OnChanges {
    private calendarI18n;
    private eRef;
    /** @hidden */
    newFocusedDayId: string;
    /** Actual day grid with previous/current/next month days */
    dayViewGrid: CalendarDay[][];
    /** @hidden */
    fdCalendarDateViewClass: boolean;
    /** Currently displayed month and year for days */
    currentlyDisplayed: CalendarCurrent;
    /** The currently selected FdDate model in single mode. */
    selectedDate: FdDate;
    /** The currently selected FdDates model start and end in range mode. */
    selectedRangeDate: FdRangeDate;
    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    startingDayOfWeek: DaysOfWeek;
    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    calType: CalendarType;
    /** Id of the calendar. If none is provided, one will be generated. */
    id: string;
    /** Function that allows to specify which function would be called, when focus wants to escape */
    focusEscapeFunction: Function;
    /** Event emitted always, when model is changed in range mode */
    readonly selectedRangeDateChange: EventEmitter<FdRangeDate>;
    /** Event emitted always, when next month is selected, by focus */
    readonly nextMonthSelect: EventEmitter<void>;
    /** Event emitted always, when previous month is selected, by focus */
    readonly previousMonthSelect: EventEmitter<void>;
    /** Event emitted always, when model is changed in single mode */
    readonly selectedDateChange: EventEmitter<FdDate>;
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
    /** @hidden */
    constructor(calendarI18n: CalendarI18n, eRef: ElementRef);
    /**
     * Function for selecting a date on the calendar. Typically called when a date is clicked, but can also be called programmatically.
     * @param day CalendarDay object to be selected.
     */
    selectDate(day: CalendarDay, event?: MouseEvent): void;
    /** @hidden */
    ngOnInit(): void;
    /** @hidden
     *  Amount of selected days
     *  0, when none,
     *  1, when only startDate, or endDate same as startDate,
     *  2, when both
     */
    readonly selectCounter: number;
    /**
     * @hidden
     * Method that handles day cells keydown events,
     * @param event KeyboardEvent
     * @param cell CalendarDay
     * @param grid with specified column and row as a x and y
     */
    onKeydownDayHandler(event: any, cell: CalendarDay, grid: {
        x: number;
        y: number;
    }): void;
    /** @hidden */
    ngOnChanges(): void;
    /** @hidden */
    ngAfterViewChecked(): void;
    /** @hidden
     *  Method that allow to focus elements inside this component
     */
    focusElement(elementSelector: any): void;
    /** Active day means that with tabindex = 0, it's selected day or today or first day */
    focusActiveDay(): void;
    /** Function that gives array of all displayed CalendarDays */
    readonly calendarDayList: CalendarDay[];
    /**
     * Method that selects previous month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     */
    private selectPreviousMonth;
    /**
     * Method that selects next month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     */
    private selectNextMonth;
    /**
     * Method that creates array of CalendarDay models which will be shown on day grid,
     * depending on current month and year.
     */
    private populateCalendar;
    /**
     * Method that builds 2 dimensions day view grid, also sets up currently displayed month, or year,
     * when there is not any.
     */
    private buildDayViewGrid;
    /**
     * Method which provides array of CalendarDay, which contains every single day of currently shown month/year.
     */
    private getCurrentMonthDays;
    /**
     * Method that returns active cell, which means:
     * if there is any selected day, return selected day
     * if there is no selected day, but there is today day, return today day
     * if there is no today, or selected, return first one
     */
    private getActiveCell;
    /**
     * Method which provides array of CalendarDay, which contains last 0-6 days of previous month/year. Theses days
     * fills the gap between starting startingDayOfWeek and first day of current month
     */
    private getPreviousMonthDays;
    /**
     * Method which provides array of CalendarDay, which contains first days of next month/year. Theses days
     * fills the gap between last day of current day and end of 6-weeks calendar grid.
     */
    private getNextMonthDays;
    /**
     * Method that generates whole day model basing on fdDate, disabling functions, block functions, and actually
     * chosen range / single date.
     */
    private getDay;
    /**
     * Method that returns first letter of every weekday, basing on CalendarI18nDefault. Can be changed by user by
     * providing other class which implements CalendarI18n
     */
    readonly shortWeekDays: string[];
}
