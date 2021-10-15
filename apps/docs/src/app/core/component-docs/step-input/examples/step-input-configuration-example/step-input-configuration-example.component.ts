import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-configuration-example',
    template: `
        <div class="step-input-example-container">
            <div class="step-input-example">
                <label fd-form-label for="min-fraction-input">4 minimal fractional digits</label>
                <fd-step-input id="min-fraction-input" [minFractionDigits]="4" [(value)]="value1"></fd-step-input>
                <small>Value: {{ value1 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="max-fraction-input">1 maximal fraction digit</label>
                <fd-step-input id="max-fraction-input" [maxFractionDigits]="1" [(value)]="value2"></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="integer-input">Integers only</label>
                <fd-step-input id="integer-input" [maxFractionDigits]="0" [(value)]="value3"></fd-step-input>
                <small>Value: {{ value3 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="no-grouping-input">No grouping</label>
                <fd-step-input id="no-grouping-input" [useGrouping]="false" [(value)]="value4"></fd-step-input>
                <small>Value: {{ value4 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="icons-input">Custom icons</label>
                <fd-step-input
                    id="icons-input"
                    incrementButtonIcon="arrow-top"
                    decrementButtonIcon="arrow-bottom"
                    [(value)]="value5"
                >
                </fd-step-input>
                <small>Value: {{ value5 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="min-max-input">Min max limitation <-10,10></label>
                <fd-step-input id="min-max-input" [min]="-10" [max]="10" [(value)]="value6"></fd-step-input>
                <small>Value: {{ value6 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="min-max-input">Step = 0.5</label>
                <fd-step-input id="min-max-input" [step]="0.5" [(value)]="value7"></fd-step-input>
                <small>Value: {{ value7 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="center-text-input">Text aligned to center</label>
                <fd-step-input id="min-max-input" textAlign="center" [(value)]="value8"></fd-step-input>
                <small>Value: {{ value8 }}</small>
            </div>
        </div>
    `
})
export class StepInputConfigurationExampleComponent {
    value1 = 0;
    value2 = 0;
    value3 = 0;
    value4 = 10000.55;
    value5 = 0;
    value6 = 0;
    value7 = 0;
    value8 = 0;

    constructor() {}
}
