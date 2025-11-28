import { Component, computed, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { StepInput } from '@fundamental-ngx/ui5-webcomponents/step-input';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-precision-step-input-sample',
    templateUrl: './precision-step-input.html',
    standalone: true,
    imports: [StepInput, Label, SegmentedButton, SegmentedButtonItem]
})
export class PrecisionStepInputExample {
    private readonly _selectedPrecision = signal(2);
    private readonly _customValue = signal(5.5);

    readonly precisionScenarios = signal([
        {
            label: 'Integer (0 decimals)',
            value: 42,
            step: 1,
            precision: 0,
            description: 'Whole numbers only',
            example: '42'
        },
        {
            label: 'Currency (2 decimals)',
            value: 19.99,
            step: 0.01,
            precision: 2,
            description: 'Standard currency format',
            example: '19.99'
        },
        {
            label: 'Measurement (1 decimal)',
            value: 3.7,
            step: 0.1,
            precision: 1,
            description: 'Measurements in meters',
            example: '3.7'
        },
        {
            label: 'Scientific (4 decimals)',
            value: 2.7182,
            step: 0.0001,
            precision: 4,
            description: 'High precision calculations',
            example: '2.7182'
        },
        {
            label: 'Stock Price (3 decimals)',
            value: 156.789,
            step: 0.001,
            precision: 3,
            description: 'Stock prices in dollars',
            example: '156.789'
        }
    ]);

    readonly precisionOptions = signal([
        { value: 0, label: '0 decimals' },
        { value: 1, label: '1 decimal' },
        { value: 2, label: '2 decimals' },
        { value: 3, label: '3 decimals' },
        { value: 4, label: '4 decimals' }
    ]);

    readonly selectedPrecision = computed(() => this._selectedPrecision());
    readonly customValue = computed(() => this._customValue());

    readonly stepForPrecision = computed(() => {
        const precision = this._selectedPrecision();
        return precision === 0 ? 1 : 1 / Math.pow(10, precision);
    });

    onCustomValueChange(event: UI5WrapperCustomEvent<StepInput, 'ui5Change'>): void {
        this._customValue.set(Number(event.target?.['value'] ?? 0));
    }

    setPrecision(precision: number): void {
        this._selectedPrecision.set(precision);
        // Round current value to new precision
        const currentVal = this._customValue();
        const rounded = Number(currentVal.toFixed(precision));
        this._customValue.set(rounded);
    }
}
