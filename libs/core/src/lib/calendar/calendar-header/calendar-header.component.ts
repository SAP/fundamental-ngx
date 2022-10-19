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
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { ButtonComponent } from '@fundamental-ngx/core/button';

import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { FdCalendarView } from '../types';
import { CalendarCurrent } from '../models/calendar-current';
import { CalendarYearGrid } from '../models/calendar-year-grid';
import { CalendarService } from '../calendar.service';

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
        '[attr.id]': 'viewId'
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

    /** whether previous navigation button should be disabled in the header. */
    @Input()
    previousButtonDisabled: boolean;

    /** whether next navigation button should be disabled in the header. */
    @Input()
    nextButtonDisabled: boolean;

    /**
     * Object to customize year grid
     */
    @Input()
    set calendarYearGrid(yearGrid: CalendarYearGrid) {
        this._amountOfYearsPerPeriod = yearGrid.cols * yearGrid.rows - 1;
        this._calculateSelectAggregatedYearLabel();
    }

    /** Calendar ID */
    @Input()
    id: string;

    /** Whether close button should be shown */
    @Input()
    mobileLandscape = false;

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

    /**
     * Component id
     */
    get viewId(): string {
        return this.id + '-header';
    }

    /**
     * @hidden
     * Previous button id
     */
    get _prevButtonId(): string {
        return this.viewId + '-left-arrow';
    }

    /**
     * @hidden
     * Next button id
     */
    get _nextButtonId(): string {
        return this.viewId + '-right-arrow';
    }

    /**
     * @hidden
     * Month label id
     */
    get _monthButtonLabelId(): string {
        return this.viewId + '-month-label';
    }

    /**
     * @hidden
     * Select month aria label id
     */
    get _selectMonthButtonAriaLabelId(): string {
        return this.viewId + '-select-month-aria-label';
    }

    /**
     * @hidden
     * Year label id
     */
    get _yearButtonLabelId(): string {
        return this.viewId + '-year-label';
    }

    /**
     * @hidden
     * Select year aria label id
     */
    get _selectYearButtonAriaLabelId(): string {
        return this.viewId + '-select-year-aria-label';
    }

    /**
     * @hidden
     * Years range label id
     */
    get _yearsRangeButtonLabelId(): string {
        return this.viewId + '-years-range-label';
    }

    /**
     * @hidden
     * Select years range aria label id
     */
    get _selectYearsRangeButtonAriaLabelId(): string {
        return this.viewId + '-select-years-range-aria-label';
    }

    /** @hidden */
    @ViewChild('prevButton')
    _prevButtonComponent: ButtonComponent;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** Month names */
    private _monthNames: string[] = [];

    /** Get information about amount of years displayed at once on year view  */
    private _amountOfYearsPerPeriod = 1;

    /** @hidden */
    constructor(
        private _calendarI18nLabels: CalendarI18nLabels,
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
        if (
            (changes.currentlyDisplayed && !changes.currentlyDisplayed.firstChange) ||
            (changes.activeView && !changes.activeView.firstChange)
        ) {
            this._calculateLabels();
            this._calculateAriaLabels();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._calendarService.leftArrowId = this._prevButtonId;

        this._calculateMonthNames();

        this._calculateLabels();

        this._calculateAriaLabels();

        this._listenToLocaleChanges();

        this._listenToCalendarLabelsChanges();
    }

    /**
     * Focus on focusable control within the header
     */
    focus(): void {
        if (!this._prevButtonComponent) {
            return;
        }
        this._prevButtonComponent.elementRef().nativeElement.focus();
    }

    /** @hidden */
    _processViewChange(type: FdCalendarView, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }

        this.activeView = type === this.activeView ? 'day' : type;

        this.activeViewChange.emit(this.activeView);
    }

    /** @hidden */
    _emitClose(): void {
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
            : this._calendarI18nLabels.yearsRangeSelectionLabel;
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

    /** @hidden */
    private _calculateMonthNames(): void {
        this._monthNames = this._dateTimeAdapter.getMonthNames('long');
    }

    /** @hidden */
    private _getYearName(year: number): string {
        return this._dateTimeAdapter.getYearName(this._dateTimeAdapter.createDate(year, 1, 1));
    }
}
