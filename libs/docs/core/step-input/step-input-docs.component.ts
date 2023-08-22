import { Component, ViewEncapsulation } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { StepInputFormExampleComponent } from './examples/step-input-form-example/step-input-form-example.component';
import { StepInputCurrencyExampleComponent } from './examples/step-input-currency-example/step-input-currency-example.component';
import { StepInputLabelExampleComponent } from './examples/step-input-label-example/step-input-label-example.component';
import { StepInputStateExampleComponent } from './examples/step-input-state-example/step-input-state-example.component';
import { StepInputLocaleExampleComponent } from './examples/step-input-locale-example/step-input-locale-example.component';
import { StepInputConfigurationExampleComponent } from './examples/step-input-configuration-example/step-input-configuration-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { StepInputDefaultExampleComponent } from './examples/step-inpt-default-example/step-input-default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const stepInputDefaultSrc = 'step-inpt-default-example/step-input-default-example.component.ts';
const stepInputConfigurationSrc = 'step-input-configuration-example/step-input-configuration-example.component.ts';
const stepInputCurrencySrc = 'step-input-currency-example/step-input-currency-example.component.ts';
const stepInputFormSrc = 'step-input-form-example/step-input-form-example.component.ts';
const stepInputLabelSrc = 'step-input-label-example/step-input-label-example.component.ts';
const stepInputLocaleSrc = 'step-input-locale-example/step-input-locale-example.component.ts';
const stepInputStateSrc = 'step-input-state-example/step-input-state-example.component.ts';

@Component({
    selector: 'app-select',
    templateUrl: './step-input-docs.component.html',
    styleUrls: ['./step-input-docs.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        StepInputDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        StepInputConfigurationExampleComponent,
        StepInputLocaleExampleComponent,
        StepInputStateExampleComponent,
        StepInputLabelExampleComponent,
        StepInputCurrencyExampleComponent,
        StepInputFormExampleComponent
    ]
})
export class StepInputDocsComponent {
    stepInputDefault: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: getAssetFromModuleAssets(stepInputDefaultSrc),
            fileName: 'step-input-default-example',
            component: 'StepInputDefaultExampleComponent'
        }
    ];

    stepInputConfiguration: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: getAssetFromModuleAssets(stepInputConfigurationSrc),
            fileName: 'step-input-configuration-example',
            component: 'StepInputConfigurationExampleComponent'
        }
    ];

    stepInputCurrency: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: getAssetFromModuleAssets(stepInputCurrencySrc),
            fileName: 'step-input-currency-example',
            component: 'StepInputCurrencyExampleComponent'
        }
    ];

    stepInputForm: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: getAssetFromModuleAssets(stepInputFormSrc),
            fileName: 'step-input-form-example',
            component: 'StepInputFormExampleComponent'
        }
    ];

    stepInputLabel: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: getAssetFromModuleAssets(stepInputLabelSrc),
            fileName: 'step-input-label-example',
            component: 'StepInputLabelExampleComponent'
        }
    ];

    stepInputLocale: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: getAssetFromModuleAssets(stepInputLocaleSrc),
            fileName: 'step-input-locale-example',
            component: 'StepInputLocaleExampleComponent'
        }
    ];

    stepInputState: ExampleFile[] = [
        {
            language: 'typescript',
            standalone: true,
            code: getAssetFromModuleAssets(stepInputStateSrc),
            fileName: 'step-input-state-example',
            component: 'StepInputStateExampleComponent'
        }
    ];
}
