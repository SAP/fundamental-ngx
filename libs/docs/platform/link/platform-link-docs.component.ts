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

const iconlinkSrc = 'platform-link-example.component.html';
const iconlinkTs = 'platform-link-example.component.ts';

@Component({
    selector: 'app-link',
    templateUrl: './platform-link-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformLinkExampleComponent,
        CodeExampleComponent,
        SeparatorComponent
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
}
