import { Component, ViewEncapsulation } from '@angular/core';

import * as stepInputDefaultSrc from '!raw-loader!./examples/step-inpt-default-example/step-input-default-example.component.ts';
import * as stepInputConfigurationSrc from '!raw-loader!./examples/step-input-configuration-example/step-input-configuration-example.component.ts';
import * as stepInputCurrencySrc from '!raw-loader!./examples/step-input-currency-example/step-input-currency-example.component.ts';
import * as stepInputFormSrc from '!raw-loader!./examples/step-input-form-example/step-input-form-example.component.ts';
import * as stepInputLabelSrc from '!raw-loader!./examples/step-input-label-example/step-input-label-example.component.ts';
import * as stepInputLocaleSrc from '!raw-loader!./examples/step-input-locale-example/step-input-locale-example.component.ts';
import * as stepInputStateSrc from '!raw-loader!./examples/step-input-state-example/step-input-state-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-select',
    templateUrl: './step-input-docs.component.html',
    styleUrls: ['./step-input-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StepInputDocsComponent {
    stepInputDefault: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: stepInputDefaultSrc,
            fileName: 'step-input-default-example',
            component: 'StepInputDefaultExampleComponent'
        }
    ];

    stepInputConfiguration: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: stepInputConfigurationSrc,
            fileName: 'step-input-configuration-example',
            component: 'StepInputConfigurationExampleComponent'
        }
    ];

    stepInputCurrency: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: stepInputCurrencySrc,
            fileName: 'step-input-currency-example',
            component: 'StepInputCurrencyExampleComponent'
        }
    ];

    stepInputForm: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: stepInputFormSrc,
            fileName: 'step-input-form-example',
            component: 'StepInputFormExampleComponent'
        }
    ];

    stepInputLabel: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: stepInputLabelSrc,
            fileName: 'step-input-label-example',
            component: 'StepInputLabelExampleComponent'
        }
    ];

    stepInputLocale: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: stepInputLocaleSrc,
            fileName: 'step-input-locale-example',
            component: 'StepInputLocaleExampleComponent'
        }
    ];

    stepInputState: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: stepInputStateSrc,
            fileName: 'step-input-state-example',
            component: 'StepInputStateExampleComponent'
        }
    ];
}
