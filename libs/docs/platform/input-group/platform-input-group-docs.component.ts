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
import { PlatformInputGroupCompactExampleComponent } from './examples/platform-input-group-compact-example.component';
import { PlatformInputGroupDisabledExampleComponent } from './examples/platform-input-group-disabled-example.component';
import { PlatformInputGroupFormExampleComponent } from './examples/platform-input-group-form-example.component';
import { PlatformInputGroupStandardExampleComponent } from './examples/platform-input-group-standard-example.component';

const inputGroupStandardExampleHtml = 'platform-input-group-standard-example.component.html';
const inputGroupCompactExampleHtml = 'platform-input-group-compact-example.component.html';
const inputGroupDisabledExampleHtml = 'platform-input-group-disabled-example.component.html';
const inputGroupFormExampleHtml = 'platform-input-group-form-example.component.html';
const inputGroupFormExampleTs = 'platform-input-group-form-example.component.ts';

@Component({
    selector: 'app-input-group',
    templateUrl: './platform-input-group-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformInputGroupStandardExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformInputGroupCompactExampleComponent,
        PlatformInputGroupDisabledExampleComponent,
        PlatformInputGroupFormExampleComponent
    ]
})
export class PlatformInputGroupDocsComponent {
    inputGroupStandard: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupStandardExampleHtml),
            fileName: 'platform-input-group-standard-example'
        }
    ];

    inputGroupCompact: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupCompactExampleHtml),
            fileName: 'platform-input-group-compact-example'
        }
    ];

    inputGroupDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupDisabledExampleHtml),
            fileName: 'platform-input-group-disabled-example'
        }
    ];

    inputGroupForm: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupFormExampleHtml),
            fileName: 'platform-input-group-form-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(inputGroupFormExampleTs),
            fileName: 'platform-input-group-form-example',
            component: 'PlatformInputGroupFormExampleComponent'
        }
    ];
}
