import { Component, signal } from '@angular/core';
import { DatePicker } from '@fundamental-ngx/ui5-webcomponents/date-picker';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-date-picker-min-max-sample',
    templateUrl: './min-max-sample.html',
    standalone: true,
    imports: [DatePicker]
})
export class DatePickerMinMaxSample {
    // Get today's date and calculate min/max dates
    today = new Date();
    minDate = signal(this.formatDate(new Date(this.today.getFullYear(), this.today.getMonth(), 1)));
    maxDate = signal(this.formatDate(new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0)));

    // Next 7 days range
    nextWeekMin = signal(this.formatDate(this.today));
    nextWeekMax = signal(this.formatDate(new Date(this.today.getTime() + 7 * 24 * 60 * 60 * 1000)));

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}
