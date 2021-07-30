import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation,
    Inject
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DATE_TIME_FORMATS, DateTimeFormats } from '@fundamental-ngx/core/datetime';

import { DateRange } from '../../models/date-range';
import { CalendarCurrent } from '../../models/calendar-current';
import { CalendarDay } from '../../models/calendar-day';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';

import { CalendarType, DaysOfWeek } from '../../calendar.component';
import { CalendarService } from '../../calendar.service';
import { compareObjects } from '@fundamental-ngx/core/utils';

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
export class CalendarDayViewComponent<D> implements OnInit, OnChanges, OnDestroy {
    private readonly _amountOfCols: number = 7; // Days per week
    private _isOnRangePick = false;
    private _isInitiated = false;

    /** @hidden */
    newFocusedDayIndex: number;

    /** Actual day grid with previous/current/next month days */
    dayViewGrid: CalendarDay<D>[][];

    /** Array of week numbers displayed for current month/year */
    weeks: string[];

    /** @hidden */
    @HostBinding('class.fd-calendar__dates')
    fdCalendarDateViewClass = true;

    /** Currently displayed month and year for days */
    @Input()
    set currentlyDisplayed(currentlyDisplayed: CalendarCurrent) {
        if (!compareObjects(currentlyDisplayed, this._currentlyDisplayed)) {
            this._currentlyDisplayed = currentlyDisplayed;
            this._buildDayViewGrid();
        }
    }

    get currentlyDisplayed(): CalendarCurrent {
        return this._currentlyDisplayed;
    }

    private _currentlyDisplayed: CalendarCurrent;

    /** The currently selected date model in single mode. */
    @Input()
    set selectedDate(date: D) {
        this._selectedDate = date;
        if (this.dayViewGrid) {
            const dayFromDate: CalendarDay<D> = this.calendarDayList.find((day) =>
                this._dateTimeAdapter.datesEqual(day.date, date)
            );
            this._changeSelectedSingleDay(dayFromDate, this.calendarDayList);
        }
    }

    get selectedDate(): D {
        return this._selectedDate;
    }

    private _selectedDate: D;

    /** The currently selected FdDates model start and end in range mode. */
    @Input()
    set selectedRangeDate(dateRange: DateRange<D>) {
        if (
            dateRange &&
            this.selectedRangeDate &&
            this._dateTimeAdapter.datesEqual(dateRange.start, this.selectedRangeDate.start) &&
            this._dateTimeAdapter.datesEqual(dateRange.end, this.selectedRangeDate.end)
        ) {
            return;
        }
        this._selectedRangeDate = dateRange;
        if (this.dayViewGrid) {
            this._changeSelectedRangeDays(dateRange, this.calendarDayList);
        }
    }

    get selectedRangeDate(): DateRange<D> {
        return this._selectedRangeDate;
    }

    private _selectedRangeDate: DateRange<D>;

    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    @Input()
    startingDayOfWeek: DaysOfWeek;

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    calType: CalendarType = 'single';

    /** Id of the calendar. If none is provided, one will be generated. */
    @Input()
    id: string;

    /**
     * Whether user wants to mark day cells on hover.
     * Works only on range mode, when start date is selected.
     */
    @Input()
    rangeHoverEffect = false;

    /**
     * Whether user wants to mark sunday/saturday with `fd-calendar__item--weekend` class
     */
    @Input()
    markWeekends = false;

    /**
     * Whether user wants to show week numbers next to days
     */
    @Input()
    showWeekNumbers = true;

    /** Function that allows to specify which function would be called, when focus wants to escape */
    @Input()
    focusEscapeFunction: () => void;

    /**
     * Special days mark, it can be used by passing array of object with
     * Special day number, list 1-20 [class:`fd-calendar__special-day--{{number}}`] is available there:
     * https://sap.github.io/fundamental-styles/components/calendar.html calendar special days section
     * Rule accepts method with date object as a parameter. ex:
     * `rule: (date: D) => this.dateAdapter.getDay(date) === 1`, which will mark all sundays as special day.
     */
    @Input()
    specialDaysRules: SpecialDayRule<D>[] = [];

    /** Event emitted always, when model is changed in range mode */
    @Output()
    readonly selectedRangeDateChange: EventEmitter<DateRange<D>> = new EventEmitter<DateRange<D>>();

    /** Event emitted always, when next month is selected, by focus */
    @Output()
    readonly nextMonthSelect: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted always, when previous month is selected, by focus */
    @Output()
    readonly previousMonthSelect: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted always, when model is changed in single mode */
    @Output()
    readonly selectedDateChange: EventEmitter<D> = new EventEmitter<D>();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /**
     * Variable that contains short weekday names.
     */
    private _shortWeekDays: string[];

    /**
     * Function used to disable certain dates in the calendar.
     * @param date date type
     */
    @Input()
    disableFunction = function (date: D): boolean {
        return false;
    };

    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param date date representation
     */
    @Input()
    disableRangeStartFunction = function (date: D): boolean {
        return false;
    };

    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param date date representation
     */
    @Input()
    disableRangeEndFunction = function (date: D): boolean {
        return false;
    };

    /** @hidden */
    constructor(
        private eRef: ElementRef,
        private changeDetRef: ChangeDetectorRef,
        private calendarService: CalendarService,
        @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats,
        public _dateTimeAdapter: DatetimeAdapter<D>
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._isInitiated = true;

        this._setupKeyboardService();

        this._refreshShortWeekDays();
        this._buildDayViewGrid();

        this._dateTimeAdapter.localeChanges.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._refreshShortWeekDays();
            this._buildDayViewGrid();
            this.changeDetRef.markForCheck();
        });
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        /** Changes of those properties are done inside its setters */
        if (!changes['selectedDate'] && !changes['selectedRangeDate'] && !changes['currentlyDisplayed']) {
            this._buildDayViewGrid();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * Function for selecting a date on the calendar. Typically called when a date is clicked, but can also be called programmatically.
     * @param day CalendarDay object to be selected.
     */
    selectDate(day: CalendarDay<D>, event?: MouseEvent): void {
        if (event) {
            /**
             * There are some problems with popup integration. After clicking inside day component, the popover closes.
             */
            event.stopPropagation();
            event.preventDefault();
        }
        this.newFocusedDayIndex = null;
        if (!day.disabled && !day.blocked) {
            if (this.calType === 'single') {
                /** Remove selections from other day and put selection to chosen day */
                this.calendarDayList.forEach((_day) => (_day.selected = false));
                day.selected = true;
                this._selectedDate = day.date;
                this.selectedDateChange.emit(day.date);
            } else {
                if (this.selectCounter === 0 || this.selectCounter === 2) {
                    this._selectedRangeDate = { start: day.date, end: null };
                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                } else if (this.selectCounter === 1) {
                    // Check if date picked is higher than already chosen, otherwise just reverse them
                    if (this._dateTimeAdapter.compareDate(this.selectedRangeDate.start, day.date) < 0) {
                        this._selectedRangeDate = {
                            start: this.selectedRangeDate.start,
                            end: day.date
                        };
                    } else {
                        this._selectedRangeDate = {
                            start: day.date,
                            end: this.selectedRangeDate.start
                        };
                    }
                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                }
                this._changeSelectedRangeDays(this._selectedRangeDate, this.calendarDayList);
            }
        }

        if (this.calType === 'range' && this.rangeHoverEffect && this.selectCounter === 1 && event) {
            this._isOnRangePick = !this._isOnRangePick;
        } else {
            this._isOnRangePick = false;
        }
        this.changeDetRef.markForCheck();
    }

    /** @hidden */
    refreshHoverRange(day: CalendarDay<D>): void {
        if (this._isOnRangePick) {
            if (this._dateTimeAdapter.compareDate(day.date, this.selectedRangeDate.start) < 0) {
                this.calendarDayList.forEach((_day) => {
                    _day.hoverRange =
                        this._dateTimeAdapter.compareDate(_day.date, day.date) > 0 &&
                        this._dateTimeAdapter.compareDate(_day.date, this.selectedRangeDate.start) < 0;
                });
            } else {
                this.calendarDayList.forEach((_day) => {
                    _day.hoverRange =
                        this._dateTimeAdapter.compareDate(_day.date, day.date) < 0 &&
                        this._dateTimeAdapter.compareDate(_day.date, this.selectedRangeDate.start) > 0;
                });
            }
        }
    }

    /** @hidden
     *  Amount of selected days
     *  0, when there is no day selected, or start date is invalid,
     *  1, when there is only valid start date, or end date is same as start date,
     *  2, when both dates are valid
     */
    get selectCounter(): number {
        if (!this.selectedRangeDate || !this._dateTimeAdapter.isValid(this.selectedRangeDate.start)) {
            return 0;
        }
        if (
            this.selectedRangeDate.start &&
            (!this._dateTimeAdapter.isValid(this.selectedRangeDate.end) ||
                this._dateTimeAdapter.datesEqual(this.selectedRangeDate.start, this.selectedRangeDate.end))
        ) {
            return 1;
        }
        if (
            this._dateTimeAdapter.isValid(this.selectedRangeDate.start) &&
            this._dateTimeAdapter.isValid(this.selectedRangeDate.end)
        ) {
            return 2;
        }
    }

    /**
     * Method that returns short weekday name.
     * Can be changed by user by providing other class which implements DatetimeAdapter
     */
    get shortWeekDays(): string[] {
        return this._shortWeekDays;
    }

    /** Function that gives array of all displayed CalendarDays */
    get calendarDayList(): CalendarDay<D>[] {
        return this.dayViewGrid.reduce((totalCalendarRows: CalendarDay<D>[], calendarRow: CalendarDay<D>[]) => {
            if (!calendarRow) {
                calendarRow = [];
            }
            return totalCalendarRows.concat(calendarRow);
        });
    }

    /**
     * @hidden
     * Method that handles day cells keydown events,
     * @param event KeyboardEvent
     * @param cell CalendarDay
     * @param grid with specified column and row as a x and y
     */
    onKeydownDayHandler(event: KeyboardEvent, cell: CalendarDay<D>, index: number): void {
        if (event.key === 'Tab' && !event.shiftKey) {
            if (this.focusEscapeFunction) {
                event.preventDefault();
                this.focusEscapeFunction();
            }
        } else {
            this.calendarService.onKeydownHandler(event, index);
        }
    }

    /** @hidden
     *  Method that allow to focus elements inside this component
     */
    focusActiveElement(): void {
        if (this.newFocusedDayIndex || this.newFocusedDayIndex === 0) {
            const elementToFocus: HTMLElement = this.eRef.nativeElement.querySelector(
                '#' + this._getId(this.newFocusedDayIndex)
            );
            this.newFocusedDayIndex = null;
            if (elementToFocus) {
                elementToFocus.focus();
            }
        }
    }

    /** Active day means that with tabindex = 0, it's selected day or today or first day */
    focusActiveDay(): void {
        this.newFocusedDayIndex = this._getActiveCell(
            this.calendarDayList.filter((cell) => cell.monthStatus === 'current')
        ).index;
        this.focusActiveElement();
    }

    /**
     * Standardized method to calculate grid [x][y] to index number of flatten list
     */
    getIndex(rowIndex: number, colIndex: number): number {
        return this.calendarService.getId(rowIndex, colIndex);
    }

    /**
     * Method that selects previous month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     */
    private _selectPreviousMonth(): void {
        const prevMonth = this._getPreviousMonth();
        this.newFocusedDayIndex -=
            (this._dateTimeAdapter.getAmountOfWeeks(
                this._currentlyDisplayed.year,
                this._currentlyDisplayed.month,
                this.startingDayOfWeek
            ) -
                this._dateTimeAdapter.getAmountOfWeeks(prevMonth.year, prevMonth.month, this.startingDayOfWeek)) *
            7;
        this._currentlyDisplayed = prevMonth;
        this._buildDayViewGrid();
        this.previousMonthSelect.emit();
    }

    /**
     * Method that selects next month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     */
    private _selectNextMonth(): void {
        this._currentlyDisplayed = this._getNextMonth();
        this._buildDayViewGrid();
        this.nextMonthSelect.emit();
    }

    /**
     * Method that creates array of CalendarDay models which will be shown on day grid,
     * depending on current month and year.
     */
    private _populateCalendar(): CalendarDay<D>[] {
        let calendar: CalendarDay<D>[] = [];

        calendar = this._getPreviousMonthDays(calendar);
        calendar = calendar.concat(this._getCurrentMonthDays());
        calendar = this._getNextMonthDays(calendar);

        calendar.forEach((call, index: number) => {
            call.id = this._getId(index);
            call.index = index;
        });

        if (this.calType === 'single' && this._selectedDate) {
            const _day: CalendarDay<D> = calendar.find((day) =>
                this._dateTimeAdapter.datesEqual(day.date, this._selectedDate)
            );
            this._changeSelectedSingleDay(_day, calendar);
        }

        if (this.calType === 'range' && this._selectedRangeDate) {
            this._changeSelectedRangeDays(this._selectedRangeDate, calendar);
        }

        return calendar;
    }

    /**
     * Method that builds 2 dimensions day view grid, also sets up currently displayed month, or year,
     * when there is not any.
     */
    private _buildDayViewGrid(): void {
        if (!this._isInitiated) {
            return;
        }

        if (!this.currentlyDisplayed) {
            if (this.selectedDate) {
                this._currentlyDisplayed = {
                    month: this._dateTimeAdapter.getMonth(this.selectedDate),
                    year: this._dateTimeAdapter.getYear(this.selectedDate)
                };
            } else {
                const today = this._dateTimeAdapter.today();
                this._currentlyDisplayed = {
                    month: this._dateTimeAdapter.getMonth(today),
                    year: this._dateTimeAdapter.getYear(today)
                };
            }
        }

        const calendarDays = this._populateCalendar();
        const dayViewGrid: CalendarDay<D>[][] = [];

        while (calendarDays.length > 0) {
            dayViewGrid.push(calendarDays.splice(0, this._amountOfCols));
        }

        this.calendarService.rowAmount = dayViewGrid.length;

        this.dayViewGrid = dayViewGrid;
        this.weeks = this._refreshWeekCount();
        this.changeDetRef.detectChanges();
        this.focusActiveElement();
        return;
    }

    /** Get id of calendar's day item */
    private _getId(index: number): string {
        return this.id + '-fd-day-' + index + '';
    }

    /**
     * Method which provides array of CalendarDay, which contains every single day of currently shown month/year.
     */
    private _getCurrentMonthDays(): CalendarDay<D>[] {
        const month = this.currentlyDisplayed.month;
        const year = this.currentlyDisplayed.year;
        const calendarDays: CalendarDay<D>[] = [];
        const amountOfDaysInCurrentMonth: number = this._dateTimeAdapter.getNumDaysInMonth(
            this._dateTimeAdapter.createDate(year, month, 1)
        );
        for (let dayNumber = 1; dayNumber <= amountOfDaysInCurrentMonth; dayNumber++) {
            const date: D = this._dateTimeAdapter.createDate(year, month, dayNumber);
            calendarDays.push({
                ...this._getDay(date),
                monthStatus: 'current',
                today: this._dateTimeAdapter.datesEqual(this._dateTimeAdapter.today(), date)
            });
        }
        this._getActiveCell(calendarDays).isTabIndexed = true;
        return calendarDays;
    }

    /**
     * Method that returns active cell, which means:
     * if there is any selected day, return selected day
     * if there is no selected day, but there is today day, return today day
     * if there is no today, or selected, return first one
     */
    private _getActiveCell(calendarDays: CalendarDay<D>[]): CalendarDay<D> {
        if (calendarDays.find((cell) => cell.selected)) {
            return calendarDays.find((cell) => cell.selected);
        } else if (calendarDays.find((cell) => cell.today)) {
            return calendarDays.find((cell) => cell.today);
        } else {
            return calendarDays[0];
        }
    }

    /**
     * Method which provides array of CalendarDay, which contains last 0-6 days of previous month/year. Theses days
     * fills the gap between starting startingDayOfWeek and first day of current month
     */
    private _getPreviousMonthDays(calendarDays: CalendarDay<D>[]): CalendarDay<D>[] {
        const month = this.currentlyDisplayed.month > 1 ? this.currentlyDisplayed.month - 1 : 12;
        const year =
            this.currentlyDisplayed.month > 1 ? this.currentlyDisplayed.year : this.currentlyDisplayed.year - 1;
        const amountOfDaysInCurrentMonth: number = this._dateTimeAdapter.getNumDaysInMonth(
            this._dateTimeAdapter.createDate(year, month, 1)
        );
        const prevMonthLastDate = this._dateTimeAdapter.createDate(year, month, amountOfDaysInCurrentMonth);
        const prevMonthLastDay = amountOfDaysInCurrentMonth;
        let prevMonthLastWeekDay = this._dateTimeAdapter.getDayOfWeek(prevMonthLastDate) - this.startingDayOfWeek;

        /** Checking if there are some days cut by startingDayOfWeek option
         *  If yes, there is whole week added, to avoid hiding
         */
        if (prevMonthLastWeekDay < 0) {
            prevMonthLastWeekDay = prevMonthLastWeekDay + 7;
        }

        if (prevMonthLastWeekDay < 6) {
            while (prevMonthLastWeekDay >= 0) {
                const prevMonthDay = prevMonthLastDay - prevMonthLastWeekDay;
                const date = this._dateTimeAdapter.createDate(year, month, prevMonthDay);
                calendarDays.push({ ...this._getDay(date), monthStatus: 'previous' });
                prevMonthLastWeekDay--;
            }
        }
        return calendarDays;
    }

    /**
     * Method which provides array of CalendarDay, which contains first days of next month/year. Theses days
     * fills the gap between last day of current day and end of 6-weeks calendar grid.
     */
    private _getNextMonthDays(calendarDays: CalendarDay<D>[]): CalendarDay<D>[] {
        const month = this.currentlyDisplayed.month < 12 ? this.currentlyDisplayed.month + 1 : 1;
        const year =
            this.currentlyDisplayed.month < 12 ? this.currentlyDisplayed.year : this.currentlyDisplayed.year + 1;

        // The calendar grid can have 5 (35 days) or 6 (42 days) weeks
        const nextMonthDisplayedDays = (42 - calendarDays.length) % 7;

        for (let nextD = 1; nextD <= nextMonthDisplayedDays; nextD++) {
            const date = this._dateTimeAdapter.createDate(year, month, nextD);
            calendarDays.push({ ...this._getDay(date), monthStatus: 'next' });
        }
        return calendarDays;
    }

    /** @hidden */
    private _isWeekendDay(dayOfWeek: number): boolean {
        return dayOfWeek === 1 || dayOfWeek === 7;
    }

    /**
     * Method that generates whole day model basing on date, disabling functions, block functions, and actually
     * chosen range / single date.
     */
    private _getDay(date: D): CalendarDay<D> {
        const weekDay = this._dateTimeAdapter.getDayOfWeek(date);
        const dayOfMonth = this._dateTimeAdapter.getDate(date);
        const dateNames = this._dateTimeAdapter.getDateNames();
        const day: CalendarDay<D> = {
            date: date,
            label: dateNames[dayOfMonth - 1],
            weekDay: weekDay,
            weekend: this._isWeekendDay(weekDay),
            ariaLabel: this._dateTimeAdapter.format(date, this._dateTimeFormats.display.dateA11yLabel),
            specialNumber: this._getSpecialDay(date)
        };

        /** Apply disabled state to days marked with passed function */
        if (this.disableFunction) {
            day.disabled = this.disableFunction(date);
        }

        return day;
    }

    /**
     * Method that is called to refresh i18n short week days.
     */
    private _refreshShortWeekDays(): void {
        const shortDayOfWeekNames = this._dateTimeAdapter.getDayOfWeekNames('short');

        this._shortWeekDays = shortDayOfWeekNames
            .slice(this.startingDayOfWeek - 1)
            .concat(shortDayOfWeekNames.slice(0, this.startingDayOfWeek - 1));

        this.changeDetRef.markForCheck();
    }

    /** Gets special day number of specified date model */
    private _getSpecialDay(date: D): number | null {
        const specialDay = this.specialDaysRules.find((specialDayRule) => specialDayRule.rule(date));
        if (specialDay) {
            return specialDay.specialDayNumber;
        }
        return null;
    }

    /** Method that returns array of week's count */
    private _refreshWeekCount(): string[] {
        const calendarDayList = this.calendarDayList;
        const weekNumbers: string[] = [];
        for (let index = 6; index < calendarDayList.length; index = index + 6) {
            weekNumbers.push(this._dateTimeAdapter.getWeekName(calendarDayList[index].date));
        }
        return weekNumbers;
    }

    /** Get year and month for previous year */
    private _getPreviousMonth(): CalendarCurrent {
        if (this._currentlyDisplayed.month > 1) {
            return { year: this._currentlyDisplayed.year, month: this._currentlyDisplayed.month - 1 };
        } else {
            return { year: this._currentlyDisplayed.year - 1, month: 12 };
        }
    }

    /** Get year and month for next year */
    private _getNextMonth(): CalendarCurrent {
        if (this._currentlyDisplayed.month < 12) {
            return { year: this._currentlyDisplayed.year, month: this._currentlyDisplayed.month + 1 };
        } else {
            return { year: this._currentlyDisplayed.year + 1, month: 1 };
        }
    }

    /** Method to put configuration and listeners on calendar keyboard service */
    private _setupKeyboardService(): void {
        this.calendarService.colAmount = this._amountOfCols;

        this.calendarService.onFocusIdChange.pipe(takeUntil(this._onDestroy$)).subscribe((index) => {
            this.newFocusedDayIndex = index;
            this.focusActiveElement();
        });
        this.calendarService.focusEscapeFunction = this.focusEscapeFunction;

        this.calendarService.onKeySelect.pipe(takeUntil(this._onDestroy$)).subscribe((index) => {
            this.newFocusedDayIndex = index;
            this.selectDate(this.calendarDayList[index]);
        });

        this.calendarService.onListStartApproach.pipe(takeUntil(this._onDestroy$)).subscribe((index) => {
            this.newFocusedDayIndex = index;
            this._selectPreviousMonth();
        });

        this.calendarService.onListEndApproach.pipe(takeUntil(this._onDestroy$)).subscribe((index) => {
            this.newFocusedDayIndex = index;
            this._selectNextMonth();
        });
    }

    /** Change selection flag on days to false, besides the selected one */
    private _changeSelectedSingleDay(day: CalendarDay<D>, calendar: CalendarDay<D>[]): void {
        calendar.forEach((_day) => (_day.selected = false));
        if (day && !day.blocked && !day.disabled) {
            day.selected = true;
        }
        this.refreshTabIndex(calendar);
    }

    /**
     * Change properties of range days, this method is called, to not rebuild whole grid from scratch,
     * it just changes properties of newly selected/unselected days.
     */
    private _changeSelectedRangeDays(dates: DateRange<D>, calendar: CalendarDay<D>[]): void {
        /** Pull list of calendar days */
        const calendarList = calendar;

        /** Reset changing properties */
        calendarList.forEach(
            (_day) => (_day.selected = _day.isTabIndexed = _day.disabled = _day.hoverRange = _day.selectedRange = false)
        );

        if (dates) {
            let startDay: CalendarDay<D>;
            let endDay: CalendarDay<D>;
            if (dates.start) {
                /** Find start date and mark it as selected */
                startDay = calendarList.find((_day) => this._dateTimeAdapter.datesEqual(_day.date, dates.start));
                if (
                    startDay &&
                    !startDay.blocked &&
                    !startDay.disabled &&
                    !this.disableRangeStartFunction(startDay.date)
                ) {
                    startDay.selected = true;
                }
            }
            if (dates.end) {
                /** Find end date and mark it as selected */
                endDay = calendarList.find((_day) => this._dateTimeAdapter.datesEqual(_day.date, dates.end));
                if (endDay && !endDay.blocked && !endDay.disabled && !this.disableRangeEndFunction(endDay.date)) {
                    endDay.selected = true;
                }
            }

            /** Verify if start day and end day is valid, otherwise don't put range selection */
            if (dates.start && dates.end) {
                /** Mark all days, which are between start and end date */
                calendarList
                    .filter(
                        (_day) =>
                            (_day.selectedRange = this._dateTimeAdapter.isBetween(_day.date, dates.start, dates.end))
                    )
                    .forEach((_day) => (_day.selectedRange = true));
            }
        }

        this.refreshTabIndex(calendarList);

        /** Apply disabled state to days marked with passed function */
        if (this.disableFunction) {
            calendarList.forEach((_day) => (_day.disabled = this.disableFunction(_day.date)));
        }

        if ((this.selectCounter === 0 || this.selectCounter === 2) && this.disableRangeStartFunction) {
            calendarList.forEach(
                (_day) => (_day.disabled = _day.disabled || this.disableRangeStartFunction(_day.date))
            );
        } else if (this.selectCounter === 1 && this.disableRangeEndFunction) {
            calendarList.forEach((_day) => (_day.disabled = _day.disabled || this.disableRangeEndFunction(_day.date)));
        }
    }

    private refreshTabIndex(calendar: CalendarDay<D>[]): void {
        calendar.forEach((_day) => (_day.isTabIndexed = false));
        this._getActiveCell(calendar.filter((_day) => _day.monthStatus === 'current')).isTabIndexed = true;
    }
}
