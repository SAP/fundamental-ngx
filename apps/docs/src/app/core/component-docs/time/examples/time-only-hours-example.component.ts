import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-only-hours-example',
    templateUrl: './time-only-hours-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ]
})
export class TimeOnlyHoursExampleComponent {
    onlyHoursTime = new FdDate().setTime(12);
}
