import { Component } from '@angular/core';
import { DatetimeAdapter, DATE_TIME_FORMATS } from '@fundamental-ngx/core/datetime';
import { DayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';
import dayjs, { Dayjs } from 'dayjs';

@Component({
    selector: 'fd-dayjs-datetime-formats-example',
    templateUrl: './dayjs-datetime-formats-example.component.html',
    providers: [
        {
            provide: DATE_TIME_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'l',
                    timeInput: 'h:mm A',
                    dateTimeInput: 'l h:mm A'
                },
                display: {
                    dateInput: 'l',
                    timeInput: 'h:mm A',
                    dateTimeInput: 'l h:mm A',

                    dateA11yLabel: 'YYYY MMMM DD',
                    monthA11yLabel: 'MMMM',
                    yearA11yLabel: 'YYYY'
                },
                rangeDelimiter: ' - '
            }
        },
        {
            provide: DatetimeAdapter,
            useClass: DayjsDatetimeAdapter
        }
    ]
})
export class DayjsDatetimeFormatsExampleComponent {
    date: Dayjs = dayjs();
}
