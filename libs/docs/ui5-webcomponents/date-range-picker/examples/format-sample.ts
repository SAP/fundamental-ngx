import { Component, signal } from '@angular/core';
import { DateRangePicker } from '@fundamental-ngx/ui5-webcomponents/date-range-picker';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-date-range-picker-format-sample',
    templateUrl: './format-sample.html',
    standalone: true,
    imports: [DateRangePicker]
})
export class DateRangePickerFormatSample {
    isoRange = signal('2024-01-15 - 2024-01-20');
    usRange = signal('01/15/2024 - 01/20/2024');
    europeanRange = signal('15/01/2024 - 20/01/2024');
}
