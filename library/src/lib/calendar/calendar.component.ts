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
    HostBinding, OnChanges, SimpleChanges
} from '@angular/core';
import { HashService } from '../utils/hash.service';
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

@Component({
    selector: 'fd-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['calendar.component.scss'],
    host: {
        '(blur)': 'onTouched()',
        class: 'fd-calendar'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CalendarComponent),
            multi: true
        }
    ]
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewChecked, ControlValueAccessor, OnChanges {
    calendarId: string;

    newFocusedDayId: string;

    init = false;

    @HostBinding('class.fd-calendar')
    fdCalendarClass: boolean = true;

    @Input()
    dateFromDatePicker: Subject<any>;

    @Input()
    calType: CalendarType = 'single';

    @Input()
    startingDayOfWeek: WeekDaysNumberRange = 0;

    @Output()
    isInvalidDateInput: EventEmitter<any> = new EventEmitter();

    @Input()
    isDateTimePicker: boolean = false;

    invalidDate: boolean = false;

    showCalendarMonths: boolean = false;
    showCalendarYears: boolean = false;
    showCalendarDates: boolean = true;

    monthsShortName: string[];
    monthsFullName: string[];

    weekDays: string[];
    daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    calendarGrid: CalendarDay[][] = [];
    calendarYearsList: number[] = [];

    today: Date = new Date();
    todayMonth = this.today.getMonth();
    todayYear = this.today.getFullYear();

    date: Date = new Date();
    month: number = this.date.getMonth();
    monthName: string;
    year: number = this.date.getFullYear();
    day = this.date.getDate();

    selectedMonth: number;
    firstYearCalendarList: number = this.year;
    selectCounter: number = 0;

    @Input()
    selectedDay: CalendarDay = {
        date: null
    };
    @Output()
    selectedDayChange = new EventEmitter();

    @Input()
    selectedRangeFirst: CalendarDay = {
        date: null
    };
    @Output()
    selectedRangeFirstChange = new EventEmitter();

    @Input()
    selectedRangeLast: CalendarDay = {
        date: null
    };
    @Output()
    selectedRangeLastChange = new EventEmitter();

    emittedDate: EmittedDate = {
        selectedDay: this.selectedDay,
        selectedFirstDay: this.selectedRangeFirst,
        selectedLastDay: this.selectedRangeLast
    };

    @Output()
    closeCalendar = new EventEmitter<any>();

    private i18nLocalSub: Subscription;

    @Input()
    disableFunction = function(d): boolean {
        return false;
    };
    @Input()
    disableRangeStartFunction = function(d): boolean {
        return false;
    };
    @Input()
    disableRangeEndFunction = function(d): boolean {
        return false;
    };
    @Input()
    blockRangeStartFunction = function(d): boolean {
        return false;
    };
    @Input()
    blockRangeEndFunction = function(d): boolean {
        return false;
    };
    @Input()
    blockFunction = function(d): boolean {
        return false;
    };

    onChange: Function = () => {};
    onTouched: Function = () => {};

    // A function that determines the number of days in a particular month
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

    setWeekDaysOrder() {
        this.weekDays = this.calendarI18n.getAllShortWeekdays().map(item => item[0]);
        if (this.startingDayOfWeek <= 6 && this.startingDayOfWeek >= 0) {
            for (let i = this.startingDayOfWeek; i > 0; i--) {
                this.weekDays.push(this.weekDays.shift());
            }
        }
    }

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

    populateCalendar(): CalendarDay[] {
        let calendarMonth: CalendarDay[] = [];

        calendarMonth = this.getPreviousMonthDays(calendarMonth);

        calendarMonth = this.getCurrentMonthDays(calendarMonth);

        calendarMonth = this.getNextMonthDays(calendarMonth);

        return calendarMonth;
    }

    // Construction functions
    constructCalendar(): void {
        const calendarDays = this.populateCalendar();
        const calendarGrid: CalendarDay[][] = [];

        while (calendarDays.length > 0) {
            calendarGrid.push(calendarDays.splice(0, 7));
        }

        this.calendarGrid = calendarGrid;
    }

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

    constructCalendarYearsList() {
        this.calendarYearsList = [];
        for (let y = 0; y < 12; y++) {
            this.calendarYearsList.push(this.firstYearCalendarList + y);
        }
    }

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

    // Functions that handle calendar navigation
    goToPreviousMonth() {
        this.setCurrentMonth(this.date.getMonth() - 1);
        this.selectedMonth = this.month;
        this.constructCalendar();
    }

    goToNextMonth() {
        this.setCurrentMonth(this.date.getMonth() + 1);
        this.selectedMonth = this.month;
        this.constructCalendar();
    }

    loadNextYearsList() {
        this.calendarYearsList = [];
        this.firstYearCalendarList += 12;
        this.constructCalendarYearsList();
    }

    loadPrevYearsList() {
        this.calendarYearsList = [];
        this.firstYearCalendarList -= 12;
        this.constructCalendarYearsList();
    }

    // Functions that handle selection (day, month, year)
    selectDate(day, formEvent: boolean = true, event?, closeCalendar?) {
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

    setCurrentMonth(month: number) {
        this.date.setMonth(month);
        this.month = this.date.getMonth();
        this.monthName = this.monthsFullName[this.date.getMonth()];
        this.year = this.date.getFullYear();
    }

    selectMonth(selectedMonth, event?) {
        if (event) {
            event.stopPropagation();
        }
        this.selectedMonth = selectedMonth;
        this.setCurrentMonth(selectedMonth);
        this.constructCalendar();
        this.openDaySelection();
    }

    setCurrentYear(year: number) {
        this.date.setFullYear(year);
        this.year = this.date.getFullYear();
    }

    selectYear(selectedYear, event?) {
        if (event) {
            event.stopPropagation();
        }
        this.selectedMonth = this.month;
        this.setCurrentYear(selectedYear);
        this.constructCalendar();
        this.openDaySelection();
    }

    // Functions that handle the calendar content - show/hide calendar dates, months list, years list
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

    openDaySelection() {
        this.showCalendarMonths = false;
        this.showCalendarYears = false;
        this.showCalendarDates = true;
    }

    @HostListener('document:keydown.escape', [])
    onEscapeKeydownHandler() {
        this.showCalendarDates = true;
        this.showCalendarMonths = false;
        this.showCalendarYears = false;
    }

    @HostListener('document:click', ['$event'])
    onClickHandler(e: MouseEvent) {
        const target = e.target;
        if (!this.eRef.nativeElement.contains(target)) {
            this.showCalendarDates = true;
            this.showCalendarMonths = false;
            this.showCalendarYears = false;
        }
    }

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
            newFocusedYearId = '#' + this.calendarId + '-fd-year-' + (year - 4);
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            if (this.calendarYearsList.indexOf(year) >= 8) {
                this.loadNextYearsList();
                this.cd.detectChanges();
            }
            newFocusedYearId = '#' + this.calendarId + '-fd-year-' + (year + 4);
        } else if (event.code === 'ArrowLeft') {
            event.preventDefault();
            if (year === this.calendarYearsList[0]) {
                this.loadPrevYearsList();
                this.cd.detectChanges();
            }
            newFocusedYearId = '#' + this.calendarId + '-fd-year-' + (year - 1);
        } else if (event.code === 'ArrowRight') {
            event.preventDefault();
            if (year === this.calendarYearsList[this.calendarYearsList.length - 1]) {
                this.loadNextYearsList();
                this.cd.detectChanges();
            }
            newFocusedYearId = '#' + this.calendarId + '-fd-year-' + (year + 1);
        } else if (event.code === 'Tab' && !event.shiftKey) {
            if (!this.isDateTimePicker) {
                event.preventDefault();
                this.focusElement('#arrowLeft');
            }
        }
        if (newFocusedYearId) {
            this.focusElement(newFocusedYearId);
        }
    }

    onKeydownMonthHandler(event, month) {
        let newFocusedMonthId;
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            this.selectMonth(month);
        } else if (event.code === 'ArrowUp') {
            event.preventDefault();
            newFocusedMonthId = '#' + this.calendarId + '-fd-month-' + (month - 4);
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            newFocusedMonthId = '#' + this.calendarId + '-fd-month-' + (month + 4);
        } else if (event.code === 'ArrowLeft') {
            event.preventDefault();
            if (month === 0) {
                newFocusedMonthId = '#' + this.calendarId + '-fd-month-11';
            } else {
                newFocusedMonthId = '#' + this.calendarId + '-fd-month-' + (month - 1);
            }
        } else if (event.code === 'ArrowRight') {
            event.preventDefault();
            if (month === 11) {
                newFocusedMonthId = '#' + this.calendarId + '-fd-month-0'
            } else {
                newFocusedMonthId = '#' + this.calendarId + '-fd-month-' + (month + 1);
            }
        } else if (event.code === 'Tab' && !event.shiftKey) {
            if (!this.isDateTimePicker) {
                event.preventDefault();
                this.focusElement('#arrowLeft');
            }
        }
        if (newFocusedMonthId) {
            this.focusElement(newFocusedMonthId);
        }
    }

    onKeydownDayHandler(event, cell) {
        if (event.code === 'Tab' && !event.shiftKey) {
            if (!this.isDateTimePicker) {
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
                this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + currentId;
            } else if (event.code === 'ArrowUp') {
                event.preventDefault();
                if (currentId >= 10 && currentId <= 16) {
                    // if first row, go to previous month
                    this.goToPreviousMonth();
                    const lastDigit = currentId.toString().split('').pop();
                    this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + this.calendarGrid.length.toString() + lastDigit;
                } else {
                    this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + (currentId - 10);
                }
            } else if (event.code === 'ArrowDown') {
                event.preventDefault();
                if (currentId >= lastDay - 6 && currentId <= lastDay) {
                    // if last row, go to next month
                    this.goToNextMonth();
                    const lastDigit = currentId.toString().split('').pop();
                    this.newFocusedDayId = '#' + this.calendarId + '-fd-day-1' + lastDigit;
                } else {
                    this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + (currentId + 10);
                }
            } else if (event.code === 'ArrowLeft') {
                event.preventDefault();
                if (currentId === 10) {
                    // if the first day is selected, go to the last day of the previous month
                    this.goToPreviousMonth();
                    lastDay = this.calendarGrid.length === 6 ? 66 : 56;
                    this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + lastDay;
                } else if (currentId.toString().split('').pop() === '0') {
                    // if the last digit is 0, skip to the last day of the previous week
                    this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + (currentId - 4);
                } else {
                    this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + (currentId - 1);
                }
            } else if (event.code === 'ArrowRight') {
                event.preventDefault();
                if (currentId === lastDay) {
                    // if the last day is selected, go to the first day of the next month
                    this.goToNextMonth();
                    this.newFocusedDayId = '#' + this.calendarId + '-fd-day-10';
                } else if (currentId.toString().split('').pop() === '6') {
                    // else if the last digit is 6, skip to the first day of the next week
                    this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + (currentId + 4);
                } else {
                    this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + (currentId + 1);
                }
            }
            if (this.newFocusedDayId) {
                this.focusElement(this.newFocusedDayId);
            }
        }
    }

    focusElement(elementSelector) {
        const elementToFocus = this.eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }

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

    ngOnInit() {

        // Localization setup
        this.setupLocalization();

        if (!this.date) {
            this.date = new Date();
        }

        this.constructCalendar();
        this.constructCalendarYearsList();
        this.calendarId = this.hasher.hash();
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

    ngAfterViewChecked() {
        if (this.newFocusedDayId) {
            this.focusElement(this.newFocusedDayId);
            this.newFocusedDayId = null;
        }
    }

    ngOnDestroy() {
        if (this.dateFromDatePicker) {
            this.dateFromDatePicker.unsubscribe();
        }

        if (this.i18nLocalSub) {
            this.i18nLocalSub.unsubscribe();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && (changes.disableFunction || changes.blockFunction)) {
            this.constructCalendar();
        }
    }

    constructor(private hasher: HashService,
                private eRef: ElementRef,
                private cd: ChangeDetectorRef,
                public calendarI18nLabels: CalendarI18nLabels,
                public calendarI18n: CalendarI18n,
                public dateAdapter: DateFormatParser) {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        // void
    }

    writeValue(selected: { date: Date; rangeEnd?: Date }): void {
        if (selected && this.calType) {
            if (selected.date && this.calType === 'single') {
                this.singleFormsSetup(selected);
            } else if (selected.date && selected.rangeEnd && this.calType === 'range') {
                this.rangeFormsSetup(selected);
            }
        }
    }

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
