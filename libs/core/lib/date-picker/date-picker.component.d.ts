import { EventEmitter } from '@angular/core';
import { CalendarType, DaysOfWeek, FdCalendarView } from '../calendar/calendar.component';
import { AbstractControl, ControlValueAccessor, Validator } from '@angular/forms';
import { Placement } from 'popper.js';
import { FdDate } from '../calendar/models/fd-date';
import { CalendarComponent } from '../calendar/calendar.component';
import { FdRangeDate } from '../calendar/models/fd-range-date';
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
export declare class DatePickerComponent implements ControlValueAccessor, Validator {
    dateAdapter: DateFormatParser;
    /** @hidden The value of the input */
    inputFieldDate: any;
    /** @hidden Whether the date input is invalid */
    isInvalidDateInput: boolean;
    /** @hidden Whether the date picker is open */
    isOpen: boolean;
    /** @hidden */
    calendarComponent: CalendarComponent;
    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    type: CalendarType;
    /** Date picker input placeholder string */
    placeholder: string;
    /** Whether this is the compact input date picker */
    compact: boolean;
    /** The currently selected CalendarDay model */
    selectedDate: FdDate;
    /** The currently selected FdDates model start and end in range mode. */
    selectedRangeDate: FdRangeDate;
    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    startingDayOfWeek: DaysOfWeek;
    /** Whether to validate the date picker input. */
    useValidation: boolean;
    /** Aria label for the datepicker input. */
    dateInputLabel: string;
    /** Aria label for the button to show/hide the calendar. */
    displayCalendarToggleLabel: string;
    /** Whether a null input is considered valid. */
    allowNull: boolean;
    /** Actually shown active view one of 'day' | 'month' | 'year' in calendar component*/
    activeView: FdCalendarView;
    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
    placement: Placement;
    /** Whether the date picker is disabled. */
    disabled: boolean;
    /** Fired when a new date is selected. */
    readonly selectedDateChange: EventEmitter<FdDate>;
    /** Event thrown every time selected first or last date in range mode is changed */
    readonly selectedRangeDateChange: EventEmitter<FdRangeDate>;
    /** Event thrown every time calendar active view is changed */
    readonly activeViewChange: EventEmitter<FdCalendarView>;
    /** @hidden */
    onChange: any;
    /** @hidden */
    onTouched: any;
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
    /**
     * Method that handle calendar active view change and throws event.
     */
    handleCalendarActiveViewChange(activeView: FdCalendarView): void;
    /** @hidden */
    closeFromCalendar(): void;
    /** Opens the calendar */
    openCalendar(): void;
    /** Toggles the calendar open or closed */
    toggleCalendar(): void;
    /** Closes the calendar if it is open */
    closeCalendar(): void;
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected single date changed
     */
    handleSingleDateChange(date: FdDate): void;
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected range date changed
     */
    handleRangeDateChange(dates: FdRangeDate): void;
    /**
     * @hidden
     * Method that is triggered when the text input is confirmed to ba changed, by clicking enter, or blur
     */
    handleInputChange(strDate: string): void;
    /** @hidden */
    constructor(dateAdapter: DateFormatParser);
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    validate(control: AbstractControl): {
        [key: string]: any;
    };
    /** @hidden */
    registerOnChange(fn: (selected: any) => {
        void: any;
    }): void;
    /** @hidden */
    registerOnTouched(fn: any): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     */
    writeValue(selected: FdRangeDate | FdDate): void;
    /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput
     */
    dateStringUpdate(date: string): void;
    /** Method that provides information if model selected date/dates have properly types and are valid */
    isModelValid(): boolean;
}
