import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const feedInputH = 'feed-input-example/feed-input-example.component.html';
const feedInputPlaceholderH = 'feed-input-placeholder-example/feed-input-placeholder-example.component.html';
const feedInputNoAvatarH = 'feed-input-no-avatar-example/feed-input-no-avatar-example.component.html';
const feedInputDisabledH = 'feed-input-disabled-example/feed-input-disabled-example.component.html';
const feedInputMaxHeightH = 'feed-input-grow-example/feed-input-grow-example.component.html';

@Component({
    selector: 'app-feed-input',
    templateUrl: './feed-input-docs.component.html'
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
}
