import { Component, signal } from '@angular/core';
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
        { state: ValueState.None, label: 'None (Default)', description: 'Standard state', value: '10:30:00' },
        { state: ValueState.Positive, label: 'Positive', description: 'Success state', value: '09:00:00' },
        { state: ValueState.Critical, label: 'Critical', description: 'Warning state', value: '23:59:59' },
        { state: ValueState.Negative, label: 'Negative', description: 'Error state', value: '25:00:00' },
        { state: ValueState.Information, label: 'Information', description: 'Info state', value: '12:00:00' }
    ]);

    readonly stateValues = signal<{ [key: string]: string }>({
        None: '10:30:00',
        Positive: '09:00:00',
        Critical: '23:59:59',
        Negative: '25:00:00',
        Information: '12:00:00'
    });

    onStateChange(event: any, state: string): void {
        this.stateValues.update((values) => ({
            ...values,
            [state]: event.target.value
        }));
    }
}
