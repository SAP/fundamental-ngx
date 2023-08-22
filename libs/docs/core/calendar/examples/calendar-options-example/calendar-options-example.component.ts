import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { CalendarComponent } from '@fundamental-ngx/core/calendar';

@Component({
    selector: 'fd-calendar-options-example',
    templateUrl: './calendar-options-example.component.html',
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
    imports: [CalendarComponent, ContentDensityDirective, CheckboxComponent, FormsModule]
})
export class CalendarOptionsExampleComponent {
    showWeekCount = false;
    compact = true;
    markWeekends = false;
}
