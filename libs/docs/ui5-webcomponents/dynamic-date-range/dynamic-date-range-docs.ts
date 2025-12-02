import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicSample } from './examples/basic-sample';
import { ValueHandlingSample } from './examples/value-handling-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const valueHandlingSampleTs = 'value-handling-sample.ts';
const valueHandlingSampleHtml = 'value-handling-sample.html';

@Component({
    selector: 'ui5-doc-dynamic-date-range',
    templateUrl: './dynamic-date-range-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        BasicSample,
        ValueHandlingSample
    ]
})
export class DynamicDateRangeDocs {
    basicExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'basic-sample'
        }
    ];

    valueHandlingExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(valueHandlingSampleTs),
            fileName: 'value-handling-sample',
            component: 'ValueHandlingSample',
            typescriptFileCode: getAssetFromModuleAssets(valueHandlingSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(valueHandlingSampleHtml),
            fileName: 'value-handling-sample'
        }
    ];
}
