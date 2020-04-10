import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter, HostBinding,
    Input, OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../i18n/calendar-i18n';
import { FdCalendarView } from '../calendar.component';
import { CalendarCurrent } from '../models/calendar-current';
import { takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';
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
        '[attr.id]': 'id + "-header"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarHeaderComponent implements OnDestroy, OnInit {

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
    mobileLandscape: boolean = false;

    /** Whether compact mode should be included into calendar */
    @Input()
    compact: boolean = false;

    /** Event emitted when the active view should change. */
    @Output()
    readonly activeViewChange: EventEmitter<FdCalendarView>
        = new EventEmitter<FdCalendarView>();

    /** Event emitted when the previous button is clicked. */
    @Output()
    readonly previousClicked: EventEmitter<void>
        = new EventEmitter<void>();

    /** Event emitted when the next button is clicked. */
    @Output()
    readonly nextClicked: EventEmitter<void>
        = new EventEmitter<void>();

    /** Event thrown, when the close button is clicked */
    @Output()
    readonly closeClicked: EventEmitter<void>
        = new EventEmitter<void>();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        public  calendarI18nLabels: CalendarI18nLabels,
        private  _calendarI18n: CalendarI18n,
        private _changeDetRef: ChangeDetectorRef,
        private _calendarService: CalendarService
    ) {
        /** Merging 18n observables */
        const i18nObservables = merge(this._calendarI18n.i18nChange, this.calendarI18nLabels.labelsChange);

        /** Called to trigger change detection */
        i18nObservables.pipe(takeUntil(this.onDestroy$))
            .subscribe(() => this._changeDetRef.markForCheck())
        ;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    /** @hidden */
    ngOnInit(): void {
        this._calendarService.leftArrowId = this.id + '-left-arrow';
    }

    /** Get the aria label for the previous button. Depends on the active view. */
    get previousLabel(): string {
        return this.activeView !== 'year' ? this.calendarI18nLabels.previousMonthLabel
            : this.calendarI18nLabels.previousYearLabel;
    }

    /** Get the aria label for the next button. Depends on the active view. */
    get nextLabel(): string {
        return this.activeView !== 'year' ? this.calendarI18nLabels.nextMonthLabel
            : this.calendarI18nLabels.nextMonthLabel;
    }

    /** Get aria label for the month shown. */
    get monthLabel(): string {
        return this._calendarI18n.getAllFullMonthNames()[this.currentlyDisplayed.month - 1];
    }

    /** Get information is calendar is on month view */
    isOnMonthView(): boolean {
        return this.activeView === 'month';
    }

    /** Get information is calendar is on year view */
    isOnYearView(): boolean {
        return this.activeView === 'year';
    }

    /** Get information about amount of years displayed at once on year view  */
    amountOfYearsPerPeriod(): number {
        return this.calendarYearGrid.cols * this.calendarYearGrid.rows
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

}
