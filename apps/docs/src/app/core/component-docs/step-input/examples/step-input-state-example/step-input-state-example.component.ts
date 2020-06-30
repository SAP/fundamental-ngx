import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-state-example',
    template: `
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
            <div class="step-input-example">
                <label fd-form-label for="information-input">Information</label>
                <fd-step-input id="information-input" state="information"></fd-step-input>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="success-input">Success</label>
                <fd-step-input id="success-input" state="success"></fd-step-input>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="warning-input">Warning</label>
                <fd-step-input id="warning-input" state="warning"></fd-step-input>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="error-input">Error</label>
                <fd-step-input id="error-input" state="error"></fd-step-input>
            </div>
        </div>
    `
})
export class StepInputStateExampleComponent {
}
