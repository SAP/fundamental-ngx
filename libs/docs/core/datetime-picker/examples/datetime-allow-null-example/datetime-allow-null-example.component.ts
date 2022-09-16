import { Component } from '@angular/core';

import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-time-picker-allow-null-example',
    template: `
        <fd-datetime-picker [allowNull]="false" [(ngModel)]="selectedDay"></fd-datetime-picker>
        <br />
        <br />
        <span>Selected Date: {{ selectedDay || 'null' }}</span>
    `,
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
export class DatetimePickerAllowNullExampleComponent {
    selectedDay: FdDate = FdDate.getNow();
}
