import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { TimePicker } from '@fundamental-ngx/ui5-webcomponents/time-picker';

import { TimePickerChangeEventDetail, TimePickerInputEventDetail } from '@ui5/webcomponents/dist/TimePicker.js';

// Ensure CLDR data is available for all time-picker components
import '@ui5/webcomponents-localization/dist/Assets.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/text.css';

@Component({
    selector: 'ui5-time-picker-events-sample',
    templateUrl: './events.html',
    standalone: true,
    imports: [TimePicker, Label, Text]
})
export class TimePickerEventsSample {
    readonly timeValue = signal('');
    readonly eventLog = signal<string[]>([]);

    private addEvent(eventType: string, detail?: any): void {
        const timestamp = new Date().toLocaleTimeString();
        const eventDescription = detail
            ? `${timestamp} - ${eventType}: ${JSON.stringify(detail)}`
            : `${timestamp} - ${eventType}`;

        this.eventLog.update((log) => [eventDescription, ...log].slice(0, 10)); // Keep last 10 events
    }

    onTimeChange(event: CustomEvent<TimePickerChangeEventDetail>): void {
        this.timeValue.set(event.detail.value);
        this.addEvent('ui5Change', { value: event.detail.value });
    }

    onTimeInput(event: CustomEvent<TimePickerInputEventDetail>): void {
        this.addEvent('ui5Input', { value: event.detail.value });
    }

    onTimeOpen(_event: CustomEvent): void {
        this.addEvent('ui5Open');
    }

    onTimeClose(_event: CustomEvent): void {
        this.addEvent('ui5Close');
    }
}
