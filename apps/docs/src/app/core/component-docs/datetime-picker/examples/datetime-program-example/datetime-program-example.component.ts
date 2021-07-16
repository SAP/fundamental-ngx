import { Component } from '@angular/core';
import { DatetimeAdapter, DATE_TIME_FORMATS, FdDate, FdDatetimeAdapter, FD_DATETIME_FORMATS } from '@fundamental-ngx/core/datetime';

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
    ]
})
export class DatetimeProgramExampleComponent {
    date = FdDate.getNow();

    changeDay(): void {
        this.date = new FdDate(2018, 10, 5, 15, 30);
    }
}
