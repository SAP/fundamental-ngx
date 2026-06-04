import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import { DAYJS_DATETIME_FORMATS_24H, DayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';
import dayjs, { Dayjs } from 'dayjs';

@Component({
    selector: 'fd-dayjs-datetime-24h-example',
    templateUrl: './dayjs-datetime-24h-example.component.html',
    providers: [
        { provide: DATE_TIME_FORMATS, useValue: DAYJS_DATETIME_FORMATS_24H },
        { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter }
    ],
    imports: [DatetimePickerComponent, FormsModule]
})
export class DayjsDatetime24hExampleComponent {
    date: Dayjs = dayjs();
}
