import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input, OnChanges, OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { CalendarI18n } from '../../i18n/calendar-i18n';
import { FdDate } from '../../models/fd-date';
import { CalendarCurrent } from '../../models/calendar-current';
import { CalendarType, DaysOfWeek } from '../../calendar.component';
import { CalendarDay } from '../../models/calendar-day';
import { CalendarService } from '../../calendar.service';
import { FdRangeDate } from '../../models/fd-range-date';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** Component representing the day view of the calendar. */
@Component({
    selector: 'fd-calendar-day-view',
    templateUrl: './calendar-day-view.component.html',
    styleUrls: ['./calendar-day-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'id + "-day-view"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDayViewComponent implements OnInit, OnChanges, OnDestroy {

    /** @hidden */
    newFocusedDayId: string = '';

    /** Actual day grid with previous/current/next month days */
    public dayViewGrid: CalendarDay[][];

    /** @hidden */
    @HostBinding('class.fd-calendar__dates')
    public fdCalendarDateViewClass: boolean = true;

    /** Currently displayed month and year for days */
    @Input()
    public currentlyDisplayed: CalendarCurrent;

    /** The currently selected FdDate model in single mode. */
    @Input()
    public selectedDate: FdDate;

    /** The currently selected FdDates model start and end in range mode. */
    @Input()
    public selectedRangeDate: FdRangeDate;

    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    @Input()
    public startingDayOfWeek: DaysOfWeek;

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    calType: CalendarType = 'single';

    /** Id of the calendar. If none is provided, one will be generated. */
    @Input() id: string;

    /** Function that allows to specify which function would be called, when focus wants to escape */
    @Input()
    focusEscapeFunction: Function;

    /** Event emitted always, when model is changed in range mode */
    @Output()
    public readonly selectedRangeDateChange: EventEmitter<FdRangeDate> = new EventEmitter<FdRangeDate>();

    /** Event emitted always, when next month is selected, by focus */
    @Output()
    public readonly nextMonthSelect: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted always, when previous month is selected, by focus */
    @Output()
    public readonly previousMonthSelect: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted always, when model is changed in single mode */
    @Output()
    public readonly selectedDateChange: EventEmitter<FdDate> = new EventEmitter<FdDate>();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$: Subject<void> = new Subject<void>();

    /**
     * Variable that contains first letter of every weekday, basing on CalendarI18nDefault.
     */
    private _shortWeekDays: string[];

    /**
     * Function used to disable certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    disableFunction = function (fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param fdDate FdDate
     */
    @Input()
    disableRangeStartFunction = function (fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param fdDate FdDate
     */
    @Input()
    disableRangeEndFunction = function (fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to block certain dates in the calendar for the range start selection.
     * @param fdDate FdDate
     */
    @Input()
    blockRangeStartFunction = function (fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to block certain dates in the calendar for the range end selection.
     * @param fdDate FdDate
     */
    @Input()
    blockRangeEndFunction = function (fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to block certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    blockFunction = function (fdDate: FdDate): boolean {
        return false;
    };

    /** @hidden */
    constructor(
        private calendarI18n: CalendarI18n,
        private eRef: ElementRef,
        private changeDetRef: ChangeDetectorRef
    ) {
        this.calendarI18n.i18nChange
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(() => this.refreshShortWeekDays())
        ;
    }

    /**
     * Function for selecting a date on the calendar. Typically called when a date is clicked, but can also be called programmatically.
     * @param day CalendarDay object to be selected.
     */
    selectDate(day: CalendarDay, event?: MouseEvent): void {
        if (event) {
            /**
             * There are some problems with popup integration. After clicking inside day component, the popover closes.
             */
            event.stopPropagation();
            event.preventDefault();
            this.newFocusedDayId = day.id;
            this.focusElement(this.newFocusedDayId);
        }
        if (!day.blocked && !day.disabled) {
            if (this.calType === 'single') {
                this.selectedDate = day.date;
                this.selectedDateChange.emit(day.date);
                this.buildDayViewGrid();
            } else {
                if (this.selectCounter === 0 || this.selectCounter === 2) {
                    this.selectedRangeDate = { start: day.date, end: null };
                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                    this.buildDayViewGrid();
                } else if (this.selectCounter === 1) {
                    // Check if date picked is higher than already chosen, otherwise just reverse them
                    if (this.selectedRangeDate.start.getTimeStamp() < day.date.getTimeStamp()) {
                        this.selectedRangeDate = { start: this.selectedRangeDate.start, end: day.date };
                    } else {
                        this.selectedRangeDate = { start: day.date, end: this.selectedRangeDate.start };
                    }
                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                    this.buildDayViewGrid();
                }

            }
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this.refreshShortWeekDays();
        this.buildDayViewGrid();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    /** @hidden
     *  Amount of selected days
     *  0, when there is no day selected, or start date is invalid,
     *  1, when there is only valid start date, or end date is same as start date,
     *  2, when both dates are valid
     */
    get selectCounter(): number {
        if (!this.selectedRangeDate || !this.selectedRangeDate.start || !this.selectedRangeDate.start.isDateValid()) {
            return 0;
        } else if (this.selectedRangeDate.start &&
            (!this.selectedRangeDate.end || !this.selectedRangeDate.end.isDateValid() ||
                CalendarService.datesEqual(this.selectedRangeDate.start, this.selectedRangeDate.end)
            )
        ) {
            return 1;
        } else if (
            this.selectedRangeDate.start && this.selectedRangeDate.start.isDateValid() &&
            this.selectedRangeDate.end && this.selectedRangeDate.end.isDateValid()) {
            return 2;
        }
    }

    /**
     * @hidden
     * Method that handles day cells keydown events,
     * @param event KeyboardEvent
     * @param cell CalendarDay
     * @param grid with specified column and row as a x and y
     */
    onKeydownDayHandler(event, cell: CalendarDay, grid: { x: number, y: number }): void {
        if (event.code === 'Tab' && !event.shiftKey) {
            if (this.focusEscapeFunction) {
                event.preventDefault();
                this.focusEscapeFunction();
            }
        } else {
            switch (event.code) {
                case ('Space'):
                case ('Enter'): {
                    event.preventDefault();
                    this.selectDate(cell);
                    this.newFocusedDayId = cell.id;
                    break;
                }
                case ('ArrowUp'): {
                    event.preventDefault();
                    if (grid.y > 0) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y - 1][grid.x].id;
                    } else {
                        this.selectPreviousMonth();
                        this.newFocusedDayId = this.dayViewGrid[this.dayViewGrid.length - 1][grid.x].id;
                    }
                    break;
                }
                case ('ArrowDown'): {
                    event.preventDefault();
                    if (grid.y < this.dayViewGrid.length - 1) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y + 1][grid.x].id;
                    } else {
                        this.selectNextMonth();
                        this.newFocusedDayId = this.dayViewGrid[0][grid.x].id;
                    }
                    break;
                }
                case ('ArrowLeft'): {
                    event.preventDefault();
                    if (grid.x > 0) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y][grid.x - 1].id;
                    } else if (grid.y > 0) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y - 1][this.dayViewGrid[0].length - 1].id;
                    } else {
                        this.selectPreviousMonth();
                        this.newFocusedDayId =
                            this.dayViewGrid[this.dayViewGrid.length - 1][this.dayViewGrid[0].length - 1].id
                            ;
                    }
                    break;
                }
                case ('ArrowRight'): {
                    event.preventDefault();
                    if (grid.x < this.dayViewGrid[0].length - 1) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y][grid.x + 1].id;
                    } else if (grid.y < this.dayViewGrid.length - 1) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y + 1][0].id;
                    } else {
                        this.selectNextMonth();
                        this.newFocusedDayId = this.dayViewGrid[0][0].id;
                    }
                    break;
                }
            }
        }

        if (this.newFocusedDayId) {
            this.focusElement(this.newFocusedDayId);
        }
    }

    /** @hidden */
    public ngOnChanges(): void {
        this.buildDayViewGrid();
    }

    /** @hidden
     *  Method that allow to focus elements inside this component
     */
    public focusElement(elementSelector): void {
        if (this.newFocusedDayId) {
            this.newFocusedDayId = '';
            setTimeout(() => {
                const elementToFocus: HTMLElement = this.eRef.nativeElement.querySelector('#' + elementSelector);
                if (elementToFocus) {
                    elementToFocus.focus();
                }
            }, 0);
        }
    }

    /** Active day means that with tabindex = 0, it's selected day or today or first day */
    public focusActiveDay(): void {
        this.newFocusedDayId = this.getActiveCell(
            this.calendarDayList.filter(cell => cell.monthStatus === 'current')
        ).id;
        this.focusElement(this.newFocusedDayId);
    }

    /** Function that gives array of all displayed CalendarDays */
    public get calendarDayList(): CalendarDay[] {
        return this.dayViewGrid.reduce((totalCalendarRows: CalendarDay[], calendarRow: CalendarDay[]) => {
            if (!calendarRow) {
                calendarRow = [];
            }
            return totalCalendarRows.concat(calendarRow);
        });
    }

    /**
     * Method that selects previous month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     */
    private selectPreviousMonth(): void {
        if (this.currentlyDisplayed.month > 1) {
            this.currentlyDisplayed = { ...this.currentlyDisplayed, month: this.currentlyDisplayed.month - 1 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        }
        this.buildDayViewGrid();
        this.previousMonthSelect.emit();
    }

    /**
     * Method that selects next month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     */
    private selectNextMonth(): void {
        if (this.currentlyDisplayed.month > 1) {
            this.currentlyDisplayed = { ...this.currentlyDisplayed, month: this.currentlyDisplayed.month + 1 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        }
        this.buildDayViewGrid();
        this.nextMonthSelect.emit();
    }

    /**
     * Method that creates array of CalendarDay models which will be shown on day grid,
     * depending on current month and year.
     */
    private populateCalendar(): CalendarDay[] {
        let calendar: CalendarDay[] = [];

        calendar = this.getPreviousMonthDays(calendar);
        calendar = calendar.concat(this.getCurrentMonthDays());
        calendar = this.getNextMonthDays(calendar);

        calendar.forEach((call, index: number) => call.id = this.id + '-fd-day-' + (Math.floor(index / 7) + 1) + '' + (index % 7));

        return calendar;
    }

    /**
     * Method that builds 2 dimensions day view grid, also sets up currently displayed month, or year,
     * when there is not any.
     */
    private buildDayViewGrid(): void {
        if (!this.currentlyDisplayed) {
            if (this.selectedDate) {
                this.currentlyDisplayed = { month: this.selectedDate.month, year: this.selectedDate.year };
            } else {
                this.currentlyDisplayed = { month: FdDate.getToday().month, year: FdDate.getToday().year };
            }
        }

        const calendarDays = this.populateCalendar();
        const dayViewGrid: CalendarDay[][] = [];

        while (calendarDays.length > 0) {
            dayViewGrid.push(calendarDays.splice(0, 7));
        }
        this.dayViewGrid = dayViewGrid;
        return;
    }

    /**
     * Method which provides array of CalendarDay, which contains every single day of currently shown month/year.
     */
    private getCurrentMonthDays(): CalendarDay[] {
        const month = this.currentlyDisplayed.month;
        const year = this.currentlyDisplayed.year;
        const calendarDays: CalendarDay[] = [];
        const amountOfDaysInCurrentMonth: number = CalendarService.getDaysInMonth(month, year);
        for (let dayNumber = 1; dayNumber <= amountOfDaysInCurrentMonth; dayNumber++) {
            const fdDate: FdDate = new FdDate(year, month, dayNumber);
            calendarDays.push({
                ...this.getDay(fdDate),
                monthStatus: 'current',
                today: CalendarService.datesEqual(FdDate.getToday(), fdDate)
            });
        }
        this.getActiveCell(calendarDays).isTabIndexed = true;
        return calendarDays;
    }

    /**
     * Method that returns active cell, which means:
     * if there is any selected day, return selected day
     * if there is no selected day, but there is today day, return today day
     * if there is no today, or selected, return first one
     */
    private getActiveCell(calendarDays: CalendarDay[]): CalendarDay {
        if (calendarDays.find(cell => cell.selected)) {
            return calendarDays.find(cell => cell.selected);
        } else if (calendarDays.find(cell => cell.today)) {
            return calendarDays.find(cell => cell.today);
        } else {
            return calendarDays[0];
        }
    }

    /**
     * Method which provides array of CalendarDay, which contains last 0-6 days of previous month/year. Theses days
     * fills the gap between starting startingDayOfWeek and first day of current month
     */
    private getPreviousMonthDays(calendarDays: CalendarDay[]): CalendarDay[] {
        const month = this.currentlyDisplayed.month > 1 ? this.currentlyDisplayed.month - 1 : 12;
        const year = this.currentlyDisplayed.month > 1 ? this.currentlyDisplayed.year : this.currentlyDisplayed.year - 1;
        const amountOfDaysInCurrentMonth: number = CalendarService.getDaysInMonth(month, year);
        const prevMonthLastDate = new FdDate(year, month, amountOfDaysInCurrentMonth);
        const prevMonthLastDay = amountOfDaysInCurrentMonth;
        let prevMonthLastWeekDay = prevMonthLastDate.getDay() - this.startingDayOfWeek;

        /** Checking if there are some days cut by startingDayOfWeek option
         *  If yes, there is whole week added, to avoid hiding
         */
        if (prevMonthLastWeekDay < 0) {
            prevMonthLastWeekDay = prevMonthLastWeekDay + 7;
        }

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

    /**
     * Method which provides array of CalendarDay, which contains first days of next month/year. Theses days
     * fills the gap between last day of current day and end of 6-weeks calendar grid.
     */
    private getNextMonthDays(calendarDays: CalendarDay[]): CalendarDay[] {
        const month = this.currentlyDisplayed.month < 12 ? this.currentlyDisplayed.month + 1 : 1;
        const year = this.currentlyDisplayed.month < 12 ? this.currentlyDisplayed.year : this.currentlyDisplayed.year + 1;

        // The calendar grid can have 6 (42 days) weeks
        const nextMonthDisplayedDays = 42 - calendarDays.length;

        for (let nextD = 1; nextD <= nextMonthDisplayedDays; nextD++) {
            const fdDate = new FdDate(year, month, nextD);
            calendarDays.push({ ...this.getDay(fdDate), monthStatus: 'next' });
        }
        return calendarDays;
    }

    /**
     * Method that generates whole day model basing on fdDate, disabling functions, block functions, and actually
     * chosen range / single date.
     */
    private getDay(fdDate: FdDate): CalendarDay {
        const day: CalendarDay = {
            date: fdDate,
            weekDay: fdDate.getDay(),
            disabled: this.disableFunction(fdDate),
            blocked: this.blockFunction(fdDate),
            selected: (
                (this.calType === 'single' && CalendarService.datesEqual(fdDate, this.selectedDate)) ||
                (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.start)) ||
                (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.end))
            ),
            selectedFirst: (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.start)),
            selectedLast: (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.end)),
            selectedRange: (this.selectedRangeDate && (
                (this.selectedRangeDate.start && (this.selectedRangeDate.start.getTimeStamp() < fdDate.getTimeStamp())) &&
                (this.selectedRangeDate.end && (this.selectedRangeDate.end.getTimeStamp() > fdDate.getTimeStamp()))
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

    /**
     * Method that returns first letter of every weekday, basing on CalendarI18nDefault. Can be changed by user by
     * providing other class which implements CalendarI18n
     */
    get shortWeekDays(): string[] {
        return this._shortWeekDays;
    }

    /**
     * Method that is called to refresh i18n short week days.
     */
    private refreshShortWeekDays(): void {
        this._shortWeekDays = this.calendarI18n.getAllShortWeekdays()
            .slice(this.startingDayOfWeek - 1)
            .concat(this.calendarI18n.getAllShortWeekdays().slice(0, this.startingDayOfWeek - 1))
            .map(weekday => weekday[0].toLocaleUpperCase());
        this.changeDetRef.markForCheck();
    }
}
