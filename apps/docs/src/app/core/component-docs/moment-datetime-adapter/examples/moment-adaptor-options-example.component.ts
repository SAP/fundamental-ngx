import { Component } from '@angular/core';
import { DatetimeAdapter, MOMENT_DATE_TIME_ADAPTER_OPTIONS, MomentDatetimeAdapter } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-moment-adaptor-options-example',
    templateUrl: './moment-adaptor-options-example.component.html',
    providers: [
        { provide: DatetimeAdapter, useClass: MomentDatetimeAdapter },
        { provide: MOMENT_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: true } },
    ]
})
export class MomentAdaptorOptionsExampleComponent {

}
