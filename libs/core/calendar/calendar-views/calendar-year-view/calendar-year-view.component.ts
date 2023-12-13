import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DATE_TIME_FORMATS, DateTimeFormats, DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { CalendarService } from '../../calendar.service';
import { CalendarYear, CalendarYearGrid } from '../../models/calendar-year-grid';
import { DefaultCalendarActiveCellStrategy, EscapeFocusFunction, FocusableCalendarView } from '../../models/common';

/** Component representing the YearView of the Calendar Component. */
@Component({
    selector: 'fd-calendar-year-view',
    templateUrl: './calendar-year-view.component.html',
    styleUrl: './calendar-year-view.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'viewId'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ButtonComponent, FdTranslatePipe]
})
export class CalendarYearViewComponent<D> implements OnInit, OnChanges, OnDestroy, FocusableCalendarView {
    /** The id of the calendar passed from the parent component */
    @Input()
    id: string;

    /** Function that is called when the focus would escape the element. */
    @Input()
    focusEscapeFunction: EscapeFocusFunction;

    /** Parameter holding the year that is currently selected. */
    @Input()
    yearSelected: number;

    /**
     * Object to customize year grid
     */
    @Input()
    yearViewGrid: CalendarYearGrid;

    /** Event fired when a year is selected. */
    @Output()
    readonly yearClicked: EventEmitter<number> = new EventEmitter<number>();

    /**
     * @ignore
     * This variable is used to define which year from calendarYearList should be focusable by tab key
     */
    _activeYear: number;

    /**
     * @ignore
     * Parameter that stores the dozen of years that are currently being displayed.
     */
    _calendarYearListGrid: CalendarYear[][];

    /**
     * @ignore
     * Parameter storing the year of the present day.
     */
    _currentYear: number;

    /**
     * @ignore
     * Parameter storing first shown year on list
     */
    _firstYearInList: number;

    /** View ID */
    get viewId(): string {
        return this.id + '-year-view';
    }

    /**
     * @ignore
     * Today cell label ID
     */
    get _todayLabelId(): string {
        return this.viewId + '-today-label';
    }

    /**
     * @ignore
     * Selected date label ID
     */
    get _selectedDateLabelId(): string {
        return this.viewId + '-selected-date-label';
    }

    /**
     * @ignore
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @ignore */
    private _initiated = false;

    /** @ignore */
    constructor(
        private _eRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _calendarService: CalendarService,
        private _dateTimeAdapter: DatetimeAdapter<D>,
        @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {
        // default values
        this._currentYear = _dateTimeAdapter.getYear(_dateTimeAdapter.today());
        this._firstYearInList = this._currentYear;
    }

    /** @ignore */
    ngOnInit(): void {
        this._initiated = true;

        this._setupKeyboardService();
        this._firstYearInList = this.yearSelected;
        this._constructYearGrid();

        this._dateTimeAdapter.localeChanges.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._constructYearGrid();
            this._changeDetectorRef.markForCheck();
        });
    }

    /** @ignore */
    ngOnChanges(changes: SimpleChanges): void {
        if (this._initiated && ('yearViewGrid' in changes || 'yearSelected' in changes || 'id' in changes)) {
            this._constructYearGrid();
        }
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Method used to load the previous {{col * row}} years to be displayed. */
    loadNextYearList(): void {
        this._firstYearInList += this._getAmountOfYearsShownAtOnce();
        this._constructYearGrid();
    }

    /** Method used to load the next {{col * row}} years to be displayed. */
    loadPreviousYearList(): void {
        this._firstYearInList -= this._getAmountOfYearsShownAtOnce();
        this._constructYearGrid();
    }

    /** Method that sends the year to the parent component when it is clicked. */
    selectYear(selectedYear: CalendarYear, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear.year;
        this.yearClicked.emit(this.yearSelected);
    }

    /**
     * Set focus on month cell.
     * It can be a selected cell, current month cell or first cell in the list
     */
    setFocusOnCell(): void {
        const cellToFocus = new DefaultCalendarActiveCellStrategy().getActiveCell(this._getYearList());
        if (!cellToFocus?.id) {
            return;
        }
        this._focusElementBySelector(`#${cellToFocus.id}`);
    }

    /**
     * @ignore
     * Method for handling the keyboard navigation.
     */
    _onKeydownYearHandler(event: KeyboardEvent, index: number): void {
        this._calendarService.onKeydownHandler(event, index);
    }

    /**
     * @ignore
     * Method that allows to focus elements inside this component
     */
    _focusElementBySelector(elementSelector: string): void {
        const elementToFocus: HTMLElement = this._eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus?.focus) {
            elementToFocus.focus();
        }
    }

    /**
     * @ignore
     * Standardized method to calculate grid [x][y] to index number of flatten list
     */
    _getIndex(rowIndex: number, colIndex: number): number {
        return this._calendarService.getId(rowIndex, colIndex);
    }

    /**
     * @ignore
     * Get grid cell id be index
     * @param index
     */
    _getId(index: number): string {
        return this.viewId + '-year-' + index;
    }

    /**
     * @ignore
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     */
    private _getActiveYear(): number {
        const selectedYearCell = this._getYearList().find(({ year }) => year === this.yearSelected);
        if (selectedYearCell) {
            return selectedYearCell.year;
        }

        const currentYearCell = this._getYearList().find(({ year }) => year === this._currentYear);
        if (currentYearCell) {
            return currentYearCell.year;
        }

        return this._calendarYearListGrid[0][0].year;
    }

    /** @ignore */
    private _constructYearGrid(): void {
        const displayedYearsAmount: number = this.yearViewGrid.cols * this.yearViewGrid.rows;
        const calendarYearList: CalendarYear[] = [];
        this._calendarYearListGrid = [];

        for (let x = 0; x < displayedYearsAmount; ++x) {
            const year = this._firstYearInList + x;
            calendarYearList.push({
                year,
                label: this._getYearName(year),
                ariaLabel: this._getAriaYearName(year),
                selected: year === this.yearSelected,
                current: year === this._currentYear,
                index: x
            });
        }
        /** Creating 2d grid */
        while (calendarYearList.length) {
            this._calendarYearListGrid.push(calendarYearList.splice(0, this.yearViewGrid.cols));
        }

        this._activeYear = this._getActiveYear();

        this._calendarYearListGrid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                cell.id = this._getId(this._getIndex(rowIndex, colIndex));
                cell.tabIndex = cell.year === this._activeYear ? 0 : -1;
            });
        });

        this._changeDetectorRef.markForCheck();
    }

    /**
     * @ignore
     * Returns year name as a string.
     */
    private _getYearName(year: number): string {
        const formatted = this._dateTimeAdapter.getYearName(this._dateTimeAdapter.createDate(year, 1, 1));
        return this._getYearString(year, formatted);
    }

    /**
     * @ignore
     * Returns aria year name as a string.
     */
    private _getAriaYearName(year: number): string {
        const formatted = this._dateTimeAdapter.format(
            this._dateTimeAdapter.createDate(year, 1, 1),
            this._dateTimeFormats.display.yearA11yLabel
        );
        return this._getYearString(year, formatted);
    }

    /**
     * @ignore
     * Returns year name taking into account yearMapping.
     */
    private _getYearString(year: number, defaultStr: string): string {
        if (typeof this.yearViewGrid.yearMapping === 'function') {
            return this.yearViewGrid.yearMapping(year);
        }
        return defaultStr;
    }

    /**
     * @ignore
     * Returns transformed 1d array from 2d year grid.
     */
    private _getYearList(): CalendarYear[] {
        return (<CalendarYear[]>[]).concat(...this._calendarYearListGrid);
    }

    /**
     * @ignore
     * Amount of years displayed in year view
     */
    private _getAmountOfYearsShownAtOnce(): number {
        return this.yearViewGrid.rows * this.yearViewGrid.cols;
    }

    /**
     * @ignore
     * Method to put configuration and listeners on calendar keyboard service
     */
    private _setupKeyboardService(): void {
        this._calendarService.colAmount = this.yearViewGrid.cols;
        this._calendarService.rowAmount = this.yearViewGrid.rows;
        this._calendarService.focusEscapeFunction = this.focusEscapeFunction;

        this._calendarService.onFocusIdChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((index) => this._focusOnCellByIndex(index));

        this._calendarService.onKeySelect
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((index) => this.selectYear(this._getYearList()[index]));

        this._calendarService.onListStartApproach.pipe(takeUntil(this._onDestroy$)).subscribe((index) => {
            this.loadPreviousYearList();
            this._changeDetectorRef.detectChanges();
            this._focusOnCellByIndex(index);
        });

        this._calendarService.onListEndApproach.pipe(takeUntil(this._onDestroy$)).subscribe((index) => {
            this.loadNextYearList();
            this._changeDetectorRef.detectChanges();
            this._focusOnCellByIndex(index);
        });
    }

    /** @ignore */
    private _focusOnCellByIndex(index: number): void {
        this._focusElementBySelector(`#${this._getId(index)}`);
    }
}
