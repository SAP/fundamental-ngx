import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicSample } from './examples/basic-sample';
import { LabelSample } from './examples/label-sample';
import { ValueHandlingSample } from './examples/value-handling-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const valueHandlingSampleTs = 'value-handling-sample.ts';
const valueHandlingSampleHtml = 'value-handling-sample.html';
const labelSampleHtml = 'label-sample.html';
const labelSampleTs = 'label-sample.ts';

@Component({
    selector: 'ui5-doc-dynamic-date-range',
    templateUrl: './dynamic-date-range-docs.html',
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        BasicSample,
        ValueHandlingSample,
        LabelSample
    ]
})
export class DynamicDateRangeDocs {
    basicExample: ExampleFile[] = [
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
    ];

    valueHandlingExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(valueHandlingSampleTs),
            originalFileName: 'value-handling-sample',
            component: 'ValueHandlingSample',
            typescriptFileCode: getAssetFromModuleAssets(valueHandlingSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(valueHandlingSampleHtml),
            originalFileName: 'value-handling-sample'
        }
    ];

    readonly labelExample = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(labelSampleHtml),
            originalFileName: 'label-sample'
        },
        {
            language: 'typescript',
            component: 'LabelSample',
            code: getAssetFromModuleAssets(labelSampleTs),
            originalFileName: 'label-sample'
        }
    ]);
}
