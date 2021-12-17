import { Component } from '@angular/core';

import feedInputH from '!./examples/feed-input-example/feed-input-example.component.html?raw';
import feedInputPlaceholderH from '!./examples/feed-input-placeholder-example/feed-input-placeholder-example.component.html?raw';
import feedInputNoAvatarH from '!./examples/feed-input-no-avatar-example/feed-input-no-avatar-example.component.html?raw';
import feedInputDisabledH from '!./examples/feed-input-disabled-example/feed-input-disabled-example.component.html?raw';
import feedInputMaxHeightH from '!./examples/feed-input-grow-example/feed-input-grow-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-feed-input',
    templateUrl: './feed-input-docs.component.html'
})
export class FeedInputDocsComponent {
    feedInput: ExampleFile[] = [
        {
            language: 'html',
            code: feedInputH,
            fileName: 'feed-input-example'
        }
    ];

    feedInputPlaceholder: ExampleFile[] = [
        {
            language: 'html',
            code: feedInputPlaceholderH,
            fileName: 'feed-input-placeholder-example'
        }
    ];

    feedInputNoAvatar: ExampleFile[] = [
        {
            language: 'html',
            code: feedInputNoAvatarH,
            fileName: 'feed-input-no-avatar-example'
        }
    ];

    feedInputDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: feedInputDisabledH,
            fileName: 'feed-input-disabled-example'
        }
    ];

    feedInputMaxHeight: ExampleFile[] = [
        {
            language: 'html',
            code: feedInputMaxHeightH,
            fileName: 'feed-input-max-height-example'
        }
    ];
}
