import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimeModule } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-no-seconds-example',
    templateUrl: './time-no-seconds-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [TimeModule, FormsModule]
})
export class TimeNoSecondsExampleComponent {
    timeNoSeconds = new FdDate().setTime(12, 0);
}
