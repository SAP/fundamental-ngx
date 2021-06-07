import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-12-example',
    templateUrl: './time-12-example.component.html'
})
export class Time12ExampleComponent {
    timeMeridian = new FdDate().setTime(9, 0, 0);
}
