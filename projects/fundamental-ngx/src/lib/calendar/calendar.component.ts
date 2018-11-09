import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    HostListener,
    ElementRef,
    SimpleChanges,
    OnChanges,
    Inject,
    AfterViewChecked
} from '@angular/core';
import { HashService } from '../utils/hash.service';

export type CalendarType = 'single' | 'range';
export type MonthStatus = 'previous' | 'current' | 'next';

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
}

export interface EmittedDate {
    selectedDay?: CalendarDay;
    selectedFirstDay?: CalendarDay;
    selectedLastDay?: CalendarDay;
}

@Component({
    selector: 'fd-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges, AfterViewChecked {
    calendarId: string;

    newFocusedDayId: string;

    @Input()
    dateFromDatePicker: string;
    @Input()
    calType: CalendarType = 'single';

    @Input()
    disableFunction = function(d): boolean {
        return false;
    };
    @Input()
    blockFunction = function(d): boolean {
        return false;
    };

    @Output()
    updateDatePickerInput: EventEmitter<any> = new EventEmitter();
    @Output()
    isInvalidDateInput: EventEmitter<any> = new EventEmitter();

    invalidDate: boolean = false;

    showCalendarMonths: boolean = false;
    showCalendarYears: boolean = false;
    showCalendarDates: boolean = true;

    monthsShortName: string[] = [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'May',
        'Jun',
        'Jul',
        'Aug.',
        'Sep.',
        'Oct.',
        'Nov.',
        'Dec.'
    ];
    monthsFullName: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    weekDays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    calendarGrid: CalendarDay[][] = [];
    calendarYearsList: number[] = [];

    today: Date = new Date();
    todayMonth = this.today.getMonth();
    todayYear = this.today.getFullYear();

    date: Date = new Date();
    month: number = this.date.getMonth();
    monthName: string = this.monthsFullName[this.month];
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

    populateCalendar(): CalendarDay[] {
        let idCounter: number = 100;
        let numOfDaysInCurrentMonth: number = this.determineDaysInMonth(this.month, this.year);
        let calendarMonth: CalendarDay[] = [];

        //Previous month days
        let prevMonthLastDate: Date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        let prevMonth: number = prevMonthLastDate.getMonth();
        let prevMonthYear: number = prevMonthLastDate.getFullYear();
        let prevMonthLastDay = prevMonthLastDate.getDate();
        let prevMonthLastWeekDay = prevMonthLastDate.getDay();

        if (prevMonthLastWeekDay < 6) {
            while (prevMonthLastWeekDay >= 0) {
                let prevMonthDay = prevMonthLastDay - prevMonthLastWeekDay;
                let calDate = new Date(prevMonthYear, prevMonth, prevMonthDay);

                let previousMonthCalendarDay: CalendarDay = {
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
                        calDate.getTime() < this.selectedRangeLast.date.getTime()
                };

                calendarMonth.push(previousMonthCalendarDay);
                prevMonthLastWeekDay--;
            }
        }

        //Current month days
        let foundSelected = false;
        for (let d = 1; d <= numOfDaysInCurrentMonth; d++) {
            let calDate = new Date(this.date.getFullYear(), this.date.getMonth(), d);

            let currMonthCalendarDay: CalendarDay = {
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
                isTabIndexed: false
            };

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

        //Next month days
        let nextMonthDisplayedDays: number = 0;

        //The calendar grid can have either 5 (35 days) or 6 (42 days) weeks depending on the week day of the first day of the current month and the number of days in the current month
        if (calendarMonth.length > 35) {
            nextMonthDisplayedDays = 42 - calendarMonth.length;
        } else {
            nextMonthDisplayedDays = 35 - calendarMonth.length;
        }

        for (let nextD = 1; nextD <= nextMonthDisplayedDays; nextD++) {
            let nextMonthFirstDate: Date;

            if (this.date.getMonth() == 11) {
                nextMonthFirstDate = new Date(this.date.getFullYear() + 1, 0, 1);
            } else {
                nextMonthFirstDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
            }

            let nextMonth: number = nextMonthFirstDate.getMonth();
            let nextMonthYear: number = nextMonthFirstDate.getFullYear();

            let calDate = new Date(nextMonthYear, nextMonth, nextD);

            let nextMonthCalendarDay: CalendarDay = {
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
                    calDate.getTime() < this.selectedRangeLast.date.getTime()
            };

            calendarMonth.push(nextMonthCalendarDay);
        }

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
        this.updateDatePickerInputEmitter();
    }

    updateDatePickerInputEmitter() {
        if (this.calType == 'single') {
            this.emittedDate.selectedDay = this.selectedDay;
        } else {
            this.emittedDate.selectedFirstDay = this.selectedRangeFirst;
            this.emittedDate.selectedLastDay = this.selectedRangeLast;
        }
        this.updateDatePickerInput.emit(this.emittedDate);
    }

    constructCalendarYearsList() {
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
            this.calendarYearsList.forEach((yearFromList) => {
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

    //Functions that handle calendar navigation
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
    selectDate(day) {
        if (!day.blocked && !day.disabled) {
            if (this.calType === 'single') {
                this.selectedDay = day;
                this.selectedDayChange.emit(this.selectedDay);
            } else {
                if (this.selectCounter === 2) {
                    this.selectCounter = 0;
                }

                if (this.selectCounter === 1 && day.date !== this.selectedRangeLast.date) {
                    this.selectedRangeLast = day;
                    this.selectedRangeLastChange.emit(this.selectedRangeLast);
                    this.selectCounter++;
                }

                if (this.selectCounter === 0) {
                    this.selectedRangeLast = day;
                    this.selectedRangeLastChange.emit(this.selectedRangeLast);
                    this.selectedRangeFirst = day;
                    this.selectedRangeFirstChange.emit(this.selectedRangeFirst);
                    this.selectCounter++;
                }

                if (this.selectedRangeFirst.date > this.selectedRangeLast.date) {
                    let tempSelectedRangeFirst = this.selectedRangeFirst;
                    this.selectedRangeFirst = this.selectedRangeLast;
                    this.selectedRangeFirstChange.emit(this.selectedRangeFirst);
                    this.selectedRangeLast = tempSelectedRangeFirst;
                    this.selectedRangeLastChange.emit(this.selectedRangeLast);
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

    selectMonth(selectedMonth) {
        this.selectedMonth = selectedMonth;
        this.setCurrentMonth(selectedMonth);
        this.constructCalendar();
    }

    setCurrentYear(year: number) {
        this.date.setFullYear(year);
        this.year = this.date.getFullYear();
    }

    selectYear(selectedYear) {
        this.selectedMonth = this.month;
        this.setCurrentYear(selectedYear);
        this.constructCalendar();
    }

    //Functions that handle the calendar content - show/hide calendar dates, months list, years list
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

    validateDateFromDatePicker(date: Array<number>): boolean {
        let isInvalid: boolean = false;
        let month = date[0];
        let day = date[1];
        let year = date[2];
        let numOfDaysInMonth = 0;

        if (isNaN(month) || isNaN(day) || isNaN(year)) {
            isInvalid = true;
            return isInvalid;
        }

        if (year < 1000 || year > 3000 || month < 1 || month > 12) {
            isInvalid = true;
            return isInvalid;
        } else {
            numOfDaysInMonth = this.daysPerMonth[month - 1];
            if (day < 1 || day > numOfDaysInMonth) {
                isInvalid = true;
                return isInvalid;
            }
        }
        return isInvalid;
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
            newFocusedYearId = '#' + this.calendarId + '-fd-year-' + (year - 4);
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            newFocusedYearId = '#' + this.calendarId + '-fd-year-' + (year + 4);
        } else if (event.code === 'ArrowLeft') {
            event.preventDefault();
            newFocusedYearId = '#' + this.calendarId + '-fd-year-' + (year - 1);
        } else if (event.code === 'ArrowRight') {
            event.preventDefault();
            newFocusedYearId = '#' + this.calendarId + '-fd-year-' + (year + 1);
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
            newFocusedMonthId = '#' + this.calendarId + '-fd-month-' + (month - 1);
        } else if (event.code === 'ArrowRight') {
            event.preventDefault();
            newFocusedMonthId = '#' + this.calendarId + '-fd-month-' + (month + 1);
        }
        if (newFocusedMonthId) {
            this.focusElement(newFocusedMonthId);
        }
    }

    onKeydownDayHandler(event, cell) {
        const currentId = parseInt(event.currentTarget.id.split('-').pop());
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            this.selectDate(cell);
            this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + currentId;
        } else if (event.code === 'ArrowUp') {
            event.preventDefault();
            this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + (currentId - 10);
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + (currentId + 10);
        } else if (event.code === 'ArrowLeft') {
            event.preventDefault();
            this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + (currentId - 1);
        } else if (event.code === 'ArrowRight') {
            event.preventDefault();
            this.newFocusedDayId = '#' + this.calendarId + '-fd-day-' + (currentId + 1);
        }
        if (this.newFocusedDayId) {
            this.focusElement(this.newFocusedDayId);
        }
    }

    focusElement(elementSelector) {
        const elementToFocus = this.eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.dateFromDatePicker) {
            if (changes.dateFromDatePicker.currentValue.length > 0) {
                let dateFromDatePickerInput = changes.dateFromDatePicker.currentValue;

                if (this.calType === 'single') {
                    let singleDate = dateFromDatePickerInput.replace(/\s/g, '');
                    singleDate = singleDate.split(/[/]+/);
                    this.invalidDate = this.validateDateFromDatePicker(singleDate);

                    if (!this.invalidDate) {
                        this.selectedDay.date = new Date(singleDate[2], singleDate[0] - 1, singleDate[1]);
                        this.date = new Date(singleDate[2], singleDate[0] - 1, singleDate[1]);
                        this.year = this.date.getFullYear();
                        this.month = this.date.getMonth();
                        this.monthName = this.monthsFullName[this.date.getMonth()];
                        this.isInvalidDateInput.emit(this.invalidDate);
                        this.constructCalendar();
                    } else {
                        this.resetSelection();
                        this.isInvalidDateInput.emit(this.invalidDate);
                    }
                } else {
                    let currentDates = dateFromDatePickerInput.replace(/\s/g, '');
                    currentDates = currentDates.split(/[-,]+/);
                    let firstDate = currentDates[0].split(/[/]+/);
                    let secondDate = currentDates[1].split(/[/]+/);
                    this.invalidDate =
                        this.validateDateFromDatePicker(firstDate) || this.validateDateFromDatePicker(secondDate);
                    if (!this.invalidDate) {
                        let fDate = new Date(firstDate[2], firstDate[0] - 1, firstDate[1]);
                        let lDate = new Date(secondDate[2], secondDate[0] - 1, secondDate[1]);
                        if (fDate.getTime() > lDate.getTime()) {
                            this.selectedRangeFirst.date = lDate;
                            this.selectedRangeLast.date = fDate;
                        } else {
                            this.selectedRangeFirst.date = fDate;
                            this.selectedRangeLast.date = lDate;
                        }
                        this.isInvalidDateInput.emit(this.invalidDate);
                        this.constructCalendar();
                    } else {
                        this.resetSelection();
                        this.isInvalidDateInput.emit(this.invalidDate);
                    }
                }
            }
        }
        if (changes.selectedDay || changes.selectedRangeFirst || changes.selectedRangeLast) {
            if (this.calType === 'single' && this.selectedDay) {
                this.date = new Date(this.selectedDay.date);
            }
            if (this.calType === 'range' && changes.selectedRangeFirst) {
                this.date = new Date(this.selectedRangeFirst.date);
            }
            if (this.calType === 'range' && changes.selectedRangeLast) {
                this.date = new Date(this.selectedRangeLast.date);
            }
            this.month = this.date.getMonth();
            this.monthName = this.monthsFullName[this.month];
            this.year = this.date.getFullYear();
            this.day = this.date.getDate();
            this.firstYearCalendarList = this.year;
            this.constructCalendar();
            this.constructCalendarYearsList();
        }
    }

    ngOnInit() {
        if (!this.date) {
            this.date = new Date();
        }
        this.constructCalendar();
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
    }

    ngAfterViewChecked() {
        if (this.newFocusedDayId) {
            this.focusElement(this.newFocusedDayId);
            this.newFocusedDayId = null;
        }
    }

    constructor(@Inject(HashService) private hasher: HashService, private eRef: ElementRef) {}
}
