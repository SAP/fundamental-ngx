import { Component, ViewEncapsulation } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PlatformNumberStepInputExampleComponent } from './examples/platform-number-step-input-example.component';
import { PlatformNumberStepInputFormExampleComponent } from './examples/platform-number-step-input-reactive-example.component';
import { PlatformNumberStepInputStateExampleComponent } from './examples/platform-number-step-input-state-example.component';
import { PlatformNumberStepInputTemplateFormExampleComponent } from './examples/platform-number-step-input-template-example.component';

const exampleScss = 'platform-step-input-example.scss';
const exampleHtml = 'platform-number-step-input-example.component.html';
const exampleTs = 'platform-number-step-input-example.component.ts';
const reactiveFormExampleHtml = 'platform-number-step-input-reactive-example.component.html';
const reactiveFormExampleTs = 'platform-number-step-input-reactive-example.component.ts';
const templateFormExampleHtml = 'platform-number-step-input-template-example.component.html';
const templateFormExampleTs = 'platform-number-step-input-template-example.component.ts';
const statesExampleHtml = 'platform-number-step-input-state-example.component.html';
const statesExampleTs = 'platform-number-step-input-state-example.component.ts';

@Component({
    selector: 'app-step-input',
    templateUrl: './platform-step-input-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformNumberStepInputExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformNumberStepInputStateExampleComponent,
        PlatformNumberStepInputFormExampleComponent,
        PlatformNumberStepInputTemplateFormExampleComponent
    ]
})
export class PlatformStepInputDocsComponent {
    numberStepInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(exampleHtml),
            fileName: 'platform-number-step-input-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(exampleTs),
            fileName: 'platform-number-step-input-example',
            component: 'PlatformNumberStepInputExampleComponent',
            scssFileCode: getAssetFromModuleAssets(exampleScss)
        }
    ];

    numberStepInputForm: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(reactiveFormExampleHtml),
            fileName: 'platform-number-step-input-reactive-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(reactiveFormExampleTs),
            fileName: 'platform-number-step-input-reactive-example',
            component: 'PlatformNumberStepInputFormExampleComponent',
            scssFileCode: getAssetFromModuleAssets(exampleScss)
        }
    ];

    numberStepInputTemplateForm: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(templateFormExampleHtml),
            fileName: 'platform-number-step-input-template-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(templateFormExampleTs),
            fileName: 'platform-number-step-input-template-example',
            component: 'PlatformNumberStepInputTemplateFormExampleComponent',
            scssFileCode: getAssetFromModuleAssets(exampleScss)
        }
    ];

    numberStepInputStates: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(statesExampleHtml),
            fileName: 'platform-number-step-input-state-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(statesExampleTs),
            fileName: 'platform-number-step-input-state-example',
            component: 'PlatformNumberStepInputStateExampleComponent',
            scssFileCode: getAssetFromModuleAssets(exampleScss)
        }
    ];
}
