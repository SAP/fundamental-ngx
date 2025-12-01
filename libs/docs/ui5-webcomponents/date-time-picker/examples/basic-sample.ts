import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { DateTimePicker } from '@fundamental-ngx/ui5-webcomponents/date-time-picker';

@Component({
    selector: 'ui5-date-time-picker-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [DateTimePicker]
})
export class BasicSample {
    selectedDateTime = signal('');
    dateTimeObject = signal<Date | null>(null);

    onDateTimeChange(event: UI5WrapperCustomEvent<DateTimePicker, 'ui5Change'>): void {
        this.selectedDateTime.set(event.detail.value);
        console.log(`Selected: ${event.detail.value}`);
    }
}
