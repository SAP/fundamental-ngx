import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-label-example',
    template: `
        <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;">
            <div class="step-input-example">
                <label fd-form-label for="kg-input">Kilograms</label>
                <fd-step-input id="kg-input" mode="currency" unit="kg"></fd-step-input>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="mm-input">Millimeters</label>
                <fd-step-input id="mm-input" mode="currency" unit="mm"></fd-step-input>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="mol-input">Moles</label>
                <fd-step-input id="mol-input" mode="currency" unit="mol"></fd-step-input>
            </div>
        </div>
    `
})
export class StepInputLabelExampleComponent {
}
