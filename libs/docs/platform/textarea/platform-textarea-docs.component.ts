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
import { PlatformTextareaAutogrowExampleComponent } from './examples/platform-textarea-autogrow-example.component';
import { PlatformTextareaBasicExampleComponent } from './examples/platform-textarea-basic-example.component';
import { PlatformTextareaCounterExampleComponent } from './examples/platform-textarea-counter-example.component';
import { PlatformTextareaCounterTemplateExampleComponent } from './examples/platform-textarea-counter-template-example.component';

const platformBasicTextareaSrc = 'platform-textarea-basic-example.component.html';
const platformBasicTextareaTsCode = 'platform-textarea-basic-example.component.ts';

const platformCounterTextareaSrc = 'platform-textarea-counter-example.component.html';
const platformCounterTextareaTsCode = 'platform-textarea-counter-example.component.ts';
const platformTemplateCounterTextareaSrc = 'platform-textarea-counter-template-example.component.html';
const platformTemplateCounterTextareaTsCode = 'platform-textarea-counter-template-example.component.ts';

const platformAutogrowTextareaSrc = 'platform-textarea-autogrow-example.component.html';
const platformAutogrowTextareaTsCode = 'platform-textarea-autogrow-example.component.ts';

@Component({
    selector: 'app-textarea',
    templateUrl: './platform-textarea-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformTextareaBasicExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformTextareaAutogrowExampleComponent,
        PlatformTextareaCounterExampleComponent,
        PlatformTextareaCounterTemplateExampleComponent
    ]
})
export class PlatformTextareaDocsComponent {
    textareaBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformBasicTextareaSrc),
            fileName: 'platform-textarea-basic-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformBasicTextareaTsCode),
            fileName: 'platform-textarea-basic-example',
            component: 'PlatformTextareaBasicExampleComponent'
        }
    ];

    textareaCounter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformCounterTextareaSrc),
            fileName: 'platform-textarea-counter-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformCounterTextareaTsCode),
            fileName: 'platform-textarea-counter-example',
            component: 'PlatformTextareaCounterExampleComponent'
        }
    ];

    textareaTemplateCounter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTemplateCounterTextareaSrc),
            fileName: 'platform-textarea-counter-template-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTemplateCounterTextareaTsCode),
            fileName: 'platform-textarea-counter-template-example',
            component: 'PlatformTextareaCounterTemplateExampleComponent'
        }
    ];

    textareaAutogrow: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformAutogrowTextareaSrc),
            fileName: 'platform-textarea-autogrow-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformAutogrowTextareaTsCode),
            fileName: 'platform-textarea-autogrow-example',
            component: 'PlatformTextareaAutogrowExampleComponent'
        }
    ];
}
