import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-example',
    templateUrl: './time-example.component.html'
})
export class TimeExampleComponent {
    time = new FdDate().setTime(14, 3, 2);
}
