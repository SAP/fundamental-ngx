import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { DateTimePicker } from '@fundamental-ngx/ui5-webcomponents/date-time-picker';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';

import { setTimezone } from '@ui5/webcomponents-base/dist/config/Timezone.js';
import DateFormat from '@ui5/webcomponents-localization/dist/DateFormat.js';

@Component({
    selector: 'ui5-date-time-picker-timezones-sample',
    templateUrl: './timezones.html',
    standalone: true,
    imports: [DateTimePicker, Select, Option]
})
export class TimezonesSample {
    selectedDateTime = signal('');

    timezones = [
        { id: 'America/New_York', label: 'America/New_York (EST/EDT)' },
        { id: 'America/Chicago', label: 'America/Chicago (CST/CDT)' },
        { id: 'America/Los_Angeles', label: 'America/Los_Angeles (PST/PDT)' },
        { id: 'Europe/London', label: 'Europe/London (GMT/BST)' },
        { id: 'Europe/Berlin', label: 'Europe/Berlin (CET/CEST)' },
        { id: 'Europe/Paris', label: 'Europe/Paris (CET/CEST)' },
        { id: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' },
        { id: 'Asia/Shanghai', label: 'Asia/Shanghai (CST)' },
        { id: 'Asia/Dubai', label: 'Asia/Dubai (GST)' },
        { id: 'Australia/Sydney', label: 'Australia/Sydney (AEDT/AEST)' },
        { id: 'Pacific/Auckland', label: 'Pacific/Auckland (NZDT/NZST)' },
        { id: 'UTC', label: 'UTC (Coordinated Universal Time)' }
    ];

    async onTimezoneChanged(event: UI5WrapperCustomEvent<Select, 'ui5Change'>): Promise<void> {
        const selectedTimezone = event.detail.selectedOption.getAttribute('dataTimezone');

        if (selectedTimezone && this.selectedDateTime()) {
            try {
                // Create DateFormat instance with medium style
                const dateFormat = (DateFormat as any).getDateTimeInstance({ style: 'medium' });

                // Parse the current value
                const parsedDate = dateFormat.parse(this.selectedDateTime());

                // Set the new timezone globally
                await setTimezone(selectedTimezone);

                // Format the date in the new timezone
                const formattedValue = dateFormat.format(parsedDate);

                // Update the datetime picker value
                this.selectedDateTime.set(formattedValue);
            } catch (error) {
                console.error('Error changing timezone:', error);
            }
        }
    }

    onDateTimeChanged(event: UI5WrapperCustomEvent<DateTimePicker, 'ui5Change'>): void {
        this.selectedDateTime.set(event.detail.value);
    }
}
