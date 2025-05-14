import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Inject,
    inject,
    Input,
    input,
    model,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

import { DATE_TIME_FORMATS, DatetimeAdapter, DateTimeFormats } from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import equal from 'fast-deep-equal';

import { CalendarCurrent } from '../../models/calendar-current';
import { ActiveCalendarDayCellStrategy as CalendarActiveDayCellStrategy, CalendarDay } from '../../models/calendar-day';
import { DateRange } from '../../models/date-range';

import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { CalendarLegendFocusingService } from '../../calendar-legend/calendar-legend-focusing.service';
import { CalendarService } from '../../calendar.service';
import { DisableDateFunction, EscapeFocusFunction, FocusableCalendarView } from '../../models/common';
import { CalendarType, CalendarTypeEnum, DaysOfWeek } from '../../types';

/** Component representing the day view of the calendar. */
@Component({
    selector: 'fd-calendar-day-view',
    templateUrl: './calendar-day-view.component.html',
    styleUrl: './calendar-day-view.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'viewId',
        class: 'fd-calendar__dates'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FdTranslatePipe, NgClass]
})
export class CalendarDayViewComponent<D> implements OnInit, OnChanges, FocusableCalendarView {
    /** Currently displayed month and year for days */
    @Input()
    set currentlyDisplayed(currentlyDisplayed: CalendarCurrent) {
        if (!equal(currentlyDisplayed, this._currentlyDisplayed)) {
            this._currentlyDisplayed = currentlyDisplayed;
            this._buildDayViewGrid();
        }
    }

    get currentlyDisplayed(): CalendarCurrent {
        return this._currentlyDisplayed;
    }

    /** The currently selected date model in single mode. */
    @Input()
    set selectedDate(date: Nullable<D>) {
        this._selectedDate = date;
        if (this._dayViewGrid) {
            const dayFromDate = this._calendarDayList.find((day) => this._isSameDay(day.date, date));
            this._changeSelectedSingleDay(dayFromDate, this._calendarDayList);
        }
    }

    get selectedDate(): Nullable<D> {
        return this._selectedDate;
    }

    /** The currently selected date model in multiple mode. */
    @Input()
    set selectedMultipleDates(dates: Array<D>) {
        this._selectedMultipleDates = dates;
        if (dates && this._dayViewGrid) {
            const formattedDates = this._calendarDayList.filter((day) =>
                dates?.some((date) => this._isSameDay(day.date, date))
            );
            this._changeSelectedMultipleDays(formattedDates, this._calendarDayList);
        }
    }

    get selectedMultipleDates(): Nullable<Array<D>> {
        return this._selectedMultipleDates;
    }

    /** The currently selected FdDates model start and end in range mode. */
    @Input()
    set selectedRangeDate(dateRange: DateRange<D>) {
        if (
            dateRange &&
            this.selectedRangeDate &&
            this._isSameDay(dateRange.start, this.selectedRangeDate.start) &&
            this._isSameDay(dateRange.end, this.selectedRangeDate.end)
        ) {
            return;
        }
        this._selectedRangeDate = dateRange;
        if (this._dayViewGrid) {
            this._changeSelectedRangeDays(dateRange, this._calendarDayList);
        }
    }

    get selectedRangeDate(): DateRange<D> {
        return this._selectedRangeDate;
    }

    /** The currently selected FdDates model start and end in multiple range mode. */
    @Input()
    set selectedMultipleDateRanges(dateRanges: Array<DateRange<D>>) {
        if (
            dateRanges &&
            this.selectedMultipleDateRanges &&
            dateRanges.length === this.selectedMultipleDateRanges.length &&
            dateRanges.every(
                (range, index) =>
                    this._isSameDay(range.start, this.selectedMultipleDateRanges[index].start) &&
                    this._isSameDay(range.end, this.selectedMultipleDateRanges[index].end)
            )
        ) {
            return;
        }
        this._selectedMultipleDateRanges = dateRanges || [];
        if (this._dayViewGrid) {
            this._changeSelectedMultipleRangeDays(dateRanges, this._calendarDayList);
        }
    }

    get selectedMultipleDateRanges(): Array<DateRange<D>> {
        return this._selectedMultipleDateRanges;
    }

    /** Event emitted always, when next month is selected, by focus */
    @Output()
    readonly nextMonthSelect: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted always, when previous month is selected, by focus */
    @Output()
    readonly previousMonthSelect: EventEmitter<void> = new EventEmitter<void>();

    /** Event thrown every time selected date in single mode is changed */
    @Output()
    readonly selectedDateChange: EventEmitter<D> = new EventEmitter<D>();

    /** Event thrown every time the selected dates in multiple mode are changed. */
    @Output()
    readonly selectedMultipleDatesChange: EventEmitter<Array<D>> = new EventEmitter<Array<D>>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    readonly selectedRangeDateChange: EventEmitter<DateRange<D>> = new EventEmitter<DateRange<D>>();

    /** Event thrown every time the first or last date in multiple range mode is changed. */
    @Output()
    readonly selectedMultipleDateRangesChange: EventEmitter<Array<DateRange<D>>> = new EventEmitter<
        Array<DateRange<D>>
    >();

    /**
     * Function used to disable certain dates in the calendar.
     * @param date date type
     */
    disableFunction = model<DisableDateFunction<D>>();

    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param date date representation
     */
    disableRangeStartFunction = model<DisableDateFunction<D>>();

    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param date date representation
     */
    disableRangeEndFunction = model<DisableDateFunction<D>>();

    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    startingDayOfWeek = model<DaysOfWeek>();

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    calType = model<CalendarType>(CalendarTypeEnum.Single);

    /** Id of the calendar. If none is provided, one will be generated. */
    id = input<string>();

    /** @hidden Id of the associated legend, passed from the parent calendar component. */
    associatedLegendId = input<string>();

    /**
     * Whether user wants to mark day cells on hover.
     * Works only on range mode, when start date is selected.
     */
    rangeHoverEffect = model(false);

    /**
     * Whether user wants to mark sunday/saturday with `fd-calendar__item--weekend` class
     */
    markWeekends = input(false);

    /**
     * Whether user wants to show week numbers next to days
     */
    showWeekNumbers = input(true);

    /**
     * Whether the user wants to select multiple days or multiple range dates.
     * If `displayWeekNumbers` is true, the user can click on the week number to mark the related row.
     * The user can click on week days to mark the related column.
     * Note: Clickable selection for week row or column does not work for range selections.
     */
    allowMultipleSelection = model(false);

    /** Function that allows to specify which function would be called, when focus wants to escape */
    focusEscapeFunction = input<EscapeFocusFunction>();

    /**
     * Special days mark, it can be used by passing array of object with
     * Special day number, list 1-20 [class:`fd-calendar__item--legend-{{number}}`] is available there:
     * https://sap.github.io/fundamental-styles/components/calendar.html calendar special days section
     * Rule accepts method with date object as a parameter. ex:
     * `rule: (date: D) => this.dateAdapter.getDay(date) === 1`, which will mark all sundays as special day.
     */
    specialDaysRules = input<SpecialDayRule<D>[]>([]);

    /**
     * @hidden
     * Actual day grid with previous/current/next month days
     */
    _dayViewGrid: CalendarDay<D>[][];

    /**
     * @hidden
     * Array of week numbers displayed for current month/year
     */
    _weeks: string[];

    /**
     * @hidden
     * Array of CSS classes for each week day in calendar header, computed based on whether the calendar type is 'multi'
     * and the date is not disabled.
     */
    _weekHeaderClasses: string[] = [];

    /** @hidden */
    private _selectedDate: Nullable<D>;

    /** @hidden */
    private _selectedMultipleDates: Array<D> = [];

    /** @hidden */
    private _selectedRangeDate: DateRange<D>;

    /** @hidden */
    private _selectedMultipleDateRanges: Array<DateRange<D>> = [];

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /**
     * @hidden
     * Days per week
     */
    private readonly _amountOfCols = 7;
    /** @hidden */
    private _isOnRangePick = false;
    /** @hidden */
    private _isInitiated = false;

    /** @hidden */
    private _currentlyDisplayed: CalendarCurrent;

    /**
     * @hidden
     * Variable that contains short weekday names.
     */
    private _shortWeekDays: string[];

    /**
     * @hidden
     * Variable that contains short weekday names.
     */
    private _longWeekDays: string[];

    /**
     * @hidden
     * global variable to store the new range.
     */
    private _newRange: { start: D | null; end: D | null } | null = null;

    /** @hidden */
    constructor(
        private eRef: ElementRef,
        private changeDetRef: ChangeDetectorRef,
        private calendarService: CalendarService,
        private legendFocusedService: CalendarLegendFocusingService,
        @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats,
        public _dateTimeAdapter: DatetimeAdapter<D>
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._isInitiated = true;

        this._setupKeyboardService();

        this._refreshShortWeekDays();

        this._buildDayViewGrid();

        this._computeWeekHeaderClasses();

        this._dateTimeAdapter.localeChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._refreshShortWeekDays();
            this._buildDayViewGrid();
            this.changeDetRef.markForCheck();
        });

        this.legendFocusedService.focusedLegendItemSubject$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(({ legendId, specialDayNumber }) => {
                if (!specialDayNumber) {
                    this._legendBlurred();
                } else if (legendId !== null && specialDayNumber !== null) {
                    this._focusOnLegendsDay(legendId, specialDayNumber);
                }
            });
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        /** Changes of those properties are done inside its setters */
        if (
            !changes['selectedDate'] &&
            !changes['selectedMultipleDates'] &&
            !changes['selectedRangeDate'] &&
            !changes['currentlyDisplayed']
        ) {
            this._buildDayViewGrid();
        }
        if (changes['startingDayOfWeek']) {
            this._refreshShortWeekDays();
        }
        if (changes['specialDaysRules']) {
            this._buildDayViewGrid();
        }
    }

    /**
     * @hidden
     * Selects a date in single mode, toggles selection in multi mode, or sets the range in range mode.
     * Handles the selection of a date based on the calendar type.
     * @param day The calendar day to be selected.
     * @param event Optional mouse event for handling event propagation.
     */
    selectDate(day: CalendarDay<D>, event?: MouseEvent | KeyboardEvent): void {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        if (day.disabled || day.blocked) {
            return;
        }

        if (this.allowMultipleSelection()) {
            if (this.calType() === CalendarTypeEnum.Single) {
                this._toggleMultiDate(day);
            } else if (this.calType() === CalendarTypeEnum.Range) {
                this._selectMultipleRangeDates(day);
            }
        } else {
            if (this.calType() === CalendarTypeEnum.Single) {
                this._selectSingleDate(day);
            } else if (this.calType() === CalendarTypeEnum.Range) {
                this._selectRangeDate(day);
            }
        }

        this._handleRangeHoverEffect(event);
        this.changeDetRef.markForCheck();
    }

    /**
     * Toggles the selection of a week on the calendar.
     * If the provided week is already fully selected, it will deselect it.
     * If the provided week is not fully selected, it will select the entire week and clear any previous selections.
     * @param selectedWeek Array of CalendarDay objects representing the week to be toggled.
     */
    handleWeekSelectionByDays(selectedWeek: Array<CalendarDay<D>>): void {
        this.toggleWeekSelection(selectedWeek);
    }

    /**
     * Toggles the selection of a week on the calendar based on the weekday index.
     * If the provided week is already fully selected, it will deselect it.
     * If the provided week is not fully selected, it will select the entire week and clear any previous selections.
     * @param weekDayIndex The index of the weekday to be toggled.
     */
    handleWeekSelectionByIndex(weekDayIndex: number): void {
        const selectedWeek: Array<CalendarDay<D>> = this._dayViewGrid.map((row) => row[weekDayIndex]);
        this.toggleWeekSelection(selectedWeek);
    }

    /**
     * Set focus on default focusable cell
     */
    setFocusOnCell(): void {
        const cellToFocus = new CalendarActiveDayCellStrategy().getActiveCell(this._calendarDayList);
        if (!cellToFocus?.index && cellToFocus?.index !== 0) {
            return;
        }
        this.focusOnCellByIndex(cellToFocus.index);
    }

    /** @hidden */
    _refreshHoverRange(day: CalendarDay<D>): void {
        if (this.allowMultipleSelection()) {
            this._handleMultiRangeHover(day);
        } else {
            this._handleSingleRangeHover(day);
        }
    }

    /**
     * @hidden
     *  Amount of selected days
     *  0, when there is no day selected, or start date is invalid,
     *  1, when there is only valid start date, or end date is same as start date,
     *  2, when both dates are valid
     */
    get _selectCounter(): number {
        if (!this.selectedRangeDate || !this._dateTimeAdapter.isValid(this.selectedRangeDate.start)) {
            return 0;
        }
        if (
            this.selectedRangeDate.start &&
            (!this._dateTimeAdapter.isValid(this.selectedRangeDate.end) ||
                this._isSameDay(this.selectedRangeDate.start, this.selectedRangeDate.end))
        ) {
            return 1;
        }
        if (
            this._dateTimeAdapter.isValid(this.selectedRangeDate.start) &&
            this._dateTimeAdapter.isValid(this.selectedRangeDate.end)
        ) {
            return 2;
        }
        return 0;
    }

    /**
     * @hidden
     * Total amount of selected days across multiple ranges.
     * Sums the counts of valid days in each date range.
     */
    get _selectMultipleCounter(): number {
        let counter = this._selectedMultipleDateRanges.reduce((count, range) => {
            if (range.start) {
                count++;
            }
            if (range.end) {
                count++;
            }
            return count;
        }, 0);

        // Account for the newRange
        if (this._newRange) {
            if (this._newRange.start) {
                counter++;
            }
            if (this._newRange.end) {
                counter++;
            }
        }

        return counter;
    }

    /**
     * @hidden
     * Method that returns short weekday name.
     * Can be changed by user by providing other class which implements DatetimeAdapter
     */
    get shortWeekDays(): string[] {
        return this._shortWeekDays;
    }

    /**
     * @hidden
     * Method that returns weekday name.
     * Can be changed by user by providing other class which implements DatetimeAdapter
     */
    get longWeekDays(): string[] {
        return this._longWeekDays;
    }

    /**
     * @hidden
     * Function that gives array of all displayed CalendarDays
     */
    get _calendarDayList(): CalendarDay<D>[] {
        return this._dayViewGrid.reduce((totalCalendarRows: CalendarDay<D>[], calendarRow: CalendarDay<D>[]) => {
            if (!calendarRow) {
                calendarRow = [];
            }
            return totalCalendarRows.concat(calendarRow);
        }, []);
    }

    /**
     * View ID
     */
    get viewId(): string {
        return this.id() + '-day-view';
    }

    /**
     * @hidden
     * Week column header ID
     */
    get _weekNumbersColumnHeaderId(): string {
        return this.viewId + '-week-column-header';
    }

    /**
     * @hidden
     * Today cell label ID
     */
    get _todayLabelId(): string {
        return this.viewId + '-today-label';
    }

    /**
     * @hidden
     * Selected date label ID
     */
    get _selectedDateLabelId(): string {
        return this.viewId + '-selected-date-label';
    }

    /**
     * @hidden
     * Date range start date label ID
     */
    get _dateRangeStartLabelId(): string {
        return this.viewId + '-range-start-date-label';
    }

    /**
     * @hidden
     * Date range end date label ID
     */
    get _dateRangeEndLabelId(): string {
        return this.viewId + '-range-end-date-label';
    }

    /**
     * @hidden
     * Date in past label ID
     */
    get _dateInPastLabelId(): string {
        return this.viewId + '-day-in-past-label';
    }

    /**
     * @hidden
     * Method that handles day cells keydown events,
     * @param event KeyboardEvent
     * @param cell CalendarDay
     * @param index with specified column and row as a x and y
     */
    _onKeydownDayHandler(event: KeyboardEvent, cell: CalendarDay<D>, index: number): void {
        if (event.key === 'Tab' && !event.shiftKey) {
            if (this.focusEscapeFunction()) {
                this.focusEscapeFunction()!(event);
            }
        } else {
            this.calendarService.onKeydownHandler(event, index);
        }
    }

    /**
     * @hidden
     *  Method that allow to focus elements inside this component
     */
    _focusElementBySelector(elementSelector: string): void {
        const elementToFocus: HTMLElement = this.eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus?.focus) {
            elementToFocus.focus();
        }
    }

    /**
     * @hidden
     * Standardized method to calculate grid [x][y] to index number of flatten list
     */
    _getIndex(rowIndex: number, colIndex: number): number {
        return this.calendarService.getId(rowIndex, colIndex);
    }

    /**
     * @hidden
     * Method that selects previous month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     */
    private _selectPreviousMonth(): void {
        this._currentlyDisplayed = this._getPreviousMonth();
        this._buildDayViewGrid();
        this.previousMonthSelect.emit();
    }

    /**
     * @hidden
     * Method that selects next month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     */
    private _selectNextMonth(): void {
        this._currentlyDisplayed = this._getNextMonth();
        this._buildDayViewGrid();
        this.nextMonthSelect.emit();
    }

    /** @hidden */
    private _focusOnLegendsDay(legendId: Nullable<string>, specialDayNumber: number): void {
        const associatedLegendId = this.associatedLegendId();

        if (legendId && associatedLegendId && associatedLegendId === legendId) {
            this._dayViewGrid.forEach((row) => {
                row.forEach((day) => {
                    day.shouldHideSpecialDayMarker = day.specialDayNumber !== specialDayNumber;
                });
            });
            this.changeDetRef.markForCheck();
        }
    }

    /** @hidden */
    private _legendBlurred(): void {
        this._dayViewGrid.forEach((row) => {
            row.forEach((day) => {
                day.shouldHideSpecialDayMarker = false;
            });
        });
        this.changeDetRef.markForCheck();
    }

    /**
     * @hidden
     * Method that creates array of CalendarDay models which will be shown on day grid,
     * depending on current month and year.
     */
    private _populateCalendar(): CalendarDay<D>[] {
        let calendar: CalendarDay<D>[] = [];

        calendar = this._getPreviousMonthDays(calendar);
        calendar = calendar.concat(this._getCurrentMonthDays());
        calendar = this._getNextMonthDays(calendar);

        calendar.forEach((call, index: number) => {
            call.id = this._getCellIdByIndex(index);
            call.index = index;
        });

        if (this.allowMultipleSelection()) {
            if (this.calType() === CalendarTypeEnum.Single && this._selectedMultipleDates) {
                const _days = calendar.filter((day) =>
                    this._selectedMultipleDates?.some((date) => this._isSameDay(day.date, date))
                );
                this._changeSelectedMultipleDays(_days, calendar);
            }

            if (this.calType() === CalendarTypeEnum.Range && this._selectedMultipleDateRanges) {
                this._changeSelectedMultipleRangeDays(this._selectedMultipleDateRanges, calendar);
            }
        } else {
            if (this.calType() === CalendarTypeEnum.Single && this._selectedDate) {
                const _day = calendar.find((day) => this._isSameDay(day.date, this._selectedDate));
                this._changeSelectedSingleDay(_day, calendar);
            }

            if (this.calType() === CalendarTypeEnum.Range && this._selectedRangeDate) {
                this._changeSelectedRangeDays(this._selectedRangeDate, calendar);
            }
        }

        return calendar;
    }

    /**
     * @hidden
     * Method that builds 2 dimensions day view grid, also sets up currently displayed month, or year,
     * when there is not any.
     */
    private _buildDayViewGrid(): void {
        if (!this._isInitiated) {
            return;
        }

        if (!this.currentlyDisplayed || this._isInvalidDate()) {
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

        this._dayViewGrid = dayViewGrid;
        this._weeks = this._refreshWeekCount();
    }

    /** @hidden */
    private _isInvalidDate(): boolean {
        return isNaN(this.currentlyDisplayed.year) || isNaN(this.currentlyDisplayed.month);
    }

    /**
     * @hidden
     * Get id of calendar's day item
     */
    private _getCellIdByIndex(index: number): string {
        return this.viewId + '-day-' + index + '';
    }

    /**
     * @hidden
     * Method which provides array of CalendarDay,
     * which contains every single day of currently shown month/year.
     */
    private _getCurrentMonthDays(): CalendarDay<D>[] {
        const month = this.currentlyDisplayed.month;
        const year = this.currentlyDisplayed.year;
        const calendarDays: CalendarDay<D>[] = [];
        const amountOfDaysInCurrentMonth: number = this._dateTimeAdapter.getNumDaysInMonth(
            this._dateTimeAdapter.createDate(year, month, 1)
        );
        const now = this._dateTimeAdapter.now();
        for (let dayNumber = 1; dayNumber <= amountOfDaysInCurrentMonth; dayNumber++) {
            const date: D = this._dateTimeAdapter.createDate(year, month, dayNumber);
            calendarDays.push({
                ...this._getDay(date),
                monthStatus: 'current',
                current: this._isSameDay(now, date)
            });
        }
        const cell = this._getActiveCell(calendarDays);
        cell && (cell.isTabIndexed = true);
        return calendarDays;
    }

    /**
     * @hidden
     * Method that returns active cell, which means:
     * if there is any selected day, return selected day
     * if there is no selected day, but there is today day, return today day
     * if there is no today, or selected, return first one
     */
    private _getActiveCell(calendarDays: CalendarDay<D>[]): CalendarDay<D> | null {
        return new CalendarActiveDayCellStrategy<D>().getActiveCell(calendarDays);
    }

    /**
     * @hidden
     * Method which provides array of CalendarDay,
     * which contains last 0-6 days of previous month/year. Theses days
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
        let prevMonthLastWeekDay = this._dateTimeAdapter.getDayOfWeek(prevMonthLastDate) - this.startingDayOfWeek()!;

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
     * @hidden
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
     * @hidden
     * Method that generates whole day model basing on date, disabling functions, block functions, and actually
     * chosen range / single date.
     */
    private _getDay(date: D): CalendarDay<D> {
        const weekDay = this._dateTimeAdapter.getDayOfWeek(date);
        const dayOfMonth = this._dateTimeAdapter.getDate(date);
        const dateNames = this._dateTimeAdapter.getDateNames();
        const isPast = this._dateTimeAdapter.compareDate(date, this._dateTimeAdapter.today()) < 0;
        const day: CalendarDay<D> = {
            date,
            label: dateNames[dayOfMonth - 1],
            weekDay,
            weekend: this._isWeekendDay(weekDay),
            ariaLabel: this._dateTimeAdapter.format(date, this._dateTimeFormats.display.dateA11yLabel),
            specialDayNumber: this._getSpecialDay(date) ?? undefined,
            past: isPast
        };

        /** Apply disabled state to days marked with passed function */
        if (this.disableFunction()) {
            day.disabled = this.disableFunction()!(date);
        }

        return day;
    }

    /**
     * @hidden
     * Method that is called to refresh i18n short week days.
     */
    private _refreshShortWeekDays(): void {
        const shortDayOfWeekNames = this._dateTimeAdapter.getDayOfWeekNames('short');
        const dayOfWeekNames = this._dateTimeAdapter.getDayOfWeekNames('long');

        this._shortWeekDays = shortDayOfWeekNames
            .slice(this.startingDayOfWeek()! - 1)
            .concat(shortDayOfWeekNames.slice(0, this.startingDayOfWeek()! - 1));

        this._longWeekDays = dayOfWeekNames
            .slice(this.startingDayOfWeek()! - 1)
            .concat(dayOfWeekNames.slice(0, this.startingDayOfWeek()! - 1));

        this.changeDetRef.markForCheck();
    }

    /**
     * @hidden
     * Gets special day number of specified date model
     */
    private _getSpecialDay(date: D): number | null {
        const specialDay = this.specialDaysRules().find((specialDayRule) => specialDayRule.rule(date));
        if (specialDay) {
            return specialDay.specialDayNumber;
        }
        return null;
    }

    /**
     * @hidden
     * Method that returns array of week's count
     */
    private _refreshWeekCount(): string[] {
        const calendarDayList = this._calendarDayList;
        const weekNumbers: string[] = [];
        for (let index = 6; index < calendarDayList.length; index = index + 6) {
            weekNumbers.push(this._dateTimeAdapter.getWeekName(calendarDayList[index].date));
        }
        return weekNumbers;
    }

    /**
     * @hidden
     * Get year and month for previous year
     */
    private _getPreviousMonth(): CalendarCurrent {
        if (this._currentlyDisplayed.month > 1) {
            return { year: this._currentlyDisplayed.year, month: this._currentlyDisplayed.month - 1 };
        } else {
            return { year: this._currentlyDisplayed.year - 1, month: 12 };
        }
    }

    /**
     * @hidden
     * Get year and month for next year
     */
    private _getNextMonth(): CalendarCurrent {
        if (this._currentlyDisplayed.month < 12) {
            return { year: this._currentlyDisplayed.year, month: this._currentlyDisplayed.month + 1 };
        } else {
            return { year: this._currentlyDisplayed.year + 1, month: 1 };
        }
    }

    /**
     * @hidden
     * Method to put configuration and listeners on calendar keyboard service
     */
    private _setupKeyboardService(): void {
        this.calendarService.colAmount = this._amountOfCols;

        this.calendarService.focusEscapeFunction = this.focusEscapeFunction()!;

        this.calendarService.onFocusIdChange.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((index) => {
            this._refreshHoverRange(this._calendarDayList[index]);
            this.focusOnCellByIndex(index);
        });

        this.calendarService.onKeySelect.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(({ index, event }) => {
            this.selectDate(this._calendarDayList[index], event);
        });

        this.calendarService.onListStartApproach.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((index) => {
            this._selectPreviousMonth();
            /**
             * Calculate focused cell in new grid
             */
            const originalMonth = this._getNextMonth(); // month that was before moving back
            const originalAmountOfWeeks = this._dateTimeAdapter.getAmountOfWeeks(
                originalMonth.year,
                originalMonth.month,
                this.startingDayOfWeek()!
            );
            const prevMonthAmountOfWeeks = this._dateTimeAdapter.getAmountOfWeeks(
                this._currentlyDisplayed.year,
                this._currentlyDisplayed.month,
                this.startingDayOfWeek()!
            );
            // trigger rendering for new grid so focus can be set
            this.changeDetRef.detectChanges();
            this.focusOnCellByIndex(index - 7 * (originalAmountOfWeeks - prevMonthAmountOfWeeks));
        });

        this.calendarService.onListEndApproach.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((index) => {
            this._selectNextMonth();
            // trigger rendering for new grid so focus can be set
            this.changeDetRef.detectChanges();
            this.focusOnCellByIndex(index);
        });
    }

    /**
     * @hidden
     * Change selection flag on days to false, besides the selected one
     */
    private _changeSelectedSingleDay(day: Nullable<CalendarDay<D>>, calendar: CalendarDay<D>[]): void {
        calendar.forEach((_day) => (_day.selected = false));
        if (day && !day.blocked && !day.disabled) {
            day.selected = true;
        }
        this.refreshTabIndex(calendar);
    }

    /**
     * @hidden
     * Change selection flag on days to false, besides the selected one
     *
     * @param dates - An array of CalendarDay objects to be marked as selected
     * @param calendar - The calendar array containing all CalendarDay objects
     */
    private _changeSelectedMultipleDays(dates: Nullable<Array<CalendarDay<D>>>, calendar: CalendarDay<D>[]): void {
        calendar.forEach((day) => (day.selected = false));

        if (dates) {
            dates.forEach((date) => {
                const matchingDay = calendar.find((day) => this._isSameDay(day.date, date.date));
                if (matchingDay && !matchingDay.blocked && !matchingDay.disabled) {
                    matchingDay.selected = true;
                }
            });
        }

        this.refreshTabIndex(calendar);
    }

    /**
     * @hidden
     * Change properties of range days, this method is called, to not rebuild whole grid from scratch,
     * it just changes properties of newly selected/unselected days.
     */
    private _changeSelectedRangeDays(dates: DateRange<D>, calendar: CalendarDay<D>[]): void {
        /** Pull list of calendar days */
        const calendarList = calendar;

        /** Reset changing properties */
        calendarList.forEach(
            (_day) =>
                (_day.selectedFirst =
                    _day.selectedLast =
                    _day.selected =
                    _day.isTabIndexed =
                    _day.disabled =
                    _day.hoverRange =
                    _day.selectedRange =
                        false)
        );

        if (dates) {
            let startDay: CalendarDay<D> | undefined;
            let endDay: CalendarDay<D> | undefined;
            if (dates.start) {
                /** Find start date and mark it as selected */
                startDay = calendarList.find((_day) => this._isSameDay(_day.date, dates.start));
                if (
                    startDay &&
                    !startDay.blocked &&
                    !startDay.disabled &&
                    (typeof this.disableRangeStartFunction() !== 'function' ||
                        !this.disableRangeStartFunction()?.(startDay.date))
                ) {
                    startDay.selected = true;
                    startDay.selectedFirst = true;
                }
            }
            if (dates.end) {
                /** Find end date and mark it as selected */
                endDay = calendarList.find((_day) => this._isSameDay(_day.date, dates.end));
                if (
                    endDay &&
                    !endDay.blocked &&
                    !endDay.disabled &&
                    (typeof this.disableRangeEndFunction() !== 'function' ||
                        !this.disableRangeEndFunction()?.(endDay.date))
                ) {
                    endDay.selected = true;
                    endDay.selectedLast = true;
                }
            }

            /** Verify if start day and end day is valid, otherwise don't put range selection */
            if (dates.start && dates.end) {
                /** Mark all days, which are between start and end date */
                calendarList
                    .filter(
                        (_day) =>
                            (_day.selectedRange = this._dateTimeAdapter.isBetween(_day.date, dates.start!, dates.end!))
                    )
                    .forEach((_day) => (_day.selectedRange = true));
            }
        }

        this.refreshTabIndex(calendarList);

        /** Apply disabled state to days marked with passed function */
        if (this.disableFunction()) {
            calendarList.forEach((_day) => (_day.disabled = this.disableFunction()!(_day.date)));
        }

        if ((this._selectCounter === 0 || this._selectCounter === 2) && this.disableRangeStartFunction()) {
            calendarList.forEach(
                (_day) => (_day.disabled = _day.disabled || this.disableRangeStartFunction()!(_day.date))
            );
        } else if (this._selectCounter === 1 && this.disableRangeEndFunction()) {
            calendarList.forEach(
                (_day) => (_day.disabled = _day.disabled || this.disableRangeEndFunction()!(_day.date))
            );
        }
    }

    /**
     * @hidden
     * Change properties of range days for multiple ranges.
     * This method is called to not rebuild the whole grid from scratch.
     * It just changes properties of newly selected/unselected days.
     */
    private _changeSelectedMultipleRangeDays(datesArray: Array<DateRange<D>>, calendar: CalendarDay<D>[]): void {
        // Reset changing properties
        calendar.forEach((_day) => {
            _day.selectedFirst = false;
            _day.selectedLast = false;
            _day.selectedRange = false;
            _day.selected = false;
            _day.isTabIndexed = false;
            _day.disabled = false;
            _day.hoverRange = false;
            _day.disabled = false;
        });

        datesArray.forEach((dates) => {
            if (dates) {
                let startDay: CalendarDay<D> | undefined;
                let endDay: CalendarDay<D> | undefined;
                if (dates.start) {
                    // Find start date and mark it as selected
                    startDay = calendar.find((_day) => this._isSameDay(_day.date, dates.start));
                    if (startDay) {
                        startDay.selectedFirst = true;
                        startDay.selected = true;
                    }
                }
                if (dates.end) {
                    // Find end date and mark it as selected
                    endDay = calendar.find((_day) => this._isSameDay(_day.date, dates.end));
                    if (endDay) {
                        endDay.selectedLast = true;
                        endDay.selected = true;
                    }
                }

                // Mark all days between start and end as selected range
                if (dates.start && dates.end) {
                    calendar.forEach((_day) => {
                        if (this._isDateInRange(_day.date, dates)) {
                            _day.selectedRange = true;
                            _day.selected = true;
                        }
                    });
                }
            }
        });

        this.refreshTabIndex(calendar);

        // Apply disabled state to days marked with passed function
        if (this.disableFunction()) {
            calendar.forEach((_day) => (_day.disabled = this.disableFunction()!(_day.date)));
        }

        if (
            (this._selectMultipleCounter === 0 || this._selectMultipleCounter % 2 === 0) &&
            this.disableRangeStartFunction()
        ) {
            calendar.forEach((_day) => (_day.disabled = _day.disabled || this.disableRangeStartFunction()!(_day.date)));
        } else if (this._selectMultipleCounter % 2 === 1 && this.disableRangeEndFunction()) {
            calendar.forEach((_day) => (_day.disabled = _day.disabled || this.disableRangeEndFunction()!(_day.date)));
        }
    }

    /** @hidden */
    private refreshTabIndex(calendar: CalendarDay<D>[]): void {
        calendar.forEach((_day) => (_day.isTabIndexed = false));
        const cell = this._getActiveCell(calendar.filter((_day) => _day.monthStatus === 'current'));
        cell && (cell.isTabIndexed = true);
    }

    /** @hidden */
    private focusOnCellByIndex(index: number): void {
        this._focusElementBySelector(`#${this._getCellIdByIndex(index)}`);
    }

    /**
     * @hidden
     * Check if dates are equal
     */
    private _isSameDay(date1: Nullable<D>, date2: Nullable<D>): boolean {
        return this._dateTimeAdapter.datesEqual(date1, date2);
    }

    /**
     * @hidden
     * Selects a single date and updates the selected date in single mode.
     * @param day The calendar day to be selected.
     */
    private _selectSingleDate(day: CalendarDay<D>): void {
        this._calendarDayList.forEach((_day) => (_day.selected = false));
        day.selected = true;
        this._selectedDate = day.date;
        this.selectedDateChange.emit(day.date);
    }

    /**
     * @hidden
     * Toggles the selection of a date in multi mode.
     * Adds the date if not selected, removes it if already selected.
     * @param day The calendar day to be toggled.
     */
    private _toggleMultiDate(day: CalendarDay<D>): void {
        const dateIndex = this._selectedMultipleDates.findIndex((d) => this._isSameDay(d, day.date));
        let newSelectedDates: D[];

        if (dateIndex > -1) {
            newSelectedDates = this._selectedMultipleDates.filter((_, index) => index !== dateIndex);
            day.selected = false;
        } else {
            newSelectedDates = [...this._selectedMultipleDates, day.date];
            day.selected = true;
        }

        this._selectedMultipleDates = newSelectedDates;
        this.selectedMultipleDatesChange.emit(this._selectedMultipleDates);
    }

    /**
     * @hidden
     * Selects or updates the range of dates in range mode.
     * Handles the start and end dates and updates the selected range.
     * @param day The calendar day to be selected or updated in the range.
     */
    private _selectRangeDate(day: CalendarDay<D>): void {
        if (this._selectCounter === 0 || this._selectCounter === 2) {
            this._selectedRangeDate = { start: day.date, end: null };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
        } else if (this._selectCounter === 1) {
            this._selectedRangeDate = this._getOrderedRange(this.selectedRangeDate.start!, day.date);
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
        }
        this._changeSelectedRangeDays(this._selectedRangeDate, this._calendarDayList);
    }

    /**
     * @hidden
     * Selects or updates multiple ranges of dates in range mode.
     * Handles the start and end dates and updates the selected ranges.
     * @param day The calendar day to be selected or updated in the range.
     */
    private _selectMultipleRangeDates(day: CalendarDay<D>): void {
        let tempRanges = this._selectedMultipleDateRanges?.filter((range) => range.start || range.end) || [];

        // Handles the existing range by updating or merging it with the new day selection.
        tempRanges = this._handleExistingRange(tempRanges, day);

        if (this._selectMultipleCounter % 2 === 0) {
            // Start a new range
            this._newRange = { start: day.date, end: null };
        } else {
            // Check for reverse selection
            if (
                this._newRange &&
                this._newRange.start &&
                this._dateTimeAdapter.compareDate(this._newRange.start, day.date) > 0
            ) {
                this._newRange = { start: day.date, end: this._newRange.start };
            } else if (this._newRange) {
                this._newRange.end = day.date as D;
            }
            if (this._newRange) {
                tempRanges.push(this._newRange);
            }
            this._newRange = null;
        }

        tempRanges = this._mergeOverlappingRanges(tempRanges);

        this._selectedMultipleDateRanges = tempRanges;

        // Check if all ranges have both start and end dates filled
        const allRangesComplete = this._selectedMultipleDateRanges.every((range) => range.start && range.end);

        if (allRangesComplete && tempRanges.length > 0) {
            this.selectedMultipleDateRangesChange.emit(this._selectedMultipleDateRanges);
        }

        // Update the calendar view
        this._changeSelectedMultipleRangeDays(this._selectedMultipleDateRanges, this._calendarDayList);
    }

    /**
     * Merges overlapping date ranges into a single range.
     *
     * @param ranges - An array of date ranges to be merged.
     * @returns An array of merged date ranges.
     */
    private _mergeOverlappingRanges(ranges: Array<DateRange<D>>): Array<DateRange<D>> {
        if (ranges.length <= 1) {
            return ranges;
        }

        ranges.sort((a, b) => this._dateTimeAdapter.compareDate(a.start!, b.start!));

        const mergedRanges: Array<DateRange<D>> = [];
        let currentRange = ranges[0];

        for (let i = 1; i < ranges.length; i++) {
            const nextRange = ranges[i];

            if (this._dateTimeAdapter.compareDate(currentRange.end!, nextRange.start!) >= 0) {
                currentRange = {
                    start: currentRange.start,
                    end:
                        this._dateTimeAdapter.compareDate(currentRange.end!, nextRange.end!) >= 0
                            ? currentRange.end
                            : nextRange.end
                };
            } else {
                mergedRanges.push(currentRange);
                currentRange = nextRange;
            }
        }

        mergedRanges.push(currentRange);
        return mergedRanges;
    }

    /**
     * Handles the case where the selected day is part of an existing range.
     *
     * @param tempRanges - An array of date ranges to be checked.
     * @param day - The calendar day to be checked.
     * @returns An array of date ranges with the updated range if the selected day is part of an existing range.
     */
    private _handleExistingRange(tempRanges: DateRange<D>[], day: CalendarDay<D>): DateRange<D>[] {
        if (tempRanges.length > 0) {
            const existingRangeIndex = tempRanges.findIndex((range) => this._isDateInRange(day.date, range));
            const existingRange = tempRanges[existingRangeIndex];

            if (existingRangeIndex !== -1 && existingRange.end) {
                tempRanges.splice(existingRangeIndex, 1);
            }
        }
        return tempRanges;
    }

    /**
     * @hidden
     * Checks if a date is within a given date range.
     * @param date The date to check.
     * @param range The date range.
     * @returns True if the date is in the range, false otherwise.
     */
    private _isDateInRange(date: D, range: DateRange<D>): boolean {
        return this._dateTimeAdapter.isBetween(date, range.start!, range.end!);
    }

    /**
     * @hidden
     * Orders the start and end dates for the range selection.
     * Ensures the start date is before or equal to the end date.
     * @param date1 The first date.
     * @param date2 The second date.
     * @returns An object containing the ordered start and end dates.
     */
    private _getOrderedRange(date1: D, date2: D): { start: D; end: D } {
        return this._dateTimeAdapter.compareDate(date1, date2) < 0
            ? { start: date1, end: date2 }
            : { start: date2, end: date1 };
    }

    /**
     * @hidden
     * Handles the hover effect for range selection.
     * Toggles the hover effect based on the selection state and event.
     * @param event Optional mouse event for handling hover effect.
     */
    private _handleRangeHoverEffect(event?: MouseEvent | KeyboardEvent): void {
        if (this.allowMultipleSelection()) {
            if (
                this.calType() === CalendarTypeEnum.Range &&
                this.rangeHoverEffect() &&
                this._selectMultipleCounter === 1 &&
                event
            ) {
                this._isOnRangePick = !this._isOnRangePick;
            } else {
                this._isOnRangePick = false;
            }
        } else {
            if (
                this.calType() === CalendarTypeEnum.Range &&
                this.rangeHoverEffect() &&
                this._selectCounter === 1 &&
                event
            ) {
                this._isOnRangePick = !this._isOnRangePick;
            } else {
                this._isOnRangePick = false;
            }
        }
    }

    /**
     * Helper method to toggle the selection of a week.
     * @param selectedWeek Array of CalendarDay objects representing the week to be toggled.
     */
    private toggleWeekSelection(selectedWeek: Array<CalendarDay<D>>): void {
        const selectableDays = selectedWeek.filter((day) => !day.disabled);
        const isCurrentWeekSelected = selectableDays.every((day) => day.selected);

        if (!isCurrentWeekSelected) {
            selectedWeek.forEach((day) => {
                if (!day.disabled) {
                    day.selected = true;
                    if (!this._selectedMultipleDates.some((selectedDate) => this._isSameDay(selectedDate, day.date))) {
                        this._selectedMultipleDates.push(day.date);
                    }
                }
            });
        } else {
            selectedWeek.forEach((day) => {
                if (!day.disabled) {
                    day.selected = false;
                    this._selectedMultipleDates = this._selectedMultipleDates.filter(
                        (selectedDate) => !this._isSameDay(selectedDate, day.date)
                    );
                }
            });
        }

        this.selectedMultipleDatesChange.emit(this._selectedMultipleDates);
    }

    /**
     * @hidden
     * Computes the CSS class for each week day in calendar header based on whether the calendar type is 'multi'
     * and the date is not disabled.
     * Stores the computed classes in the weekHeaderClasses array.
     */
    private _computeWeekHeaderClasses(): void {
        this._weekHeaderClasses = this._calendarDayList.map(() =>
            this.calType() !== CalendarTypeEnum.Range && this.allowMultipleSelection()! && this.disableFunction()!
                ? 'event-enabled'
                : ''
        );
    }

    /**
     * @hidden
     * Handles hover effect for single-range selection mode.
     * @param day The calendar day that is hovered.
     */
    private _handleSingleRangeHover(day: CalendarDay<D>): void {
        // Handle single range hover
        const start = this.selectedRangeDate?.start;
        if (this._isOnRangePick && start) {
            if (this._dateTimeAdapter.compareDate(day.date, start) < 0) {
                this._calendarDayList.forEach((_day) => {
                    _day.hoverRange =
                        this._dateTimeAdapter.compareDate(_day.date, day.date) > 0 &&
                        this._dateTimeAdapter.compareDate(_day.date, start) < 0;
                });
            } else {
                this._calendarDayList.forEach((_day) => {
                    _day.hoverRange =
                        this._dateTimeAdapter.compareDate(_day.date, day.date) < 0 &&
                        this._dateTimeAdapter.compareDate(_day.date, start) > 0;
                });
            }
        }
    }

    /**
     * @hidden
     * Handles hover effect for multi-range selection mode.
     * @param day The calendar day that is hovered.
     */
    private _handleMultiRangeHover(day: CalendarDay<D>): void {
        // Determine the start date from the most recent range with a null end date
        let startDate: D | null | any = this._newRange?.start;
        if (this._selectedMultipleDateRanges.length > 0) {
            // Find the most recent range with an end date of null
            const activeRanges = this._selectedMultipleDateRanges.filter((range) => range.end === null);
            if (activeRanges.length > 0) {
                const mostRecentRange = activeRanges[activeRanges.length - 1];
                startDate = mostRecentRange.start;
            }
        }
        if (startDate && startDate) {
            if (this._dateTimeAdapter.compareDate(day.date, startDate) < 0) {
                // Hovering backwards from the start date to the selected date
                this._calendarDayList.forEach((_day) => {
                    _day.hoverRange =
                        this._dateTimeAdapter.compareDate(_day.date, day.date) > 0 &&
                        this._dateTimeAdapter.compareDate(_day.date, startDate) < 0;
                });
            } else {
                // Hovering forwards from the start date to the selected date
                this._calendarDayList.forEach((_day) => {
                    _day.hoverRange =
                        this._dateTimeAdapter.compareDate(_day.date, day.date) < 0 &&
                        this._dateTimeAdapter.compareDate(_day.date, startDate) > 0;
                });
            }
        } else {
            // No start date, clear hover
            this._calendarDayList.forEach((_day) => {
                _day.hoverRange = false;
            });
        }
    }
}
