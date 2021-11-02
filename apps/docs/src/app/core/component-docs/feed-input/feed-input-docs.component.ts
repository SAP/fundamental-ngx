import { Component } from '@angular/core';

import * as feedInputH from '!raw-loader!./examples/feed-input-example/feed-input-example.component.html';
import * as feedInputPlaceholderH from '!raw-loader!./examples/feed-input-placeholder-example/feed-input-placeholder-example.component.html';
import * as feedInputNoAvatarH from '!raw-loader!./examples/feed-input-no-avatar-example/feed-input-no-avatar-example.component.html';
import * as feedInputDisabledH from '!raw-loader!./examples/feed-input-disabled-example/feed-input-disabled-example.component.html';
import * as feedInputMaxHeightH from '!raw-loader!./examples/feed-input-grow-example/feed-input-grow-example.component.html';
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
