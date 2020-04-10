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
    ChangeDetectionStrategy
} from '@angular/core';
import { FdDate } from '../../models/fd-date';
import { CalendarI18n } from '../../i18n/calendar-i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CalendarService } from '../../calendar.service';

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
export class CalendarMonthViewComponent implements OnInit, OnDestroy {

    /** A number offset used to achieve the 1-12 representation of the calendar */
    private readonly _monthOffset: number = 1;

    private readonly _amountOfColPerRow: number = 3;
    private readonly _amountOfRows: number = 4;

    private _monthNames: string[][];

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** The id of the calendar passed from the parent component */
    @Input()
    id: string;

    /** A number (1-12) representing the selected month */
    @Input()
    monthSelected: number;

    /** A function that handles escape focus */
    @Input()
    focusEscapeFunction: Function;

    /** An event fired when a new month is selected */
    @Output()
    readonly monthClicked: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private _eRef: ElementRef,
        private _cdRef: ChangeDetectorRef,
        private _calendarI18n: CalendarI18n,
        private _calendarService: CalendarService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._refreshMonthNames();
        this._setupKeyboardService();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Get a number (1-12) representing the current month  */
    get currentMonth(): number {
        return FdDate.getToday().month;
    }

    /**  Getter for the private class member _monthOffset */
    get monthOffset(): number {
        return this._monthOffset;
    }

    /** Method for handling the mouse click event when a month is selected  */
    selectMonth(selectedMonth: number, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.monthSelected = selectedMonth + this.monthOffset;
        this.monthClicked.emit(this.monthSelected);
    }

    /** Method for handling the keyboard events (a11y) */
    onKeydownMonthHandler(event, index: number): void {
        this._calendarService.onKeydownHandler(event, index);
    }

    /** Method that allows to focus elements inside this component */
    focusElement(elementSelector: string): void {
        const elementToFocus: HTMLElement = this._eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
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

    /** Method that returns grid of short month names from currently provided calendarI18n service */
    get monthNames(): string[][] {
        return this._monthNames;
    }

    /** Method that rewrite short month names, used mostly in case of i18n service language change */
    private _refreshMonthNames(): void {
        const monthNames: string[] = [...this._calendarI18n.getAllFullMonthNames()];
        const twoDimensionMonthNames: string[][] = [];
        /** Creating 2d grid */
        while (monthNames.length) {
            twoDimensionMonthNames.push(monthNames.splice(0, this._amountOfColPerRow));
        }
        this._monthNames = twoDimensionMonthNames;
        this._cdRef.markForCheck();
    }

    /** Method to put configuration and listeners on calendar keyboard service */
    private _setupKeyboardService(): void {
        this._calendarService.rowAmount = this._amountOfRows;
        this._calendarService.colAmount = this._amountOfColPerRow;
        this._calendarService.focusEscapeFunction = this.focusEscapeFunction;


        this._calendarService.onFocusIdChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(index => this.focusElement('#' + this.getId(index)))
        ;

        this._calendarService.onKeySelect
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(index => this.selectMonth(index))
        ;

        this._calendarI18n.i18nChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this._refreshMonthNames())
        ;
    }
}
