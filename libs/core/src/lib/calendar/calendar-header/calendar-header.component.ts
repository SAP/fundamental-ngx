import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../i18n/calendar-i18n';
import { FdCalendarView } from '../calendar.component';
import { CalendarCurrent } from '../models/calendar-current';

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
    }
})
export class CalendarHeaderComponent {

    /** Currently active view. Needed for a11y labels. */
    @Input()
    activeView: FdCalendarView;

    /** Currently displayed date on the calendar. */
    @Input()
    currentlyDisplayed: CalendarCurrent;

    /** Id */
    @Input()
    id: string;

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

    constructor(
        public calendarI18nLabels: CalendarI18nLabels,
        public calendarI18n: CalendarI18n
    ) {}

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
        return this.calendarI18n.getAllFullMonthNames()[this.currentlyDisplayed.month - 1];
    }

    isOnMonthView(): boolean {
        return this.activeView === 'month';
    }

    isOnYearView(): boolean {
        return this.activeView === 'year';
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
