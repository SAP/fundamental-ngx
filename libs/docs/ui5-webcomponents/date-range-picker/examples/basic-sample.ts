import { Component, signal } from '@angular/core';
import { DateRangePicker } from '@fundamental-ngx/ui5-webcomponents/date-range-picker';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-date-range-picker-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [DateRangePicker]
})
export class DateRangePickerBasicSample {
    selectedRange = signal('2024-01-15 - 2024-01-20');
}
