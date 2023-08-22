import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformObjectAttributeLinkExampleComponent } from './examples/platform-object-attribute-link-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import {
    PlatformObjectAttributeExampleComponent,
    PlatformObjectAttributeTruncateExampleComponent
} from './examples/platform-object-attribute-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const objectAttribute = 'platform-object-attribute-example.component.html';
const objectAttributeTruncate = 'platform-object-attribute-truncate-example.component.html';
const objectAttributeLink = 'platform-object-attribute-link-example.component.html';
const objectAttributeLinkTs = 'platform-object-attribute-link-example.component.ts';

@Component({
    selector: 'app-object-attribute',
    templateUrl: './platform-object-attribute-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformObjectAttributeExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformObjectAttributeTruncateExampleComponent,
        PlatformObjectAttributeLinkExampleComponent
    ]
})
export class PlatformObjectAttributeDocsComponent {
    objectAttribute: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(objectAttribute),
            fileName: 'platform-object-attribute-example'
        }
    ];

    objectAttributeTruncate: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(objectAttributeTruncate),
            fileName: 'platform-object-attribute-truncate-example'
        }
    ];

    objectAttributeLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(objectAttributeLink),
            fileName: 'platform-object-attribute-link-example'
        },
        {
            language: 'typescript',
            fileName: 'platform-object-attribute-link-example',
            code: getAssetFromModuleAssets(objectAttributeLinkTs),
            component: 'PlatformObjectAttributeLinkExampleComponent'
        }
    ];
}
