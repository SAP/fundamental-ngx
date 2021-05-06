import { Component } from '@angular/core';
import { DatetimeAdapter, MOMENT_DATE_TIME_ADAPTER_OPTIONS, MomentDatetimeAdapter } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-moment-adapter-options-example',
    templateUrl: './moment-adapter-options-example.component.html',
    providers: [
        { provide: DatetimeAdapter, useClass: MomentDatetimeAdapter },
        { provide: MOMENT_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: true } },
    ]
})
export class MomentAdapterOptionsExampleComponent {

}
