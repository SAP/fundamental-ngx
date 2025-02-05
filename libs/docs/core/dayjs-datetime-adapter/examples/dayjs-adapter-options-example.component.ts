import { Component } from '@angular/core';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import {
    DAYJS_DATETIME_FORMATS,
    DAYJS_DATE_TIME_ADAPTER_OPTIONS,
    DayjsDatetimeAdapter
} from '@fundamental-ngx/datetime-adapter';

@Component({
    selector: 'fd-dayjs-adapter-options-example',
    templateUrl: './dayjs-adapter-options-example.component.html',
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        { provide: DATE_TIME_FORMATS, useValue: DAYJS_DATETIME_FORMATS },
        { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter },
        { provide: DAYJS_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: true } }
    ],
    imports: [DatetimePickerComponent]
})
export class DayjsAdapterOptionsExampleComponent {}
