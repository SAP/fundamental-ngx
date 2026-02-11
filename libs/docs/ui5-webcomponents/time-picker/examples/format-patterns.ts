import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { TimePicker } from '@fundamental-ngx/ui5-webcomponents/time-picker';

// Ensure CLDR data is available for all time-picker components
import '@ui5/webcomponents-localization/dist/Assets.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-time-picker-format-patterns-sample',
    templateUrl: './format-patterns.html',
    standalone: true,
    imports: [TimePicker]
})
export class TimePickerFormatPatternsSample {
    readonly formatPatterns = signal([
        {
            pattern: 'HH:mm:ss',
            description: '24-hour format with seconds (11:42:35)',
            value: '14:30:25'
        },
        {
            pattern: 'hh:mm:ss a',
            description: '12-hour format with AM/PM (2:23:15 PM)',
            value: '02:30:25 PM'
        },
        {
            pattern: 'HH:mm',
            description: '24-hour format without seconds (11:42)',
            value: '14:30'
        },
        {
            pattern: 'hh:mm a',
            description: '12-hour format without seconds (2:23 PM)',
            value: '02:30 PM'
        },
        {
            pattern: 'HH',
            description: 'Hours only (14)',
            value: '14'
        }
    ]);

    readonly patternValues = signal<{ [key: string]: string }>({
        'HH:mm:ss': '14:30:25',
        'hh:mm:ss a': '02:30:25 PM',
        'HH:mm': '14:30',
        'hh:mm a': '02:30 PM',
        'mm:ss': '30:25',
        HH: '14'
    });

    onPatternChange(event: UI5WrapperCustomEvent<TimePicker, 'ui5Change'>, pattern: string): void {
        this.patternValues.update((values) => ({
            ...values,
            [pattern]: event.detail.value
        }));
    }
}
