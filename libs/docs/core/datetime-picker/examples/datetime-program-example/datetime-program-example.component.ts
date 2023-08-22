import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormsModule } from '@angular/forms';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';

@Component({
    selector: 'fd-datetime-program-example',
    templateUrl: './datetime-program-example.component.html',
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
    imports: [DatetimePickerComponent, FormsModule, ButtonModule]
})
export class DatetimeProgramExampleComponent {
    date = FdDate.getNow();

    changeDay(): void {
        this.date = new FdDate(2018, 10, 5, 15, 30);
    }
}
