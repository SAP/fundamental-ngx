import { Component, computed, signal, viewChild } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { DynamicDateRange } from '@fundamental-ngx/ui5-webcomponents/dynamic-date-range';

// import DynamicDateRangeValue type
import { DynamicDateRangeValue } from '@ui5/webcomponents/dist/DynamicDateRange.js';

// Import required dynamic date range options
import '@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/LastOptions.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/NextOptions.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/SingleDate.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/Today.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-group.css';
import 'fundamental-styles/dist/form-label.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/message-strip.css';

@Component({
    selector: 'ui5-dynamic-date-range-value-handling-sample',
    templateUrl: './value-handling-sample.html',
    standalone: true,
    imports: [DynamicDateRange]
})
export class ValueHandlingSample {
    // ViewChild to access the dynamic date range component
    dynamicDateRangeRef = viewChild<DynamicDateRange>('dynamicDateRange');

    options = signal(
        'TODAY, TOMORROW, YESTERDAY, DATE, DATERANGE, LASTDAYS, NEXTDAYS, LASTWEEKS, NEXTWEEKS, LASTMONTHS, NEXTMONTHS, LASTQUARTERS, NEXTQUARTERS, LASTYEARS, NEXTYEARS'
    );
    selectedRange = signal<DynamicDateRangeValue | undefined>(undefined);
    selectedValueJson = signal<string>('');
    convertedDates = signal<string>('');

    // Computed property to format the date range display
    dateRangeDisplay = computed(() => {
        const dates = this.convertedDates();
        return dates || 'No dates selected';
    });

    onDateRangeChange(event: UI5WrapperCustomEvent<DynamicDateRange, 'ui5Change'>): void {
        const target = event.target as any;
        const selectedValue = target.value;

        this.selectedRange.set(selectedValue);
        this.selectedValueJson.set(JSON.stringify(selectedValue, null, 2));

        // Convert to actual dates using the toDates method
        const dynamicDateRange = this.dynamicDateRangeRef();
        if (dynamicDateRange && selectedValue) {
            try {
                // Access the native element and call toDates
                const dates = dynamicDateRange.element.toDates(selectedValue);

                if (dates && dates.length > 0) {
                    const formattedDates = dates.map((date: Date) => date.toLocaleString()).join(' - ');
                    this.convertedDates.set(formattedDates);
                } else {
                    this.convertedDates.set('No dates available');
                }
            } catch (error) {
                console.error('Error converting dates:', error);
                this.convertedDates.set('Error converting dates');
            }
        }
    }
}
