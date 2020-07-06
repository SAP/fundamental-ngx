import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-label-example',
    template: `
        <div class="step-input-example-container">
            <div class="step-input-example">
                <label fd-form-label for="kg-input">Kilograms</label>
                <fd-step-input id="kg-input" unit="kg"></fd-step-input>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="mm-input">Millimeters</label>
                <fd-step-input id="mm-input" unit="mm"></fd-step-input>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="mol-input">Moles</label>
                <fd-step-input id="mol-input" unit="mol"></fd-step-input>
            </div>
        </div>
    `
})
export class StepInputLabelExampleComponent {
}
