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
import { FeedInputCircleAvatarExampleComponent } from './examples/feed-input-circle-avatar-example/feed-input-circle-avatar-example.component';
import { FeedInputDisabledExampleComponent } from './examples/feed-input-disabled-example/feed-input-disabled-example.component';
import { FeedInputExampleComponent } from './examples/feed-input-example/feed-input-example.component';
import { FeedInputGrowExampleComponent } from './examples/feed-input-grow-example/feed-input-grow-example.component';
import { FeedInputNoAvatarExampleComponent } from './examples/feed-input-no-avatar-example/feed-input-no-avatar-example.component';
import { FeedInputPlaceholderExampleComponent } from './examples/feed-input-placeholder-example/feed-input-placeholder-example.component';

const feedInputH = 'feed-input-example/feed-input-example.component.html';
const feedInputPlaceholderH = 'feed-input-placeholder-example/feed-input-placeholder-example.component.html';
const feedInputNoAvatarH = 'feed-input-no-avatar-example/feed-input-no-avatar-example.component.html';
const feedInputDisabledH = 'feed-input-disabled-example/feed-input-disabled-example.component.html';
const feedInputMaxHeightH = 'feed-input-grow-example/feed-input-grow-example.component.html';
const feedInputCircleAvatarH = 'feed-input-circle-avatar-example/feed-input-circle-avatar-example.component.html';

@Component({
    selector: 'app-feed-input',
    templateUrl: './feed-input-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        FeedInputExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        FeedInputPlaceholderExampleComponent,
        FeedInputNoAvatarExampleComponent,
        FeedInputDisabledExampleComponent,
        DescriptionComponent,
        FeedInputGrowExampleComponent,
        FeedInputCircleAvatarExampleComponent
    ]
})
export class FeedInputDocsComponent {
    feedInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(feedInputH),
            fileName: 'feed-input-example'
        }
    ];

    feedInputPlaceholder: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(feedInputPlaceholderH),
            fileName: 'feed-input-placeholder-example'
        }
    ];

    feedInputNoAvatar: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(feedInputNoAvatarH),
            fileName: 'feed-input-no-avatar-example'
        }
    ];

    feedInputDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(feedInputDisabledH),
            fileName: 'feed-input-disabled-example'
        }
    ];

    feedInputMaxHeight: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(feedInputMaxHeightH),
            fileName: 'feed-input-max-height-example'
        }
    ];
    feedInputCircleAvatar: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(feedInputCircleAvatarH),
            fileName: 'feed-input-circle-avatar-example'
        }
    ];
}
