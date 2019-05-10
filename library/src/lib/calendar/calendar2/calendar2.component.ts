import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../i18n/calendar-i18n';

@Component({
    selector: 'fd-calendar2',
    templateUrl: './calendar2.component.html',
    styleUrls: ['./calendar2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Calendar2Component implements OnInit {

    constructor(public calendarI18nLabels: CalendarI18nLabels,
                public calendarI18n: CalendarI18n) {
    }

    ngOnInit() {
    }

}
