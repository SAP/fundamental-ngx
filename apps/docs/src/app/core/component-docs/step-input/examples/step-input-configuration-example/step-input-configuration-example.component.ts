import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-configuration-example',
    template: `
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">

            <div class="step-input-example">
                <label fd-form-label for="min-fraction-input">4 minimal fraction digits</label>
                <fd-step-input id="min-fraction-input" [minFractionDigits]="4" [(value)]="value1"></fd-step-input>
                <small>Value: {{ value1 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="integer-input">Integers only</label>
                <fd-step-input id="integer-input" [maxFractionDigits]="0" [(value)]="value2"></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="no-grouping-input">No grouping</label>
                <fd-step-input id="no-grouping-input" [useGrouping]="group" [(value)]="value3"></fd-step-input>
                <small>Value: {{ value3 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="icons-input">Custom icons</label>
                <fd-step-input id="icons-input"
                               incrementButtonIcon="arrow-top"
                               decrementButtonIcon="arrow-bottom"
                               [(value)]="value4">
                </fd-step-input>
                <small>Value: {{ value4 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="min-max-input">Min max limitation <-10,10></label>
                <fd-step-input id="min-max-input" [min]="-10" [max]="10" [(value)]="value5"></fd-step-input>
                <small>Value: {{ value5 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="min-max-input">Step = 0.5</label>
                <fd-step-input id="min-max-input" [step]="0.5" [(value)]="value6"></fd-step-input>
                <small>Value: {{ value6 }}</small>
            </div>
        </div>
    `
})
export class StepInputConfigurationExampleComponent {
    value1: number = 0;
    value2: number = 0;
    value3: number = 10000.55;
    value4: number = 0;
    value5: number = 0;
    value6: number = 0;
    group;

    constructor() {
        setInterval(() => this.group = !this.group, 1500);
    }
}
