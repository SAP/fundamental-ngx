import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-configuration-example',
    template: `
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
            <div class="step-input-example">
                <fd-step-input [(value)]="value1"></fd-step-input>
                <small>Value: {{ value1 }}</small>
            </div>

            <div class="step-input-example">
                <fd-step-input [min]="-10" [max]="10" [(value)]="value2"></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>
        </div>
    `
})
export class StepInputConfigurationExampleComponent {
    value1: number = 0;
    value2: number = 0;
}
