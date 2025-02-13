import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';

import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { CalendarService } from '../calendar.service';
import { CalendarCurrent } from '../models/calendar-current';
import { CalendarYearGrid } from '../models/calendar-year-grid';
import { FdCalendarView, FdCalendarViewEnum } from '../types';

/**
 * Internal use only.
 * Header of the calendar component.
 */
@Component({
    selector: 'fd-calendar-header',
    templateUrl: './calendar-header.component.html',
    styleUrl: './calendar-header.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'viewId'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, FdTranslatePipe]
})
export class CalendarHeaderComponent<D> implements OnInit, OnChanges {
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

    /** Whether calendar should be rendered in mobile landscape mode. */
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

    /** @hidden */
    @ViewChild('prevButton', { read: ElementRef })
    _prevButtonComponent: ElementRef;

    /** Aria label for the previous button. Depends on the active view. */
    get previousAriaLabel(): 'coreCalendar.previousMonthLabel' | 'coreCalendar.previousYearLabel' {
        return this.isOnDayView ? 'coreCalendar.previousMonthLabel' : 'coreCalendar.previousYearLabel';
    }

    /** Aria label for the next button. Depends on the active view. */
    get nextAriaLabel(): 'coreCalendar.nextMonthLabel' | 'coreCalendar.nextYearLabel' {
        return this.isOnDayView ? 'coreCalendar.nextMonthLabel' : 'coreCalendar.nextYearLabel';
    }

    /** Button aria label to open month selection view. */
    get selectMonthAriaLabel(): 'coreCalendar.monthSelectionLabel' | 'coreCalendar.dateSelectionLabel' {
        return this.isOnMonthView ? 'coreCalendar.dateSelectionLabel' : 'coreCalendar.monthSelectionLabel';
    }

    /** Button aria label to open aggregated years selection view. */
    get selectAggregatedYearAriaLabel(): 'coreCalendar.yearsRangeSelectionLabel' | 'coreCalendar.dateSelectionLabel' {
        return this.isOnAggregatedYearsView
            ? 'coreCalendar.dateSelectionLabel'
            : 'coreCalendar.yearsRangeSelectionLabel';
    }

    /** Button label to open month selection view. */
    selectMonthLabel: string;

    /** Button label to open year selection view. */
    selectYearLabel: string;

    /** Button label to open aggregated years selection view. */
    selectAggregatedYearLabel: string;

    /** Get information is calendar is on aggregated years view */
    get isOnAggregatedYearsView(): boolean {
        return this.activeView === FdCalendarViewEnum.AggregatedYear;
    }

    /** Get information is calendar is on year view */
    get isOnYearView(): boolean {
        return this.activeView === FdCalendarViewEnum.Year;
    }

    /** Get information is calendar is on month view */
    get isOnMonthView(): boolean {
        return this.activeView === FdCalendarViewEnum.Month;
    }

    /** Get information is calendar is on day view */
    get isOnDayView(): boolean {
        return this.activeView === FdCalendarViewEnum.Day;
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

    /** @hidden  */
    private readonly _destroyRef = inject(DestroyRef);

    /** Month names */
    private _monthNames: string[] = [];

    /** Get information about amount of years displayed at once on year view  */
    private _amountOfYearsPerPeriod = 1;

    /** @hidden */
    constructor(
        private _changeDetRef: ChangeDetectorRef,
        private _calendarService: CalendarService,
        private _dateTimeAdapter: DatetimeAdapter<D>
    ) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (
            (changes.currentlyDisplayed && !changes.currentlyDisplayed.firstChange) ||
            (changes.activeView && !changes.activeView.firstChange)
        ) {
            this._calculateLabels();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._calendarService.leftArrowId = this._prevButtonId;

        this._calculateMonthNames();

        this._calculateLabels();

        this._listenToLocaleChanges();
    }

    /**
     * Focus on focusable control within the header
     */
    focus(): void {
        this._prevButtonComponent.nativeElement?.focus();
    }

    /** @hidden */
    _processViewChange(type: FdCalendarView, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }

        this.activeView = type === this.activeView ? FdCalendarViewEnum.Day : type;

        this.activeViewChange.emit(this.activeView);
    }

    /** @hidden */
    private _listenToLocaleChanges(): void {
        this._dateTimeAdapter.localeChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._calculateMonthNames();
            this._calculateLabels();
            this._changeDetRef.markForCheck();
        });
    }

    /** @hidden */
    private _calculateLabels(): void {
        this._calculateSelectMonthLabel();
        this._calculateSelectYearLabel();
        this._calculateSelectAggregatedYearLabel();
    }

    /** @hidden */
    private _calculateSelectMonthLabel(): void {
        this.selectMonthLabel = this._monthNames[this._getNormalizedDate().month - 1];
    }

    /** @hidden */
    private _calculateSelectYearLabel(): void {
        this.selectYearLabel = this._getYearName(this._getNormalizedDate().year);
    }

    /** @hidden */
    private _calculateSelectAggregatedYearLabel(): void {
        this.selectAggregatedYearLabel = `${this._getYearName(this._getNormalizedDate().year)}-${this._getYearName(
            this._getNormalizedDate().year + this._amountOfYearsPerPeriod
        )}`;
    }

    /** @hidden */
    private _calculateMonthNames(): void {
        this._monthNames = this._dateTimeAdapter.getMonthNames('long');
    }

    /** @hidden */
    private _getYearName(year: number): string {
        return this._dateTimeAdapter.getYearName(this._dateTimeAdapter.createDate(year));
    }

    /** @hidden */
    private _getNormalizedDate(): CalendarCurrent {
        return {
            year: isNaN(this.currentlyDisplayed.year)
                ? this._dateTimeAdapter.getYear(this._dateTimeAdapter.now())
                : this.currentlyDisplayed.year,
            month: isNaN(this.currentlyDisplayed.month)
                ? this._dateTimeAdapter.getMonth(this._dateTimeAdapter.now())
                : this.currentlyDisplayed.month
        };
    }
}
