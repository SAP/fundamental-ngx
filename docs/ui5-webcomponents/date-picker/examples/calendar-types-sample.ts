import { Component } from '@angular/core';
import { DatePicker } from '@fundamental-ngx/ui5-webcomponents/date-picker';

// Import calendar types
import '@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js';
import '@ui5/webcomponents-localization/dist/features/calendar/Islamic.js';
import '@ui5/webcomponents-localization/dist/features/calendar/Japanese.js';
import '@ui5/webcomponents-localization/dist/features/calendar/Persian.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-date-picker-calendar-types-sample',
    templateUrl: './calendar-types-sample.html',
    standalone: true,
    imports: [DatePicker]
})
export class DatePickerCalendarTypesSample {}
