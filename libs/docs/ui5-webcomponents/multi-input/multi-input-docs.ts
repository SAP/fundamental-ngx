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
import { EventsSample } from './examples/events-sample';
import { ValueStateSample } from './examples/value-state-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const valueStateSampleTs = 'value-state-sample.ts';
const valueStateSampleHtml = 'value-state-sample.html';
const disabledSampleTs = 'disabled-sample.ts';
const disabledSampleHtml = 'disabled-sample.html';
const eventsSampleTs = 'events-sample.ts';
const eventsSampleHtml = 'events-sample.html';

@Component({
    selector: 'ui5-doc-multi-input',
    templateUrl: './multi-input-docs.html',
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
        EventsSample
    ]
})
export class MultiInputDocs {
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
            originalFileName: 'basic-sample',
            component: 'BasicSample'
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
            originalFileName: 'value-state-sample',
            component: 'ValueStateSample'
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
            originalFileName: 'disabled-sample',
            component: 'DisabledSample'
        }
    ]);

    eventsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(eventsSampleTs),
            originalFileName: 'events-sample',
            component: 'EventsSample',
            typescriptFileCode: getAssetFromModuleAssets(eventsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(eventsSampleHtml),
            originalFileName: 'events-sample',
            component: 'EventsSample'
        }
    ]);
}
