import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-state-example',
    template: `
        <div class="step-input-example-container">
            <div class="step-input-example">
                <label fd-form-label for="information-input">Information</label>
                <fd-step-input
                    inputId="information-input"
                    [(value)]="value1"
                    state="information"
                    stateMessage="Information state message"
                ></fd-step-input>
                <small>Value: {{ value1 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="success-input">Success</label>
                <fd-step-input
                    inputId="success-input"
                    [(value)]="value2"
                    state="success"
                    stateMessage="Success state message"
                ></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="warning-input">Warning</label>
                <fd-step-input
                    inputId="warning-input"
                    [(value)]="value3"
                    state="warning"
                    stateMessage="Warning state message"
                ></fd-step-input>
                <small>Value: {{ value3 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="error-input">Error</label>
                <fd-step-input
                    inputId="error-input"
                    [(value)]="value4"
                    state="error"
                    stateMessage="Error state message"
                ></fd-step-input>
                <small>Value: {{ value4 }}</small>
            </div>
        </div>
    `
})
export class StepInputStateExampleComponent {
    value1: number | null = 0;
    value2: number | null = 0;
    value3: number | null = 0;
    value4: number | null = 0;
}
