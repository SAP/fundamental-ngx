import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { DateTimePicker } from '@fundamental-ngx/ui5-webcomponents/date-time-picker';

interface EventLog {
    type: string;
    value: string;
    timestamp: string;
}

@Component({
    selector: 'ui5-date-time-picker-events-sample',
    templateUrl: './events-sample.html',
    standalone: true,
    imports: [DateTimePicker]
})
export class EventsSample {
    selectedDateTime = signal('');
    eventLogs = signal<EventLog[]>([]);
    isOpen = signal(false);

    private addLog(type: string, value: string): void {
        const logs = this.eventLogs();
        const newLog: EventLog = {
            type,
            value,
            timestamp: new Date().toLocaleTimeString()
        };
        this.eventLogs.set([newLog, ...logs].slice(0, 15)); // Keep last 15 events
    }

    onChange(event: UI5WrapperCustomEvent<DateTimePicker, 'ui5Change'>): void {
        this.selectedDateTime.set(event.detail.value);
        this.addLog('ui5Change', event.detail.value);
    }

    onInput(event: UI5WrapperCustomEvent<DateTimePicker, 'ui5Input'>): void {
        this.addLog('ui5Input', event.detail.value);
    }

    onOpen(_event: UI5WrapperCustomEvent<DateTimePicker, 'ui5Open'>): void {
        this.isOpen.set(true);
        this.addLog('ui5Open', 'Picker opened');
    }

    onClose(_event: UI5WrapperCustomEvent<DateTimePicker, 'ui5Close'>): void {
        this.isOpen.set(false);
        this.addLog('ui5Close', 'Picker closed');
    }

    onValueStateChange(event: UI5WrapperCustomEvent<DateTimePicker, 'ui5ValueStateChange'>): void {
        this.addLog('ui5ValueStateChange', `State: ${event.detail.valueState || 'N/A'}`);
    }

    clearLogs(): void {
        this.eventLogs.set([]);
    }
}
