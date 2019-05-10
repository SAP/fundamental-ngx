import { Component, OnInit } from '@angular/core';
import { CalendarI18nLabels } from '../../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../../i18n/calendar-i18n';

@Component({
    selector: 'fd-calendar2-header',
    templateUrl: './calendar2-header.component.html',
    styleUrls: ['./calendar2-header.component.scss']
})
export class Calendar2HeaderComponent implements OnInit {

    constructor(public calendarI18nLabels: CalendarI18nLabels,
                public calendarI18n: CalendarI18n) {
    }

    ngOnInit() {
    }

}
