import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import {
    DAYJS_DATETIME_FORMATS,
    DAYJS_DATE_TIME_ADAPTER_OPTIONS,
    DayjsDatetimeAdapter
} from '@fundamental-ngx/datetime-adapter';
import dayjs, { Dayjs } from 'dayjs';

@Component({
    selector: 'fd-datetime-adapters-dayjs-options-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './datetime-adapters-dayjs-options-example.component.html',
    providers: [
        { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter },
        { provide: DATE_TIME_FORMATS, useValue: DAYJS_DATETIME_FORMATS },
        { provide: DAYJS_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: true } }
    ],
    imports: [DatetimePickerComponent, FormsModule]
})
export class DatetimeAdaptersDayjsOptionsExampleComponent {
    date: Dayjs = dayjs();
}
