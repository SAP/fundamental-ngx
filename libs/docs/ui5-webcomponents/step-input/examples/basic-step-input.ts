import { Component, computed, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { StepInput } from '@fundamental-ngx/ui5-webcomponents/step-input';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-basic-step-input-sample',
    templateUrl: './basic-step-input.html',
    standalone: true,
    imports: [StepInput, Label]
})
export class BasicStepInputExample {
    private readonly _basicValue = signal(0);
    private readonly _stepValue = signal(50);
    private readonly _negativeValue = signal(-10);

    readonly stepConfigurations = signal([
        {
            label: 'Default (step: 1)',
            value: 5,
            step: 1,
            placeholder: 'Enter a number',
            description: 'Standard integer input'
        },
        {
            label: 'Step by 5',
            value: 25,
            step: 5,
            placeholder: 'Multiples of 5',
            description: 'Increment/decrement by 5'
        },
        {
            label: 'Step by 10',
            value: 100,
            step: 10,
            placeholder: 'Multiples of 10',
            description: 'Larger increments'
        }
    ]);

    readonly basicValue = computed(() => this._basicValue());
    readonly stepValue = computed(() => this._stepValue());
    readonly negativeValue = computed(() => this._negativeValue());
}
