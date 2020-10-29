import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';

import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { FdCalendarView } from '../calendar.component';
import { CalendarCurrent } from '../models/calendar-current';
import { CalendarYearGrid } from '../models/calendar-year-grid';
import { CalendarService } from '../calendar.service';
import { DatetimeAdapter, DateTimeFormats, DATE_TIME_FORMATS } from '../../datetime';
import { createMissingDateImplementationError } from '../calendar-errors';

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
export class CalendarHeaderComponent<D> implements OnDestroy, OnInit {
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
    calendarYearGrid: CalendarYearGrid;

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

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        public _calendarI18nLabels: CalendarI18nLabels,
        private _changeDetRef: ChangeDetectorRef,
        private _calendarService: CalendarService,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats,
        @Optional() private _dateTimeAdapter: DatetimeAdapter<D>
    ) {
        if (!this._dateTimeAdapter) {
            throw createMissingDateImplementationError('DateTimeAdapter');
        }
        if (!this._dateTimeFormats) {
            throw createMissingDateImplementationError('DATE_TIME_FORMATS');
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    /** @hidden */
    ngOnInit(): void {
        this._calendarService.leftArrowId = this.id + '-left-arrow';

        merge(this._calendarI18nLabels.labelsChange, this._dateTimeAdapter.localeChanges)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(() => {
                this._changeDetRef.markForCheck();
            });
    }

    /** Get the aria label for the previous button. Depends on the active view. */
    get previousAriaLabel(): string {
        return this.isOnDayView
            ? this._calendarI18nLabels.previousMonthLabel
            : this._calendarI18nLabels.previousYearLabel;
    }

    /** Get the aria label for the next button. Depends on the active view. */
    get nextAriaLabel(): string {
        return this.isOnDayView ? this._calendarI18nLabels.nextMonthLabel : this._calendarI18nLabels.nextYearLabel;
    }

    /** Get selection month button label. */
    get selectMonthLabel(): string {
        const monthNames = this._dateTimeAdapter.getMonthNames('long');
        return monthNames[this.currentlyDisplayed.month - 1];
    }

    /** Get selection month button aria label. */
    get selectMonthAriaLabel(): string {
        return this.isOnMonthView
            ? this._calendarI18nLabels.dateSelectionLabel
            : this._calendarI18nLabels.monthSelectionLabel;
    }

    /** Get selection year button label. */
    get selectYearLabel(): string {
        return this._getYearName(this.currentlyDisplayed.year);
    }

    /** Get selection year button aria label. */
    get selectYearAriaLabel(): string {
        return this._calendarI18nLabels.yearSelectionLabel;
    }

    /** Get selection aggregated year button label. */
    get selectAggregatedYearLabel(): string {
        return `${this._getYearName(this.currentlyDisplayed.year)} - ${
            this.currentlyDisplayed.year + this.amountOfYearsPerPeriod()
        }`;
    }

    /** Get selection aggregated year button aria label. */
    get selectAggregatedYearAriaLabel(): string {
        return this.isOnAggregatedYearsView
            ? this._calendarI18nLabels.dateSelectionLabel
            : this._calendarI18nLabels.yearSelectionLabel;
    }

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

    /** Get information about amount of years displayed at once on year view  */
    amountOfYearsPerPeriod(): number {
        return this.calendarYearGrid.cols * this.calendarYearGrid.rows;
    }

    processViewChange(type: FdCalendarView, event?: MouseEvent): void {
        if (type === this.activeView) {
            this.activeView = 'day';
        } else {
            this.activeView = type;
        }
        if (event) {
            event.stopPropagation();
        }
        this.activeViewChange.emit(this.activeView);
    }

    emitClose(): void {
        this.closeClicked.emit();
    }

    /** @hidden */
    private _getYearName(year: number): string {
        return this._dateTimeAdapter.getYearName(this._dateTimeAdapter.createDate(year, 1, 1));
    }
}
