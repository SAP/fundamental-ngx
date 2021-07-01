import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-range-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <fd-date-picker type="range" [(ngModel)]="selectedRange"> </fd-date-picker>
        <br />
        <div>Selected First Date: {{ this.selectedRange?.start?.toDateString() || 'null' }}</div>
        <br />
        <div>Selected Last Date: {{ this.selectedRange?.end?.toDateString() || 'null' }}</div>`
})
export class DatePickerRangeExampleComponent {
    selectedRange: DateRange<FdDate>;

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {
        const today = this.datetimeAdapter.today();
        this.selectedRange = new DateRange(today, this.datetimeAdapter.addCalendarDays(today, 1));
    }
}
