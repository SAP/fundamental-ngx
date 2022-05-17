import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-no-seconds-example',
    templateUrl: './time-no-seconds-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ]
})
export class TimeNoSecondsExampleComponent {
    timeNoSeconds = new FdDate().setTime(12, 0);
}
