import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../i18n/calendar-i18n';
import { FdDate } from './models/fd-date';

@Component({
    selector: 'fd-calendar2',
    templateUrl: './calendar2.component.html',
    styleUrls: ['./calendar2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Calendar2Component implements OnInit {

    @Input()
    selectedDate: FdDate = FdDate.getToday();

    currentDisplayedMonth: number;
    currentDisplayedYear: number;

    constructor(public calendarI18nLabels: CalendarI18nLabels,
                public calendarI18n: CalendarI18n) {
    }

    ngOnInit() {
        // Prepare displayed month/year
        this.currentDisplayedMonth = this.selectedDate.month;
        this.currentDisplayedYear = this.selectedDate.year;
    }

}
