import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, Validator } from '@angular/forms';
import { TimeObject } from '../time/time-object';
import { TimeComponent } from '../time/time.component';
import { Placement } from 'popper.js';
import { DateTimeFormatParser } from './format/datetime-parser';
import { FdDate } from '../calendar/models/fd-date';
import { CalendarComponent, DaysOfWeek, FdCalendarView } from '../calendar/calendar.component';
import { FdDatetime } from './models/fd-datetime';
/**
 * The datetime picker component is an opinionated composition of the fd-popover,
 * fd-calendar and fd-time components to accomplish the UI pattern for picking a date and time.
 * Supports Angular Forms.
 * ```html
 * <fd-date-time-picker [(ngModel)]="dateTime"></fd-date-time-picker>
 * ```
 */
export declare class DatetimePickerComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
    private elRef;
    private changeDetRef;
    dateTimeAdapter: DateTimeFormatParser;
    /** @hidden Reference to the inner time component. */
    timeComponent: TimeComponent;
    /** @hidden Reference to the inner calendar component. */
    calendarComponent: CalendarComponent;
    /**
     * @hidden Date of the input field. Internal use.
     * For programmatic selection, use two-way binding on the date input.
     */
    inputFieldDate: string;
    /** @hidden The Time object which interacts with the inner Time component. Internal use. */
    isInvalidDateInput: boolean;
    /** @hidden The Time object which interacts with the inner Time component. Internal use. */
    time: TimeObject;
    /** @hidden The CalendarDay object which interacts with the inner Calendar component. Internal use. */
    selectedDate: FdDate;
    /** Subscription of the dateFromInput. */
    private dateFromInputSubscription;
    /** Placeholder for the inner input element. */
    placeholder: string;
    /** Whether the component should be in compact mode. */
    compact: boolean;
    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
    placement: Placement;
    /** Whether the time component should be meridian (am/pm). */
    meridian: boolean;
    /** Whether the component is disabled. */
    disabled: boolean;
    /** Whether the time component shows spinners for changing the time. */
    spinners: boolean;
    /** Whether the time component shows seconds. */
    displaySeconds: boolean;
    /** Whether the time component shows minutes. */
    displayMinutes: boolean;
    /** Whether the time component shows hours. */
    displayHours: boolean;
    /** Whether to perform visual validation on the picker input. */
    useValidation: boolean;
    /** Current selected date. Two-way binding is supported. */
    date: FdDatetime;
    /** Whether the popover is open. Two-way binding is supported. */
    isOpen: boolean;
    /** The disableFunction for the calendar. */
    startingDayOfWeek: DaysOfWeek;
    /** Actually shown active view one of 'day' | 'month' | 'year' in calendar component*/
    activeView: FdCalendarView;
    /** Aria label for the datetime picker input. */
    datetimeInputLabel: string;
    /** Aria label for the button to show/hide the calendar. */
    displayDatetimeToggleLabel: string;
    /** Whether a null input is considered valid. */
    allowNull: boolean;
    /** Event thrown every time calendar active view is changed */
    readonly activeViewChange: EventEmitter<FdCalendarView>;
    /** Event emitted when the date changes. This can be a time or day change. */
    readonly dateChange: EventEmitter<FdDatetime>;
    /** Event emitted when the day changes from the calendar. */
    readonly calendarChange: EventEmitter<FdDatetime>;
    /** Event emitted when the time changes from the time component. */
    readonly timeChange: EventEmitter<FdDatetime>;
    /** Event emitted when popover closes. */
    readonly onClose: EventEmitter<void>;
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
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    validate(control: AbstractControl): {
        [key: string]: any;
    };
    /** Toggles the popover. */
    togglePopover(): void;
    /**
     * Method that handle calendar active view change and throws event.
     */
    handleCalendarActiveViewChange(activeView: FdCalendarView): void;
    /** Opens the popover. */
    openPopover(): void;
    /** Closes the popover and refresh model */
    closePopover(): void;
    /** @hidden */
    isInvalidDateInputHandler(e: any): void;
    /** @hidden */
    onEscapeKeydownHandler(): void;
    /** @hidden */
    onGlobalClick(event: MouseEvent): void;
    /** @hidden */
    ngOnInit(): void;
    /** @hidden */
    ngOnDestroy(): void;
    /** @hidden */
    constructor(elRef: ElementRef, changeDetRef: ChangeDetectorRef, dateTimeAdapter: DateTimeFormatParser);
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
    writeValue(selected: FdDatetime): void;
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected date changed.
     * If invalid time model is detected, it takes time model data from TimeComponent.
     */
    handleDateChange(date: FdDate): void;
    /**
     * @hidden
     * Method that is triggered by events from time component, when there is selected time changed
     */
    handleTimeChange(time: TimeObject): void;
    /** @hidden */
    focusArrowLeft(): void;
    /**
     * @hidden
     * Method, which is responsible for transforming string to datetime, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput.
     */
    handleInputChange(date: string): void;
    /** Method that provides information if model selected date/dates have properly types and are valid */
    isModelValid(): boolean;
    private setInput;
}
