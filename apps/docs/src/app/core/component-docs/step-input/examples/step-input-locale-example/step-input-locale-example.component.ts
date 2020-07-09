import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-locale-example',
    template: `
        <div class="step-input-example-container">
            <div class="step-input-example">
                <label fd-form-label for="spanish-input">Spanish locale</label>
                <fd-step-input id="spanish-input" [(value)]="value1" locale="es-ES"></fd-step-input>
                <small>Value: {{ value1 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="polish-input">Polish</label>
                <fd-step-input id="polish-input" [(value)]="value2" locale="pl-PL"></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="arabia-input">Saudi Arabia locale</label>
                <fd-step-input id="arabia-input" [(value)]="value3" locale="ar-SA"></fd-step-input>
                <small>Value: {{ value3 }}</small>
            </div>
        </div>
    `
})
export class StepInputLocaleExampleComponent {
    value1: number = 0;
    value2: number = 0;
    value3: number = 0;
}
