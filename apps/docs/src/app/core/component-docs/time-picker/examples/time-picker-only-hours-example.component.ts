import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-time-picker-only-hours-example',
    templateUrl: './time-picker-only-hours-example.component.html'
})
export class TimePickerOnlyHoursExampleComponent {
    timePickerOnlyHoursObject = new FdDate().setTime(12, 0, 0);
}
