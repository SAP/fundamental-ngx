import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-two-digits-example',
    templateUrl: './time-two-digits-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ]
})
export class TimeTwoDigitsExampleComponent {
    time = new FdDate().setTime(9, 0, 0);
}
