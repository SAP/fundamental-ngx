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
import { PlatformLinkExampleComponent } from './examples/platform-link-example.component';
import { PlatformLinkMiscExamplesComponent } from './examples/platform-link-misc-examples.component';
import { PlatformLinkTypesExampleComponent } from './examples/platform-link-types-example.component';

const iconlinkSrc = 'platform-link-example.component.html';
const iconlinkTs = 'platform-link-example.component.ts';
const linkTypesScr = 'platform-link-types-example.component.html';
const linkTypesTs = 'platform-link-types-example.component.ts';
const linkMisc = 'platform-link-misc-examples.component.html';
const linkMiscTs = 'platform-link-misc-examples.component.ts';

@Component({
    selector: 'app-link',
    templateUrl: './platform-link-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformLinkExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformLinkTypesExampleComponent,
        PlatformLinkMiscExamplesComponent
    ]
})
export class PlatformLinkDocsComponent {
    iconLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconlinkSrc),
            fileName: 'platform-link-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconlinkTs),
            fileName: 'platform-link-example',
            component: 'PlatformLinkExampleComponent'
        }
    ];

    iconTypes: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(linkTypesScr),
            fileName: 'platform-link-types-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(linkTypesTs),
            fileName: 'platform-link-types-example',
            component: 'PlatformLinkTypesExampleComponent'
        }
    ];

    linkMisc: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(linkMisc),
            fileName: 'platform-link-misc-examples'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(linkMiscTs),
            fileName: 'platform-link-misc-examples',
            component: 'PlatformLinkMiscExamplesComponent'
        }
    ];
}
