import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { DateTimePicker } from '@fundamental-ngx/ui5-webcomponents/date-time-picker';

@Component({
    selector: 'ui5-doc-date-time-picker-formats-sample',
    templateUrl: './formats-sample.html',
    standalone: true,
    imports: [DateTimePicker]
})
export class FormatsSample {
    defaultFormatValue = signal('2024-03-15T14:30:00');
    customFormatValue = signal('2024-03-15T14:30:00');
    isoFormatValue = signal('2024-03-15T14:30:00');
    differentFormats = signal('2024-03-15T14:30:00');

    onValueChange(
        event: UI5WrapperCustomEvent<DateTimePicker, 'ui5Change'>,
        stateSetter: (value: string) => void
    ): void {
        stateSetter(event.detail.value);
        console.log(`Selected: ${event.detail.value}`);
    }
}
