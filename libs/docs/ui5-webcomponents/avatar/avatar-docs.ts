import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';
import { AvatarTypesSample } from './examples/avatar-types';
import { BasicAvatarSample } from './examples/basic-sample';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';

@Component({
    selector: 'ui5-avatar-docs',
    templateUrl: './avatar-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicAvatarSample,
        AvatarTypesSample,
        SeparatorComponent
    ]
})
export class AvatarDocs {
    basicAvatarSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'BasicAvatarSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ];

    avatarTypesSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('avatar-types.html'),
            originalFileName: 'avatar-types'
        },
        {
            language: 'typescript',
            component: 'AvatarTypesSample',
            code: getAssetFromModuleAssets('avatar-types.ts'),
            originalFileName: 'avatar-types'
        }
    ];
}
