import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ValueState } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { TimePicker } from '@fundamental-ngx/ui5-webcomponents/time-picker';

// Ensure CLDR data is available for all time-picker components
import '@ui5/webcomponents-localization/dist/Assets.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-time-picker-value-states-sample',
    templateUrl: './value-states.html',
    standalone: true,
    imports: [TimePicker]
})
export class TimePickerValueStatesSample {
    readonly valueStates = signal([
        { state: ValueState.None, label: 'None (Default)', description: 'Standard state' },
        { state: ValueState.Positive, label: 'Positive', description: 'Success state' },
        { state: ValueState.Critical, label: 'Critical', description: 'Warning state' },
        { state: ValueState.Negative, label: 'Negative', description: 'Error state' },
        { state: ValueState.Information, label: 'Information', description: 'Info state' }
    ]);

    readonly stateValues = signal<{ [key: string]: string }>({
        None: '10:30:00 AM',
        Positive: '09:00:00 AM',
        Critical: '11:59:59 PM',
        Negative: '01:00:00 AM',
        Information: '12:00:00 PM'
    });

    onStateChange(event: UI5WrapperCustomEvent<TimePicker, 'ui5Change'>, state: string): void {
        this.stateValues.update((values) => ({
            ...values,
            [state]: event.detail.value
        }));
    }
}
