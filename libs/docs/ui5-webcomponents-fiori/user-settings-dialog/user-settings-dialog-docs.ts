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
import { SaveModeSample } from './examples/save-mode-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';

const saveModeSampleTs = 'save-mode-sample.ts';
const saveModeSampleHtml = 'save-mode-sample.html';

@Component({
    selector: 'ui5-doc-user-settings-dialog',
    templateUrl: './user-settings-dialog-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        BasicSample,
        SaveModeSample
    ]
})
export class UserSettingsDialogDocs {
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

    saveModeExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(saveModeSampleTs),
            originalFileName: 'save-mode-sample',
            component: 'SaveModeSample',
            typescriptFileCode: getAssetFromModuleAssets(saveModeSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(saveModeSampleHtml),
            originalFileName: 'save-mode-sample',
            component: 'SaveModeSample'
        }
    ]);
}
