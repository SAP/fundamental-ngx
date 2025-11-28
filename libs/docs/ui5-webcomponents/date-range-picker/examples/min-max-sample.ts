import { Component, signal } from '@angular/core';
import { DateRangePicker } from '@fundamental-ngx/ui5-webcomponents/date-range-picker';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-date-range-picker-min-max-sample',
    templateUrl: './min-max-sample.html',
    standalone: true,
    imports: [DateRangePicker]
})
export class DateRangePickerMinMaxSample {
    // Get today's date and calculate min/max dates
    today = new Date();

    // Today's date
    todayDate = signal(this.formatDate(this.today));

    // Current month range (first day to last day of current month)
    minDate = signal(this.formatDate(new Date(this.today.getFullYear(), this.today.getMonth(), 1)));
    maxDate = signal(this.formatDate(new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0)));

    // Current year range
    yearStart = signal(this.formatDate(new Date(this.today.getFullYear(), 0, 1)));
    yearEnd = signal(this.formatDate(new Date(this.today.getFullYear(), 11, 31)));

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}
