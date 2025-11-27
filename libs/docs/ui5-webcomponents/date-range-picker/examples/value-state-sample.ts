import { Component } from '@angular/core';
import { DateRangePicker } from '@fundamental-ngx/ui5-webcomponents/date-range-picker';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-date-range-picker-value-state-sample',
    templateUrl: './value-state-sample.html',
    standalone: true,
    imports: [DateRangePicker]
})
export class DateRangePickerValueStateSample {}
