import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';

@Component({
    selector: 'fd-time-picker-compact-example',
    templateUrl: './time-picker-compact-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ],
    standalone: true,
    imports: [TimePickerModule, ContentDensityDirective, FormsModule, NgIf, DatePipe]
})
export class TimePickerCompactExampleComponent {
    timeObject = new FdDate().setTime(12, 0, 0);
}
