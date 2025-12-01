import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { DateTimePicker } from '@fundamental-ngx/ui5-webcomponents/date-time-picker';

@Component({
    selector: 'ui5-date-time-picker-min-max-sample',
    templateUrl: './min-max-sample.html',
    standalone: true,
    imports: [DateTimePicker]
})
export class MinMaxSample {
    // Get today's date for validation
    private today = new Date();

    // Min date for future dates: today at current time
    minDateFuture = signal(this.formatDate(this.today));

    // Max date for past dates: today at current time
    maxDatePast = signal(this.formatDate(this.today));

    // Range: today to 30 days from now
    minDateRange = signal(this.formatDate(this.today));
    maxDateRange = signal(this.formatDate(new Date(this.today.getTime() + 30 * 24 * 60 * 60 * 1000)));

    isRequiredValid = signal(false);

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    onValueChange(event: UI5WrapperCustomEvent<DateTimePicker, 'ui5Change'>): void {
        console.log(`Selected: ${event.detail.value}`);
    }
}
