import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicAvatarSample } from './examples/basic-sample';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';

@Component({
    selector: 'avatar-docs',
    templateUrl: './avatar-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicAvatarSample
    ]
})
export class AvatarDocs {
    basicAvatarSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'BasicAvatarSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-sample'
        }
    ];
}
