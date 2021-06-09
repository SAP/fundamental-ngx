import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-picker-disabled-example',
    templateUrl: './time-picker-disabled-example.component.html'
})
export class TimePickerDisabledExampleComponent {
    timeObject = new FdDate().setTime(12, 0, 0);
}
