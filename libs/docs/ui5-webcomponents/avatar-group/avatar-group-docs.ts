import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { AvatarGroupExample } from './examples/avatar-group-sample';

const basicSampleHtml = 'avatar-group-sample.html';
const basicSampleTs = 'avatar-group-sample.ts';

@Component({
    selector: 'ui5-avatar-group-docs',
    templateUrl: './avatar-group-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        AvatarGroupExample
    ]
})
export class AvatarGroupDocs {
    examples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'avatar-group-sample'
        },
        {
            language: 'typescript',
            component: 'AvatarGroupExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'avatar-group-sample'
        }
    ];
}
