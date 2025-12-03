import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { DynamicDateRange } from '@fundamental-ngx/ui5-webcomponents/dynamic-date-range';

// import required dynamic date range options
import '@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/DateTimeRange.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/SingleDate.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/Today.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-group.css';
import 'fundamental-styles/dist/form-label.css';
import 'fundamental-styles/dist/message-strip.css';

@Component({
    selector: 'ui5-dynamic-date-range-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [DynamicDateRange]
})
export class BasicSample {
    options = signal('TODAY, TOMORROW, YESTERDAY, DATE, DATERANGE, DATETIMERANGE');

    onDateRangeChange(event: UI5WrapperCustomEvent<DynamicDateRange, 'ui5Change'>): void {
        console.log(`Date range changed currentTarget: ${JSON.stringify(event.currentTarget.value)}`);
    }
}
