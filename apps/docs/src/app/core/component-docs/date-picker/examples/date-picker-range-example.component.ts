import { Component } from '@angular/core';
import { FdDate, DateRange, DatetimeAdapter } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-picker-range-example',
    template: ` <fd-date-picker type="range" [(ngModel)]="selectedRange"> </fd-date-picker>
        <br />
        <div>Selected First Date: {{ this.selectedRange.start || 'null' }}</div>
        <br />
        <div>Selected Last Date: {{ this.selectedRange.end || 'null' }}</div>`
})
export class DatePickerRangeExampleComponent {
    selectedRange: DateRange<FdDate>;

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {
        const today = this.datetimeAdapter.today();
        this.selectedRange = new DateRange(today, this.datetimeAdapter.addCalendarDays(today, 1));
    }
}
