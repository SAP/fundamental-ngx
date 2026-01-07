import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { TimePicker } from '@fundamental-ngx/ui5-webcomponents/time-picker';

// Ensure CLDR data is available for all time-picker components
import '@ui5/webcomponents-localization/dist/Assets.js';

// Import Fundamental Styles
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
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

    onTimeChange(event: UI5WrapperCustomEvent<TimePicker, 'ui5Change'>): void {
        this.timeValue.set(event.detail.value);
        this.addEvent('ui5Change', { value: event.detail.value });
    }

    onTimeInput(event: UI5WrapperCustomEvent<TimePicker, 'ui5Input'>): void {
        this.addEvent('ui5Input', { value: event.detail.value });
    }

    onTimeOpen(_event: UI5WrapperCustomEvent<TimePicker, 'ui5Open'>): void {
        this.addEvent('ui5Open');
    }

    onTimeClose(_event: UI5WrapperCustomEvent<TimePicker, 'ui5Close'>): void {
        this.addEvent('ui5Close');
    }
}
