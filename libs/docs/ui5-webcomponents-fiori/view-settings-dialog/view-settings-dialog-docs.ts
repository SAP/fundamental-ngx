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

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';

@Component({
    selector: 'ui5-view-settings-dialog-docs',
    templateUrl: './view-settings-dialog-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        BasicSample
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
}
