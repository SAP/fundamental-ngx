import { Component, signal } from '@angular/core';
import { DateRangePicker } from '@fundamental-ngx/ui5-webcomponents/date-range-picker';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-date-range-picker-delimiter-sample',
    templateUrl: './delimiter-sample.html',
    standalone: true,
    imports: [DateRangePicker]
})
export class DateRangePickerDelimiterSample {
    defaultRange = signal('2024-01-15 - 2024-01-20');
    toRange = signal('2024-01-15 to 2024-01-20');
    arrowRange = signal('2024-01-15 → 2024-01-20');
    slashRange = signal('2024-01-15 / 2024-01-20');
}
