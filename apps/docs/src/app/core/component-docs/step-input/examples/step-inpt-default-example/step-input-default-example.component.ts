import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-default-example',
    template: `
        <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;">
            <div class="step-input-example">
                <label fd-form-label for="default-input">Normal</label>
                <fd-step-input id="default-input" [(value)]="value1"></fd-step-input>
                <small>Value: {{ value1 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="compat-input">Compact</label>
                <fd-step-input id="compat-input" [(value)]="value2" [compact]="true"></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>
        </div>
    `
})
export class StepInputDefaultExampleComponent {
    value1: number = 0;
    value2: number = 0;
}
