import { Component } from '@angular/core';

@Component({
    selector: 'fd-step-input-currency-example',
    template: `
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">

            <div class="step-input-example">
                <label fd-form-label for="usa-input">Euro</label>
                <fd-step-input id="usa-input" mode="currency" currency="EUR"></fd-step-input>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="japanese-input">Japanese yen</label>
                <fd-step-input id="japanese-input" mode="currency" currency="JPY"></fd-step-input>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="override-input">Custom label</label>
                <fd-step-input id="override-input" mode="currency" currency="USD" unit="Grand"></fd-step-input>
            </div>

        </div>
    `
})
export class StepInputCurrencyExampleComponent {
}
