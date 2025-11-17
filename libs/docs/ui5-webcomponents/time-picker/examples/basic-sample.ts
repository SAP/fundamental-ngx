import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TimePicker, TimePickerChangeEventDetail } from '@fundamental-ngx/ui5-webcomponents/time-picker';

// Ensure CLDR data is available for all time-picker components
import '@ui5/webcomponents-localization/dist/Assets.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-time-picker-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [TimePicker, NgStyle]
})
export class TimePickerBasicSample {
    readonly basicValue = signal('');
    readonly placeholderValue = signal('');
    readonly formattedValue = signal('14:30:00');

    onBasicValueChange(event: CustomEvent<TimePickerChangeEventDetail>): void {
        this.basicValue.set(event.detail.value);
    }

    onPlaceholderValueChange(event: CustomEvent<TimePickerChangeEventDetail>): void {
        this.placeholderValue.set(event.detail.value);
    }

    onFormattedValueChange(event: CustomEvent<TimePickerChangeEventDetail>): void {
        this.formattedValue.set(event.detail.value);
    }
}
