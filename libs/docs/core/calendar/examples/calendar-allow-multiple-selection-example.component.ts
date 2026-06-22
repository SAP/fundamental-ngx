import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from '@fundamental-ngx/core/calendar';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-calendar-allow-multiple-selection-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <fd-calendar calType="single" [(ngModel)]="dates" [allowMultipleSelection]="true"></fd-calendar>
        <br />
        <div>
            Selected Dates:<br />
            @for (date of dates; track date.day + date.month) {
                {{ date.toDate() | date: 'shortDate' }}<br />
            }
        </div>
    `,
    providers: [
        { provide: DatetimeAdapter, useClass: FdDatetimeAdapter },
        { provide: DATE_TIME_FORMATS, useValue: FD_DATETIME_FORMATS }
    ],
    imports: [CalendarComponent, FormsModule, DatePipe, FdDatetimeModule]
})
export class CalendarAllowMultipleSelectionExampleComponent {
    dates: FdDate[] = [
        new FdDate(2025, 1, 6),
        new FdDate(2025, 1, 7),
        new FdDate(2025, 1, 8),
        new FdDate(2025, 1, 9),
        new FdDate(2025, 1, 10)
    ];
}
