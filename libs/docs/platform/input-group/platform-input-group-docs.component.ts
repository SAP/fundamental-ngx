import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformInputGroupFormExampleComponent } from './examples/platform-input-group-form-example.component';
import { PlatformInputGroupDisabledExampleComponent } from './examples/platform-input-group-disabled-example.component';
import { PlatformInputGroupCompactExampleComponent } from './examples/platform-input-group-compact-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { PlatformInputGroupStandardExampleComponent } from './examples/platform-input-group-standard-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const inputGroupStandardExampleHtml = 'platform-input-group-standard-example.component.html';
const inputGroupCompactExampleHtml = 'platform-input-group-compact-example.component.html';
const inputGroupDisabledExampleHtml = 'platform-input-group-disabled-example.component.html';
const inputGroupFormExampleHtml = 'platform-input-group-form-example.component.html';

@Component({
    selector: 'app-input-group',
    templateUrl: './platform-input-group-docs.component.html',
    standalone: true,
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
        }
    ];
}
