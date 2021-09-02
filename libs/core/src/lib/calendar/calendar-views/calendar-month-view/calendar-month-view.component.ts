import {
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    ElementRef,
    OnInit,
    OnDestroy,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Inject,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DateTimeFormats, DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { CalendarService } from '../../calendar.service';
import { CalendarMonth } from '../../models/calendar-month';
import { AbstractActiveCalendarCellStrategy, DefaultActiveCalendarCellStrategy } from '../../models/common';

/** Component representing the month view of the calendar. */
@Component({
    selector: 'fd-calendar-month-view',
    templateUrl: './calendar-month-view.component.html',
    styleUrls: ['./calendar-month-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'id + "-month-view"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarMonthViewComponent<D> implements OnInit, OnDestroy, OnChanges {
    /** The id of the calendar passed from the parent component */
    @Input()
    id: string;

    /** A number (1-12) representing the selected month */
    @Input()
    monthSelected: number;

    /** A function that handles escape focus */
    @Input()
    focusEscapeFunction: (event: KeyboardEvent) => void;

    /** A year the month view is referring to */
    @Input()
    year: number;

    /** An event fired when a new month is selected */
    @Output()
    readonly monthClicked: EventEmitter<number> = new EventEmitter<number>();

    /** Month grid table */
    calendarMonthListGrid: CalendarMonth[][];

    /** A number offset used to achieve the 1-12 representation of the calendar */
    private readonly _monthOffset: number = 1;

    private readonly _amountOfColPerRow: number = 3;
    private readonly _amountOfRows: number = 4;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _initiated = false;

    /** @hidden */
    private _activeCellStrategy: AbstractActiveCalendarCellStrategy<CalendarMonth> = new DefaultActiveCalendarCellStrategy();

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

        this._dateTimeAdapter.localeChanges.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
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

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Get a number (1-12) representing the current month  */
    get currentMonth(): number {
        return this._dateTimeAdapter.getMonth(this._dateTimeAdapter.today());
    }

    /**  Getter for the private class member _monthOffset */
    get monthOffset(): number {
        return this._monthOffset;
    }

    /** Method for handling the mouse click event when a month is selected  */
    selectMonth(monthCell: CalendarMonth, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.monthSelected = monthCell.month;
        this.monthClicked.emit(this.monthSelected);
    }

    /** Method for handling the keyboard events (a11y) */
    onKeydownMonthHandler(event: KeyboardEvent, index: number): void {
        this._calendarService.onKeydownHandler(event, index);
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
        const cellToFocus = new DefaultActiveCalendarCellStrategy().getActiveCell(this._getMonthList());
        if (!cellToFocus?.id) {
            return;
        }
        this.focusElementBySelector(`#${cellToFocus.id}`);
    }

    /** Method returning id of month cell */
    getIndex(rowIndex: number, colIndex: number): number {
        return this._calendarService.getId(rowIndex, colIndex);
    }

    /** Get id of calendar's month item */
    getId(index: number): string {
        return this.id + '-fd-month-' + index;
    }

    /** Method that checks if this is current month */
    isCurrent(id: number): boolean {
        return id + this._monthOffset === this.currentMonth;
    }

    /** Method that check if this is selected month */
    isSelected(id: number): boolean {
        return id + this._monthOffset === this.monthSelected;
    }

    /** Method that create month grid with required meta data */
    private _constructMonthGrid(): void {
        const monthNames: string[] = this._dateTimeAdapter.getMonthNames('short');

        const monthList: CalendarMonth[] = monthNames.map(
            (monthName, index): CalendarMonth => {
                const month = index + this.monthOffset;
                return {
                    month: month,
                    label: monthName,
                    ariaLabel: this._dateTimeAdapter.format(
                        this._dateTimeAdapter.createDate(this.year, month, 1),
                        this._dateTimeFormats.display.monthA11yLabel
                    ),
                    index: index,
                    selected: month === this.monthSelected,
                    current: month === this.currentMonth,
                    tabIndex: month === this.monthSelected ? 0 : -1
                };
            }
        );

        this.calendarMonthListGrid = [];
        /** Creating 2d grid */
        while (monthList.length) {
            this.calendarMonthListGrid.push(monthList.splice(0, this._amountOfColPerRow));
        }

        this.calendarMonthListGrid.forEach((row, rowIndex) => {
            row.forEach((monthCell, colIndex) => {
                monthCell.id = this.getId(this.getIndex(rowIndex, colIndex));
            });
        });

        this._changeDetectorRef.markForCheck();
    }

    /** Method to put configuration and listeners on calendar keyboard service */
    private _setupKeyboardService(): void {
        this._calendarService.rowAmount = this._amountOfRows;
        this._calendarService.colAmount = this._amountOfColPerRow;
        this._calendarService.focusEscapeFunction = this.focusEscapeFunction;

        this._calendarService.onFocusIdChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((index) => this._focusOnCellByIndex(index));

        this._calendarService.onKeySelect
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((index) => this.selectMonth(this._getMonthList()[index]));
    }

    /** Returns transformed 1d array from 2d month grid. */
    private _getMonthList(): CalendarMonth[] {
        return [].concat.apply([], this.calendarMonthListGrid);
    }

    /** @hidden */
    private _focusOnCellByIndex(index: number): void {
        this.focusElementBySelector(`#${this.getId(index)}`);
    }
}
