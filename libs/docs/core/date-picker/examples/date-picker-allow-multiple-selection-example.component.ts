import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-allow-multiple-selection-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <!-- Hold Shift and click a second date to select all dates in between -->
        <fd-date-picker [allowMultipleSelection]="true" [(ngModel)]="selectedDates"></fd-date-picker>
        <br />
        <div>Selected: {{ selectedDates.length }} date(s)</div>
        <br />
        @for (date of selectedDates; track date) {
            <div>{{ date.toDateString() }}</div>
        }
    `,
    providers: [
        { provide: DatetimeAdapter, useClass: FdDatetimeAdapter },
        { provide: DATE_TIME_FORMATS, useValue: FD_DATETIME_FORMATS }
    ],
    imports: [DatePickerComponent, FormsModule, FdDatetimeModule]
})
export class DatePickerAllowMultipleSelectionExampleComponent {
    selectedDates: FdDate[] = [];
}
