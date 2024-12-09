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
import { PlatformInfoLabelExampleComponent } from './examples/platform-info-label-example.component';

const platformInfoLableHtml = 'platform-info-label-example.component.html';
const platformInfoLabelTs = 'platform-info-label-example.component.ts';
const platformInfoLabelScss = 'platform-info-label-example.component.scss';

@Component({
    selector: 'fd-platform-info-label-docs',
    templateUrl: './platform-info-label-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        PlatformInfoLabelExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent
    ]
})
export class PlatformInfoLabelDocsComponent {
    infoLabelExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformInfoLableHtml),
            fileName: 'platform-info-label-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformInfoLabelTs),
            fileName: 'platform-info-label-example',
            component: 'PlatformInfoLabelExampleComponent',
            scssFileCode: getAssetFromModuleAssets(platformInfoLabelScss)
        }
    ];
}
