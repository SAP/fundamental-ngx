import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DAYJS_DATETIME_FORMATS, DayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';
import dayjs, { Dayjs } from 'dayjs';

@Component({
    selector: 'fd-datetime-adapters-dayjs-basic-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './datetime-adapters-dayjs-basic-example.component.html',
    providers: [
        { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter },
        { provide: DATE_TIME_FORMATS, useValue: DAYJS_DATETIME_FORMATS }
    ],
    imports: [DatePickerComponent, FormsModule]
})
export class DatetimeAdaptersDayjsBasicExampleComponent {
    date: Dayjs = dayjs();
}
