import {
    Component,
    OnInit,
    ViewEncapsulation,
    Output,
    Input,
    EventEmitter,
    ElementRef,
    OnDestroy,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnChanges,
    SimpleChanges,
    Inject
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DateTimeFormats, DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { CalendarService } from '../../calendar.service';
import { CalendarYearGrid, CalendarYear } from '../../models/calendar-year-grid';
import { DefaultActiveCalendarCellStrategy } from '../../models/common';

/** Component representing the YearView of the Calendar Component. */
@Component({
    selector: 'fd-calendar-year-view',
    templateUrl: './calendar-year-view.component.html',
    styleUrls: ['./calendar-year-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'id + "-year-view"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarYearViewComponent<D> implements OnInit, OnChanges, OnDestroy {
    /** Parameter used in id of years used for help with focusing on the correct element during keyboard navigation. */
    @Input()
    id: string;

    /** Function that is called when the focus would escape the element. */
    @Input()
    focusEscapeFunction: (event: KeyboardEvent) => void;

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
     * @hidden
     * This variable is used to define which year from calendarYearList should be focusable by tab key
     */
    activeYear: number;

    /** Parameter that stores the dozen of years that are currently being displayed. */
    calendarYearListGrid: CalendarYear[][];

    /** Parameter storing the year of the present day. */
    currentYear: number;

    /** Parameter storing first shown year on list */
    firstYearInList: number;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _initiated = false;

    /** @hidden */
    constructor(
        private _eRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _calendarService: CalendarService,
        private _dateTimeAdapter: DatetimeAdapter<D>,
        @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {
        // default values
        this.currentYear = _dateTimeAdapter.getYear(_dateTimeAdapter.today());
        this.firstYearInList = this.currentYear;
    }

    /** @hidden */
    ngOnInit(): void {
        this._initiated = true;

        this._setupKeyboardService();
        this.firstYearInList = this.yearSelected;
        this._constructYearGrid();

        this._dateTimeAdapter.localeChanges.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._constructYearGrid();
            this._changeDetectorRef.markForCheck();
        });
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (this._initiated && ('yearViewGrid' in changes || 'yearSelected' in changes || 'id' in changes)) {
            this._constructYearGrid();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Method for handling the keyboard navigation. */
    onKeydownYearHandler(event: KeyboardEvent, index: number): void {
        this._calendarService.onKeydownHandler(event, index);
    }

    /** Method used to load the previous {{col * row}} years to be displayed. */
    loadNextYearList(): void {
        this.firstYearInList += this._getAmountOfYearsShownAtOnce();
        this._constructYearGrid();
    }

    /** Method used to load the next {{col * row}} years to be displayed. */
    loadPreviousYearList(): void {
        this.firstYearInList -= this._getAmountOfYearsShownAtOnce();
        this._constructYearGrid();
    }

    /** Method that allows to focus elements inside this component */
    focusElementBySelector(elementSelector: string): void {
        const elementToFocus: HTMLElement = this._eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus?.focus) {
            elementToFocus.focus();
        }
    }

    /**
     * Set focus on month cell.
     * It can be a selected cell, current month cell or first cell in the list
     */
    setFocusOnCell(): void {
        const cellToFocus = new DefaultActiveCalendarCellStrategy().getActiveCell(this._getYearList());
        if (!cellToFocus?.id) {
            return;
        }
        this.focusElementBySelector(`#${cellToFocus.id}`);
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
     * Standardized method to calculate grid [x][y] to index number of flatten list
     */
    getIndex(rowIndex: number, colIndex: number): number {
        return this._calendarService.getId(rowIndex, colIndex);
    }

    /** Get id of calendar's year item */
    getId(index: number): string {
        return this.id + '-fd-year-' + index;
    }

    /**
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

        const currentYearCell = this._getYearList().find(({ year }) => year === this.currentYear);
        if (currentYearCell) {
            return currentYearCell.year;
        }

        return this.calendarYearListGrid[0][0].year;
    }

    /** @hidden */
    private _constructYearGrid(): void {
        const displayedYearsAmount: number = this.yearViewGrid.cols * this.yearViewGrid.rows;
        const calendarYearList: CalendarYear[] = [];
        this.calendarYearListGrid = [];

        for (let x = 0; x < displayedYearsAmount; ++x) {
            const year = this.firstYearInList + x;
            calendarYearList.push({
                year: year,
                label: this._getYearName(year),
                ariaLabel: this._getAriaYearName(year),
                selected: year === this.yearSelected,
                current: year === this.currentYear,
                index: x
            });
        }
        /** Creating 2d grid */
        while (calendarYearList.length) {
            this.calendarYearListGrid.push(calendarYearList.splice(0, this.yearViewGrid.cols));
        }

        this.activeYear = this._getActiveYear();

        this.calendarYearListGrid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                cell.id = this.getId(this.getIndex(rowIndex, colIndex));
                cell.tabIndex = cell.year === this.activeYear ? 0 : -1;
            });
        });
    }

    /** Returns year name as a string. */
    private _getYearName(year: number): string {
        const formatted = this._dateTimeAdapter.getYearName(this._dateTimeAdapter.createDate(year, 1, 1));
        return this._getYearString(year, formatted);
    }

    /** Returns aria year name as a string. */
    private _getAriaYearName(year: number): string {
        const formatted = this._dateTimeAdapter.format(
            this._dateTimeAdapter.createDate(year, 1, 1),
            this._dateTimeFormats.display.yearA11yLabel
        );
        return this._getYearString(year, formatted);
    }

    /** Returns year name taking into account yearMapping. */
    private _getYearString(year: number, defaultStr: string): string {
        if (typeof this.yearViewGrid.yearMapping === 'function') {
            return this.yearViewGrid.yearMapping(year);
        }
        return defaultStr;
    }

    /** Returns transformed 1d array from 2d year grid. */
    private _getYearList(): CalendarYear[] {
        return [].concat.apply([], this.calendarYearListGrid);
    }

    /** Amount of years displayed in year view */
    private _getAmountOfYearsShownAtOnce(): number {
        return this.yearViewGrid.rows * this.yearViewGrid.cols;
    }

    /** Method to put configuration and listeners on calendar keyboard service */
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

    /** @hidden */
    private _focusOnCellByIndex(index: number): void {
        this.focusElementBySelector(`#${this.getId(index)}`);
    }
}
