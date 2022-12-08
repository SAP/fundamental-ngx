import { Component } from '@angular/core';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { MomentDatetimeAdapter } from '@fundamental-ngx/moment-adapter';
import moment, { Moment } from 'moment';

@Component({
    selector: 'fd-moment-datetime-formats-example',
    templateUrl: './moment-datetime-formats-example.component.html',
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
            useClass: MomentDatetimeAdapter
        }
    ]
})
export class MomentDatetimeFormatsExampleComponent {
    date: Moment = moment();
}
