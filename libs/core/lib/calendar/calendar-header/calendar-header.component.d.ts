import { EventEmitter } from '@angular/core';
import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../i18n/calendar-i18n';
import { FdCalendarView } from '../calendar.component';
import { CalendarCurrent } from '../models/calendar-current';
/**
 * Internal use only.
 * Header of the calendar component.
 */
export declare class CalendarHeaderComponent {
    calendarI18nLabels: CalendarI18nLabels;
    calendarI18n: CalendarI18n;
    /** Currently active view. Needed for a11y labels. */
    activeView: FdCalendarView;
    /** Currently displayed date on the calendar. */
    currentlyDisplayed: CalendarCurrent;
    /** Id */
    id: string;
    /** Event emitted when the active view should change. */
    readonly activeViewChange: EventEmitter<FdCalendarView>;
    /** Event emitted when the previous button is clicked. */
    readonly previousClicked: EventEmitter<void>;
    /** Event emitted when the next button is clicked. */
    readonly nextClicked: EventEmitter<void>;
    constructor(calendarI18nLabels: CalendarI18nLabels, calendarI18n: CalendarI18n);
    /** Get the aria label for the previous button. Depends on the active view. */
    readonly previousLabel: string;
    /** Get the aria label for the next button. Depends on the active view. */
    readonly nextLabel: string;
    /** Get aria label for the month shown. */
    readonly monthLabel: string;
    isOnMonthView(): boolean;
    isOnYearView(): boolean;
    processViewChange(type: FdCalendarView): void;
}
