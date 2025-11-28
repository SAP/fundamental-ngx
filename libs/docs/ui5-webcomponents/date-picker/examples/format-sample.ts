import { Component, signal } from '@angular/core';
import { DatePicker } from '@fundamental-ngx/ui5-webcomponents/date-picker';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-date-picker-format-sample',
    templateUrl: './format-sample.html',
    standalone: true,
    imports: [DatePicker]
})
export class DatePickerFormatSample {
    isoDate = signal('2024-01-15');
    usDate = signal('01/15/2024');
    europeanDate = signal('15/01/2024');
    longDate = signal('2024-01-15');
}
