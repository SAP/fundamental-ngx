import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';

@Component({
    selector: 'fd-time-picker-compact-example',
    templateUrl: './time-picker-compact-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [TimePickerModule, ContentDensityDirective, FormsModule, DatePipe]
})
export class TimePickerCompactExampleComponent {
    timeObject = new FdDate().setTime(12, 0, 0);
}
