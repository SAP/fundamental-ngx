import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-label-example',
    template: `
        <div class="step-input-example-container">
            <div class="step-input-example">
                <label fd-form-label for="kg-input">Kilograms</label>
                <fd-step-input inputId="kg-input" [(value)]="value1" unit="kg"></fd-step-input>
                <small>Value: {{ value1 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="mm-input">Millimeters</label>
                <fd-step-input inputId="mm-input" [(value)]="value2" unit="mm"></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="mol-input">Moles</label>
                <fd-step-input inputId="mol-input" [(value)]="value3" unit="mol"></fd-step-input>
                <small>Value: {{ value3 }}</small>
            </div>
        </div>
    `
})
export class StepInputLabelExampleComponent {
    value1: number | null = 0;
    value2: number | null = 0;
    value3: number | null = 0;
}
