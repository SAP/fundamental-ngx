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
import { PlatformFeedInputDisabledExampleComponent } from './examples/platform-feed-input-disabled-example/platform-feed-input-disabled-example.component';
import { PlatformFeedInputExampleComponent } from './examples/platform-feed-input-example/platform-feed-input-example.component';
import { PlatformFeedInputMaxHeightExampleComponent } from './examples/platform-feed-input-max-height-example/platform-feed-input-max-height-example.component';
import { PlatformFeedInputNoAvatarExampleComponent } from './examples/platform-feed-input-no-avatar-example/platform-feed-input-no-avatar-example.component';
import { PlatformFeedInputPlaceholderExampleComponent } from './examples/platform-feed-input-placeholder-example/platform-feed-input-placeholder-example.component';

const feedInputH = 'platform-feed-input-example/platform-feed-input-example.component.html';
const feedInputT = 'platform-feed-input-example/platform-feed-input-example.component.ts';
const feedInputPlaceholderH =
    'platform-feed-input-placeholder-example/platform-feed-input-placeholder-example.component.html';
const feedInputNoAvatarH = 'platform-feed-input-no-avatar-example/platform-feed-input-no-avatar-example.component.html';
const feedInputDisabledH = 'platform-feed-input-disabled-example/platform-feed-input-disabled-example.component.html';
const feedInputMaxHeightH =
    'platform-feed-input-max-height-example/platform-feed-input-max-height-example.component.html';

@Component({
    selector: 'app-feed-input',
    templateUrl: './platform-feed-input-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformFeedInputExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformFeedInputPlaceholderExampleComponent,
        PlatformFeedInputNoAvatarExampleComponent,
        PlatformFeedInputDisabledExampleComponent,
        PlatformFeedInputMaxHeightExampleComponent
    ]
})
export class PlatformFeedInputDocsComponent {
    platformStandardFeedInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(feedInputH),
            fileName: 'platform-feed-input-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(feedInputT),
            fileName: 'platform-feed-input-example',
            component: 'PlatformFeedInputExampleComponent'
        }
    ];

    platformPlaceholderFeedInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(feedInputPlaceholderH),
            fileName: 'platform-feed-input-placeholder-example'
        }
    ];

    platformNoAvatarFeedInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(feedInputNoAvatarH),
            fileName: 'platform-feed-input-no-avatar-example'
        }
    ];

    platformDisabledFeedInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(feedInputDisabledH),
            fileName: 'platform-feed-input-disabled-example'
        }
    ];

    platformMaxHeightFeedInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(feedInputMaxHeightH),
            fileName: 'platform-feed-input-max-height-example'
        }
    ];
}
