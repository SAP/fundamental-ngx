import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import {
    PlatformLinkIconExampleComponent,
    PlatformLinkStandardExampleComponent,
    PlatformLinkEmphasizedExampleComponent,
    PlatformLinkDisabledExampleComponent,
    PlatformLinkDisabledEmphasizedExampleComponent,
    PlatformLinkInvertedExampleComponent,
    PlatformLinkTruncatedExampleComponent
} from './examples/platform-link-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const standardlinkSrc = 'platform-link-standard-example.component.html';
const emphasizedlinkSrc = 'platform-link-emphasized-example.component.html';
const disabledlinkSrc = 'platform-link-disabled-example.component.html';
const disabledEmphasizedlinkSrc = 'platform-link-disabled-emphasized-example.component.html';
const invertedlinkSrc = 'platform-link-inverted-example.component.html';
const truncatedlinkSrc = 'platform-link-truncated-example.component.html';
const iconlinkSrc = 'platform-link-icon-example.component.html';

@Component({
    selector: 'app-link',
    templateUrl: './platform-link-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformLinkIconExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformLinkStandardExampleComponent,
        PlatformLinkEmphasizedExampleComponent,
        PlatformLinkDisabledExampleComponent,
        PlatformLinkDisabledEmphasizedExampleComponent,
        PlatformLinkInvertedExampleComponent,
        PlatformLinkTruncatedExampleComponent
    ]
})
export class PlatformLinkDocsComponent {
    standardLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(standardlinkSrc),
            fileName: 'platform-link-standard-example'
        }
    ];

    emphasizedLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(emphasizedlinkSrc),
            fileName: 'platform-link-emphasized-example'
        }
    ];

    disabledLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(disabledlinkSrc),
            fileName: 'platform-link-disabled-example'
        }
    ];

    disabledEmphasizedLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(disabledEmphasizedlinkSrc),
            fileName: 'platform-link-disabled-emphasized-example'
        }
    ];

    invertedLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(invertedlinkSrc),
            fileName: 'platform-link-inverted-example'
        }
    ];

    truncatedLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(truncatedlinkSrc),
            fileName: 'platform-link-truncated-example'
        }
    ];

    iconLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconlinkSrc),
            fileName: 'platform-link-icon-example'
        }
    ];
}
