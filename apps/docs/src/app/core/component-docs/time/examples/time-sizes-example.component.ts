import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-sizes-example',
    templateUrl: './time-sizes-example.component.html'
})
export class TimeSizesExampleComponent {
    timeCompact = new FdDate();
    timeTablet = new FdDate();
}
