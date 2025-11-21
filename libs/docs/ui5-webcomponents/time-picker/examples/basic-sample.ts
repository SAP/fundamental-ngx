import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { TimePicker } from '@fundamental-ngx/ui5-webcomponents/time-picker';

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

    onBasicValueChange(event: UI5WrapperCustomEvent<TimePicker, 'ui5Change'>): void {
        this.basicValue.set(event.detail.value);
    }

    onPlaceholderValueChange(event: UI5WrapperCustomEvent<TimePicker, 'ui5Input'>): void {
        this.placeholderValue.set(event.detail.value);
    }

    onFormattedValueChange(event: UI5WrapperCustomEvent<TimePicker, 'ui5Change'>): void {
        this.formattedValue.set(event.detail.value);
    }
}
