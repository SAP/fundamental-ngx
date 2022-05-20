import { Component } from '@angular/core';
import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DAYJS_DATE_TIME_ADAPTER_OPTIONS, DayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';

@Component({
    selector: 'fd-dayjs-adapter-options-example',
    templateUrl: './dayjs-adapter-options-example.component.html',
    providers: [
        { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter },
        { provide: DAYJS_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: true } }
    ]
})
export class DayjsAdapterOptionsExampleComponent {}
