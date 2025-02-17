import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimeModule } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-only-hours-example',
    templateUrl: './time-only-hours-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [TimeModule, FormsModule]
})
export class TimeOnlyHoursExampleComponent {
    onlyHoursTime = new FdDate().setTime(12);
}
