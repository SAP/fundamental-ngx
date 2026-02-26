import { Component, signal } from '@angular/core';
import { TimePicker } from '@fundamental-ngx/ui5-webcomponents/time-picker';

// Ensure CLDR data is available for all time-picker components
import '@ui5/webcomponents-localization/dist/Assets.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-time-picker-states-sample',
    templateUrl: './states.html',
    standalone: true,
    imports: [TimePicker]
})
export class TimePickerStatesSample {
    readonly disabledValue = signal('10:15:30 AM');
    readonly readonlyValue = signal('04:45:00 PM');

    readonly stateExamples = signal([
        {
            title: 'Disabled State',
            description: 'Completely non-interactive',
            value: this.disabledValue,
            disabled: true,
            readonly: false
        },
        {
            title: 'Readonly State',
            description: 'Focusable but not editable',
            value: this.readonlyValue,
            disabled: false,
            readonly: true
        }
    ]);
}
