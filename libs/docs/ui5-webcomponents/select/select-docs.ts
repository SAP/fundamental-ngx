import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { AdditionalTextSample } from './examples/additional-text-sample';
import { BasicSample } from './examples/basic-sample';
import { CustomOptionsSample } from './examples/custom-options-sample';
import { DisabledReadonlySample } from './examples/disabled-readonly-sample';
import { ReactiveSample } from './examples/reactive-sample';
import { ValueStateSample } from './examples/value-state-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const additionalTextSampleTs = 'additional-text-sample.ts';
const additionalTextSampleHtml = 'additional-text-sample.html';
const valueStateSampleTs = 'value-state-sample.ts';
const valueStateSampleHtml = 'value-state-sample.html';
const disabledReadonlySampleTs = 'disabled-readonly-sample.ts';
const disabledReadonlySampleHtml = 'disabled-readonly-sample.html';
const customOptionsSampleTs = 'custom-options-sample.ts';
const customOptionsSampleHtml = 'custom-options-sample.html';
const reactiveSampleTs = 'reactive-sample.ts';
const reactiveSampleHtml = 'reactive-sample.html';

@Component({
    selector: 'ui5-doc-select',
    templateUrl: './select-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        AdditionalTextSample,
        ValueStateSample,
        DisabledReadonlySample,
        CustomOptionsSample,
        ReactiveSample
    ]
})
export class SelectDocs {
    basicExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        }
    ]);

    additionalTextExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(additionalTextSampleTs),
            originalFileName: 'additional-text-sample',
            component: 'AdditionalTextSample',
            typescriptFileCode: getAssetFromModuleAssets(additionalTextSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(additionalTextSampleHtml),
            originalFileName: 'additional-text-sample'
        }
    ]);

    valueStateExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(valueStateSampleTs),
            originalFileName: 'value-state-sample',
            component: 'ValueStateSample',
            typescriptFileCode: getAssetFromModuleAssets(valueStateSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(valueStateSampleHtml),
            originalFileName: 'value-state-sample'
        }
    ]);

    disabledReadonlyExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(disabledReadonlySampleTs),
            originalFileName: 'disabled-readonly-sample',
            component: 'DisabledReadonlySample',
            typescriptFileCode: getAssetFromModuleAssets(disabledReadonlySampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(disabledReadonlySampleHtml),
            originalFileName: 'disabled-readonly-sample'
        }
    ]);

    customOptionsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customOptionsSampleTs),
            originalFileName: 'custom-options-sample',
            component: 'CustomOptionsSample',
            typescriptFileCode: getAssetFromModuleAssets(customOptionsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(customOptionsSampleHtml),
            originalFileName: 'custom-options-sample'
        }
    ]);

    reactiveExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(reactiveSampleTs),
            originalFileName: 'reactive-sample',
            component: 'ReactiveSample',
            typescriptFileCode: getAssetFromModuleAssets(reactiveSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(reactiveSampleHtml),
            originalFileName: 'reactive-sample'
        }
    ]);
}
