import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-only-hours-example',
    templateUrl: './time-only-hours-example.component.html'
})
export class TimeOnlyHoursExampleComponent {
    onlyHoursTime = new FdDate().setTime(12, null, null);
}
