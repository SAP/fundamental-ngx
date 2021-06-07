import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-two-digits-example',
    templateUrl: './time-two-digits-example.component.html'
})
export class TimeTwoDigitsExampleComponent {
    time = new FdDate().setTime(9, 0, 0);
}
