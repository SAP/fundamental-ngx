import { Component } from '@angular/core';
import { DatePicker } from '@fundamental-ngx/ui5-webcomponents/date-picker';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-date-picker-value-state-sample',
    templateUrl: './value-state-sample.html',
    standalone: true,
    imports: [DatePicker]
})
export class DatePickerValueStateSample {}
