import { Component, HostBinding, OnInit } from '@angular/core';
import { CalendarI18n } from '../../../i18n/calendar-i18n';

@Component({
    selector: 'fd-calendar2-day-view',
    templateUrl: './calendar2-day-view.component.html',
    styleUrls: ['./calendar2-day-view.component.scss']
})
export class Calendar2DayViewComponent implements OnInit {

    @HostBinding('class.fd-calendar__dates')
    fdCalendarDateViewClass: boolean = true;

    constructor(private calendarI18n: CalendarI18n) {
    }

    ngOnInit() {
    }

    get shortWeekDays(): string[] {
        return this.calendarI18n.getAllShortWeekdays().map(weekday => weekday[0]);
    }

}
