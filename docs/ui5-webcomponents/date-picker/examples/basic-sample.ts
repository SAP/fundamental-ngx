import { Component, signal } from '@angular/core';
import { DatePicker } from '@fundamental-ngx/ui5-webcomponents/date-picker';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-date-picker-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [DatePicker]
})
export class DatePickerBasicSample {
    selectedDate = signal('2024-01-15');
}
