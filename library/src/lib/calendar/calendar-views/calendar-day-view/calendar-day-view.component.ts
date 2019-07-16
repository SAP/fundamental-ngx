import {
    AfterViewChecked,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input, OnChanges,
    OnInit,
    Output, SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { CalendarI18n } from '../../i18n/calendar-i18n';
import { FdDate } from '../../models/fd-date';
import { CalendarCurrent } from '../../models/calendar-current';
import { CalendarType, DaysOfWeek } from '../../calendar.component';
import { CalendarDay } from '../../models/calendar-day';
import { CalendarService } from '../../calendar.service';
import { FdRangeDate } from '../../models/fd-range-date';

@Component({
    selector: 'fd-calendar-day-view',
    templateUrl: './calendar-day-view.component.html',
    styleUrls: ['./calendar-day-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarDayViewComponent implements OnInit, AfterViewChecked, OnChanges {

    /** Currently displayed month and year for days */
    @Input()
    public currentlyDisplayed: CalendarCurrent;

    /** @hidden */
    @HostBinding('class.fd-calendar__dates')
    public fdCalendarDateViewClass: boolean = true;

    /** Actual day grid with previous/current/next month days */
    public dayViewGrid: CalendarDay[][];

    /** @hidden */
    public newFocusedDayId: string = '';

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
    public readonly selectedRangeDateChange = new EventEmitter<FdRangeDate>();

    /** Event emitted always, when next month is selected, by focus */
    @Output()
    public readonly nextMonthSelect = new EventEmitter();

    /** Event emitted always, when previous month is selected, by focus */
    @Output()
    public readonly previousMonthSelect = new EventEmitter();

    /** Event emitted always, when model is changed in single mode */
    @Output()
    public readonly selectedDateChange = new EventEmitter<FdDate>();

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

    /** @hidden */
    constructor(
        private calendarI18n: CalendarI18n,
        private eRef: ElementRef
    ) {
    }

    /**
     * Function for selecting a date on the calendar. Typically called when a date is clicked, but can also be called programmatically.
     * @param day CalendarDay object to be selected.
     */
    selectDate(day: CalendarDay, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
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
                    // Check if date picked is lower than already chosen
                    if (this.selectedRangeDate.start.toDate().getTime() < day.date.toDate().getTime()) {
                        this.selectedRangeDate = { start: this.selectedRangeDate.start, end: day.date };
                    } else {
                        this.selectedRangeDate = { start: day.date, end: null };
                    }
                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                    this.buildDayViewGrid();
                }

            }
        }
    }

    /** @hidden */
    ngOnInit() {
        this.buildDayViewGrid();
    }

    /** @hidden */
    get shortWeekDays(): string[] {
        return this.calendarI18n.getAllShortWeekdays()
            .slice(this.startingDayOfWeek - 1)
            .concat(
                this.calendarI18n.getAllShortWeekdays().slice(0, this.startingDayOfWeek - 1
                ))
            .map(weekday => weekday[0].toLocaleUpperCase());
    }

    /** @hidden */
    get selectCounter(): number {
        if (!this.selectedRangeDate || !this.selectedRangeDate.start) {
            return 0;
        } else if (this.selectedRangeDate.start &&
            (!this.selectedRangeDate.end ||
                CalendarService.datesEqual(this.selectedRangeDate.start, this.selectedRangeDate.end)
            )
        ) {
            return 1;
        } else if (this.selectedRangeDate.start && this.selectedRangeDate.end) {
            return 2;
        }
    }

    /** @hidden */
    onKeydownDayHandler(event, cell: CalendarDay, grid: { x: number, y: number }): void {
        if (event.code === 'Tab' && !event.shiftKey) {
            if (this.focusEscapeFunction) {
                event.preventDefault();
                this.focusEscapeFunction();
            }
        } else {
            switch (event.code) {
                case('Space'):
                case('Enter'): {
                    event.preventDefault();
                    this.selectDate(cell);
                    this.newFocusedDayId = cell.id;
                    break;
                }
                case('ArrowUp'): {
                    event.preventDefault();
                    if (grid.y > 0) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y - 1][grid.x].id;
                    } else {
                        this.selectPreviousMonth();
                        this.newFocusedDayId = this.dayViewGrid[this.dayViewGrid.length - 1][grid.x].id;
                    }
                    break;
                }
                case('ArrowDown'): {
                    event.preventDefault();
                    if (grid.y < this.dayViewGrid.length - 1) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y + 1][grid.x].id;
                    } else {
                        this.selectNextMonth();
                        this.newFocusedDayId = this.dayViewGrid[0][grid.x].id;
                    }
                    break;
                }
                case('ArrowLeft'): {
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
                case('ArrowRight'): {
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
    public ngOnChanges(changes: SimpleChanges): void {
        this.buildDayViewGrid();
    }

    /** @hidden */
    ngAfterViewChecked(): void {
        if (this.newFocusedDayId) {
            this.focusElement(this.newFocusedDayId);
            this.newFocusedDayId = null;
        }
    }

    /** @hidden */
    public focusElement(elementSelector): void {
        const elementToFocus = this.eRef.nativeElement.querySelector('#' + elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }

    /** Active day means that with tabindex = 0, it's selected day or today or first day*/
    public focusActiveDay(): void {
        this.newFocusedDayId = this.getActiveCell(
            this.calendarDayList.filter(cell => cell.monthStatus === 'current')
        ).id;
    }

    /** Function that gives array of all displayed CalendarDays  */
    public get calendarDayList(): CalendarDay[] {
        return this.dayViewGrid.reduce((a: CalendarDay[], b: CalendarDay[]) => {
            if (!b) {
                b = [];
            }
            return b.concat(a);
        });
    }

    private selectPreviousMonth(): void {
        if (this.currentlyDisplayed.month > 1) {
            this.currentlyDisplayed = { ...this.currentlyDisplayed, month: this.currentlyDisplayed.month - 1 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        }
        this.buildDayViewGrid();
        this.previousMonthSelect.emit();
    }

    private selectNextMonth(): void {
        if (this.currentlyDisplayed.month > 1) {
            this.currentlyDisplayed = { ...this.currentlyDisplayed, month: this.currentlyDisplayed.month + 1 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        }
        this.buildDayViewGrid();
        this.nextMonthSelect.emit();
    }

    private populateCalendar(): CalendarDay[] {
        let calendar: CalendarDay[] = [];

        calendar = this.getPreviousMonthDays(calendar);
        calendar = calendar.concat(this.getCurrentMonthDays());
        calendar = this.getNextMonthDays(calendar);

        calendar.forEach((call, index: number) => call.id = this.id + '-fd-day-' + (Math.floor(index / 7) + 1) + '' + (index % 7));

        return calendar;
    }

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

    private getDaysInMonth(month: number, year: number): number {
        return CalendarService.getDaysInMonth(month, year);
    }

    private getCurrentMonthDays(): CalendarDay[] {

        const month = this.currentlyDisplayed.month;
        const year = this.currentlyDisplayed.year;
        const calendarDays: CalendarDay[] = [];
        const amountOfDaysInCurrentMonth: number = this.getDaysInMonth(month, year);
        for (let dayNumber = 1; dayNumber <= amountOfDaysInCurrentMonth; dayNumber++) {
            const fdDate: FdDate = new FdDate(year, month, dayNumber);
            calendarDays.push({
                ...this.getDay(fdDate),
                monthStatus: 'current',
                today: fdDate.toDate().toDateString() === FdDate.getToday().toDate().toDateString()
            });
        }
        this.getActiveCell(calendarDays).isTabIndexed = true;
        return calendarDays;
    }

    private getActiveCell(calendarDays: CalendarDay[]): CalendarDay {
        if (calendarDays.find(cell => cell.selected)) {
            return calendarDays.find(cell => cell.selected);
        } else if (calendarDays.find(cell => cell.today)) {
            return calendarDays.find(cell => cell.today);
        } else {
            return calendarDays[0];
        }
    }

    private getPreviousMonthDays(calendarDays: CalendarDay[]): CalendarDay[] {
        const month = this.currentlyDisplayed.month > 1 ? this.currentlyDisplayed.month - 1 : 12;
        const year = this.currentlyDisplayed.month > 1 ? this.currentlyDisplayed.year : this.currentlyDisplayed.year - 1;
        const amountOfDaysInCurrentMonth: number = this.getDaysInMonth(month, year);
        const prevMonthLastDate = new FdDate(year, month, amountOfDaysInCurrentMonth);
        const prevMonthLastDay = amountOfDaysInCurrentMonth;
        let prevMonthLastWeekDay = prevMonthLastDate.toDate().getDay() - this.startingDayOfWeek;

        /** Checking if there are some days cut by startingDayOfWeek option
         *  If yes, there is whole week added, to avoid hiding
         * */
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

    private getNextMonthDays(calendarDays: CalendarDay[]): CalendarDay[] {
        const month = this.currentlyDisplayed.month < 12 ? this.currentlyDisplayed.month + 1 : 0;
        const year = this.currentlyDisplayed.month < 12 ? this.currentlyDisplayed.year : this.currentlyDisplayed.year + 1;

        // The calendar grid can have 6 (42 days) weeks
        const nextMonthDisplayedDays = 42 - calendarDays.length;

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
                (this.calType === 'single' && CalendarService.datesEqual(fdDate, this.selectedDate)) ||
                (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.start)) ||
                (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.end))
            ),
            selectedFirst: (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.start)),
            selectedLast: (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.end)),
            selectedRange: (this.selectedRangeDate && (
                (this.selectedRangeDate.start && (this.selectedRangeDate.start.toDate().getTime() < fdDate.toDate().getTime())) &&
                (this.selectedRangeDate.end && (this.selectedRangeDate.end.toDate().getTime() > fdDate.toDate().getTime()))
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
}
