import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { StepInput } from '@fundamental-ngx/ui5-webcomponents/step-input';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-range-step-input-sample',
    templateUrl: './range-step-input.html',
    standalone: true,
    imports: [StepInput, Label]
})
export class RangeStepInputExample {
    readonly rangeScenarios = signal([
        {
            label: 'Percentage (0-100)',
            value: 75,
            min: 0,
            max: 100,
            step: 1,
            description: 'Standard percentage input',
            unit: '%'
        },
        {
            label: 'Temperature (-40°C to 50°C)',
            value: 22,
            min: -40,
            max: 50,
            step: 1,
            description: 'Temperature range in Celsius',
            unit: '°C'
        },
        {
            label: 'Age (0-120)',
            value: 30,
            min: 0,
            max: 120,
            step: 1,
            description: 'Human age in years',
            unit: ' years'
        },
        {
            label: 'Rating (1-5)',
            value: 4,
            min: 1,
            max: 5,
            step: 1,
            description: 'Star rating system',
            unit: ' stars'
        }
    ]);
}
