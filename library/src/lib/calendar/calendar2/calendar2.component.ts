import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../i18n/calendar-i18n';
import { FdDate } from './models/fd-date';

/** Type for the calendar view */
export type FdCalendarView = 'day' | 'month' | 'year';

/** Currently displayed date information. */
export type FdCalendarDisplayed = '';

@Component({
    selector: 'fd-calendar2',
    templateUrl: './calendar2.component.html',
    styleUrls: ['./calendar2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Calendar2Component implements OnInit {

    @HostBinding('class.fd-calendar')
    fdCalendarClass: boolean = true;

    @Input()
    public selectedDate: FdDate = FdDate.getToday();

    @Input()
    public activeView: FdCalendarView = 'day';

    @Output()
    public readonly activeViewChange: EventEmitter<FdCalendarView>
        = new EventEmitter<FdCalendarView>();

    currentDisplayedMonth: number;

    currentDisplayedYear: number;

    constructor(public calendarI18nLabels: CalendarI18nLabels,
                public calendarI18n: CalendarI18n) {
    }

    ngOnInit() {
        this.prepareDisplayedView();
    }

    private prepareDisplayedView(): void {
        if (this.selectedDate && this.selectedDate.month && this.selectedDate.year) {
            this.currentDisplayedMonth = this.selectedDate.month;
            this.currentDisplayedYear = this.selectedDate.year;
        } else {
            const tempDate = FdDate.getToday();
            this.currentDisplayedMonth = tempDate.month;
            this.currentDisplayedYear = tempDate.year;
        }
    }

}
