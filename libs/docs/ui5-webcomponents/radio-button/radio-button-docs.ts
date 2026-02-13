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
import { DisabledSample } from './examples/disabled-sample';
import { ReactiveFormsSample } from './examples/reactive-forms-sample';
import { TextWrappingSample } from './examples/text-wrapping-sample';
import { ValueStateSample } from './examples/value-state-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const valueStateSampleTs = 'value-state-sample.ts';
const valueStateSampleHtml = 'value-state-sample.html';
const disabledSampleTs = 'disabled-sample.ts';
const disabledSampleHtml = 'disabled-sample.html';
const textWrappingSampleTs = 'text-wrapping-sample.ts';
const textWrappingSampleHtml = 'text-wrapping-sample.html';
const reactiveFormsSampleTs = 'reactive-forms-sample.ts';
const reactiveFormsSampleHtml = 'reactive-forms-sample.html';

@Component({
    selector: 'ui5-doc-radio-button',
    templateUrl: './radio-button-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        ValueStateSample,
        DisabledSample,
        TextWrappingSample,
        ReactiveFormsSample
    ]
})
export class RadioButtonDocs {
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

    disabledExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(disabledSampleTs),
            originalFileName: 'disabled-sample',
            component: 'DisabledSample',
            typescriptFileCode: getAssetFromModuleAssets(disabledSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(disabledSampleHtml),
            originalFileName: 'disabled-sample'
        }
    ]);

    textWrappingExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(textWrappingSampleTs),
            originalFileName: 'text-wrapping-sample',
            component: 'TextWrappingSample',
            typescriptFileCode: getAssetFromModuleAssets(textWrappingSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(textWrappingSampleHtml),
            originalFileName: 'text-wrapping-sample'
        }
    ]);

    reactiveFormsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(reactiveFormsSampleTs),
            originalFileName: 'reactive-forms-sample',
            component: 'ReactiveFormsSample',
            typescriptFileCode: getAssetFromModuleAssets(reactiveFormsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(reactiveFormsSampleHtml),
            originalFileName: 'reactive-forms-sample'
        }
    ]);
}
