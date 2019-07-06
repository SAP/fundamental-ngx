import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../i18n/calendar-i18n';
import { FdDate } from './models/fd-date';
import { CalendarCurrent } from './models/calendar-current';

/** Type for the calendar view */
export type FdCalendarView = 'day' | 'month' | 'year';

/** Type for the days of the week. */
export type DaysOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Months: 1 = January, 12 = december.
 * Days: 1 = Sunday, 7 = Saturday
 */
@Component({
    selector: 'fd-calendar2',
    templateUrl: './calendar2.component.html',
    styleUrls: ['./calendar2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Calendar2Component implements OnInit {

    @Input()
    public selectedDate: FdDate = FdDate.getToday();

    @Input()
    public activeView: FdCalendarView = 'day';

    @Input()
    public startingDayOfWeek: DaysOfWeek = 1;

    @Output()
    public readonly activeViewChange: EventEmitter<FdCalendarView>
        = new EventEmitter<FdCalendarView>();

    @HostBinding('class.fd-calendar')
    private fdCalendarClass: boolean = true;

    @HostBinding('style.display')
    private displayStyle: string = 'block';

    currentlyDisplayed: CalendarCurrent;

    constructor(public calendarI18nLabels: CalendarI18nLabels,
                public calendarI18n: CalendarI18n) {
    }

    ngOnInit() {
        this.prepareDisplayedView();
    }

    private prepareDisplayedView(): void {
        if (this.selectedDate && this.selectedDate.month && this.selectedDate.year) {
            this.currentlyDisplayed = {month: this.selectedDate.month, year: this.selectedDate.year};
        } else {
            const tempDate = FdDate.getToday();
            this.currentlyDisplayed = {month: tempDate.month, year: tempDate.year};
        }
    }

}
