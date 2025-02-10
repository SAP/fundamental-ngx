import { Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from '@fundamental-ngx/core/calendar';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';
import { patchLanguage } from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-calendar-i18n-example',
    template: ` <fd-calendar [(ngModel)]="date"></fd-calendar>`,
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        {
            provide: LOCALE_ID,
            useValue: 'zh'
        },
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        },
        patchLanguage({
            coreCalendar: {
                yearSelectionLabel: `選擇年份`,
                previousYearLabel: '前一年',
                nextYearLabel: '明年',
                monthSelectionLabel: '選擇一個月',
                previousMonthLabel: '前一個月',
                nextMonthLabel: '下個月',
                dateSelectionLabel: '選擇日期'
            }
        })
    ],
    imports: [CalendarComponent, FormsModule, FdDatetimeModule]
})
export class CalendarI18nExampleComponent {
    date: FdDate = new FdDate(2020, 10, 25);
}
