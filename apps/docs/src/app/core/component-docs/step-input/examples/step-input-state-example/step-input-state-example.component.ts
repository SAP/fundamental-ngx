import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-state-example',
    template: `
        <div class="step-input-example-container">
            <div class="step-input-example">
                <label fd-form-label for="information-input">Information</label>
                <fd-step-input id="information-input" [(value)]="value1" state="information"></fd-step-input>
                <small>Value: {{ value1 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="success-input">Success</label>
                <fd-step-input id="success-input" [(value)]="value2" state="success"></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="warning-input">Warning</label>
                <fd-step-input id="warning-input" [(value)]="value3" state="warning"></fd-step-input>
                <small>Value: {{ value3 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="error-input">Error</label>
                <fd-step-input id="error-input" [(value)]="value4" state="error"></fd-step-input>
                <small>Value: {{ value4 }}</small>
            </div>
        </div>
    `
})
export class StepInputStateExampleComponent {
    value1 = 0;
    value2 = 0;
    value3 = 0;
    value4 = 0;
}
