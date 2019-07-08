import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CalendarI18n } from '../../../i18n/calendar-i18n';
import { FdDate } from '../../models/fd-date';
import { CalendarCurrent } from '../../models/calendar-current';
import { CalendarType, DaysOfWeek } from '../../calendar2.component';
import { CalendarDay } from '../../models/calendar-day';

@Component({
    selector: 'fd-calendar2-day-view',
    templateUrl: './calendar2-day-view.component.html',
    styleUrls: ['./calendar2-day-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Calendar2DayViewComponent implements OnInit {
    get currentlyDisplayed(): CalendarCurrent {
        return this._currentlyDisplayed;
    }

    @Input()
    set currentlyDisplayed(value: CalendarCurrent) {
        console.log(value);
        this._currentlyDisplayed = value;
        this.buildDayViewGrid();
    }

    private _currentlyDisplayed: CalendarCurrent;

    @HostBinding('class.fd-calendar__dates')
    private fdCalendarDateViewClass: boolean = true;

    dayViewGrid: CalendarDay[][];

    @Input()
    public selectedDate: FdDate;

    @Input()
    public range: boolean = false;

    @Input()
    public selectedRangeDate: { start: FdDate, end: FdDate };

    @Input()
    public startingDayOfWeek: DaysOfWeek;

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    calType: CalendarType = 'single';

    @Output()
    selectedDateChange = new EventEmitter<FdDate>();

    /** Id of the calendar. If none is provided, one will be generated. */
    @Input() id: string;

    @Output()
    selectedRangeDateChange = new EventEmitter<{ start: FdDate, end: FdDate }>();

    /**
     * Function used to disable certain dates in the calendar.
     * @param d Date
     */
    @Input()
    disableFunction = function(d: FdDate): boolean {
        return false;
    };
    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param d Date
     */
    @Input()
    disableRangeStartFunction = function(d: FdDate): boolean {
        return false;
    };
    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param d Date
     */
    @Input()
    disableRangeEndFunction = function(d: FdDate): boolean {
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
    blockFunction = function(d: FdDate): boolean {
        return false;
    };

    constructor(private calendarI18n: CalendarI18n) {
    }

    selectDate(day: CalendarDay) {
        if (!day.blocked && !day.disabled) {
            console.log(this.calType);
            if (this.calType === 'single') {
                this.selectedDate = day.date;
                this.selectedDateChange.emit(day.date);
                this.buildDayViewGrid();
            } else {
                if (this.selectCounter === 0 || this.selectCounter === 2) {
                    this.selectedRangeDate = { start: day.date, end: null };
                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                    this.buildDayViewGrid();
                    console.log(this.selectCounter + ' Selected');
                    console.log(this.selectedRangeDate);
                } else if (this.selectCounter === 1) {
                    // Check if date picked is lower than already chosen
                    if (this.selectedRangeDate.start.toDate().getTime() < day.date.toDate().getTime()) {
                        this.selectedRangeDate = { start: this.selectedRangeDate.start, end: day.date };
                    } else {
                        this.selectedRangeDate = { start: day.date, end: null };
                    }
                    console.log(this.selectCounter + ' Selected');
                    console.log(this.selectedRangeDate);
                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                    this.buildDayViewGrid();
                }

            }
        }
    }

    ngOnInit() {
        this.buildDayViewGrid();
    }

    get shortWeekDays(): string[] {
        return this.calendarI18n.getAllShortWeekdays().map(weekday => weekday[0].toLocaleUpperCase());
    }

    get daysInCurentMonth() {
        return this.getDaysInMonth(this._currentlyDisplayed.month, this._currentlyDisplayed.year);
    }

    get selectCounter(): number {
        if (!this.selectedRangeDate || !this.selectedRangeDate.start) {
            return 0;
        } else if (this.selectedRangeDate.start && !this.selectedRangeDate.end) {
            return 1;
        } else if (this.selectedRangeDate.start && this.selectedRangeDate.end) {
            return 2;
        }
    }

    private populateCalendar(): CalendarDay[] {
        let calendar: CalendarDay[] = [];

        calendar = this.getPreviousMonthDays(calendar);
        calendar = this.getCurrentMonthDays(calendar);
        calendar = this.getNextMonthDays(calendar);

        return calendar;
    }

    private buildDayViewGrid(): void {

        const calendarDays = this.populateCalendar();
        const dayViewGrid: CalendarDay[][] = [];

        while (calendarDays.length > 0) {
            dayViewGrid.push(calendarDays.splice(0, 7));
        }

        this.dayViewGrid = dayViewGrid;
    }

    private getDaysInMonth(month: number, year: number): number {
        if (month === 2) {
            return this.isLeapYear(year) ? 29 : 28;
        } else if (month % 2 === 0) {
            return 30;
        } else {
            return 31;
        }
    }

    private isLeapYear(year: number): boolean {
        if (year % 4 !== 0) {
            return false;
        } else if (year % 400 === 0) {
            return true;
        } else {
            return year % 100 !== 0;
        }
    }

    private getCurrentMonthDays(calendarDays: CalendarDay[]): CalendarDay[] {
        const month = this._currentlyDisplayed.month;
        const year = this._currentlyDisplayed.year;
        const amountOfDaysInCurrentMonth: number = this.getDaysInMonth(month, year);
        for (let dayNumber = 1; dayNumber <= amountOfDaysInCurrentMonth; dayNumber++) {
            const fdDate: FdDate = new FdDate(year, month, dayNumber);
            calendarDays.push({
                ...this.getDay(fdDate),
                monthStatus: 'current',
                today: fdDate.toDate().toDateString() === FdDate.getToday().toDate().toDateString()
            });
        }
        return calendarDays;
    }

    private getPreviousMonthDays(calendarDays: CalendarDay[]): CalendarDay[] {
        const month = this._currentlyDisplayed.month > 1 ? this._currentlyDisplayed.month - 1 : 12;
        const year = this._currentlyDisplayed.month > 1 ? this._currentlyDisplayed.year : this._currentlyDisplayed.year - 1;
        const amountOfDaysInCurrentMonth: number = this.getDaysInMonth(month, year);
        const prevMonthLastDate = new FdDate(year, month, amountOfDaysInCurrentMonth + 1);
        const prevMonthLastDay = amountOfDaysInCurrentMonth + 1;
        let prevMonthLastWeekDay = prevMonthLastDate.toDate().getDay() - this.startingDayOfWeek;

        if (prevMonthLastWeekDay < 6) {
            while (prevMonthLastWeekDay >= 0) {
                const prevMonthDay = prevMonthLastDay - prevMonthLastWeekDay;
                const fdDate = new FdDate(year, month, prevMonthDay);
                calendarDays.push({ ...this.getDay(fdDate), monthStatus: 'previous' });
                prevMonthLastWeekDay--;
            }
        }
        return calendarDays;
    }

    private getNextMonthDays(calendarDays: CalendarDay[]): CalendarDay[] {
        let nextMonthDisplayedDays: number = 0;
        const month = this._currentlyDisplayed.month > 1 ? this._currentlyDisplayed.month - 1 : 12;
        const year = this._currentlyDisplayed.month > 1 ? this._currentlyDisplayed.year : this._currentlyDisplayed.year - 1;

        // The calendar grid can have either 5 (35 days) or 6 (42 days) weeks
        // depending on the week day of the first day of the current month
        // and the number of days in the current month
        if (calendarDays.length > 35) {
            nextMonthDisplayedDays = 42 - calendarDays.length;
        } else {
            nextMonthDisplayedDays = 35 - calendarDays.length;
        }

        for (let nextD = 1; nextD <= nextMonthDisplayedDays; nextD++) {
            const fdDate = new FdDate(year, month, nextD);
            calendarDays.push({ ...this.getDay(fdDate), monthStatus: 'next' });
        }
        return calendarDays;
    }

    private getDay(fdDate: FdDate): CalendarDay {
        const day: CalendarDay = {
            date: fdDate,
            weekDay: fdDate.toDate().getDay(),
            disabled: this.disableFunction(fdDate),
            blocked: this.blockFunction(fdDate),
            selected: (
                (this.calType === 'single' && Calendar2DayViewComponent.equals(fdDate, this.selectedDate)) ||
                (this.selectedRangeDate && Calendar2DayViewComponent.equals(fdDate, this.selectedRangeDate.start)) ||
                (this.selectedRangeDate && Calendar2DayViewComponent.equals(fdDate, this.selectedRangeDate.end))
            ),
            selectedFirst: (this.selectedRangeDate && Calendar2DayViewComponent.equals(fdDate, this.selectedRangeDate.start)),
            selectedLast: (this.selectedRangeDate && Calendar2DayViewComponent.equals(fdDate, this.selectedRangeDate.end)),
            selectedRange: (this.selectedRangeDate && (
                (this.selectedRangeDate.start && ( this.selectedRangeDate.start.toDate().getTime() < fdDate.toDate().getTime()) ) &&
                (this.selectedRangeDate.end && ( this.selectedRangeDate.end.toDate().getTime() > fdDate.toDate().getTime()) )
            )),
            ariaLabel: this.calendarI18n.getDayAriaLabel(fdDate.toDate())
        };

        if (this.calType === 'range' && (this.selectCounter === 0 || this.selectCounter === 2)) {
            if (this.disableRangeStartFunction && !day.disabled) {
                day.disabled = this.disableRangeStartFunction(day.date);
            }
            if (this.blockRangeStartFunction && !day.blocked) {
                day.blocked = this.blockRangeStartFunction(day.date);
            }
        } else if (this.selectCounter === 1) {
            if (this.disableRangeEndFunction && !day.disabled) {
                day.disabled = this.disableRangeEndFunction(day.date);
            }

            if (this.blockRangeEndFunction && !day.blocked) {
                day.blocked = this.blockRangeEndFunction(day.date);
            }
        }

        return day;
    }

    static equals(date1: FdDate, date2: FdDate): boolean {
        if (!date1 || !date2) {
            return false;
        } else {
            return date1.toDate().toDateString() === date2.toDate().toDateString();
        }
    }
}
