import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-time-picker-12-example',
    templateUrl: './time-picker-12-example.component.html'
})
export class TimePicker12ExampleComponent {
    timeMeridianObject = new FdDate().setTime(12, 0, 0);
}
