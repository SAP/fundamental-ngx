import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-picker-compact-example',
    templateUrl: './time-picker-compact-example.component.html'
})
export class TimePickerCompactExampleComponent {
    timeObject = new FdDate().setTime(12, 0, 0);
}
