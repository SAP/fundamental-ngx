import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-sizes-example',
    templateUrl: './time-sizes-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ]
})
export class TimeSizesExampleComponent {
    timeCompact = new FdDate();
    timeTablet = new FdDate();
}
