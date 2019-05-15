import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CalendarI18nLabels } from '../../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../../i18n/calendar-i18n';

/** Type for the calendar view */
export type FdCalendarView = 'day' | 'month' | 'year';

/**
 * Internal use only.
 */
@Component({
    selector: 'fd-calendar2-header',
    templateUrl: './calendar2-header.component.html',
    styleUrls: ['./calendar2-header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Calendar2HeaderComponent implements OnInit {

    /** Currently active view. Needed for a11y labels. */
    @Input()
    activeView: FdCalendarView;

    /** Currently displayed month on the calendar. */
    @Input()
    currentDisplayedMonth: number;

    /** Currently displayed year on the calendar. */
    @Input()
    currentDisplayedYear: number;

    @Output()
    readonly activeViewChange: EventEmitter<string>
        = new EventEmitter<string>();

    @Output()
    readonly previousClicked: EventEmitter<void>
        = new EventEmitter<void>();

    @Output()
    readonly nextClicked: EventEmitter<void>
        = new EventEmitter<void>();

    constructor(public calendarI18nLabels: CalendarI18nLabels,
                public calendarI18n: CalendarI18n) {
    }

    ngOnInit() {}

    get previousLabel(): string {
        return this.activeView !== 'year' ? this.calendarI18nLabels.previousMonthLabel
            : this.calendarI18nLabels.previousYearLabel;
    }

    get nextLabel(): string {
        return this.activeView !== 'year' ? this.calendarI18nLabels.nextMonthLabel
            : this.calendarI18nLabels.nextMonthLabel;
    }

    get monthLabel(): string {
        return this.calendarI18n.getAllFullMonthNames()[this.currentDisplayedMonth - 1];
    }

    processViewChange(type: FdCalendarView): void {
        if (type === this.activeView) {
            this.activeView = 'day';
        } else {
            this.activeView = type;
        }
        this.activeViewChange.emit(this.activeView);
    }

}
