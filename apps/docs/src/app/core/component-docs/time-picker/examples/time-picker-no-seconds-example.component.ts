import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-time-picker-no-seconds-example',
    templateUrl: './time-picker-no-seconds-example.component.html'
})
export class TimePickerNoSecondsExampleComponent {
    timePickerNoSecondsObject = new FdDate().setTime(12, 0, 0);
}
