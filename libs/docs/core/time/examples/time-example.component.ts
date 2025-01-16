import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimeModule } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-example',
    templateUrl: './time-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [TimeModule, FormsModule]
})
export class TimeExampleComponent {
    time = new FdDate().setTime(14, 3, 2);
}
