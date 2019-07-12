import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    HostListener,
    ElementRef,
    forwardRef,
    OnDestroy,
    AfterViewChecked,
    ChangeDetectorRef,
    HostBinding, OnChanges, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { CalendarI18n } from './i18n/calendar-i18n';
import { CalendarI18nLabels } from './i18n/calendar-i18n-labels';
import { DateFormatParser } from './format/date-parser';

export type CalendarType = 'single' | 'range';
export type MonthStatus = 'previous' | 'current' | 'next';
export type WeekDaysNumberRange = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface CalendarDay {
    date: Date;
    day?: number;
    weekDay?: number;
    monthStatus?: MonthStatus;
    disabled?: boolean;
    blocked?: boolean;
    selected?: boolean;
    selectedFirst?: boolean;
    selectedRange?: boolean;
    selectedLast?: boolean;
    today?: boolean;
    isTabIndexed?: boolean;
    ariaLabel?: string;
}

export interface EmittedDate {
    selectedDay?: CalendarDay;
    selectedFirstDay?: CalendarDay;
    selectedLastDay?: CalendarDay;
}

let calendarUniqueId: number = 0;

/**
 * Calendar component used for selecting dates, typically used by the DatePicker and DateTimePicker components.
 * Supports the Angular forms module, enabling form validity, ngModel, etc.
 */
@Component({
    selector: 'fd-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['calendar.component.scss'],
    host: {
        '(blur)': 'onTouched()',
        '[class.fd-has-display-block]': 'true',
        '[attr.id]': 'id'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CalendarComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewChecked, ControlValueAccessor, OnChanges {

    /** @hidden The id of the newly focused day. Internal use. */
    newFocusedDayId: string;

    /** @hidden Used to check if this is the calendar being initialized. Internal use. */
    init = false;

    /** @hidden Applies the fd-calendar class to this component. Internal use. */
    @HostBinding('class.fd-calendar')
    fdCalendarClass: boolean = true;

    /** @hidden Subject the calendar subscribes to when the date value from the datePicker component changes. Internal use. */
    @Input()
    dateFromDatePicker: Subject<any>;

    /** Id of the calendar. If none is provided, one will be generated. */
    @Input()
    id = 'fd-calendar-' + calendarUniqueId++;

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    calType: CalendarType = 'single';

    /** The day of the week the calendar should start on. 0 represents Sunday, 1 is Monday, 2 is Tuesday, and so on. */
    @Input()
    startingDayOfWeek: WeekDaysNumberRange = 0;

    /** Fired when the date input value is invalid. */
    @Output()
    isInvalidDateInput: EventEmitter<any> = new EventEmitter();

    /** Whether wants to allow escape focus, otherwise it resets on beginning. */
    @Input()
    allowFocusEscape: boolean = false;

    /** @hidden Whether the date is invalid. Internal use. */
    invalidDate: boolean = false;

    /** @hidden Whether to show the month selection grid on the calendar. Internal use. */
    showCalendarMonths: boolean = false;
    /** @hidden Whether to show the year selection grid on the calendar. Internal use. */
    showCalendarYears: boolean = false;
    /** @hidden Whether to show the date selection grid on the calendar. Internal use. */
    showCalendarDates: boolean = true;

    /** @hidden For i18n, the list of month short names. Internal use. */
    monthsShortName: string[];
    /** @hidden For i18n, the list of month full names. Internal use. */
    monthsFullName: string[];

    /** @hidden For i18n, the list of weekday names. Internal use. */
    weekDays: string[];

    /** @hidden The typical number of days in each month. Internal use. */
    daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /** @hidden The displayed grid of calendar days. Internal use. */
    calendarGrid: CalendarDay[][] = [];
    /** @hidden The years to display in the year selection grid. Internal use. */
    calendarYearsList: number[] = [];

    /** @hidden Today's date. Internal use. */
    today: Date = new Date();
    /** @hidden Today's month. Internal use. */
    todayMonth = this.today.getMonth();
    /** @hidden Today's year. Internal use. */
    todayYear = this.today.getFullYear();

    /** @hidden Date used to navigate the calendar. Not to be confused with selectedDay which is the ngModel. Internal use. */
    date: Date = new Date();
    /** @hidden Month used to navigate the calendar.Internal use. */
    month: number = this.date.getMonth();
    /** @hidden Name of the month currently displayed. Internal use. */
    monthName: string;
    /** @hidden Year used to navigate the calendar. Internal use. */
    year: number = this.date.getFullYear();
    /** @hidden Day of month used to navigate the calendar. Internal use. */
    day = this.date.getDate();

    /** @hidden Number (0-11) of the selected month used to navigate the calendar. Internal use. */
    selectedMonth: number;

    /** @hidden The first year to be displayed in the list of selectable years. Internal use. */
    firstYearCalendarList: number = this.year;

    /** @hidden The first year to be displayed in the list of selectable years. Internal use. */
    selectCounter: number = 0;

    /** The currently selected CalendarDay model. */
    @Input()
    selectedDay: CalendarDay = {
        date: null
    };
    /** Fired when a new date is selected. */
    @Output()
    selectedDayChange = new EventEmitter();

    /** The currently selected first CalendarDay in a range type calendar. */
    @Input()
    selectedRangeFirst: CalendarDay = {
        date: null
    };
    /** Fired when the user selects a new first date in a range of dates is selected. */
    @Output()
    selectedRangeFirstChange = new EventEmitter();

    /** The currently selected last CalendarDay in a range type calendar. */
    @Input()
    selectedRangeLast: CalendarDay = {
        date: null
    };
    /** Fired when the user selects a new last date in a range of dates is selected. */
    @Output()
    selectedRangeLastChange = new EventEmitter();

    /** @hidden The date that gets emitted to the datePicker when the select day changes on the calendar. Internal use. */
    emittedDate: EmittedDate = {
        selectedDay: this.selectedDay,
        selectedFirstDay: this.selectedRangeFirst,
        selectedLastDay: this.selectedRangeLast
    };

    /** Fired when the calendar is closed. */
    @Output()
    closeCalendar = new EventEmitter<any>();

    /** @hidden Subscription to the i18n service. */
    private i18nLocalSub: Subscription;

    /**
     * Function used to disable certain dates in the calendar.
     * @param d Date
     */
    @Input()
    disableFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param d Date
     */
    @Input()
    disableRangeStartFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param d Date
     */
    @Input()
    disableRangeEndFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to block certain dates in the calendar for the range start selection.
     * @param d Date
     */
    @Input()
    blockRangeStartFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to block certain dates in the calendar for the range end selection.
     * @param d Date
     */
    @Input()
    blockRangeEndFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to block certain dates in the calendar.
     * @param d Date
     */
    @Input()
    blockFunction = function(d): boolean {
        return false;
    };

    /** @hidden */
    onChange: Function = () => {};
    /** @hidden */
    onTouched: Function = () => {};

    /** @hidden */
    determineDaysInMonth = function(month: number, year: number): number {
        if (month === 1) {
            if ((year % 100 !== 0 && year % 4 === 0) || year % 400 === 0) {
                return 29;
            } else {
                return this.daysPerMonth[month];
            }
        } else {
            return this.daysPerMonth[month];
        }
    };

    /** @hidden */
    setWeekDaysOrder() {
        this.weekDays = this.calendarI18n.getAllShortWeekdays().map(item => item[0]);
        if (this.startingDayOfWeek <= 6 && this.startingDayOfWeek >= 0) {
            for (let i = this.startingDayOfWeek; i > 0; i--) {
                this.weekDays.push(this.weekDays.shift());
            }
        }
    }

    /** @hidden */
    getPreviousMonthDays(calendarMonth) {
        // Previous month days
        let prevMonthLastDate;
        this.setWeekDaysOrder();
        prevMonthLastDate = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        const prevMonth: number = prevMonthLastDate.getMonth();
        const prevMonthYear: number = prevMonthLastDate.getFullYear();
        const prevMonthLastDay = prevMonthLastDate.getDate();
        let prevMonthLastWeekDay = prevMonthLastDate.getDay() - this.startingDayOfWeek;

        if (prevMonthLastWeekDay < 6) {
            while (prevMonthLastWeekDay >= 0) {
                const prevMonthDay = prevMonthLastDay - prevMonthLastWeekDay;
                const calDate = new Date(prevMonthYear, prevMonth, prevMonthDay);

                const previousMonthCalendarDay: CalendarDay = {
                    date: calDate,
                    day: calDate.getDate(),
                    weekDay: calDate.getDay(),
                    monthStatus: 'previous',
                    disabled: this.disableFunction(calDate),
                    blocked: this.blockFunction(calDate),
                    selected:
                        (this.selectedDay.date && calDate.toDateString() === this.selectedDay.date.toDateString()) ||
                        (this.selectedRangeFirst.date &&
                            calDate.toDateString() === this.selectedRangeFirst.date.toDateString()) ||
                        (this.selectedRangeLast.date &&
                            calDate.toDateString() === this.selectedRangeLast.date.toDateString()),
                    selectedFirst:
                        this.selectedRangeFirst.date &&
                        calDate.toDateString() === this.selectedRangeFirst.date.toDateString(),
                    selectedLast:
                        this.selectedRangeLast.date &&
                        calDate.toDateString() === this.selectedRangeLast.date.toDateString(),
                    selectedRange:
                        this.selectedRangeFirst.date &&
                        calDate.getTime() > this.selectedRangeFirst.date.getTime() &&
                        this.selectedRangeLast.date &&
                        calDate.getTime() < this.selectedRangeLast.date.getTime(),
                    ariaLabel: this.calendarI18n.getDayAriaLabel(calDate)
                };

                if (this.selectCounter === 0) {
                    if (this.disableRangeStartFunction && !previousMonthCalendarDay.disabled) {
                        previousMonthCalendarDay.disabled = this.disableRangeStartFunction(calDate);
                    }
                    if (this.blockRangeStartFunction && !previousMonthCalendarDay.blocked) {
                        previousMonthCalendarDay.blocked = this.blockRangeStartFunction(calDate);
                    }
                } else if (this.selectCounter === 1) {
                    if (this.disableRangeEndFunction && !previousMonthCalendarDay.disabled) {
                        previousMonthCalendarDay.disabled = this.disableRangeEndFunction(calDate);
                    }

                    if (this.blockRangeEndFunction && !previousMonthCalendarDay.blocked) {
                        previousMonthCalendarDay.blocked = this.blockRangeEndFunction(calDate);
                    }
                }

                calendarMonth.push(previousMonthCalendarDay);
                prevMonthLastWeekDay--;
            }
        }

        return calendarMonth;
    }

    /** @hidden */
    getCurrentMonthDays(calendarMonth) {
        const numOfDaysInCurrentMonth: number = this.determineDaysInMonth(this.month, this.year);
        // Current month days
        let foundSelected = false;
        for (let d = 1; d <= numOfDaysInCurrentMonth; d++) {
            const calDate = new Date(this.date.getFullYear(), this.date.getMonth(), d);

            const currMonthCalendarDay: CalendarDay = {
                date: calDate,
                day: calDate.getDate(),
                weekDay: calDate.getDay(),
                monthStatus: 'current',
                disabled: this.disableFunction(calDate),
                blocked: this.blockFunction(calDate),
                selected:
                    (this.selectedDay.date && calDate.toDateString() === this.selectedDay.date.toDateString()) ||
                    (this.selectedRangeFirst.date &&
                        calDate.toDateString() === this.selectedRangeFirst.date.toDateString()) ||
                    (this.selectedRangeLast.date &&
                        calDate.toDateString() === this.selectedRangeLast.date.toDateString()),
                selectedFirst:
                    this.selectedRangeFirst.date &&
                    calDate.toDateString() === this.selectedRangeFirst.date.toDateString(),
                selectedLast:
                    this.selectedRangeLast.date &&
                    calDate.toDateString() === this.selectedRangeLast.date.toDateString(),
                selectedRange:
                    this.selectedRangeFirst.date &&
                    calDate.getTime() > this.selectedRangeFirst.date.getTime() &&
                    this.selectedRangeLast.date &&
                    calDate.getTime() < this.selectedRangeLast.date.getTime(),
                today: calDate.toDateString() === this.today.toDateString(),
                isTabIndexed: false,
                ariaLabel: this.calendarI18n.getDayAriaLabel(calDate)
            };

            if (this.selectCounter === 0 || this.selectCounter === 2) {
                if (this.disableRangeStartFunction && !currMonthCalendarDay.disabled) {
                    currMonthCalendarDay.disabled = this.disableRangeStartFunction(calDate);
                }
                if (this.blockRangeStartFunction && !currMonthCalendarDay.blocked) {
                    currMonthCalendarDay.blocked = this.blockRangeStartFunction(calDate);
                }
            } else if (this.selectCounter === 1) {
                if (this.disableRangeEndFunction && !currMonthCalendarDay.disabled) {
                    currMonthCalendarDay.disabled = this.disableRangeEndFunction(calDate);
                }
                if (this.blockRangeEndFunction && !currMonthCalendarDay.blocked) {
                    currMonthCalendarDay.blocked = this.blockRangeEndFunction(calDate);
                }
            }

            // if a day is selected, it should be tab indexed
            if (currMonthCalendarDay.selected) {
                foundSelected = true;
                currMonthCalendarDay.isTabIndexed = true;
            }

            calendarMonth.push(currMonthCalendarDay);
        }

        if (!foundSelected) {
            let foundToday = false;
            for (let d = 0; d < numOfDaysInCurrentMonth; d++) {
                // if no day is selected, tab index today
                if (calendarMonth[d] && calendarMonth[d].today) {
                    foundToday = true;
                    calendarMonth[d].isTabIndexed = true;
                }
            }
            // if today isn't present on the calendarGrid, tab index the first day
            if (!foundToday) {
                calendarMonth[0].isTabIndexed = true;
            }
        }


        return calendarMonth;
    }

    /** @hidden */
    getNextMonthDays(calendarMonth) {
        // Next month days
        let nextMonthDisplayedDays: number = 0;

        // The calendar grid can have either 5 (35 days) or 6 (42 days) weeks
        // depending on the week day of the first day of the current month
        // and the number of days in the current month
        if (calendarMonth.length > 35) {
            nextMonthDisplayedDays = 42 - calendarMonth.length;
        } else {
            nextMonthDisplayedDays = 35 - calendarMonth.length;
        }

        for (let nextD = 1; nextD <= nextMonthDisplayedDays; nextD++) {
            let nextMonthFirstDate: Date;

            if (this.date.getMonth() === 11) {
                nextMonthFirstDate = new Date(this.date.getFullYear() + 1, 0, 1);
            } else {
                nextMonthFirstDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
            }

            const nextMonth: number = nextMonthFirstDate.getMonth();
            const nextMonthYear: number = nextMonthFirstDate.getFullYear();

            const calDate = new Date(nextMonthYear, nextMonth, nextD);

            const nextMonthCalendarDay: CalendarDay = {
                date: calDate,
                day: calDate.getDate(),
                weekDay: calDate.getDay(),
                monthStatus: 'next',
                disabled: this.disableFunction(calDate),
                blocked: this.blockFunction(calDate),
                selected:
                    (this.selectedDay.date && calDate.toDateString() === this.selectedDay.date.toDateString()) ||
                    (this.selectedRangeFirst.date &&
                        calDate.toDateString() === this.selectedRangeFirst.date.toDateString()) ||
                    (this.selectedRangeLast.date &&
                        calDate.toDateString() === this.selectedRangeLast.date.toDateString()),
                selectedFirst:
                    this.selectedRangeFirst.date &&
                    calDate.toDateString() === this.selectedRangeFirst.date.toDateString(),
                selectedLast:
                    this.selectedRangeLast.date &&
                    calDate.toDateString() === this.selectedRangeLast.date.toDateString(),
                selectedRange:
                    this.selectedRangeFirst.date &&
                    calDate.getTime() > this.selectedRangeFirst.date.getTime() &&
                    this.selectedRangeLast.date &&
                    calDate.getTime() < this.selectedRangeLast.date.getTime(),
                ariaLabel: this.calendarI18n.getDayAriaLabel(calDate)
            };

            if (this.selectCounter === 0) {
                if (this.disableRangeStartFunction && !nextMonthCalendarDay.disabled) {
                    nextMonthCalendarDay.disabled = this.disableRangeStartFunction(calDate);
                }
                if (this.blockRangeStartFunction && !nextMonthCalendarDay.blocked) {
                    nextMonthCalendarDay.blocked = this.blockRangeStartFunction(calDate);
                }
            } else if (this.selectCounter === 1) {
                if (this.disableRangeEndFunction && !nextMonthCalendarDay.disabled) {
                    nextMonthCalendarDay.disabled = this.disableRangeEndFunction(calDate);
                }

                if (this.blockRangeEndFunction && !nextMonthCalendarDay.blocked) {
                    nextMonthCalendarDay.blocked = this.blockRangeEndFunction(calDate);
                }
            }

            calendarMonth.push(nextMonthCalendarDay);
        }

        return calendarMonth;
    }

    /** @hidden */
    populateCalendar(): CalendarDay[] {
        let calendarMonth: CalendarDay[] = [];

        calendarMonth = this.getPreviousMonthDays(calendarMonth);

        calendarMonth = this.getCurrentMonthDays(calendarMonth);

        calendarMonth = this.getNextMonthDays(calendarMonth);

        return calendarMonth;
    }

    /** @hidden */
    constructCalendar(): void {
        const calendarDays = this.populateCalendar();
        const calendarGrid: CalendarDay[][] = [];

        while (calendarDays.length > 0) {
            calendarGrid.push(calendarDays.splice(0, 7));
        }

        this.calendarGrid = calendarGrid;
    }

    /** @hidden */
    refreshSelected() {
        this.calendarGrid.forEach(grid => {
            grid.forEach(day => {
                day.selected =
                    (this.selectedDay.date && day.date && day.date.toDateString() === this.selectedDay.date.toDateString()) ||
                    (this.selectedRangeFirst.date &&
                        day.date.toDateString() === this.selectedRangeFirst.date.toDateString()) ||
                    (this.selectedRangeLast.date &&
                        day.date.toDateString() === this.selectedRangeLast.date.toDateString());
                day.selectedFirst =
                    this.selectedRangeFirst.date && day.date &&
                    day.date.toDateString() === this.selectedRangeFirst.date.toDateString();
                day.selectedLast =
                    this.selectedRangeLast.date && day.date &&
                    day.date.toDateString() === this.selectedRangeLast.date.toDateString();
                day.selectedRange =
                    this.selectedRangeFirst.date &&
                    day.date.getTime() > this.selectedRangeFirst.date.getTime() &&
                    this.selectedRangeLast.date &&
                    day.date.getTime() < this.selectedRangeLast.date.getTime();
            });
        });
    }

    /** @hidden */
    updateDatePickerInputEmitter() {
        if (this.calType === 'single') {
            this.emittedDate.selectedDay = this.selectedDay;
        } else {
            this.emittedDate.selectedFirstDay = this.selectedRangeFirst;
            this.emittedDate.selectedLastDay = this.selectedRangeLast;
        }
        if (this.dateFromDatePicker) {
            this.dateFromDatePicker.next(this.emittedDate);
        }
    }

    /** @hidden */
    constructCalendarYearsList() {
        this.calendarYearsList = [];
        for (let y = 0; y < 12; y++) {
            this.calendarYearsList.push(this.firstYearCalendarList + y);
        }
    }

    /** @hidden */
    getYearTabIndex(year, i) {
        let retVal = -1;
        // tab index currently selected year
        if (year === this.year) {
            retVal = 0;
        } else {
            // if no year on the calendarYearsList is selected, tab index the first
            let foundYear = false;
            this.calendarYearsList.forEach(yearFromList => {
                if (this.year === yearFromList) {
                    foundYear = true;
                }
            });
            if (!foundYear) {
                if (i === 0) {
                    retVal = 0;
                }
            }
        }

        return retVal;
    }

    /** @hidden */
    goToPreviousMonth() {
        this.setCurrentMonth(this.date.getMonth() - 1);
        this.selectedMonth = this.month;
        this.constructCalendar();
    }

    /** @hidden */
    goToNextMonth() {
        this.setCurrentMonth(this.date.getMonth() + 1);
        this.selectedMonth = this.month;
        this.constructCalendar();
    }

    /** @hidden */
    loadNextYearsList() {
        this.calendarYearsList = [];
        this.firstYearCalendarList += 12;
        this.constructCalendarYearsList();
    }

    /** @hidden */
    loadPrevYearsList() {
        this.calendarYearsList = [];
        this.firstYearCalendarList -= 12;
        this.constructCalendarYearsList();
    }

    /**
     * Function for selecting a date on the calendar. Typically called when a date is clicked, but can also be called programmatically.
     * @param day CalendarDay object to be selected.
     * @param formEvent If this function should emit an ngModelChange.
     * @param event Event passed with this function call, typically the mouse click when selecting from the calendar grid.
     * @param closeCalendar If the calendar should be closed when a date is selected, used with DatePicker and DateTimePicker.
     */
    selectDate(day: CalendarDay, formEvent: boolean = true, event?, closeCalendar?) {
        if (event) {
            event.stopPropagation();
        }
        if (!day.blocked && !day.disabled) {
            if (this.calType === 'single') {
                this.selectedDay = day;
                this.selectedDayChange.emit(this.selectedDay);
                this.refreshSelected();
                if (this.init) {
                    this.updateDatePickerInputEmitter();
                }
                if (formEvent) {
                    this.onChange({ date: day.date });
                }
                if (closeCalendar) {
                    this.closeCalendar.emit();
                }
            } else {
                if (this.selectCounter === 2) {
                    this.selectCounter = 0;
                }

                if (this.selectCounter === 1 && day.date !== this.selectedRangeLast.date) {
                    this.selectedRangeLast = day;
                    this.selectedRangeLastChange.emit(this.selectedRangeLast);
                    this.selectCounter++;
                    this.refreshSelected();
                    this.constructCalendar();
                    if (this.init) {
                        this.updateDatePickerInputEmitter();
                    }
                    if (formEvent) {
                        this.onChange({ date: this.selectedRangeFirst.date, rangeEnd: day.date });
                    }
                }

                if (this.selectCounter === 0) {
                    this.selectedRangeLast = day;
                    this.selectedRangeLastChange.emit(this.selectedRangeLast);
                    this.selectedRangeFirst = day;
                    this.selectedRangeFirstChange.emit(this.selectedRangeFirst);
                    this.selectCounter++;
                    this.refreshSelected();
                    this.constructCalendar();
                    if (this.init) {
                        this.updateDatePickerInputEmitter();
                    }
                    if (formEvent) {
                        this.onChange({ date: day.date, rangeEnd: day.date });
                    }
                }

                if (this.selectedRangeFirst.date > this.selectedRangeLast.date) {
                    const tempSelectedRangeFirst = this.selectedRangeFirst;
                    this.selectedRangeFirst = this.selectedRangeLast;
                    this.selectedRangeFirstChange.emit(this.selectedRangeFirst);
                    this.selectedRangeLast = tempSelectedRangeFirst;
                    this.selectedRangeLastChange.emit(this.selectedRangeLast);
                    this.refreshSelected();
                    this.constructCalendar();
                    if (this.init) {
                        this.updateDatePickerInputEmitter();
                    }
                    if (formEvent) {
                        this.onChange({ date: this.selectedRangeFirst.date, rangeEnd: this.selectedRangeLast.date });
                    }
                }
            }
        }
        this.isInvalidDateInput.emit(false);
    }

    /** @hidden */
    setCurrentMonth(month: number) {
        // get the current date of the month
        const currentDate = this.date.getDate();
        // get the number of days in the new month
        const daysInNewMonth = new Date(this.date.getFullYear(), month + 1, 0).getDate();
        /*
         if the currentDate > daysInNewMonth, set the date to the first for now, to prevent skipping a month
         in the event that the currentDate is 31 and the next month has 30 days
         */
        if (currentDate > daysInNewMonth) {
            this.date.setDate(1);
        }
        // set the month
        this.date.setMonth(month);
        // if currentDate > daysInNewMonth, restore the date to whichever number is lower, today's date or the number of days in this month
        if (currentDate > daysInNewMonth) {
            this.date.setDate(Math.min(currentDate, daysInNewMonth));
        }
        this.month = this.date.getMonth();
        this.monthName = this.monthsFullName[this.date.getMonth()];
        this.year = this.date.getFullYear();
    }

    /** @hidden */
    selectMonth(selectedMonth, event?) {
        if (event) {
            event.stopPropagation();
        }
        this.selectedMonth = selectedMonth;
        this.setCurrentMonth(selectedMonth);
        this.constructCalendar();
        this.openDaySelection();
    }

    /** @hidden */
    setCurrentYear(year: number) {
        this.date.setFullYear(year);
        this.year = this.date.getFullYear();
    }

    /** @hidden */
    selectYear(selectedYear, event?) {
        if (event) {
            event.stopPropagation();
        }
        this.selectedMonth = this.month;
        this.setCurrentYear(selectedYear);
        this.constructCalendar();
        this.openDaySelection();
    }

    /**
     * Displays the month selection grid.
     */
    openMonthSelection() {
        if (this.showCalendarYears) {
            this.showCalendarYears = false;
            this.showCalendarMonths = true;
            this.showCalendarDates = false;
        } else {
            this.showCalendarMonths = !this.showCalendarMonths;
            this.showCalendarYears = false;
            this.showCalendarDates = !this.showCalendarDates;
        }
    }


    /**
     * Displays the year selection grid.
     */
    openYearSelection() {
        if (this.showCalendarMonths) {
            this.showCalendarMonths = false;
            this.showCalendarYears = true;
            this.showCalendarDates = false;
        } else {
            this.showCalendarYears = !this.showCalendarYears;
            this.showCalendarMonths = false;
            this.showCalendarDates = !this.showCalendarDates;
        }
    }

    /**
     * Displays the date selection grid.
     */
    openDaySelection() {
        this.showCalendarMonths = false;
        this.showCalendarYears = false;
        this.showCalendarDates = true;
    }

    /** @hidden */
    @HostListener('document:keydown.escape', [])
    onEscapeKeydownHandler() {
        this.showCalendarDates = true;
        this.showCalendarMonths = false;
        this.showCalendarYears = false;
    }

    /** @hidden */
    @HostListener('document:click', ['$event'])
    onClickHandler(e: MouseEvent) {
        const target = e.target;
        if (!this.eRef.nativeElement.contains(target)) {
            this.showCalendarDates = true;
            this.showCalendarMonths = false;
            this.showCalendarYears = false;
        }
    }

    /** @hidden */
    validateDateFromDatePicker(date: Date): boolean {
        if (!date) {
            return true;
        }
        const month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();

        if (isNaN(month) || isNaN(day) || isNaN(year)) {
            return true;
        }

        if (year < 1000 || year > 3000 || month < 0 || month > 11) {
            return true;
        }

        if (day < 1 || day > this.determineDaysInMonth(month, year)) {
            return true;
        }
        return false;
    }

    /** @hidden */
    resetSelection() {
        if (this.calType === 'single') {
            this.selectedDay = { date: null };
            this.selectedDayChange.emit(this.selectedDay);
        } else {
            this.selectedRangeFirst = { date: null };
            this.selectedRangeFirstChange.emit(this.selectedRangeFirst);

            this.selectedRangeLast = { date: null };
            this.selectedRangeLastChange.emit(this.selectedRangeLast);
        }
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.monthName = this.monthsFullName[this.date.getMonth()];
        this.day = this.date.getDate();
        this.selectedMonth = null;
        this.firstYearCalendarList = this.year;
        this.selectCounter = 0;
        this.calendarYearsList = [];
        this.constructCalendarYearsList();
        this.constructCalendar();
    }

    /** @hidden */
    onKeydownYearHandler(event, year) {
        let newFocusedYearId;
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            this.selectYear(year);
        } else if (event.code === 'ArrowUp') {
            event.preventDefault();
            if (this.calendarYearsList.indexOf(year) <= 3) {
                this.loadPrevYearsList();
                this.cd.detectChanges();
            }
            newFocusedYearId = '#' + this.id + '-fd-year-' + (year - 4);
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            if (this.calendarYearsList.indexOf(year) >= 8) {
                this.loadNextYearsList();
                this.cd.detectChanges();
            }
            newFocusedYearId = '#' + this.id + '-fd-year-' + (year + 4);
        } else if (event.code === 'ArrowLeft') {
            event.preventDefault();
            if (year === this.calendarYearsList[0]) {
                this.loadPrevYearsList();
                this.cd.detectChanges();
            }
            newFocusedYearId = '#' + this.id + '-fd-year-' + (year - 1);
        } else if (event.code === 'ArrowRight') {
            event.preventDefault();
            if (year === this.calendarYearsList[this.calendarYearsList.length - 1]) {
                this.loadNextYearsList();
                this.cd.detectChanges();
            }
            newFocusedYearId = '#' + this.id + '-fd-year-' + (year + 1);
        } else if (event.code === 'Tab' && !event.shiftKey) {
            if (!this.allowFocusEscape) {
                event.preventDefault();
                this.focusElement('#arrowLeft');
            }
        }
        if (newFocusedYearId) {
            this.focusElement(newFocusedYearId);
        }
    }

    /** @hidden */
    onKeydownMonthHandler(event, month) {
        let newFocusedMonthId;
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            this.selectMonth(month);
        } else if (event.code === 'ArrowUp') {
            event.preventDefault();
            newFocusedMonthId = '#' + this.id + '-fd-month-' + (month - 4);
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            newFocusedMonthId = '#' + this.id + '-fd-month-' + (month + 4);
        } else if (event.code === 'ArrowLeft') {
            event.preventDefault();
            if (month === 0) {
                newFocusedMonthId = '#' + this.id + '-fd-month-11';
            } else {
                newFocusedMonthId = '#' + this.id + '-fd-month-' + (month - 1);
            }
        } else if (event.code === 'ArrowRight') {
            event.preventDefault();
            if (month === 11) {
                newFocusedMonthId = '#' + this.id + '-fd-month-0'
            } else {
                newFocusedMonthId = '#' + this.id + '-fd-month-' + (month + 1);
            }
        } else if (event.code === 'Tab' && !event.shiftKey) {
            if (!this.allowFocusEscape) {
                event.preventDefault();
                this.focusElement('#arrowLeft');
            }
        }
        if (newFocusedMonthId) {
            this.focusElement(newFocusedMonthId);
        }
    }

    /** @hidden */
    onKeydownDayHandler(event, cell) {
        if (event.code === 'Tab' && !event.shiftKey) {
            if (!this.allowFocusEscape) {
                event.preventDefault();
                this.focusElement('#arrowLeft');
            }
        } else {
            // if the grid has 6 rows, the last cell id is 66, if it has 5 rows it's 56
            let lastDay = this.calendarGrid.length === 6 ? 66 : 56;
            const currentId = parseInt(event.currentTarget.id.split('-').pop(), 10);
            if (event.code === 'Space' || event.code === 'Enter') {
                event.preventDefault();
                const closeCalendarPopover = true;
                this.selectDate(cell, true, null, closeCalendarPopover);
                this.newFocusedDayId = '#' + this.id + '-fd-day-' + currentId;
            } else if (event.code === 'ArrowUp') {
                event.preventDefault();
                if (currentId >= 10 && currentId <= 16) {
                    // if first row, go to previous month
                    this.goToPreviousMonth();
                    const lastDigit = currentId.toString().split('').pop();
                    this.newFocusedDayId = '#' + this.id + '-fd-day-' + this.calendarGrid.length.toString() + lastDigit;
                } else {
                    this.newFocusedDayId = '#' + this.id + '-fd-day-' + (currentId - 10);
                }
            } else if (event.code === 'ArrowDown') {
                event.preventDefault();
                if (currentId >= lastDay - 6 && currentId <= lastDay) {
                    // if last row, go to next month
                    this.goToNextMonth();
                    const lastDigit = currentId.toString().split('').pop();
                    this.newFocusedDayId = '#' + this.id + '-fd-day-1' + lastDigit;
                } else {
                    this.newFocusedDayId = '#' + this.id + '-fd-day-' + (currentId + 10);
                }
            } else if (event.code === 'ArrowLeft') {
                event.preventDefault();
                if (currentId === 10) {
                    // if the first day is selected, go to the last day of the previous month
                    this.goToPreviousMonth();
                    lastDay = this.calendarGrid.length === 6 ? 66 : 56;
                    this.newFocusedDayId = '#' + this.id + '-fd-day-' + lastDay;
                } else if (currentId.toString().split('').pop() === '0') {
                    // if the last digit is 0, skip to the last day of the previous week
                    this.newFocusedDayId = '#' + this.id + '-fd-day-' + (currentId - 4);
                } else {
                    this.newFocusedDayId = '#' + this.id + '-fd-day-' + (currentId - 1);
                }
            } else if (event.code === 'ArrowRight') {
                event.preventDefault();
                if (currentId === lastDay) {
                    // if the last day is selected, go to the first day of the next month
                    this.goToNextMonth();
                    this.newFocusedDayId = '#' + this.id + '-fd-day-10';
                } else if (currentId.toString().split('').pop() === '6') {
                    // else if the last digit is 6, skip to the first day of the next week
                    this.newFocusedDayId = '#' + this.id + '-fd-day-' + (currentId + 4);
                } else {
                    this.newFocusedDayId = '#' + this.id + '-fd-day-' + (currentId + 1);
                }
            }
            if (this.newFocusedDayId) {
                this.focusElement(this.newFocusedDayId);
            }
        }
    }

    /** @hidden */
    focusElement(elementSelector) {
        const elementToFocus = this.eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }

    /** @hidden */
    updateFromDatePicker(date: any) {
        if (this.calType === 'single') {
            const singleDate = this.dateAdapter.parse(date);
            this.invalidDate = this.validateDateFromDatePicker(singleDate);
            if (!this.invalidDate) {
                this.selectedDay.date = new Date(singleDate.getFullYear(), singleDate.getMonth(), singleDate.getDate());
                this.date = new Date(singleDate.getFullYear(), singleDate.getMonth(), singleDate.getDate());
                this.year = this.date.getFullYear();
                this.month = this.date.getMonth();
                this.monthName = this.monthsFullName[this.date.getMonth()];
                this.isInvalidDateInput.emit(this.invalidDate);
                this.constructCalendar();
                this.constructCalendarYearsList();
                this.updateDatePickerInputEmitter();
            } else {
                this.isInvalidDateInput.emit(this.invalidDate);
                this.resetSelection();
            }
        } else {
            const currentDates = date.split(this.dateAdapter.rangeDelimiter);
            const firstDate = this.dateAdapter.parse(currentDates[0]);
            const secondDate = this.dateAdapter.parse(currentDates[1]);
            this.invalidDate =
                this.validateDateFromDatePicker(firstDate) || this.validateDateFromDatePicker(secondDate);

            if (!this.invalidDate) {
                const fDate = firstDate;
                const lDate = secondDate;
                if (fDate.getTime() > lDate.getTime()) {
                    this.selectedRangeFirst.date = lDate;
                    this.selectedRangeLast.date = fDate;
                } else {
                    this.selectedRangeFirst.date = fDate;
                    this.selectedRangeLast.date = lDate;
                }
                this.date = firstDate;
                this.year = this.date.getFullYear();
                this.month = this.date.getMonth();
                this.monthName = this.monthsFullName[this.date.getMonth()];
                this.isInvalidDateInput.emit(this.invalidDate);
                this.constructCalendar();
                this.constructCalendarYearsList();
                this.updateDatePickerInputEmitter();
            } else {
                this.resetSelection();
                this.isInvalidDateInput.emit(this.invalidDate);
            }
        }
    }

    /** @hidden */
    ngOnInit() {

        // Localization setup
        this.setupLocalization();

        if (!this.date) {
            this.date = new Date();
        }

        this.constructCalendar();
        this.constructCalendarYearsList();
        if (this.month) {
            this.selectMonth(this.month);
        } else {
            this.selectMonth(this.date.getMonth());
        }
        if (this.year) {
            this.selectYear(this.year);
        } else {
            this.selectMonth(this.date.getFullYear());
        }

        if (this.dateFromDatePicker) {
            this.dateFromDatePicker.subscribe(date => {
                if (date && typeof date === 'string') {
                    this.updateFromDatePicker(date);
                }
                this.constructCalendarYearsList();
            });
        }
        this.init = true;
    }

    /** @hidden */
    ngAfterViewChecked() {
        if (this.newFocusedDayId) {
            this.focusElement(this.newFocusedDayId);
            this.newFocusedDayId = null;
        }
    }

    /** @hidden */
    ngOnDestroy() {
        if (this.dateFromDatePicker) {
            this.dateFromDatePicker.unsubscribe();
        }

        if (this.i18nLocalSub) {
            this.i18nLocalSub.unsubscribe();
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges) {
        if (changes && (changes.disableFunction || changes.blockFunction)) {
            this.constructCalendar();
        }
    }

    constructor(private eRef: ElementRef,
                private cd: ChangeDetectorRef,
                public calendarI18nLabels: CalendarI18nLabels,
                public calendarI18n: CalendarI18n,
                public dateAdapter: DateFormatParser) {
    }

    /** @hidden */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        // void
    }

    /** @hidden */
    writeValue(selected: { date: Date; rangeEnd?: Date }): void {
        if (selected && this.calType) {
            if (selected.date && this.calType === 'single') {
                this.singleFormsSetup(selected);
            } else if (selected.date && selected.rangeEnd && this.calType === 'range') {
                this.rangeFormsSetup(selected);
            }
        }
    }

    /** @hidden */
    private singleFormsSetup(selected: { date: Date; rangeEnd?: Date }): void {
        this.selectedDay.date = new Date(
            selected.date.getFullYear(),
            selected.date.getMonth(),
            selected.date.getDate()
        );
        this.date = new Date(selected.date.getFullYear(), selected.date.getMonth(), selected.date.getDate());
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.monthName = this.monthsFullName[this.date.getMonth()];
        this.firstYearCalendarList = this.year;
        this.constructCalendar();
        this.constructCalendarYearsList();
    }

    /** @hidden */
    private rangeFormsSetup(selected: { date: Date; rangeEnd?: Date }): void {
        const fDate = new Date(selected.date.getFullYear(), selected.date.getMonth(), selected.date.getDate());
        const lDate = new Date(
            selected.rangeEnd.getFullYear(),
            selected.rangeEnd.getMonth(),
            selected.rangeEnd.getDate()
        );
        if (fDate.getTime() > lDate.getTime()) {
            this.selectedRangeFirst.date = lDate;
            this.selectedRangeLast.date = fDate;
        } else {
            this.selectedRangeFirst.date = fDate;
            this.selectedRangeLast.date = lDate;
        }
        this.date = new Date(selected.date.getFullYear(), selected.date.getMonth(), selected.date.getDate());
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.monthName = this.monthsFullName[this.date.getMonth()];
        this.firstYearCalendarList = this.year;
        this.constructCalendar();
        this.constructCalendarYearsList();
    }

    /** @hidden */
    private setupLocalization(): void {
        this.monthsFullName = this.calendarI18n.getAllFullMonthNames();
        this.monthsShortName = this.calendarI18n.getAllShortMonthNames();
        this.monthName = this.monthsFullName[this.month];

        this.i18nLocalSub = this.calendarI18n.i18nChange.subscribe(() => {
            this.monthsFullName = this.calendarI18n.getAllFullMonthNames();
            this.monthsShortName = this.calendarI18n.getAllShortMonthNames();
            this.monthName = this.monthsFullName[this.month];
            this.setWeekDaysOrder();
            this.cd.detectChanges();
        });

        // Will also need to subscribe to labelsChange when we go to OnPush change detection.
    }
}
