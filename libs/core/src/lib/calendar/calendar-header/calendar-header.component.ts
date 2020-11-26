import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { FdCalendarView } from '../calendar.component';
import { CalendarCurrent } from '../models/calendar-current';
import { CalendarYearGrid } from '../models/calendar-year-grid';
import { CalendarService } from '../calendar.service';
import { DatetimeAdapter } from '../../datetime/datetime-adapter';

/**
 * Internal use only.
 * Header of the calendar component.
 */
@Component({
    selector: 'fd-calendar-header',
    templateUrl: './calendar-header.component.html',
    styleUrls: ['./calendar-header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'id + "-header"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarHeaderComponent<D> implements OnDestroy, OnInit, OnChanges {
    /** Currently active view. Needed for a11y labels. */
    @Input()
    activeView: FdCalendarView;

    /** Currently displayed date on the calendar. */
    @Input()
    currentlyDisplayed: CalendarCurrent;

    /**
     * Object to customize year grid
     */
    @Input()
    set calendarYearGrid(yearGrid: CalendarYearGrid) {
        this._amountOfYearsPerPeriod = yearGrid.cols * yearGrid.rows - 1;
        this._calculateSelectAggregatedYearLabel();
    }

    /** Id */
    @Input()
    id: string;

    /** Whether close button should be shown */
    @Input()
    mobileLandscape = false;

    /** Whether compact mode should be included into calendar */
    @Input()
    compact = false;

    /** Event emitted when the active view should change. */
    @Output()
    readonly activeViewChange: EventEmitter<FdCalendarView> = new EventEmitter<FdCalendarView>();

    /** Event emitted when the previous button is clicked. */
    @Output()
    readonly previousClicked: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted when the next button is clicked. */
    @Output()
    readonly nextClicked: EventEmitter<void> = new EventEmitter<void>();

    /** Event thrown, when the close button is clicked */
    @Output()
    readonly closeClicked: EventEmitter<void> = new EventEmitter<void>();

    /** Aria label for the previous button. Depends on the active view. */
    previousAriaLabel: string;

    /** Aria label for the next button. Depends on the active view. */
    nextAriaLabel: string;

    /** Button aria label to open month selection view. */
    selectMonthAriaLabel: string;

    /** Button aria label to open year selection view. */
    selectYearAriaLabel: string;

    /** Button aria label to open aggregated years selection view. */
    selectAggregatedYearAriaLabel: string;

    /** Button label to open month selection view. */
    selectMonthLabel: string;

    /** Button label to open year selection view. */
    selectYearLabel: string;

    /** Button label to open aggregated years selection view. */
    selectAggregatedYearLabel: string;

    /** Get information is calendar is on aggregated years view */
    get isOnAggregatedYearsView(): boolean {
        return this.activeView === 'aggregatedYear';
    }

    /** Get information is calendar is on year view */
    get isOnYearView(): boolean {
        return this.activeView === 'year';
    }

    /** Get information is calendar is on month view */
    get isOnMonthView(): boolean {
        return this.activeView === 'month';
    }

    /** Get information is calendar is on day view */
    get isOnDayView(): boolean {
        return this.activeView === 'day';
    }

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** Month names */
    private _monthNames: string[] = [];

    /** Get information about amount of years displayed at once on year view  */
    private _amountOfYearsPerPeriod = 1;

    constructor(
        public _calendarI18nLabels: CalendarI18nLabels,
        private _changeDetRef: ChangeDetectorRef,
        private _calendarService: CalendarService,
        private _dateTimeAdapter: DatetimeAdapter<D>
    ) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (['activeView', 'currentlyDisplayed'].some((inputName) => inputName in changes)) {
            this._calculateLabels();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._calendarService.leftArrowId = this.id + '-left-arrow';

        this._calculateMonthNames();

        this._calculateLabels();

        this._calculateAriaLabels();

        this._listenToLocaleChanges();

        this._listenToCalendarLabelsChanges();
    }

    processViewChange(type: FdCalendarView, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }

        this.activeView = type === this.activeView ? 'day' : type;

        this.activeViewChange.emit(this.activeView);
    }

    emitClose(): void {
        this.closeClicked.emit();
    }

    /** @hidden */
    private _listenToLocaleChanges(): void {
        this._dateTimeAdapter.localeChanges.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._calculateMonthNames();
            this._calculateLabels();
            this._changeDetRef.markForCheck();
        });
    }

    /** @hidden */
    private _listenToCalendarLabelsChanges(): void {
        this._calendarI18nLabels.labelsChange.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._calculateAriaLabels();
            this._changeDetRef.markForCheck();
        });
    }

    /** @hidden */
    private _calculateAriaLabels(): void {
        this._calculatePreviousAriaLabel();
        this._calculateNextAriaLabel();
        this._calculateSelectMonthAriaLabel();
        this._calculateSelectYearAriaLabel();
        this._calculateSelectAggregatedYearAriaLabel();
    }

    /** @hidden */
    private _calculateLabels(): void {
        this._calculateSelectMonthLabel();
        this._calculateSelectYearLabel();
        this._calculateSelectAggregatedYearLabel();
    }

    /** @hidden */
    private _calculatePreviousAriaLabel(): void {
        this.previousAriaLabel = this.isOnDayView
            ? this._calendarI18nLabels.previousMonthLabel
            : this._calendarI18nLabels.previousYearLabel;
    }

    /** @hidden */
    private _calculateNextAriaLabel(): void {
        this.nextAriaLabel = this.isOnDayView
            ? this._calendarI18nLabels.nextMonthLabel
            : this._calendarI18nLabels.nextYearLabel;
    }
    /** @hidden */
    private _calculateSelectMonthAriaLabel(): void {
        this.selectMonthAriaLabel = this.isOnMonthView
            ? this._calendarI18nLabels.dateSelectionLabel
            : this._calendarI18nLabels.monthSelectionLabel;
    }

    /** @hidden */
    private _calculateSelectYearAriaLabel(): void {
        this.selectYearAriaLabel = this._calendarI18nLabels.yearSelectionLabel;
    }

    /** @hidden */
    private _calculateSelectAggregatedYearAriaLabel(): void {
        this.selectAggregatedYearAriaLabel = this.isOnAggregatedYearsView
            ? this._calendarI18nLabels.dateSelectionLabel
            : this._calendarI18nLabels.yearSelectionLabel;
    }

    /** @hidden */
    private _calculateSelectMonthLabel(): void {
        this.selectMonthLabel = this._monthNames[this.currentlyDisplayed.month - 1];
    }

    /** @hidden */
    private _calculateSelectYearLabel(): void {
        this.selectYearLabel = this._getYearName(this.currentlyDisplayed.year);
    }

    /** @hidden */
    private _calculateSelectAggregatedYearLabel(): void {
        this.selectAggregatedYearLabel = `${this._getYearName(this.currentlyDisplayed.year)}-${this._getYearName(
            this.currentlyDisplayed.year + this._amountOfYearsPerPeriod
        )}`;
    }

    private _calculateMonthNames(): void {
        this._monthNames = this._dateTimeAdapter.getMonthNames('long');
    }

    /** @hidden */
    private _getYearName(year: number): string {
        return this._dateTimeAdapter.getYearName(this._dateTimeAdapter.createDate(year, 1, 1));
    }
}
