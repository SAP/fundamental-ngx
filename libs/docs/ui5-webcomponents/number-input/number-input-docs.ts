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
import { BasicSample } from './examples/basic-sample';
import { MinMaxSample } from './examples/min-max-sample';
import { StatesSample } from './examples/states-sample';
import { ValuePrecisionSample } from './examples/value-precision-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const minMaxSampleTs = 'min-max-sample.ts';
const minMaxSampleHtml = 'min-max-sample.html';
const valuePrecisionSampleTs = 'value-precision-sample.ts';
const valuePrecisionSampleHtml = 'value-precision-sample.html';
const statesSampleTs = 'states-sample.ts';
const statesSampleHtml = 'states-sample.html';

@Component({
    selector: 'ui5-doc-number-input',
    templateUrl: './number-input-docs.html',
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        MinMaxSample,
        ValuePrecisionSample,
        StatesSample
    ]
})
export class NumberInputDocs {
    basicExample = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        }
    ]);

    minMaxExample = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(minMaxSampleHtml),
            originalFileName: 'min-max-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(minMaxSampleTs),
            originalFileName: 'min-max-sample',
            component: 'MinMaxSample',
            typescriptFileCode: getAssetFromModuleAssets(minMaxSampleTs),
            scssFileCode: ''
        }
    ]);

    valuePrecisionExample = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(valuePrecisionSampleHtml),
            originalFileName: 'value-precision-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(valuePrecisionSampleTs),
            originalFileName: 'value-precision-sample',
            component: 'ValuePrecisionSample',
            typescriptFileCode: getAssetFromModuleAssets(valuePrecisionSampleTs),
            scssFileCode: ''
        }
    ]);

    statesExample = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(statesSampleHtml),
            originalFileName: 'states-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(statesSampleTs),
            originalFileName: 'states-sample',
            component: 'StatesSample',
            typescriptFileCode: getAssetFromModuleAssets(statesSampleTs),
            scssFileCode: ''
        }
    ]);
}
