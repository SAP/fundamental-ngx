import { Component } from '@angular/core';
import { DatePicker } from '@fundamental-ngx/ui5-webcomponents/date-picker';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-date-picker-component-states-sample',
    templateUrl: './component-states-sample.html',
    standalone: true,
    imports: [DatePicker]
})
export class DatePickerComponentStatesSample {}
