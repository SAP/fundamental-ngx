import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-no-seconds-example',
    templateUrl: './time-no-seconds-example.component.html'
})
export class TimeNoSecondsExampleComponent {
    timeNoSeconds = new FdDate().setTime(12, 0, null);
}
