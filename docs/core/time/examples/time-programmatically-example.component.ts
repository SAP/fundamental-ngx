import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-programmatically-example',
    templateUrl: './time-programmatically-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ]
})
export class TimeProgrammaticallyExampleComponent {
    time = new FdDate().setTime(12, 0, 0);

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    change(): void {
        this.time = this.datetimeAdapter.setHours(this.time, 11);
    }
}
