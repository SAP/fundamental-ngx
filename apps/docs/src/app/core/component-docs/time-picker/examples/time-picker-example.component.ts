import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-picker-example',
    templateUrl: './time-picker-example.component.html'
})
export class TimePickerExampleComponent {
    timeObject = new FdDate().setTime(12, 0, 0);
}
