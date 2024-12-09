import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DatetimeAdapter, FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimeModule } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-programmatically-example',
    templateUrl: './time-programmatically-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [TimeModule, FormsModule, ButtonComponent]
})
export class TimeProgrammaticallyExampleComponent {
    time = new FdDate().setTime(12, 0, 0);

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    change(): void {
        this.time = this.datetimeAdapter.setHours(this.time, 11);
    }
}
