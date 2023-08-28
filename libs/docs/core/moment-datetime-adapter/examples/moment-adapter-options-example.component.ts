import { Component } from '@angular/core';
import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import { MOMENT_DATE_TIME_ADAPTER_OPTIONS, MomentDatetimeAdapter } from '@fundamental-ngx/moment-adapter';

@Component({
    selector: 'fd-moment-adapter-options-example',
    templateUrl: './moment-adapter-options-example.component.html',
    providers: [
        { provide: DatetimeAdapter, useClass: MomentDatetimeAdapter },
        { provide: MOMENT_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: true } }
    ],
    standalone: true,
    imports: [DatetimePickerComponent]
})
export class MomentAdapterOptionsExampleComponent {}
