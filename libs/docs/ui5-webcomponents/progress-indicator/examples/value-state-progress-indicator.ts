import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { ValueState } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { ProgressIndicator } from '@fundamental-ngx/ui5-webcomponents/progress-indicator';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

interface ValueStateConfig {
    state: ValueState;
    value: number;
    description: string;
    scenario: string;
}

@Component({
    selector: 'ui5-value-state-progress-indicator',
    templateUrl: './value-state-progress-indicator.html',
    standalone: true,
    imports: [ProgressIndicator, SegmentedButton, SegmentedButtonItem],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ValueStateProgressIndicatorExample {
    readonly valueStates = signal([
        {
            state: ValueState.None,
            value: 50,
            description: 'Default neutral state',
            scenario: 'Regular progress'
        },
        {
            state: ValueState.Positive,
            value: 100,
            description: 'Successful completion',
            scenario: 'Task completed successfully'
        },
        {
            state: ValueState.Critical,
            value: 75,
            description: 'Critical state for attention',
            scenario: 'Approaching deadline'
        },
        {
            state: ValueState.Negative,
            value: 30,
            description: 'Error state for problems',
            scenario: 'Task failed or blocked'
        },
        {
            state: ValueState.Information,
            value: 65,
            description: 'Information state for details',
            scenario: 'Additional info available'
        }
    ]);

    readonly selectedValueState = signal(ValueState.None);

    setValueState(state: ValueState): void {
        this.selectedValueState.set(state);
    }

    getCurrentStateConfig(): ValueStateConfig {
        return this.valueStates().find((config) => config.state === this.selectedValueState()) || this.valueStates()[0];
    }
}
