import { Component, signal } from '@angular/core';
import { ValueState } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { StepInput } from '@fundamental-ngx/ui5-webcomponents/step-input';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-value-state-step-input-sample',
    templateUrl: './value-state-step-input.html',
    standalone: true,
    imports: [StepInput, Label]
})
export class ValueStateStepInputExample {
    readonly valueStateScenarios = signal([
        {
            label: 'Disabled',
            value: 42,
            valueState: ValueState.None,
            description: 'Default neutral state',
            readonly: false,
            disabled: true
        },
        {
            label: 'Readonly',
            value: 100,
            valueState: ValueState.Positive,
            description: 'Valid input confirmed',
            readonly: true,
            disabled: false
        },
        {
            label: 'None (Default)',
            value: 42,
            valueState: ValueState.None,
            description: 'Default neutral state',
            readonly: false,
            disabled: false
        },
        {
            label: 'Positive',
            value: 100,
            valueState: ValueState.Positive,
            description: 'Valid input confirmed',
            readonly: false,
            disabled: false
        },
        {
            label: 'Warning',
            value: 75,
            valueState: ValueState.Critical,
            description: 'Warning about the value',
            readonly: false,
            disabled: false
        },
        {
            label: 'Error',
            value: 150,
            valueState: ValueState.Negative,
            description: 'Invalid value entered',
            readonly: false,
            disabled: false
        },
        {
            label: 'Information',
            value: 25,
            valueState: ValueState.Information,
            description: 'Additional information',
            readonly: false,
            disabled: false
        }
    ]);

    onFormValueChange(event: CustomEvent): void {
        console.log('Value change event:', event);
    }

    onFormValueInput(event: CustomEvent): void {
        console.log('Input event:', event);
    }

    onValueStateChange(event: CustomEvent): void {
        console.log('Value state change event:', event);
    }
}
