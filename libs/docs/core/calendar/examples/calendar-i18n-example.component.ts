import { Component, Injectable, LOCALE_ID } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { CalendarI18nLabels } from '@fundamental-ngx/core/calendar';

// i18n aria labels service provider
@Injectable()
export class CalendarI18nChineseLabels extends CalendarI18nLabels {
    yearSelectionLabel = `選擇年份`;

    previousYearLabel = '前一年';

    nextYearLabel = '明年';

    monthSelectionLabel = '選擇一個月';

    previousMonthLabel = '前一個月';

    nextMonthLabel = '下個月';

    dateSelectionLabel = '選擇日期';
}

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
        {
            provide: CalendarI18nLabels,
            useClass: CalendarI18nChineseLabels
        }
    ]
})
export class CalendarI18nExampleComponent {
    date: FdDate = new FdDate(2020, 10, 25);
}
