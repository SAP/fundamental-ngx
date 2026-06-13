import { Component } from '@angular/core';
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
import { CustomTabsSample } from './examples/custom-tabs-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const customTabsSampleTs = 'custom-tabs-sample.ts';
const customTabsSampleHtml = 'custom-tabs-sample.html';

@Component({
    selector: 'ui5-view-settings-dialog-docs',
    templateUrl: './view-settings-dialog-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        CustomTabsSample
    ]
})
export class ViewSettingsDialogDocs {
    basicExample: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'basic-sample',
            code: getAssetFromModuleAssets(basicSampleTs),
            component: 'BasicSample'
        },
        {
            language: 'html',
            fileName: 'basic-sample',
            code: getAssetFromModuleAssets(basicSampleHtml),
            scssFileCode: getAssetFromModuleAssets(basicSampleHtml)
        }
    ];

    customTabsExample: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'custom-tabs-sample',
            code: getAssetFromModuleAssets(customTabsSampleTs),
            component: 'CustomTabsSample'
        },
        {
            language: 'html',
            fileName: 'custom-tabs-sample',
            code: getAssetFromModuleAssets(customTabsSampleHtml),
            scssFileCode: getAssetFromModuleAssets(customTabsSampleHtml)
        }
    ];
}
