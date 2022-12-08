import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-currency-example',
    template: `
        <div class="step-input-example-container">
            <div class="step-input-example">
                <label fd-form-label for="usa-input">Euro</label>
                <fd-step-input inputId="usa-input" [(value)]="value1" mode="currency" currency="EUR"></fd-step-input>
                <small>Value: {{ value1 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="japanese-input">Japanese yen</label>
                <fd-step-input
                    inputId="japanese-input"
                    [(value)]="value2"
                    mode="currency"
                    currency="JPY"
                ></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="override-input">Custom label</label>
                <fd-step-input
                    inputId="override-input"
                    [(value)]="value3"
                    mode="currency"
                    currency="USD"
                    unit="Grand"
                ></fd-step-input>
                <small>Value: {{ value3 }}</small>
            </div>
        </div>
    `
})
export class StepInputCurrencyExampleComponent {
    value1: number | null = 0;
    value2: number | null = 0;
    value3: number | null = 0;
}
