import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation,
    inject
} from '@angular/core';

import { DATE_TIME_FORMATS, DateTimeFormats, DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { CalendarService } from '../../calendar.service';
import { CalendarMonth } from '../../models/calendar-month';
import { DefaultCalendarActiveCellStrategy, EscapeFocusFunction, FocusableCalendarView } from '../../models/common';
import { DateRange } from '../../models/date-range';

/** Component representing the month view of the calendar. */
@Component({
    selector: 'fd-calendar-month-view',
    templateUrl: './calendar-month-view.component.html',
    styleUrl: './calendar-month-view.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'viewId'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, FdTranslatePipe]
})
export class CalendarMonthViewComponent<D> implements OnInit, OnChanges, FocusableCalendarView {
    /** The id of the calendar passed from the parent component */
    @Input()
    id: string;

    /** A number (1-12) representing the selected month */
    @Input()
    monthSelected: number;

    /** A function that handles escape focus */
    @Input()
    focusEscapeFunction: EscapeFocusFunction;

    /** A year the month view is referring to */
    @Input()
    year: number;

    /** Whether to pick the date range in month year format without picking days */
    @Input()
    isDateRangeMonthYearFormat: boolean;

    /** An event fired when a new month is selected */
    @Output()
    readonly monthClicked: EventEmitter<number> = new EventEmitter<number>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    readonly selectedRangeDateChange: EventEmitter<DateRange<D>> = new EventEmitter<DateRange<D>>();

    /**
     * Whether user wants to mark month cells on hover.
     * Works only on range mode, when start month is selected.
     */
    @Input()
    rangeHoverEffect = false;

    /**
     * @hidden
     * Month grid table
     */
    _calendarMonthListGrid: CalendarMonth<D>[][];

    /**
     * @hidden
     * A number offset used to achieve the 1-12 representation of the calendar
     */
    private readonly _monthOffset: number = 1;
    /** @hidden */
    private readonly _amountOfColPerRow: number = 3;
    /** @hidden */
    private readonly _amountOfRows: number = 4;

    /**
     * @hidden
     */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _initiated = false;

    /** @hidden */
    private _selectedRangeDate: DateRange<D>;

    private _isOnRangePick = false;

    /** @hidden */
    constructor(
        private _eRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _calendarService: CalendarService,
        @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats,
        private _dateTimeAdapter: DatetimeAdapter<D>
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._initiated = true;
        this._setupKeyboardService();
        this._constructMonthGrid();

        this._dateTimeAdapter.localeChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._constructMonthGrid();
            this._changeDetectorRef.markForCheck();
        });
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (this._initiated && ('monthSelected' in changes || 'year' in changes || 'id' in changes)) {
            this._constructMonthGrid();
        }
    }

    /** Get a number (1-12) representing the current month  */
    get currentMonth(): number {
        return this._dateTimeAdapter.getMonth(this._dateTimeAdapter.today());
    }

    /**  Getter for the private class member _monthOffset */
    get monthOffset(): number {
        return this._monthOffset;
    }

    /** View ID */
    get viewId(): string {
        return this.id + '-month-view';
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

    /** The currently selected FdDates model start and end in range mode. */
    @Input()
    set selectedRangeDate(dateRange: DateRange<D>) {
        if (
            dateRange &&
            this.selectedRangeDate &&
            this._isSameDate(dateRange.start, this.selectedRangeDate.start) &&
            this._isSameDate(dateRange.end, this.selectedRangeDate.end)
        ) {
            return;
        }
        this._selectedRangeDate = dateRange;
        if (this._calendarMonthListGrid) {
            this._changeSelectedRangeMonths(dateRange, this._getMonthList());
        }
    }

    get selectedRangeDate(): DateRange<D> {
        return this._selectedRangeDate;
    }

    /**
     * @hidden
     *  Amount of selected months
     *  0, when there is no month selected, or start month is invalid,
     *  1, when there is only valid start month, or end month is same as start month,
     *  2, when both dates are valid
     */
    get _selectCounter(): number {
        if (!this.selectedRangeDate || !this._dateTimeAdapter.isValid(this.selectedRangeDate.start)) {
            return 0;
        }
        if (
            this.selectedRangeDate.start &&
            (!this._dateTimeAdapter.isValid(this.selectedRangeDate.end) ||
                this._isSameDate(this.selectedRangeDate.start, this.selectedRangeDate.end))
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
     * Method for handling the keyboard events (a11y)
     */
    _onKeydownMonthHandler(event: KeyboardEvent, index: number): void {
        this._calendarService.onKeydownHandler(event, index);
    }

    /**
     * @hidden
     * Method that allows to focus elements inside this component
     */
    _focusElementBySelector(elementSelector: string): void {
        const elementToFocus: HTMLElement = this._eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus?.focus) {
            elementToFocus.focus();
        }
    }

    /**
     * @hidden
     * Method returning id of month cell
     */
    _getIndex(rowIndex: number, colIndex: number): number {
        return this._calendarService.getId(rowIndex, colIndex);
    }

    /**
     * @hidden
     * @param index month grid cell index
     */
    _getId(index: number): string {
        return this.viewId + '-month-' + index;
    }

    /**
     * @hidden
     * Method that checks if this is current month
     */
    _isCurrent(id: number): boolean {
        return id + this._monthOffset === this.currentMonth;
    }

    /**
     * @hidden
     * Method that check if this is selected month
     */
    _isSelected(id: number): boolean {
        return id + this._monthOffset === this.monthSelected;
    }

    /** Method for handling the mouse click event when a month is selected  */
    selectMonth(monthCell: CalendarMonth<D>, event?: MouseEvent | KeyboardEvent): void {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.monthSelected = monthCell.month;
        this.monthClicked.emit(this.monthSelected);

        // when date range start date is selected start the hover effect between the date range
        if (this.isDateRangeMonthYearFormat) {
            this._selectRangeDate(monthCell);
            this._handleRangeHoverEffect(event);
        }
    }

    /**
     * Set focus on month cell.
     * It can be a selected cell, current month cell or first cell in the list
     */
    setFocusOnCell(): void {
        const cellToFocus = new DefaultCalendarActiveCellStrategy().getActiveCell(this._getMonthList());
        if (!cellToFocus?.id) {
            return;
        }
        this._focusElementBySelector(`#${cellToFocus.id}`);
    }

    /**
     * @hidden
     * Handles hover effect for range selection mode.
     * @param month The calendar month that is hovered.
     */
    _handleRangeHover(month: CalendarMonth<D>): void {
        // Handle range hover
        const start = this.selectedRangeDate?.start;
        if (this._isOnRangePick && start) {
            if (this._dateTimeAdapter.compareDate(month.date, start) < 0) {
                this._getMonthList().forEach((_month) => {
                    _month.hoverRange =
                        this._dateTimeAdapter.compareDate(_month.date, month.date) > 0 &&
                        this._dateTimeAdapter.compareDate(_month.date, start) < 0;
                });
            } else {
                this._getMonthList().forEach((_month) => {
                    _month.hoverRange =
                        this._dateTimeAdapter.compareDate(_month.date, month.date) < 0 &&
                        this._dateTimeAdapter.compareDate(_month.date, start) > 0;
                });
            }
        }
    }

    /**
     * @hidden
     * Handles the hover effect for range selection.
     * Toggles the hover effect based on the selection state and event.
     * @param event Optional mouse event for handling hover effect.
     */
    private _handleRangeHoverEffect(event?: MouseEvent | KeyboardEvent): void {
        if (this.isDateRangeMonthYearFormat && this.rangeHoverEffect && this._selectCounter === 1 && event) {
            this._isOnRangePick = !this._isOnRangePick;
        } else {
            this._isOnRangePick = false;
        }
    }

    /**
     * @hidden
     * Selects or updates the range of dates in range mode.
     * Handles the start and end dates and updates the selected range.
     * @param month The calendar month to be selected or updated in the range.
     */
    private _selectRangeDate(month: CalendarMonth<D>): void {
        if (this._selectCounter === 0 || this._selectCounter === 2) {
            this._selectedRangeDate = { start: month.date, end: null };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
        } else if (this._selectCounter === 1) {
            this._selectedRangeDate = this._getOrderedRange(this.selectedRangeDate.start!, month.date);
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
        }
        this._changeSelectedRangeMonths(this._selectedRangeDate, this._getMonthList());
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
     * Change properties of range months, this method is called, to not rebuild whole grid from scratch,
     * it just changes properties of newly selected/unselected months.
     */
    private _changeSelectedRangeMonths(dates: DateRange<D>, calendar: CalendarMonth<D>[]): void {
        /** Pull list of calendar month */
        const calendarList = calendar;

        /** Reset changing properties */
        calendarList.forEach(
            (_month) =>
                (_month.selectedFirst =
                    _month.selectedLast =
                    _month.selected =
                    _month.disabled =
                    _month.hoverRange =
                    _month.selectedRange =
                        false)
        );

        if (dates) {
            let startMonth: CalendarMonth<D> | undefined;
            let endMonth: CalendarMonth<D> | undefined;
            if (dates.start) {
                /** Find start month and mark it as selected */
                startMonth = calendarList.find((_month) => this._isSameDate(_month.date, dates.start));
                if (startMonth) {
                    startMonth.selected = true;
                    startMonth.selectedFirst = true;
                }
            }
            if (dates.end) {
                /** Find end month and mark it as selected */
                endMonth = calendarList.find((_month) => this._isSameDate(_month.date, dates.end));
                if (endMonth) {
                    endMonth.selected = true;
                    endMonth.selectedLast = true;
                }
            }

            /** Verify if start month and end month is valid, otherwise don't put range selection */
            if (dates.start && dates.end) {
                /** Mark all months, which are between start and end date */
                calendarList
                    .filter(
                        (_month) =>
                            (_month.selectedRange = this._dateTimeAdapter.isBetween(
                                _month.date,
                                dates.start!,
                                dates.end!
                            ))
                    )
                    .forEach((_month) => (_month.selectedRange = true));
            }
        }
    }

    /**
     * @hidden
     * Check if dates are equal
     */
    private _isSameDate(date1: Nullable<D>, date2: Nullable<D>): boolean {
        return this._dateTimeAdapter.datesEqual(date1, date2);
    }

    /**
     * @hidden
     * Method that create month grid with required meta data
     */
    private _constructMonthGrid(): void {
        const monthNames: string[] = this.isDateRangeMonthYearFormat
            ? this._dateTimeAdapter.getMonthNames('long')
            : this._dateTimeAdapter.getMonthNames('short');

        const monthList: CalendarMonth<D>[] = monthNames.map((monthName, index): CalendarMonth<D> => {
            const month = index + this.monthOffset;
            return {
                date: this._dateTimeAdapter.createDate(this.year, month),
                month,
                label: monthName,
                ariaLabel: this._dateTimeAdapter.format(
                    this._dateTimeAdapter.createDate(this.year, month, 1),
                    this._dateTimeFormats.display.monthA11yLabel
                ),
                index,
                selected: month === this.monthSelected,
                current: month === this.currentMonth,
                tabIndex: month === this.monthSelected ? 0 : -1
            };
        });

        // if the date range is selected
        if (this.isDateRangeMonthYearFormat) {
            this._changeSelectedRangeMonths(this._selectedRangeDate, monthList);
        }

        this._calendarMonthListGrid = [];
        /** Creating 2d grid */
        while (monthList.length) {
            this._calendarMonthListGrid.push(monthList.splice(0, this._amountOfColPerRow));
        }

        this._calendarMonthListGrid.forEach((row, rowIndex) => {
            row.forEach((monthCell, colIndex) => {
                monthCell.id = this._getId(this._getIndex(rowIndex, colIndex));
            });
        });

        this._changeDetectorRef.markForCheck();
    }

    /**
     * @hidden
     * Method to put configuration and listeners on calendar keyboard service
     */
    private _setupKeyboardService(): void {
        this._calendarService.rowAmount = this._amountOfRows;
        this._calendarService.colAmount = this._amountOfColPerRow;
        this._calendarService.focusEscapeFunction = this.focusEscapeFunction;

        this._calendarService.onFocusIdChange.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((index) => {
            this._handleRangeHover(this._getMonthList()[index]);
            this._focusOnCellByIndex(index);
        });

        this._calendarService.onKeySelect
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(({ index, event }) => this.selectMonth(this._getMonthList()[index], event));
    }

    /**
     * @hidden
     * Returns transformed 1d array from 2d month grid.
     */
    private _getMonthList(): CalendarMonth<D>[] {
        return (<CalendarMonth<D>[]>[]).concat(...this._calendarMonthListGrid);
    }

    /** @hidden */
    private _focusOnCellByIndex(index: number): void {
        this._focusElementBySelector(`#${this._getId(index)}`);
    }
}
