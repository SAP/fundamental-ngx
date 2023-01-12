import { Component } from '@angular/core';

import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { Nullable } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-date-picker-allow-null-example',
    template: ` <fd-date-picker [allowNull]="false" type="single" [(ngModel)]="date"></fd-date-picker>
        <br />
        <div>Selected Date: {{ date?.toDateString() }}</div>`,
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ]
})
export class DatePickerAllowNullExampleComponent {
    date: Nullable<FdDate> = FdDate.getNow();
}
