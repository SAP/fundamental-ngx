import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-default-example',
    template: `
        <div class="step-input-example-container" style="justify-content: space-evenly;">
            <div class="step-input-example">
                <label fd-form-label for="default-input">Default</label>
                <fd-step-input inputId="default-input" [(value)]="value1"></fd-step-input>
                <small>Value: {{ value1 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="compat-input">Compact</label>
                <fd-step-input inputId="compat-input" [(value)]="value2" [compact]="true"></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>
        </div>
    `
})
export class StepInputDefaultExampleComponent {
    value1: number | null = 0;
    value2: number | null = 0;
}
