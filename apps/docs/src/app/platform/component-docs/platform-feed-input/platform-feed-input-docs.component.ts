import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as feedInputH from '!raw-loader!./platform-feed-input-examples/platform-feed-input-example/platform-feed-input-example.component.html';
import * as feedInputT from '!raw-loader!./platform-feed-input-examples/platform-feed-input-example/platform-feed-input-example.component';
import * as feedInputPlaceholderH from '!raw-loader!./platform-feed-input-examples/platform-feed-input-placeholder-example/platform-feed-input-placeholder-example.component.html';
import * as feedInputNoAvatarH from '!raw-loader!./platform-feed-input-examples/platform-feed-input-no-avatar-example/platform-feed-input-no-avatar-example.component.html';
import * as feedInputDisabledH from '!raw-loader!./platform-feed-input-examples/platform-feed-input-disabled-example/platform-feed-input-disabled-example.component.html';
import * as feedInputMaxHeightH from '!raw-loader!./platform-feed-input-examples/platform-feed-input-max-height-example/platform-feed-input-max-height-example.component.html';

@Component({
    selector: 'app-feed-input',
    templateUrl: './platform-feed-input-docs.component.html'
})
export class PlatformFeedInputDocsComponent {
    platformStandardFeedInput: ExampleFile[] = [
        {
            language: 'html',
            code: feedInputH,
            fileName: 'platform-feed-input-example'
        },
        {
            language: 'typescript',
            code: feedInputT,
            fileName: 'platform-feed-input-example',
            component: 'PlatformFeedInputExampleComponent'
        }
    ];

    platformPlaceholderFeedInput: ExampleFile[] = [
        {
            language: 'html',
            code: feedInputPlaceholderH,
            fileName: 'platform-feed-input-placeholder-example'
        }
    ];

    platformNoAvatarFeedInput: ExampleFile[] = [
        {
            language: 'html',
            code: feedInputNoAvatarH,
            fileName: 'platform-feed-input-no-avatar-example'
        }
    ];

    platformDisabledFeedInput: ExampleFile[] = [
        {
            language: 'html',
            code: feedInputDisabledH,
            fileName: 'platform-feed-input-disabled-example'
        }
    ];

    platformMaxHeightFeedInput: ExampleFile[] = [
        {
            language: 'html',
            code: feedInputMaxHeightH,
            fileName: 'platform-feed-input-max-height-example'
        }
    ];
}
